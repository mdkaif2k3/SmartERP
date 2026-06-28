export const setCompany = (companyId: string, companyName: string) => {
    localStorage.setItem("companyId", companyId);
    localStorage.setItem("companyName", companyName);
};

export const getCompanyId = () => {
    return localStorage.getItem("companyId");
};

export const getCompanyName = () => {
    return localStorage.getItem("companyName");
};

export const removeCompany = () => {
    localStorage.removeItem("companyId");
    localStorage.removeItem("companyName");
};