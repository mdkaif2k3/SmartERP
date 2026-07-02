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
    unit: Unit;
}

interface StockTableProps {
    stockItems: StockItem[];
    onEditStockItem: (stockItem: StockItem) => void;
    onDeleteStockItem: (id: string) => void;
}

export default function StockTable({ stockItems, onEditStockItem, onDeleteStockItem, }: StockTableProps) {

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
                Stock Items
            </h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3">Name</th>
                        <th className="text-left py-3">SKU</th>
                        <th className="text-left py-3">Purchase</th>
                        <th className="text-left py-3">Sale</th>
                        <th className="text-left py-3">GST</th>
                        <th className="text-left py-3">Qty</th>
                        <th className="text-left py-3">Unit</th>
                        <th className="text-center py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockItems.map((stockItem) => (
                        <tr key={stockItem.id} className="border-b">
                            <td>{stockItem.name}</td>
                            <td>{stockItem.sku}</td>
                            <td>{stockItem.purchasePrice}</td>
                            <td>{stockItem.salePrice}</td>
                            <td>{stockItem.gstPercentage}%</td>
                            <td>{stockItem.quantity}</td>
                            <td>
                                {stockItem.unit.name} ({stockItem.unit.symbol})
                            </td>
                            <td className="space-x-2">
                                <button onClick={() => onEditStockItem(stockItem)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                    Edit
                                </button>
                                <button onClick={() => onDeleteStockItem(stockItem.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}