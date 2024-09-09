/*
  Warnings:

  - A unique constraint covering the columns `[identification]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identification` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "identification" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employees_identification_key" ON "employees"("identification");
