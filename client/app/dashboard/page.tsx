"use client";

import { getCompanyId } from "@/utils/company";

export default function DashboardPage() {
    const companyId = getCompanyId();
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>
                <p className="mt-6 text-gray-600">
                    Active Company ID
                </p>
                <p className="font-mono mt-2 break-all">
                    {companyId}
                </p>
            </div>
        </main>
    );
}