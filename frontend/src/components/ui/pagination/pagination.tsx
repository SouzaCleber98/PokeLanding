'use client';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import PaginationButton from './pagination-button';
import { useEffect, useState } from 'react';
import useGenerateSearchParams from '@/hooks/useGenerateSearchParams';

type PaginationProps = {
  items: number;
  itemsPerPageLimit: number;
  currentPageParam: number | undefined;
};

export default function Pagination({
  items,
  currentPageParam,
  itemsPerPageLimit,
}: PaginationProps) {
  const setSearchParams = useGenerateSearchParams();
  const [currentPage, setCurrentPage] = useState(currentPageParam || 1);
  const totalPages = Math.ceil(items / itemsPerPageLimit);
  const pageNumbers: number[] = [];

  const halfItemsPerPage = Math.floor(itemsPerPageLimit / 2);
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  useEffect(() => {
    setSearchParams('currentPage', currentPage);
  }, [currentPage]);

  if (currentPage - halfItemsPerPage <= 0) {
    endPage = Math.min(
      totalPages,
      endPage + (halfItemsPerPage - currentPage + 1)
    );
  }

  if (totalPages - currentPage < halfItemsPerPage) {
    startPage = Math.max(
      1,
      startPage - (halfItemsPerPage - (totalPages - currentPage))
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='flex justify-center gap-2 items-center select-none'>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </PaginationButton>

      {startPage > 1 && (
        <PaginationButton onClick={() => setCurrentPage(1)}>
          {1}
        </PaginationButton>
      )}
      {startPage > 2 && (
        <span className='px-1 text-sm tracking-widest text-red-400'>...</span>
      )}

      {pageNumbers.map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          className={cn(
            currentPage === pageNumber &&
              'bg-red-600 text-white border-red-700 hover:bg-red-700'
          )}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className='px-1 text-sm tracking-widest text-red-400'>
              ...
            </span>
          )}
          <PaginationButton onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationButton>
        </>
      )}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </PaginationButton>
    </nav>
  );
}
