interface PurchaseItem {
    id: string;
    qty: number;
    rate: number;
    amount: number;
    item: {
        id: string;
        name: string;
    };
}

interface PurchaseVoucher {
    id: string;
    voucherNo: string;
    totalAmount: number;

    supplier: {
        id: string;
        name: string;
    };

    items: PurchaseItem[];
}

interface PurchaseTableProps {
    purchaseVouchers: PurchaseVoucher[];
}

export default function PurchaseTable({ purchaseVouchers }: PurchaseTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
                Purchase Vouchers
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
                    {purchaseVouchers.map((voucher) => {
                        const item = voucher.items[0];
                        return (
                            <tr key={voucher.id} className="border-b">
                                <td>{voucher.voucherNo}</td>
                                <td>{voucher.supplier.name}</td>
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