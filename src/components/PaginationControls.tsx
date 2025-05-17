import iconArrow from "../assets/arrow_back_ios_new.png";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  isLoading?: boolean;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  totalItems,
  onPreviousPage,
  onNextPage,
  isLoading = false,
}: PaginationControlsProps) => {
  if (totalPages <= 0 && totalItems <= 0) {
    return null;
  }

  return (
    <div className="productlist__pagination">
      <span>
        {currentPage} de {totalPages > 0 ? totalPages : 1} (Total: {totalItems})
      </span>
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1 || isLoading}
        className="productlist__pagination-back"
      >
        <img src={iconArrow} alt="Anterior" />
      </button>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages || isLoading || totalPages === 0}
        className="productlist__pagination-post"
      >
        <img src={iconArrow} alt="Siguiente" />
      </button>
    </div>
  );
};
