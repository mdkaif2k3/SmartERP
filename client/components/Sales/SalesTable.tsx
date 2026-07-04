interface SalesItem {
    id: string;
    qty: number;
    rate: number;
    amount: number;
    item: {
        id: string;
        name: string;
    };
}

interface SalesVoucher {
    id: string;
    voucherNo: string;
    totalAmount: number;

    customer: {
        id: string;
        name: string;
    };

    items: SalesItem[];
}

interface SalesTableProps {
    salesVouchers: SalesVoucher[];
}

export default function SalesTable({ salesVouchers }: SalesTableProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6">
            <div className="py-2 border-b border-slate-200">
                <h2 className="text-3xl font-bold text-slate-800">
                    Sales Voucher
                </h2>
                <p className="text-slate-500 mt-2">
                    View all sales vouchers.
                </p>
            </div>
            <table className="w-full">
                <thead className="bg-slate-100">
                    <tr className="border-b">
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Voucher</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Supplier</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Item</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Qty</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Rate</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-600">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {salesVouchers.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="py-12 text-center text-slate-500">
                                No Sales recorded.
                            </td>
                        </tr>
                    ) : (
                    salesVouchers.map((voucher) => {
                        const item = voucher.items[0];
                        return (
                            <tr key={voucher.id} className="border-b border-slate-200 odd:bg-white even:bg-slate-50 hover:bg-blue-50 transition">
                                <td className="px-6 py-4 text-slate-700">{voucher.voucherNo}</td>
                                <td className="px-6 py-4 text-slate-700">{voucher.customer.name}</td>
                                <td className="px-6 py-4 text-slate-700">{item.item.name}</td>
                                <td className="px-6 py-4 text-slate-700">{item.qty}</td>
                                <td className="px-6 py-4 text-slate-700">{item.rate}</td>
                                <td className="px-6 py-4 text-slate-700">{voucher.totalAmount}</td>
                            </tr>
                        );
                    }))}
                </tbody>
            </table>
        </div>
    );
}