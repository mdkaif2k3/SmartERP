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
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
                Suppliers
            </h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3">Name</th>
                        <th className="text-left py-3">Mobile</th>
                        <th className="text-left py-3">Address</th>
                        <th className="text-center py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier.id} className="border-b">
                            <td className="py-4">
                                {supplier.name}
                            </td>
                            <td>
                                {supplier.mobile || "-"}
                            </td>
                            <td>
                                {supplier.address || "-"}
                            </td>
                            <td className="text-center space-x-2">
                                <button onClick={() => onEditSupplier(supplier)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Edit
                                </button>
                                <button onClick={() => onDeleteSupplier(supplier.id)}className="bg-red-600 text-white px-3 py-1 rounded">
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