/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "requests_code_key" ON "requests"("code");
