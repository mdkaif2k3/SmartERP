"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "@/components/Layout/AppLayout";
import { getReport } from "@/services/reportService";

type ReportType = "purchase" | "sales" | "inventory";

export default function ReportsPage() {
    const [reportType, setReportType] = useState<ReportType>("purchase");
    const [reportData, setReportData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetchReport(reportType);
    }, [reportType]);
    const fetchReport = async (type: ReportType) => {
        setReportData([]);
        setTotal(0);
        try {
            const response = await getReport(type);
            console.log(response.data.report);
            setReportData(response.data.report);
            setTotal(response.data.total);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    return (
        <AppLayout>
            <h1 className="text-4xl font-bold mb-8">
                Reports
            </h1>
            <div className="flex gap-4 mb-8">
                <TabButton active={reportType === "purchase"} onClick={() => setReportType("purchase")}>
                    Purchase
                </TabButton>
                <TabButton active={reportType === "sales"} onClick={() => setReportType("sales")}>
                    Sales
                </TabButton>
                <TabButton active={reportType === "inventory"} onClick={() => setReportType("inventory")}>
                    Inventory
                </TabButton>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        {reportType === "purchase" && (
                            <tr>
                                <th className="p-4 text-left">
                                    Voucher
                                </th>
                                <th className="p-4 text-left">
                                    Supplier
                                </th>
                                <th className="p-4 text-left">
                                    Date
                                </th>
                                <th className="p-4 text-right">
                                    Amount
                                </th>
                            </tr>
                        )}
                        {reportType === "sales" && (
                            <tr>
                                <th className="p-4 text-left">
                                    Voucher
                                </th>
                                <th className="p-4 text-left">
                                    Customer
                                </th>
                                <th className="p-4 text-left">
                                    Date
                                </th>
                                <th className="p-4 text-right">
                                    Amount
                                </th>
                            </tr>
                        )}
                        {reportType === "inventory" && (
                            <tr>
                                <th className="p-4 text-left">
                                    Item
                                </th>
                                <th className="p-4 text-right">
                                    Quantity
                                </th>
                                <th className="p-4 text-right">
                                    Purchase Price
                                </th>
                                <th className="p-4 text-right">
                                    Value
                                </th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {reportData.map((row: any) => (
                            <tr key={row.id} className="border-t hover:bg-gray-50">
                                {reportType === "purchase" && (
                                    <>
                                        <td className="p-4">
                                            {row.voucherNo}
                                        </td>
                                        <td className="p-4">
                                            {row.supplier?.name}
                                        </td>
                                        <td className="p-4">
                                            {new Date(
                                                row.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            ₹ {row.totalAmount}
                                        </td>
                                    </>
                                )}
                                {reportType === "sales" && (
                                    <>
                                        <td className="p-4">
                                            {row.voucherNo}
                                        </td>
                                        <td className="p-4">
                                            {row.customer?.name}
                                        </td>
                                        <td className="p-4">
                                            {new Date(row.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            ₹ {row.totalAmount}
                                        </td>
                                    </>
                                )}
                                {reportType === "inventory" && (
                                    <>
                                        <td className="p-4">
                                            {row.name}
                                        </td>
                                        <td className="p-4 text-right">
                                            {row.quantity} {row.unit?.name}
                                        </td>
                                        <td className="p-4 text-right">
                                            ₹ {row.purchasePrice}
                                        </td>
                                        <td className="p-4 text-right">
                                            ₹ {
                                                Number(row.quantity) *
                                                Number(row.purchasePrice)
                                            }
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-8 text-right">
                <h2 className="text-2xl font-bold">
                    Total : ₹ {total}
                </h2>
            </div>
        </AppLayout>
    );
}

interface TabButtonProps {
    children: React.ReactNode;
    active: boolean;
    onClick: () => void;
}

function TabButton({ children, active, onClick }: TabButtonProps) {
    return (
        <button onClick={onClick} className={`px-6 py-3 rounded-xl transition font-semibold ${active ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
            {children}
        </button>
    );
}