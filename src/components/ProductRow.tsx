
import iconArrow from "../assets/arrow_back_ios_new.png";
import type { Product } from "../interfaces/Product";

interface ProductRowProps {
  product: Product;
  isDetailsOpen: boolean;
  onToggleDetails: (event: React.MouseEvent, productId: string) => void;
  onRowClick: (productId: string) => void;
  headerCount: number;
}

export const ProductRow = ({
  product,
  isDetailsOpen,
  onToggleDetails,
  onRowClick,
  headerCount,
}: ProductRowProps) => {
  return (
    <>
      <tr
        className="productlist__table-content"
        onClick={() => onRowClick(product.productId)}
        style={{ cursor: "pointer" }}
      >
        <td
          className={`productlist__table-more`}
          onClick={(e) => onToggleDetails(e, product.productId)}
        >
          <img
            src={iconArrow}
            alt="Expandir/Colapsar"
            className={`productlist__table-more-img ${
              isDetailsOpen ? "open" : ""
            }`}
          />
        </td>
        <td className={`productlist__table-image`}>
          {product.items?.[0]?.images?.[0]?.imageUrl ? (
            <img
              src={product.items[0].images[0].imageUrl}
              alt={product.items[0].images[0].imageText || product.productTitle}
            />
          ) : (
            <span>No img</span>
          )}
        </td>
        <td className={`productlist__table-productId`}>{product.productId}</td>
        <td className={`productlist__table-productTitle`}>
          {product.productTitle}
        </td>
        <td className={`productlist__table-brand`}>{product.brand}</td>
      </tr>
      {isDetailsOpen && (
        <tr className="productlist__table-details-row">
          <td
            colSpan={headerCount}
            className="productlist__table_items"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en detalles propague a onRowClick
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
  );
};
