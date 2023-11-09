import { Table as T, Thead, Tbody, Tr, Th, Td, chakra, Button, Flex } from '@chakra-ui/react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  FilterFn,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table'
import { Select } from 'chakra-react-select'
import { useMemo, useState } from 'react'

const Filter = ({ column, table }: any) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  )

  return (
    <>
      {console.log(sortedUniqueValues)}
      <select
        value={column.filterValue}
        onChange={(e) => {
          if (e.target.value !== 'none') {
            column.setFilterValue(e.target.value)
            console.log(e.target.value)
          } else {
            column.setFilterValue(null)
          }
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
  })

  const getPagination = (pages: any, current: any) => {
    const pagesList = []
    for (let i = 1; i <= pages; i++) {
      const push = current === i ? <Button>{i}</Button> : <div>{i}</div>
      pagesList.push(push)
    }
    return <Flex gap='5px'>{pagesList}</Flex>
  }

  return (
    <>
      <T>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  <Flex justifyContent='space-between' >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
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
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <div>{getPagination(table.getPageCount(), table.getState().pagination.pageIndex + 1)}</div>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </Flex>
    </>
  )
}

export default Table
