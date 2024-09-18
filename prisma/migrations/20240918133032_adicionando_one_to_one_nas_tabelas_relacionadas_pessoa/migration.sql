/*
  Warnings:

  - A unique constraint covering the columns `[pessoaid]` on the table `tbcontato` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pessoaid]` on the table `tbendereco` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pessoaid]` on the table `tbusuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tbcontato_pessoaid_key" ON "tbcontato"("pessoaid");

-- CreateIndex
CREATE UNIQUE INDEX "tbendereco_pessoaid_key" ON "tbendereco"("pessoaid");

-- CreateIndex
CREATE UNIQUE INDEX "tbusuario_pessoaid_key" ON "tbusuario"("pessoaid");
