import { Table as T, Thead, Tbody, Tr, Th, Td, chakra, Button, Flex } from '@chakra-ui/react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { useState } from 'react'

const Table = ({ data, columns }: any) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const getPagination = (pages : any,current:any)=>{
    const pagesList = []
    for(let i=1;i<=pages;i++){
      const push = current===i?<Button>{i}</Button>:<div>{i}</div>
      pagesList.push(push)
    }
    return(
      <Flex gap='5px'>
      {pagesList}
      </Flex>
    )
  }

  return (
    <>
      <T>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {console.log(cell.column.columnDef.cell, cell.getContext());
              return(
                <Td key={cell.id} bgColor={cell.row.index%2==0?'#EBE7F2':''} >{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              )})}
            </Tr>
          ))}
        </Tbody>
      </T>
      <Flex>

      <Button 

      onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        Previous
      </Button>
      <div>
          {getPagination(table.getPageCount(),table.getState().pagination.pageIndex + 1)}
      </div>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Next
      </Button>
      </Flex>
    </>
  )
}

export default Table
