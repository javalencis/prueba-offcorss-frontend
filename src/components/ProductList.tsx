
import { useEffect, useState } from "react"; 
import "../styles/productlist.scss";
import { useNavigate } from "react-router"; 
import { Search } from "./Search";
import { ProductTable } from "./ProductTable";
import { PaginationControls } from "./PaginationControls";
import type { Product } from "../interfaces/Product"; 

const ITEMS_PER_PAGE = 25;
const HEADER_TABLES = [" ", " ", "ID", "Nombre", "Marca"];

export const ProductList = () => {
  const [productsData, setProductsData] = useState<Product[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItemsFromAPI, setTotalItemsFromAPI] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openProductDetails, setOpenProductDetails] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async (page: number, currentSearchTerm: string) => {
      setIsLoading(true);
      setError(null);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      let apiUrl = `http://localhost:3000/api/products?_from=${from}&_to=${to}`;

      if (currentSearchTerm) {
        apiUrl += `&ft=${encodeURIComponent(currentSearchTerm)}`;
      }

      try {
        const res = await fetch(apiUrl);
        if (!res.ok && res.status !== 206) {
          throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
        }
        const data: Product[] = await res.json(); 

        setProductsData(data);

        const resourcesHeader = res.headers.get("resources");
        console.log(res.headers.get);
        if (resourcesHeader) {
          const match = resourcesHeader.match(/\d+-\d+\/(\d+)/);
          if (match && match[1]) {
            
            setTotalItemsFromAPI(parseInt(match[1], 10));
          } else if (data.length < ITEMS_PER_PAGE && !currentSearchTerm) {

            setTotalItemsFromAPI(from + data.length);
          } else if (data.length === 0 && currentSearchTerm) {
            setTotalItemsFromAPI(0);
          }
        
        } else if (data.length < ITEMS_PER_PAGE && !currentSearchTerm) {
          setTotalItemsFromAPI(from + data.length);
        } else if (data.length === 0) {
          setTotalItemsFromAPI(0);
        }
      } catch (err) {
        console.error(err);
        if (err instanceof Error) setError(err.message);
        else setError("Ocurrió un error desconocido.");
        setProductsData([]); 
        setTotalItemsFromAPI(0);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const toggleProductDetails = (event: React.MouseEvent, productId: string) => {
    event.stopPropagation();
    setOpenProductDetails((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const totalPages =
    totalItemsFromAPI > 0 ? Math.ceil(totalItemsFromAPI / ITEMS_PER_PAGE) : 0;

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    if (totalPages > 0) {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    } else if (productsData.length === ITEMS_PER_PAGE) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleRowClick = (productId: string) =>
    navigate(`/admin/product/${productId}`);
  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  return (
    <div className="productlist">
      <h2>Productos</h2>
      <Search onSearch={handleSearch} initialValue={searchTerm} />

      {isLoading && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!isLoading && !error && productsData.length === 0 && (
        <p>
          No se encontraron productos {searchTerm ? `para "${searchTerm}"` : ""}
          .
        </p>
      )}

      {!isLoading && !error && productsData.length > 0 && (
        <>
          <ProductTable
            products={productsData}
            openProductDetails={openProductDetails}
            onToggleDetails={toggleProductDetails}
            onRowClick={handleRowClick}
            headerTables={HEADER_TABLES}
          />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItemsFromAPI}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
