import { ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  itemName: string;
  onPageChange?: (page: number) => void;
  leftContent?: React.ReactNode;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  itemName,
  onPageChange,
  leftContent
}: Props) {
  // Hide pagination entirely if total items are less than or equal to items per page
  if (totalItems <= itemsPerPage) {
    return null;
  }

  // Calculate range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-6 border-t border-gray-100 gap-4">
      
      {/* Page Numbers */}
      <div className="flex items-center gap-2" dir="ltr">
        <button 
          onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`dots-${index}`} className="text-slate-400 font-bold px-1">...</span>
          ) : (
            <button 
              key={`page-${page}`}
              onClick={() => onPageChange?.(page as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                currentPage === page 
                  ? 'bg-emerald-700 text-white' 
                  : 'border border-gray-200 text-slate-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button 
          onClick={() => currentPage < totalPages && onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-slate-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="text-sm font-medium text-slate-400">
        عرض {startItem}-{endItem} من أصل {totalItems} {itemName}
      </div>

      {leftContent && (
        <div className="w-full lg:w-auto flex lg:justify-end">
          {leftContent}
        </div>
      )}

    </div>
  );
}
