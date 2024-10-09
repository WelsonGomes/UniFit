-- CreateTable
CREATE TABLE "tbtreino" (
    "id" BIGSERIAL NOT NULL,
    "pessoaid" INTEGER NOT NULL,
    "fichaid" INTEGER NOT NULL,
    "dtinicio" TIMESTAMP(3) NOT NULL,
    "dtfim" TIMESTAMP(3) NOT NULL,
    "tipotreino" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "tbtreino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbtreinoexercicio" (
    "id" BIGSERIAL NOT NULL,
    "treinoid" BIGINT NOT NULL,
    "exercicioid" INTEGER NOT NULL,
    "descanso" INTEGER NOT NULL,
    "desexercicio" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "tempo" INTEGER NOT NULL,
    "conjugado" BOOLEAN NOT NULL,
    "letratreino" CHAR(1) NOT NULL,

    CONSTRAINT "tbtreinoexercicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbitemsagrupado" (
    "id" BIGSERIAL NOT NULL,
    "treinoexercicioid" BIGINT NOT NULL,
    "agrupado" INTEGER NOT NULL,

    CONSTRAINT "tbitemsagrupado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbtreino" ADD CONSTRAINT "tbtreino_pessoaid_fkey" FOREIGN KEY ("pessoaid") REFERENCES "tbpessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbtreinoexercicio" ADD CONSTRAINT "tbtreinoexercicio_treinoid_fkey" FOREIGN KEY ("treinoid") REFERENCES "tbtreino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbtreinoexercicio" ADD CONSTRAINT "tbtreinoexercicio_exercicioid_fkey" FOREIGN KEY ("exercicioid") REFERENCES "tbexercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbitemsagrupado" ADD CONSTRAINT "tbitemsagrupado_treinoexercicioid_fkey" FOREIGN KEY ("treinoexercicioid") REFERENCES "tbtreinoexercicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
