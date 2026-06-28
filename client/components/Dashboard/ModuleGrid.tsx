import DashboardCard from "./DashboardCard";

const modules = [
    {
        title: "Customers",
        description: "Manage customer information",
        route: "/customers",
    },
    {
        title: "Suppliers",
        description: "Manage supplier information",
        route: "/suppliers",
    },
    {
        title: "Stock Items",
        description: "Manage inventory",
        route: "/stock",
    },
    {
        title: "Purchase",
        description: "Manage purchase vouchers",
        route: "/purchase",
    },
    {
        title: "Sales",
        description: "Manage sales vouchers",
        route: "/sales",
    },
    {
        title: "Reports",
        description: "View business reports",
        route: "/reports",
    },
];

export default function ModuleGrid() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
                <DashboardCard key={module.title} title={module.title} description={module.description} route={module.route} />
            ))}
        </div>
    );
}