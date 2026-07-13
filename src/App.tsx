import {useMemo, useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {mockOrders, type Order, tableColumns} from "./table-config.tsx";

function App() {
    const columns = useMemo(() => tableColumns, [])
    const [data] = useState<Order[]>(() => mockOrders)

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        renderFallbackValue: '–'
    });

    return (
        <main className='w-full min-h-screen bg-black justify-center flex'>
            <div className='my-20'>
                <table className='bg-white w-full lg:max-w-4xl overflow-auto rounded-2xl'>
                    <thead>
                    {table.getHeaderGroups().map(headerGroup => {
                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (

                                    <th key={header.id} colSpan={header.colSpan}
                                        className={header.column.depth === 1 ? 'p-4 bg-black/10' : ''}>
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='p-4'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default App
