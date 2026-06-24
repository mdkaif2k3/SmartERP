/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `StockItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StockItem_sku_key" ON "public"."StockItem"("sku");
