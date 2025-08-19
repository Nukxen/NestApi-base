/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "enum_classificacao" AS ENUM ('FATOR_DE_TRABALHO', 'COMPORTAMENTO_DE_RISCO');

-- CreateEnum
CREATE TYPE "enum_analise_55_option" AS ENUM ('LIMPEZA', 'INSTRUMENTOS', 'DOCUMENTACAO', 'NORMA_TECNICA', 'CONDICOES', 'CONHECIMENTO_E_HABILIDADES', 'OPERADOR', 'TRATAMENTO', 'FERRAMENTAS');

-- CreateEnum
CREATE TYPE "enum_analise_4m" AS ENUM ('MAQUINA', 'METODO', 'MAO_DE_OBRA', 'MATERIAL');

-- CreateEnum
CREATE TYPE "enum_tipo_problema" AS ENUM ('PROCESSOS', 'MANUTENCAO', 'QUALIDADE', 'SEGURANCA', 'MEIO_AMBIENTE', 'ENERGIA');

-- CreateEnum
CREATE TYPE "enum_status" AS ENUM ('EM_ANDAMENTO', 'FINALIZADO', 'AGUARDANDO_VALIDACAO', 'REPROVADO_PELO_GESTOR', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "enum_status_brainstorm" AS ENUM ('EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "enum_evento_ambiental" AS ENUM ('CATASTROFE_AMBIENTAL', 'EMERGENCIA_AMBIENTAL', 'ACIDENTE_AMBIENTAL', 'NAO_CLASSIFICADO');

-- CreateEnum
CREATE TYPE "enum_perigos_riscos" AS ENUM ('TRI_ATN', 'TOL_IMP', 'MOD_DDF', 'SUB_RINR_AR');

-- CreateEnum
CREATE TYPE "enum_etapa" AS ENUM ('EVIDENCIAS', 'ANALISE_NVAA', 'MEMORIAL_DE_CALCULO', 'OUTROS');

-- CreateEnum
CREATE TYPE "enum_dados_do_processo" AS ENUM ('QUANTIDADE_DE_TURNOS', 'COLABORADORES_TURNO', 'CARGA_MAQUINA', 'TEMPO_DE_CIMA', 'CAPACIDADE', 'PERDA_ATACADA', 'PRODUTIVIDADE', 'TEMPO_DE_SETUP_MEDIO', 'CONSUMO_ANUAL_DE_FERRAMENTAS', 'CONSUMO_ANUAL_DE_MATERIAL', 'NVVA_MOVIMENTACAO_DESBALAN');

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "AcessLevel";

-- CreateTable
CREATE TABLE "MinIOanexo" (
    "id_minio" TEXT NOT NULL,
    "uploadName" TEXT NOT NULL,
    "hashFile" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "etapa" "enum_etapa" NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),
    "fk_trabalho" TEXT NOT NULL,

    CONSTRAINT "MinIOanexo_pkey" PRIMARY KEY ("id_minio")
);

-- CreateTable
CREATE TABLE "Trabalho" (
    "id_trabalho" TEXT NOT NULL,
    "titulo_trabalho" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "fk_responsavel" VARCHAR(255) NOT NULL,
    "area_aplicacao" VARCHAR(255) NOT NULL,
    "numero_kaizen" INTEGER,
    "gerente_area_impactada" VARCHAR(255),
    "email_gerente_area" VARCHAR(255),
    "objetivo" TEXT,
    "tipo_problema" "enum_tipo_problema",
    "resultado_validacao" BOOLEAN DEFAULT false,
    "ultimo_comentario_validacao" TEXT,
    "status" "enum_status" DEFAULT 'EM_ANDAMENTO',
    "data_conclusao" TIMESTAMP(3),
    "iplan_key" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "hasActionPlain" BOOLEAN DEFAULT false,
    "tem_5w1h" BOOLEAN DEFAULT false,
    "problema_5w1h_what" TEXT,
    "problema_5w1h_who" TEXT,
    "problema_5w1h_where" TEXT,
    "problema_5w1h_when" TEXT,
    "problema_5w1h_how" TEXT,
    "problema_5w1h_which" TEXT,
    "descricao_problema" TEXT,
    "maquina_patrimonio" TEXT,
    "inicio_parada" TIMESTAMP(3),
    "fim_parada" TIMESTAMP(3),
    "ordem_manutencao" TEXT,
    "normas_associadas" TEXT,
    "evento_ambiental" "enum_evento_ambiental",
    "descricao_estratificacao" TEXT,
    "fluxograma" TEXT,
    "pareto_unidade" VARCHAR(50),
    "fk_pareto" TEXT,
    "twttp_herca" TEXT,
    "analise_nvaa" BOOLEAN DEFAULT false,
    "descricao_analise_de_causa" TEXT,
    "mapeado_perigos_riscos" BOOLEAN DEFAULT false,
    "perigos_riscos_antes" "enum_perigos_riscos",
    "perigos_riscos_depois" "enum_perigos_riscos",
    "causa_raiz_5porques" VARCHAR(255),
    "causa_raiz_ishikawa" VARCHAR(255),
    "projeto_falha" BOOLEAN DEFAULT false,
    "projeto_falta" BOOLEAN DEFAULT false,
    "externo_utilidades" BOOLEAN DEFAULT false,
    "externo_materia_prima" BOOLEAN DEFAULT false,
    "externo_sobressalente_def" BOOLEAN DEFAULT false,
    "externo_vibracao" BOOLEAN DEFAULT false,
    "externo_temperatura" BOOLEAN DEFAULT false,
    "manut_lubrific" BOOLEAN DEFAULT false,
    "manut_ativid_nao_realizada" BOOLEAN DEFAULT false,
    "manut_deterioracao" BOOLEAN DEFAULT false,
    "cond_basica_procedimento" BOOLEAN DEFAULT false,
    "cond_basica_vazamento" BOOLEAN DEFAULT false,
    "cond_basica_reaperto" BOOLEAN DEFAULT false,
    "cond_basica_lubrificacao" BOOLEAN DEFAULT false,
    "cond_basica_limpeza" BOOLEAN DEFAULT false,
    "cond_funcional_ajustes" BOOLEAN DEFAULT false,
    "cond_funcional_pressao" BOOLEAN DEFAULT false,
    "cond_funcional_temperatura" BOOLEAN DEFAULT false,
    "cond_funcional_velocidade" BOOLEAN DEFAULT false,
    "descuido_producao" BOOLEAN DEFAULT false,
    "descuido_manutencao" BOOLEAN DEFAULT false,
    "norma" VARCHAR(255),
    "tlt" VARCHAR(255),
    "sop_paa" VARCHAR(255),
    "progama_manut_periodica" VARCHAR(255),
    "cfc" VARCHAR(255),
    "revisao_roteiro" VARCHAR(255),
    "outros" TEXT,
    "reducao_nivel_significancia" INTEGER,
    "outros_ganhos" TEXT,
    "investimentos" DOUBLE PRECISION,
    "despesas" DOUBLE PRECISION,
    "ganhos_potencial" DOUBLE PRECISION,
    "ganhos_real" DOUBLE PRECISION,
    "bc" DOUBLE PRECISION,
    "possibilidade_expansao" BOOLEAN DEFAULT false,
    "locais_expansao" TEXT[],

    CONSTRAINT "Trabalho_pkey" PRIMARY KEY ("id_trabalho")
);

-- CreateTable
CREATE TABLE "Pareto" (
    "id_pareto" TEXT NOT NULL,
    "causa" TEXT,
    "valor" DOUBLE PRECISION,
    "fk_trabalho" TEXT,

    CONSTRAINT "Pareto_pkey" PRIMARY KEY ("id_pareto")
);

-- CreateTable
CREATE TABLE "Avaliacao5G" (
    "id_avaliacao_5g" TEXT NOT NULL,
    "options" "enum_analise_55_option" NOT NULL,
    "analise_4m" "enum_analise_4m" NOT NULL,
    "especificacao" TEXT NOT NULL,
    "verificado" TEXT NOT NULL,
    "necessita_restauracao" BOOLEAN DEFAULT false,
    "como_restaurar" TEXT,
    "responsavel_restauracao" TEXT,
    "prazo" TIMESTAMP(3),
    "status" VARCHAR(50),
    "solucao_eficaz" BOOLEAN DEFAULT false,
    "fk_trabalho" TEXT NOT NULL,

    CONSTRAINT "Avaliacao5G_pkey" PRIMARY KEY ("id_avaliacao_5g")
);

-- CreateTable
CREATE TABLE "PorquesCausa" (
    "id_porques_causa" TEXT NOT NULL,
    "causa" VARCHAR(255),
    "fk_trabalho" TEXT NOT NULL,
    "order_row" INTEGER NOT NULL,

    CONSTRAINT "PorquesCausa_pkey" PRIMARY KEY ("id_porques_causa")
);

-- CreateTable
CREATE TABLE "Porques" (
    "id_porques" TEXT NOT NULL,
    "causa" VARCHAR(255),
    "order_col" INTEGER NOT NULL,
    "fk_porques_causa" TEXT NOT NULL,

    CONSTRAINT "Porques_pkey" PRIMARY KEY ("id_porques")
);

-- CreateTable
CREATE TABLE "IshikawaEspinha" (
    "id_espinha" TEXT NOT NULL,
    "espinha" VARCHAR(255),
    "fk_trabalho" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "IshikawaEspinha_pkey" PRIMARY KEY ("id_espinha")
);

-- CreateTable
CREATE TABLE "IshikawaCausa" (
    "id_causa" TEXT NOT NULL,
    "causa" TEXT NOT NULL,
    "fk_espinha" TEXT NOT NULL,

    CONSTRAINT "IshikawaCausa_pkey" PRIMARY KEY ("id_causa")
);

-- CreateTable
CREATE TABLE "Evidencias" (
    "id_evidencia" TEXT NOT NULL,
    "comentario" TEXT,
    "fk_evidencia_antes" TEXT,
    "fk_evidencia_depois" TEXT,
    "fk_trabalho" TEXT NOT NULL,

    CONSTRAINT "Evidencias_pkey" PRIMARY KEY ("id_evidencia")
);

-- CreateTable
CREATE TABLE "DadosDoProcesso" (
    "id" TEXT NOT NULL,
    "fk_trabalho" TEXT NOT NULL,
    "dados" "enum_dados_do_processo",
    "atual" TEXT,
    "proposto" TEXT,
    "diferenca" TEXT,
    "unidade" TEXT,

    CONSTRAINT "DadosDoProcesso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brainstorm" (
    "id" TEXT NOT NULL,
    "fk_trabalho" TEXT NOT NULL,
    "macro_topico" TEXT NOT NULL,
    "problema" TEXT NOT NULL,
    "solucao" TEXT NOT NULL,
    "status" "enum_status_brainstorm" NOT NULL,

    CONSTRAINT "Brainstorm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nodes" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "fkTrabalho" TEXT NOT NULL,

    CONSTRAINT "Nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "fkTrabalho" TEXT NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Evidencias_fk_evidencia_antes_key" ON "Evidencias"("fk_evidencia_antes");

-- CreateIndex
CREATE UNIQUE INDEX "Evidencias_fk_evidencia_depois_key" ON "Evidencias"("fk_evidencia_depois");

-- AddForeignKey
ALTER TABLE "MinIOanexo" ADD CONSTRAINT "MinIOanexo_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pareto" ADD CONSTRAINT "Pareto_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao5G" ADD CONSTRAINT "Avaliacao5G_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PorquesCausa" ADD CONSTRAINT "PorquesCausa_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Porques" ADD CONSTRAINT "Porques_fk_porques_causa_fkey" FOREIGN KEY ("fk_porques_causa") REFERENCES "PorquesCausa"("id_porques_causa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IshikawaEspinha" ADD CONSTRAINT "IshikawaEspinha_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IshikawaCausa" ADD CONSTRAINT "IshikawaCausa_fk_espinha_fkey" FOREIGN KEY ("fk_espinha") REFERENCES "IshikawaEspinha"("id_espinha") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidencias" ADD CONSTRAINT "Evidencias_fk_evidencia_antes_fkey" FOREIGN KEY ("fk_evidencia_antes") REFERENCES "MinIOanexo"("id_minio") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidencias" ADD CONSTRAINT "Evidencias_fk_evidencia_depois_fkey" FOREIGN KEY ("fk_evidencia_depois") REFERENCES "MinIOanexo"("id_minio") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidencias" ADD CONSTRAINT "Evidencias_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DadosDoProcesso" ADD CONSTRAINT "DadosDoProcesso_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brainstorm" ADD CONSTRAINT "Brainstorm_fk_trabalho_fkey" FOREIGN KEY ("fk_trabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nodes" ADD CONSTRAINT "Nodes_fkTrabalho_fkey" FOREIGN KEY ("fkTrabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_fkTrabalho_fkey" FOREIGN KEY ("fkTrabalho") REFERENCES "Trabalho"("id_trabalho") ON DELETE RESTRICT ON UPDATE CASCADE;
