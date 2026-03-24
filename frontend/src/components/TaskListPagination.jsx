import React from 'react'
import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
const TaskListPagination = ({ handleNext, handlePrev, handlePageChange, page, totalPage }) => {
  const generatePages = () => {
    const pages = [];
    if (totalPage < 4) {
      //hiện toàn bộ
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i)
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, "...", totalPage)
      } else if (page >= totalPage - 1) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage)
      } else {
        pages.push(1, "...", page, "...", totalPage)
      }
    }
    return pages
  }
  const pagesToShow = generatePages();
  return (
    <div className='flex justify-center mt-4'>
      <Pagination>
        <PaginationContent>
          {/* Trước */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                page === 1 && "pointer-events-none opacity-50"
              )} />
          </PaginationItem>
          {pagesToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? <PaginationEllipsis /> : (
                <PaginationLink isActive={p === page}
                  onClick={() => {
                    if (p !== page) handlePageChange(p)
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>)}
            </PaginationItem>
          ))}
          {/* Sau */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPage ? undefined : handleNext}
              className={cn("cursor-pointer", page === totalPage && "pointer-events-none opacity-50")} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TaskListPagination