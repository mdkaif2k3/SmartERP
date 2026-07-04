export const generateVoucherNumber = async (tx, model, prefix) => {
    const lastVoucher = await tx[model].findFirst({
        orderBy: {
            createdAt: "desc",
        },
    });
    if (!lastVoucher) {
        return `${prefix}000001`;
    }
    const lastNumber = Number(lastVoucher.voucherNo.replace(prefix, ""));
    const nextNumber = lastNumber + 1;
    return (
        prefix +
        nextNumber.toString().padStart(6, "0")
    );
};