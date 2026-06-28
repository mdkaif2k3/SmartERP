interface Customer {
    id: string;
    name: string;
    mobile?: string;
    address?: string;
}

interface CustomerTableProps {
    customers: Customer[];
}

export default function CustomerTable({ customers, }: CustomerTableProps) {

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
                Customers
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
                    {customers.map((customer) => (
                        <tr key={customer.id} className="border-b">
                            <td className="py-4">
                                {customer.name}
                            </td>
                            <td>
                                {customer.mobile || "-"}
                            </td>
                            <td>
                                {customer.address || "-"}
                            </td>
                            <td className="text-center space-x-2">
                                <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                                    Edit
                                </button>
                                <button className="bg-red-600 text-white px-3 py-1 rounded">
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