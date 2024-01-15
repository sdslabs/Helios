import { Table as T, Thead, Tbody, Tr, Th, Td, Button, Flex } from '@chakra-ui/react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { usePaginationRange } from '@createQuiz/hooks/usePaginationRange'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'
import { tab } from '@testing-library/user-event/dist/tab'

const Table = ({ data, columns, showPagination = true }: any) => {
  const [columnFilters, setColumnFilters] = useState()
  const [sortStatus, setSortStatus] = useCheckQuizStore((state) => [
    state.sortStatus,
    state.setSortStatus,
  ])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    sortingFns: {
      string: (a: any, b: any) => a.localeCompare(b),
      number: (a: any, b: any) => a - b,
    },
    onColumnFiltersChange: setColumnFilters as any,
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const filter = (column: any, table: any) => {
    if (sortStatus === 'ascending') {
      table.setSortBy([{ id: column.id, desc: false }])
    } else {
      table.setSortBy([{ id: column.id, desc: true }])
    }
  }
  

  useEffect(() => {
    if (columnFilters) {
      filter(columnFilters, table)
    }
  }, [sortStatus, columnFilters])

  const changePage = (pageNumber: any, table: any) => {
    table.setPageIndex(pageNumber - 1)
  }

  const getPagination = (pages: any, current: any, table: any) => {
    const paginationRange = usePaginationRange({ currentPage: current, totalPageCount: pages })
    const pagesList: any = []

    paginationRange?.map((num) => {
      if (num != '...') {
        pagesList.push(
          <Button
            key={num}
            color={num === current ? '#191919' : '#575757'}
            border='none'
            bg='white'
            onClick={() => changePage(num, table)}
          >
            {num}
          </Button>,
        )
      } else {
        pagesList.push(
          <Button key={num} disabled color='#575757' border='none' bg='white'>
            ...
          </Button>,
        )
      }
    })
    return <Flex>{pagesList}</Flex>
  }

  return (
    <>
      <T>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  <Flex justifyContent='space-between'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, index) => (
            <Tr key={row.id} bgColor={index % 2 == 0 ? '#EBE7F2' : ''}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                )
              })}
            </Tr>
          ))}
        </Tbody>
      </T>
      {showPagination ? (
        <Flex>
          <Button
            color='#604195'
            border='none'
            bg='white'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div>
            {getPagination(table.getPageCount(), table.getState().pagination.pageIndex + 1, table)}
          </div>
          <Button
            color='#604195'
            border='none'
            bg='white'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </Flex>
      ) : null}
    </>
  )
}

export default Table
