-- CreateTable
CREATE TABLE "Exercicio" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT NOT NULL,
    "execucao" TEXT NOT NULL,
    "equipamento" TEXT,
    "grupomuscular" TEXT NOT NULL,
    "imagemurl" TEXT,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id")
);
