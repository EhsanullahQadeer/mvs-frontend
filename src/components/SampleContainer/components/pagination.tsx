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
      previousClassName="text-[#676767] block"
      nextClassName="text-[#d9d9d9] block"
      activeClassName="border px-[10px] py-[5px] ml-[8px] rounded-[8px] border-[#C4FF48] bg-[#C4FF4840] text-white"
      pageClassName="px-[10px] py-[5px] ml-[8px] text-[#757575]"
      containerClassName="flex py-[20px] bg-[#141414] mx-[20px] items-center justify-center"
      breakLabel="..."
      nextLabel=" >"
      onPageChange={onPageChange}
      pageCount={pageCount}
      previousLabel="< "
      renderOnZeroPageCount={null}
      breakClassName="text-white"
      activeLinkClassName="text-white"
      forcePage={currentPage} // Optional: Force page to keep track of current page externally
    />
  );
};

export default Pagination;