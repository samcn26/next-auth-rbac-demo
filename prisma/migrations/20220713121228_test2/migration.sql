/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `menu_order_key` ON `menu`(`order`);
