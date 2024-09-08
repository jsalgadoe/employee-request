/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_employeeId_fkey";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Request";

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "full_name" TEXT NOT NULL,
    "salary" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
