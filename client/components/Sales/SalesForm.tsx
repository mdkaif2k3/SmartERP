"use client";

import { useEffect, useState } from "react";

interface Customer {
    id: string;
    name: string;
}

interface StockItem {
    id: string;
    name: string;
}

interface SalesFormProps {
    customers: Customer[];
    stockItems: StockItem[];

    onCreateSales: (sales: {
        customerId: string;
        itemId: string;
        qty: number;
        rate: number;
    }) => void;
}

export default function SalesForm({ customers, stockItems, onCreateSales }: SalesFormProps) {

    const [customerId, setCustomerId] = useState("");
    const [itemId, setItemId] = useState("");
    const [qty, setQty] = useState(1);
    const [rate, setRate] = useState(0);

    useEffect(() => {
        if (customers.length > 0) {
            setCustomerId(customers[0].id);
        }
    }, [customers]);

    useEffect(() => {
        if (stockItems.length > 0) {
            setItemId(stockItems[0].id);
        }
    }, [stockItems]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateSales({
            customerId,
            itemId,
            qty,
            rate,
        });
        setQty(1);
        setRate(0);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-slate-800">
                    Sales Voucher
                </h2>
                <p className="text-slate-500 mt-2">
                    Add Sales Voucher Details
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Customer <span className="text-red-500">*</span>
                    </label>
                    <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Item <span className="text-red-500">*</span>
                    </label>
                    <select value={itemId} onChange={(e) => setItemId(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                        {stockItems.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Quantity <span className="text-red-500">*</span>
                    </label>
                    <input type="number" placeholder="Quantity" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Rate <span className="text-red-500">*</span>
                    </label>
                    <input type="number" placeholder="Rate" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
                </div>   
            </div>
            <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                Save Sales
            </button>
        </form>
    );
}