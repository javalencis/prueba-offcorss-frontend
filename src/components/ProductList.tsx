import { useEffect, useState } from "react";
import iconArrow from "../assets/arrow_back_ios_new.png";
import "../styles/productlist.scss";
import { useNavigate } from "react-router";
interface Product {
  productId: string;
  productTitle: string;
  brand: string;
  description: string;
  Color: string[];
  items: {
    itemId: string;
    "Codigo de color": string[];
    Talla: string[];
    images: {
      imageUrl: string;
      imageText: string;
    }[];
    sellers: {
      commertialOffer: {
        Price: number;
        PriceWithoutDiscount: number;
      };
    }[];
  }[];
}

interface ProductList {
  data: Product[];
  total: number;
  from: number;
  to: number;
}
const ITEMS_PER_PAGE = 25;

const HEADER_TABLES = [" ", " ", "ID", "Nombre", "Marca"];

export const ProductList = () => {
  const [products, setProducts] = useState<ProductList>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [openProductDetails, setOpenProductDetails] = useState<
    Record<string, boolean>
  >({});
  const navigate = useNavigate()
  useEffect(() => {
    const getProducts = async (page: number) => {
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      try {
        const res = await fetch(
          `/api-vtex/api/catalog_system/pub/products/search?_from=${from}&_to=${to}`
        );

        const data: Product[] = await res.json();
        const resourcesHeader = res.headers.get("resources");
        if (resourcesHeader) {
          const match = resourcesHeader.match(/\d+-\d+\/(\d+)/);
          if (match) {
            setTotalProducts(parseInt(match[1]));
          }
        }
        setProducts({
          data,
          total: totalProducts,
          from,
          to,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getProducts(currentPage);
  }, [currentPage]);
  const toggleProductDetails = (event: React.MouseEvent, productId: string) => {
    event.stopPropagation()
    setOpenProductDetails((prevOpenProducts) => ({
      ...prevOpenProducts,
      [productId]: !prevOpenProducts[productId], // Alterna el estado del producto específico
    }));
  };
  const totalPages =
    totalProducts > 0 ? Math.ceil(totalProducts / ITEMS_PER_PAGE) : 0;

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (totalPages > 0) {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    } else if (products?.data?.length === ITEMS_PER_PAGE) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleRowClick = (productId: string) => {
    navigate(`/admin/product/${productId}`);
  };
  return (
    <div className="productlist">
      <h2>Productos</h2>
      <div>buscador</div>
      <table className="productlist__table">
        <tr className="productlist__table-header">
          {HEADER_TABLES.map((header, index) => (
            <th key={index}>{header.toUpperCase()}</th>
          ))}
        </tr>

        {products?.data?.map((product) => (
          <>
            <tr key={product.productId} className="productlist__table-content" onClick={() => handleRowClick(product.productId)}>
              <td className={`productlist__table-more`}>
                <img
                  src={iconArrow}
                  className={`productlist__table-more-img ${
                    openProductDetails[product.productId] ? "open" : ""
                  }`}
                  onClick={(e) => toggleProductDetails(e, product.productId)}
                />
              </td>
              <td className={`productlist__table-image`}>
                <img
                  src={product.items[0].images[0].imageUrl}
                  alt={product.items[0].images[0].imageText}
                />
              </td>
              <td className={`productlist__table-productId`}>
                {product.productId}
              </td>
              <td className={`productlist__table-productTitle`}>
                {product.productTitle}
              </td>
              <td className={`productlist__table-brand`}>{product.brand}</td>
            </tr>
            {openProductDetails[product.productId] && (
              <tr className="productlist__table-details-row">
                <td
                  colSpan={HEADER_TABLES.length}
                  className="productlist__table_items"
                >
                  {product.items.map((item) => (
                    <div
                      key={item.itemId}
                      className="productlist__table_items_detail"
                    >
                      <p>{item.itemId}</p>
                      <p>
                        {product.Color}
                        {" - "}
                        {item.Talla?.join(", ") || "N/A"}
                      </p>
                    </div>
                  ))}
                </td>
              </tr>
            )}
          </>
        ))}
      </table>
      {totalPages > 0 && (
        <div className="productlist__pagination">
          
          <span>
            {currentPage} - {totalPages}
            {' '} de {totalProducts}
          </span>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="productlist__pagination-back"
          >
            <img src={iconArrow} alt="" />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages }
            className="productlist__pagination-post"
          >
            <img src={iconArrow} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};
