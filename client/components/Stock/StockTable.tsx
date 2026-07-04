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
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6">
            <div className="py-2 border-b border-slate-200">
                <h2 className="text-3xl font-bold text-slate-800">
                    Stock Items
                </h2>
                <p className="text-slate-500 mt-2">
                    View and manage all stock items.
                </p>
            </div>
            <table className="w-full">
                <thead className="bg-slate-100">
                    <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">SKU</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Purchase</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Sale</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">GST</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Qty</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Unit</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockItems.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-12 text-center text-slate-500">
                                No Stock Items added.
                            </td>
                        </tr>
                    ) : (
                    stockItems.map((stockItem) => (
                        <tr key={stockItem.id} className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-blue-50 transition">
                            <td className="px-6 py-4 text-slate-700">{stockItem.name}</td>
                            <td className="px-6 py-4 text-slate-700">{stockItem.sku}</td>
                            <td className="px-6 py-4 text-slate-700">{stockItem.purchasePrice}</td>
                            <td className="px-6 py-4 text-slate-700">{stockItem.salePrice}</td>
                            <td className="px-6 py-4 text-slate-700">{stockItem.gstPercentage}%</td>
                            <td className="px-6 py-4 text-slate-700">{stockItem.quantity}</td>
                            <td>
                                {stockItem.unit.name} ({stockItem.unit.symbol})
                            </td>
                            <td className="space-x-2">
                                <button onClick={() => onEditStockItem(stockItem)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">
                                    Edit
                                </button>
                                <button onClick={() => onDeleteStockItem(stockItem.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    );
}