/*
  Warnings:

  - Made the column `doctorId` on table `patient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `Patient_doctorId_fkey`;

-- AlterTable
ALTER TABLE `patient` MODIFY `doctorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
