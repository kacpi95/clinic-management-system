-- AlterTable
ALTER TABLE `patient` ADD COLUMN `doctorId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Patient_doctorId_idx` ON `Patient`(`doctorId`);

-- AddForeignKey
ALTER TABLE `Patient` ADD CONSTRAINT `Patient_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
