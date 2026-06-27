export const setCompanyId = (companyId: string) => {
    localStorage.setItem("companyId", companyId);
};

export const getCompanyId = () => {
    return localStorage.getItem("companyId");
};

export const removeCompanyId = () => {
    localStorage.removeItem("companyId");
};