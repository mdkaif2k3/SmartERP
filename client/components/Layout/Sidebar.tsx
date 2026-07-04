"use client";

import { LayoutDashboard, Building2, Users, Truck, Package, ShoppingCart, Receipt, BarChart3, LogOut } from "lucide-react";

import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    return (
        <aside className="w-72 h-screen bg-white shadow-xl p-6 flex flex-col justify-between sticky top-0">
            <div>
                <h1 className="text-3xl font-bold text-blue-600 mb-8">
                    sERPy
                </h1>
                <div className="space-y-2">
                    <SidebarItem title="Dashboard" href="/dashboard" icon={LayoutDashboard} />
                    <SidebarItem title="Customers" href="/customers" icon={Users} />
                    <SidebarItem title="Suppliers" href="/suppliers" icon={Truck} />
                    <SidebarItem title="Stock" href="/stock" icon={Package} />
                    <SidebarItem title="Purchases" href="/purchase" icon={ShoppingCart} />
                    <SidebarItem title="Sales" href="/sales" icon={Receipt} />
                    <SidebarItem title="Reports" href="/reports" icon={BarChart3} />
                </div>
            </div>
            <SidebarItem title="Logout" href="/" icon={LogOut} />
        </aside>
    );
}