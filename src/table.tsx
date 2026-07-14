import { flexRender, type Table as TableType } from "@tanstack/react-table"

export default function Table<TData>({ table }: { table: TableType<TData> }) {
    const canPreviousPage = table.getCanPreviousPage()
    const canNextPage = table.getCanNextPage()

    function handlePreviousPage() {
        table.previousPage()
    }

    function handleNextPage() {
        table.nextPage()
    }

    return (
        <>
            <table className='bg-white w-full'>
                <thead className='sticky bg-white top-0'>
                    {table.getHeaderGroups().map(headerGroup => {
                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th role="button" style={{ width: header.getSize() }}
                                        onClick={header.column.getCanSort() ? () => header.column.toggleSorting() : undefined}
                                        key={header.id} colSpan={header.colSpan}
                                        className={header.column.depth === 1 ? 'bg-black/10 cursor-pointer' : 'bg-white'}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        )
                    })}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr className='h-16' key={row.id} >
                            {row.getVisibleCells().map(cell => (
                                <td className='p-4 border-r border-b' key={cell.id}>
                                    <div className='max-h-16 overflow-y-auto'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label='Pagination'>
                <div className='flex justify-center gap-4 w-full items-center p-4'>
                    <button aria-label='Previous page' className="cursor-pointer bg-black/20 rounded-lg p-5" disabled={!canPreviousPage} onClick={handlePreviousPage}>{'<'}</button>
                    <button aria-label='Next page' className="cursor-pointer bg-black/20 rounded-lg p-5" disabled={!canNextPage} onClick={handleNextPage}>{'>'}</button>
                </div>
            </nav>
        </>

    )
}