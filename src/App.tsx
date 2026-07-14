import { useMemo, useState } from "react";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { mockOrders, type Order, orderStatuses, tableColumns } from "./table-config.tsx";
import Table from "./table.tsx";

function App() {
    const columns = useMemo(() => tableColumns, [])
    const [data] = useState<Order[]>(() => mockOrders)

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // getGroupedRowModel: getGroupedRowModel(),
        renderFallbackValue: '–',
        initialState: {
            pagination: {
                pageSize: 15,
            },

            grouping: ['status'],
            expanded: { 'order': false }
        },
        defaultColumn: {
            size: 50,
            minSize: 20,
            maxSize: 200,
        },

    });

    function handleDeliveredFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        table.getColumn('isDelivered')?.setFilterValue(e.target.checked ? true : undefined)
    }

    function handleIdFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        table.getColumn('id')?.setFilterValue(e.target.value || undefined)
    }

    function handleDateFromChange(e: React.ChangeEvent<HTMLInputElement>) {
        const column = table.getColumn('date')
        const [, to] = (column?.getFilterValue() as [string, string]) ?? []
        column?.setFilterValue([e.target.value || undefined, to])
    }

    function handleDateToChange(e: React.ChangeEvent<HTMLInputElement>) {
        const column = table.getColumn('date')
        const [from] = (column?.getFilterValue() as [string, string]) ?? []
        column?.setFilterValue([from, e.target.value || undefined])
    }

    function handleStatusFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        table.getColumn('status')?.setFilterValue(e.target.value || undefined)
    }


    return (
        <div className='w-full min-h-screen flex'>
            <aside className="w-full justify-center lg:w-1/4 flex flex-col p-4 bg-[#313e81] gap-4">
                <input
                    type='text'
                    placeholder='Search by id'
                    className='border rounded px-4 py-2 bg-white border-gray-300'
                    onChange={handleIdFilterChange}
                />

                <input
                    type='date'
                    className='border rounded px-4 py-2 bg-white border-gray-300'
                    onChange={handleDateFromChange}
                />

                <input
                    type='date'
                    className='border rounded px-4 py-2 bg-white border-gray-300'
                    onChange={handleDateToChange}
                />

                <select
                    className='border rounded px-4 py-2 bg-white border-gray-300'
                    defaultValue=''
                    onChange={handleStatusFilterChange}
                >
                    <option value=''>All statuses</option>
                    {orderStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                <input
                    type='checkbox'
                    className='size-8'
                    onChange={handleDeliveredFilterChange}
                />
            </aside>

            <main className='w-full min-h-screen flex-col justify-between gap-4 flex'>
                <Table table={table} />
            </main>
        </div>
    )
}

export default App
