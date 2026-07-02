"use client";

import { useEffect, useState } from "react";

interface Unit {
    id: string;
    name: string;
    symbol: string;
}

interface StockItem {
    id: string;
    name: string;
    sku: string;
    purchasePrice: number;
    salePrice: number;
    gstPercentage: number;
    quantity: number;
    unitId: string;
}

interface StockFormProps {
    units: Unit[];

    editingStockItem: StockItem | null;

    onAddStockItem: (stock: {
        name: string;
        sku: string;
        purchasePrice: number;
        salePrice: number;
        gstPercentage: number;
        quantity: number;
        unitId: string;
    }) => void;

    onUpdateStockItem: (
        id: string,
        stock: {
            name: string;
            sku: string;
            purchasePrice: number;
            salePrice: number;
            gstPercentage: number;
            quantity: number;
            unitId: string;
        }
    ) => void;
    onCancelEdit: () => void;
}

export default function StockForm({ units, editingStockItem, onAddStockItem, onUpdateStockItem, onCancelEdit, }: StockFormProps) {

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [gstPercentage, setGstPercentage] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [unitId, setUnitId] = useState("");

    useEffect(() => {
        if (editingStockItem) {
            setName(editingStockItem.name);
            setSku(editingStockItem.sku);
            setPurchasePrice(editingStockItem.purchasePrice);
            setSalePrice(editingStockItem.salePrice);
            setGstPercentage(editingStockItem.gstPercentage);
            setQuantity(editingStockItem.quantity);
            setUnitId(editingStockItem.unitId);
        } else {
            setName("");
            setSku("");
            setPurchasePrice(0);
            setSalePrice(0);
            setGstPercentage(0);
            setQuantity(0);
            if (units.length > 0) {
                setUnitId(units[0].id);
            }
        }
    }, [editingStockItem, units]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const stockData = {
            name,
            sku,
            purchasePrice,
            salePrice,
            gstPercentage,
            quantity,
            unitId,
        };
        if (editingStockItem) {
            onUpdateStockItem(
                editingStockItem.id,
                stockData
            );
        } else {
            onAddStockItem(stockData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
                {editingStockItem ? "Update Stock Item" : "Add Stock Item"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-lg p-3" required />
                <input type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} className="border rounded-lg p-3" required />
                <input type="number" placeholder="Purchase Price" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="border rounded-lg p-3" />
                <input type="number" placeholder="Sale Price" value={salePrice} onChange={(e) => setSalePrice(Number(e.target.value))} className="border rounded-lg p-3"/>
                <input type="number" placeholder="GST %" value={gstPercentage} onChange={(e) => setGstPercentage(Number(e.target.value))} className="border rounded-lg p-3"/>
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="border rounded-lg p-3"/>
                <select value={unitId} onChange={(e) => setUnitId(e.target.value)} className="border rounded-lg p-3">
                    {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.name} ({unit.symbol})
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-6 flex gap-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                {editingStockItem ? "Update Stock Item": "Add Stock Item"}
                </button>
                {editingStockItem && (
                    <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}