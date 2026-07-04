"use client";

import { useEffect, useState } from "react";

interface Supplier {
    id: string;
    name: string;
}

interface StockItem {
    id: string;
    name: string;
}

interface PurchaseFormProps {
    suppliers: Supplier[];
    stockItems: StockItem[];

    onCreatePurchase: (purchase: {
        supplierId: string;
        itemId: string;
        qty: number;
        rate: number;
    }) => void;
}

export default function PurchaseForm({ suppliers, stockItems, onCreatePurchase }: PurchaseFormProps) {

    const [supplierId, setSupplierId] = useState("");
    const [itemId, setItemId] = useState("");
    const [qty, setQty] = useState(1);
    const [rate, setRate] = useState(0);

    useEffect(() => {
        if (suppliers.length > 0) {
            setSupplierId(suppliers[0].id);
        }
    }, [suppliers]);

    useEffect(() => {
        if (stockItems.length > 0) {
            setItemId(stockItems[0].id);
        }
    }, [stockItems]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreatePurchase({
            supplierId,
            itemId,
            qty,
            rate,
        });
        setQty(1);
        setRate(0);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
                Purchase Voucher
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <select value={supplierId} onChange={(e) => setSupplierId(e.target.value)} className="border rounded-lg p-3">
                    {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
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
                Save Purchase
            </button>
        </form>
    );
}