"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),transparent_35%),linear-gradient(to_bottom_right,#f8fbff,#eef6ff,#e7f2ff)]">
                {children}
            </main>
        </div>
    );
}