import { ProductRow } from "./ProductRow";
import type { Product } from "../interfaces/Product";

interface ProductTableProps {
  products: Product[];
  openProductDetails: Record<string, boolean>;
  onToggleDetails: (event: React.MouseEvent, productId: string) => void;
  onRowClick: (productId: string) => void;
  headerTables: string[];
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  openProductDetails,
  onToggleDetails,
  onRowClick,
  headerTables,
}: ProductTableProps) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <table className="productlist__table">
      <thead>
        <tr className="productlist__table-header">
          {headerTables.map((header, index) => (
            <th key={index}>{header.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow
            key={product.productId}
            product={product}
            isDetailsOpen={!!openProductDetails[product.productId]}
            onToggleDetails={onToggleDetails}
            onRowClick={onRowClick}
            headerCount={headerTables.length}
          />
        ))}
      </tbody>
    </table>
  );
};
