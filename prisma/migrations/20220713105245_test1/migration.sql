/*
  Warnings:

  - You are about to drop the column `url` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `url`,
    ADD COLUMN `key` VARCHAR(191) NULL;
