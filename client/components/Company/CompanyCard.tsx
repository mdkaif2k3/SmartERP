interface Company {
    id: string;
    name: string;
    financialYear: string;
    state: string | null;
}

interface CompanyCardProps {
    company: Company;
    onSelect: (company: Company) => void;
}

export default function CompanyCard({
    company,
    onSelect,
}: CompanyCardProps) {

    return (
        <div className="rounded-xl bg-white shadow-md p-6">

            <h2 className="text-xl font-semibold">
                {company.name}
            </h2>

            <p className="mt-2 text-gray-600">
                Financial Year: {company.financialYear}
            </p>

            <p className="text-gray-600">
                State: {company.state ?? "N/A"}
            </p>

            <button onClick={() => onSelect(company)} className="mt-6 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
                Select Company
            </button>

        </div>
    );
}