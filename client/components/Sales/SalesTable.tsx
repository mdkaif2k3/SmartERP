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
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
                Sales Vouchers
            </h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3">
                            Voucher
                        </th>
                        <th className="text-left py-3">
                            Supplier
                        </th>
                        <th className="text-left py-3">
                            Item
                        </th>
                        <th className="text-left py-3">
                            Qty
                        </th>
                        <th className="text-left py-3">
                            Rate
                        </th>
                        <th className="text-left py-3">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {salesVouchers.map((voucher) => {
                        const item = voucher.items[0];
                        return (
                            <tr key={voucher.id} className="border-b">
                                <td>{voucher.voucherNo}</td>
                                <td>{voucher.customer.name}</td>
                                <td>{item.item.name}</td>
                                <td>{item.qty}</td>
                                <td>{item.rate}</td>
                                <td>{voucher.totalAmount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}