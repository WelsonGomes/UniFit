-- CreateTable
CREATE TABLE "tbpessoa" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "sobrenome" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "datanascimento" TIMESTAMP(3) NOT NULL,
    "sexo" INTEGER NOT NULL,
    "tipofisicoid" INTEGER,
    "nivelatividadeid" INTEGER,
    "objetivoid" INTEGER,
    "situacao" INTEGER NOT NULL,
    "tipopessoaid" INTEGER NOT NULL,

    CONSTRAINT "tbpessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbtipofisico" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbtipofisico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbnivelatividade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbnivelatividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbobjetivo" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tbobjetivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbcontato" (
    "id" SERIAL NOT NULL,
    "pessoaid" INTEGER NOT NULL,
    "telefone" VARCHAR(10),
    "celular" VARCHAR(11),
    "email" VARCHAR(100),

    CONSTRAINT "tbcontato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbendereco" (
    "id" SERIAL NOT NULL,
    "pessoaid" INTEGER NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT,
    "cidadeid" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "estadoid" INTEGER NOT NULL,
    "complemento" TEXT NOT NULL,

    CONSTRAINT "tbendereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbtipopessoa" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,

    CONSTRAINT "tbtipopessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbusuario" (
    "id" SERIAL NOT NULL,
    "pessoaid" INTEGER NOT NULL,
    "permissao" TEXT NOT NULL,
    "usuario" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "dtacadastro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbusuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbestado" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "pais" VARCHAR(100) NOT NULL,

    CONSTRAINT "tbestado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbcidade" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "estadoid" INTEGER NOT NULL,
    "codigoibge" INTEGER NOT NULL,

    CONSTRAINT "tbcidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbpessoa_cpf_key" ON "tbpessoa"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tbcontato_email_key" ON "tbcontato"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbtipopessoa_descricao_key" ON "tbtipopessoa"("descricao");

-- CreateIndex
CREATE UNIQUE INDEX "tbestado_nome_key" ON "tbestado"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tbestado_uf_key" ON "tbestado"("uf");

-- CreateIndex
CREATE UNIQUE INDEX "tbcidade_nome_estadoid_key" ON "tbcidade"("nome", "estadoid");

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_tipofisicoid_fkey" FOREIGN KEY ("tipofisicoid") REFERENCES "tbtipofisico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_nivelatividadeid_fkey" FOREIGN KEY ("nivelatividadeid") REFERENCES "tbnivelatividade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_objetivoid_fkey" FOREIGN KEY ("objetivoid") REFERENCES "tbobjetivo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbpessoa" ADD CONSTRAINT "tbpessoa_tipopessoaid_fkey" FOREIGN KEY ("tipopessoaid") REFERENCES "tbtipopessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbcontato" ADD CONSTRAINT "tbcontato_pessoaid_fkey" FOREIGN KEY ("pessoaid") REFERENCES "tbpessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbendereco" ADD CONSTRAINT "tbendereco_pessoaid_fkey" FOREIGN KEY ("pessoaid") REFERENCES "tbpessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbendereco" ADD CONSTRAINT "tbendereco_cidadeid_fkey" FOREIGN KEY ("cidadeid") REFERENCES "tbcidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbendereco" ADD CONSTRAINT "tbendereco_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "tbestado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbusuario" ADD CONSTRAINT "tbusuario_pessoaid_fkey" FOREIGN KEY ("pessoaid") REFERENCES "tbpessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbcidade" ADD CONSTRAINT "tbcidade_estadoid_fkey" FOREIGN KEY ("estadoid") REFERENCES "tbestado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
