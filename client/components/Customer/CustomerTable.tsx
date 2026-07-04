interface Customer {
    id: string;
    name: string;
    mobile?: string;
    address?: string;
}

interface CustomerTableProps {
    customers: Customer[];
    onDeleteCustomer: (id: string) => void;
    onEditCustomer: (customer: Customer) => void;
}

export default function CustomerTable({ customers, onDeleteCustomer, onEditCustomer }: CustomerTableProps) {

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6">
            <div className="py-2 border-b border-slate-200">
                <h2 className="text-3xl font-bold text-slate-800">
                    Customers
                </h2>
                <p className="text-slate-500 mt-2">
                    View and manage all customers.
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
                    {customers.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-12 text-center text-slate-500">
                                No customers found.
                            </td>
                        </tr>
                    ) : (
                    customers.map((customer) => (
                        <tr key={customer.id} className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-blue-50 transition">
                            <td className="px-6 py-4 text-slate-700">
                                {customer.name}
                            </td>
                            <td className="px-6 py-4 text-slate-700">
                                {customer.mobile || "-"}
                            </td>
                            <td className="px-6 py-4 text-slate-700">
                                {customer.address || "-"}
                            </td>
                            <td className="space-x-2">
                                <button onClick={() => onEditCustomer(customer)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">
                                    Edit
                                </button>
                                <button onClick={() => onDeleteCustomer(customer.id)}className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
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