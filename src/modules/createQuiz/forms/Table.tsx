import { Table as T, Thead, Tbody, Tr, Th, Td, Button, Flex } from '@chakra-ui/react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { usePaginationRange } from '@createQuiz/hooks/usePaginationRange'

const Filter = ({ column, table,setFilter }: any) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  )

  return (
    <>
      <select
        value={column.filterValue}
        onChange={(e) => {
          if (e.target.value !== 'none') {
            column.setFilterValue(e.target.value)
          } else {
            column.setFilterValue(null)
          }
          setFilter(e.target.value);
        }}
      >
        <option value='none'>none</option>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  )
}

const Table = ({ data, columns }: any) => {
  const [columnFilters, setColumnFilters] = useState([])
  const [_,setFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters as any, //!
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const changePage = (pageNumber:any,table:any)=>{
    table.setPageIndex(pageNumber-1)
  }

  const getPagination = (pages: any, current: any,table:any) => {
    const paginationRange = usePaginationRange({ currentPage: current, totalPageCount: pages })
    const pagesList: any = [];

    paginationRange?.map((num) => {
      if (num != '...') {
        pagesList.push(<Button color={num===current?'#191919':'#575757'} border='none' bg="white" onClick={()=>changePage(num,table)}>{num}</Button>)
      } else {
        pagesList.push(<Button disabled color='#575757' border='none' bg="white">...</Button>)
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
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter setFilter={setFilter} column={header.column} table={table} />
                      </div>
                    ) : null}
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
      <Flex>
        <Button color='#604195' border='none' bg="white" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <div>{getPagination(table.getPageCount(), table.getState().pagination.pageIndex + 1,table)}</div>
        <Button color='#604195' border='none' bg="white" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </Flex>
    </>
  )
}

export default Table
