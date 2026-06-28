"use client";

import { getCompanyName } from "@/utils/company";

export default function DashboardHeader() {
    const companyName = getCompanyName();
    return (
        <div className="mb-10">
            <h1 className="text-4xl font-bold">
                SmartERP Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
                Welcome back!
            </p>
            <div className="mt-6 rounded-xl bg-white shadow-md p-5">
                <p className="text-sm text-gray-500">
                    Active Company
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                    {companyName ?? "No Company Selected"}
                </h2>
            </div>
        </div>
    );
}