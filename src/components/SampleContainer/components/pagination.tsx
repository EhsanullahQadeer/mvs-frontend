// Pagination.tsx
import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage = 0,
}) => {
  return (
    <ReactPaginate
      previousClassName="text-[#C4FF48] hover:text-white transition-colors block px-[10px]"
      nextClassName="text-[#C4FF48] hover:text-white transition-colors block px-[10px]"
      activeClassName="border rounded-[8px] border-[#C4FF48] bg-[#C4FF4820] text-[#C4FF48]"
      pageClassName="text-[#757575] hover:text-white transition-colors cursor-pointer"
      containerClassName="flex py-[20px] bg-[#141414] mx-[20px] items-center justify-center text-sm font-medium gap-2"
      pageLinkClassName="px-[10px] py-[5px] block"
      breakLabel="..."
      nextLabel="›"
      previousLabel="‹"
      onPageChange={onPageChange}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      breakClassName="text-[#C4FF48] px-[10px]"
      activeLinkClassName="text-[#C4FF48]"
      disabledClassName="opacity-50 cursor-not-allowed"
      forcePage={currentPage}
    />
  );
};

export default Pagination;