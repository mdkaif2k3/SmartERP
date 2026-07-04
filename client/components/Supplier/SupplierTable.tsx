interface Supplier {
    id: string;
    name: string;
    mobile?: string;
    address?: string;
}

interface SupplierTableProps {
    suppliers: Supplier[];
    onDeleteSupplier: (id: string) => void;
    onEditSupplier: (supplier: Supplier) => void;
}

export default function SupplierTable({ suppliers, onDeleteSupplier, onEditSupplier }: SupplierTableProps) {

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6">
            <div className="py-2 border-b border-slate-200">
                <h2 className="text-3xl font-bold text-slate-800">
                    Suppliers
                </h2>
                <p className="text-slate-500 mt-2">
                    View and manage all suppliers.
                </p>
            </div>
            <table className="w-full">
                <thead className="bg-slate-100">
                    <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Mobile</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Address</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-12 text-center text-slate-500">
                                No suppliers found.
                            </td>
                        </tr>
                    ) : (
                    suppliers.map((supplier) => (
                        <tr key={supplier.id} className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-blue-50 transition">
                            <td className="px-6 py-4 text-slate-700">
                                {supplier.name}
                            </td>
                            <td className="px-6 py-4 text-slate-700">
                                {supplier.mobile || "-"}
                            </td>
                            <td className="px-6 py-4 text-slate-700">
                                {supplier.address || "-"}
                            </td>
                            <td className="space-x-2">
                                <button onClick={() => onEditSupplier(supplier)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">
                                    Edit
                                </button>
                                <button onClick={() => onDeleteSupplier(supplier.id)}className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
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