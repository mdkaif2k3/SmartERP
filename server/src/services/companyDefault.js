import prisma from "../config/prisma.js";

export async function createDefaultGroups(companyId) {
  const groups = [
    { name: "Assets", type: "Asset" },
    { name: "Liabilities", type: "Liability" },
    { name: "Income", type: "Income" },
    { name: "Expenses", type: "Expense" }
  ];

  await prisma.group.createMany({
    data: groups.map(group => ({
      ...group,
      companyId
    }))
  });
}

export async function createDefaultUnits(companyId) {
  const units = [
    { name: "Pieces", symbol: "PCS" },
    { name: "Kilogram", symbol: "KG" },
    { name: "Box", symbol: "BOX" },
    { name: "Liter", symbol: "LTR" }
  ];

  await prisma.unit.createMany({
    data: units.map(unit => ({
      ...unit,
      companyId
    }))
  });
}