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
        voucherNo: string;
        customerId: string;
        itemId: string;
        qty: number;
        rate: number;
    }) => void;
}

export default function SalesForm({ customers, stockItems, onCreateSales }: SalesFormProps) {

    const [voucherNo, setVoucherNo] = useState("");
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
            voucherNo,
            customerId,
            itemId,
            qty,
            rate,
        });
        setVoucherNo("");
        setQty(1);
        setRate(0);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
                Sales Voucher
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Voucher Number" value={voucherNo} onChange={(e) => setVoucherNo(e.target.value)} className="border rounded-lg p-3" required />
                <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} className="border rounded-lg p-3">
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                <select value={itemId} onChange={(e) => setItemId(e.target.value)} className="border rounded-lg p-3">
                    {stockItems.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <input type="number" placeholder="Quantity" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="border rounded-lg p-3" />
                <input type="number" placeholder="Rate" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="border rounded-lg p-3" />
            </div>
            <button type="submit" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Save Sales
            </button>
        </form>
    );
}