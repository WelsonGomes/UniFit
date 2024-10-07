"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function SelectExercise(prisma, req, res, skip, take, id) {
    try {
        skip = (skip - 1) * take;
        console.log("Buscando o total de registro na base");
        const total = await prisma.exercicio.count({ where: { id: { gt: 0 } } });
        console.log('Buscando os dados do(s) exercício(s)');
        const exerc = await prisma.exercicio.findMany({
            where: Object.assign({}, (id && { id })),
            skip: skip,
            take: take,
            orderBy: { nome: 'asc' }
        });
        if (!exerc) {
            console.log("Não foi encontrado pessoas");
            return res.status(200).json({ page: skip, pageSize: take, total: total, dados: [] });
        }
        ;
        console.log('Processando os dados para retorno');
        const response = exerc.map((dados) => {
            return {
                id: dados.id,
                nome: dados.nome,
                descricao: dados.descricao,
                execucao: dados.execucao,
                equipamento: dados.equipamento,
                grupomuscular: dados.grupomuscular,
                imagemurl: dados.imagemurl
            };
        });
        console.log('Processo concluido');
        return res.status(200).json({ page: skip, pageSize: take, total: total, dados: response });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ msg: `Houve um erro ao selecionar o cadastro. ${error}` });
    }
}
exports.default = SelectExercise;
