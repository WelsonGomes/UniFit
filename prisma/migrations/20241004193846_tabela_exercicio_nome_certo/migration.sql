/*
  Warnings:

  - You are about to drop the `Exercicio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Exercicio";

-- CreateTable
CREATE TABLE "tbexercicio" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "execucao" TEXT NOT NULL,
    "equipamento" TEXT,
    "grupomuscular" TEXT NOT NULL,
    "imagemurl" TEXT,

    CONSTRAINT "tbexercicio_pkey" PRIMARY KEY ("id")
);
