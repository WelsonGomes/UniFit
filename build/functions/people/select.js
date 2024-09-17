"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function SelectPeople(prisma, req, res, skip, take, id, type) {
    try {
        skip = (skip - 1) * take;
        console.log("Buscando o total de registro na base");
        const total = await prisma.pessoa.count({ where: { situacao: 1, tipopessoaid: type } });
        console.log('Buscando os dados da(s) pessoa(s)');
        const people = await prisma.pessoa.findMany({
            where: Object.assign({ situacao: 1, tipopessoaid: type }, (id && { id })),
            skip: skip,
            take: take,
            orderBy: { nome: 'asc' },
            include: {
                tipofisico: true,
                nivelatividade: true,
                objetivo: true,
                tipopessoa: true,
                contato: true,
                endereco: {
                    include: {
                        cidade: {
                            include: {
                                estado: true
                            }
                        }
                    }
                }
            }
        });
        if (!people) {
            console.log("Não foi encontrado pessoas");
            return res.status(200).json({ page: skip, pageSize: take, total: total, dados: [] });
        }
        ;
        console.log('Processando os dados para retorno');
        const pessoa = people.map((dados) => {
            return {
                id: dados.id,
                codigo: dados.codigo,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                cpf: dados.cpf,
                sexo: dados.sexo,
                datanascimento: dados.datanascimento,
                tipofisico: dados.tipofisico ? {
                    id: dados.tipofisico.id,
                    descricao: dados.tipofisico.descricao
                } : null,
                nivelatividade: dados.nivelatividade ? {
                    id: dados.nivelatividade.id,
                    descricao: dados.nivelatividade.descricao
                } : null,
                objetivo: dados.objetivo ? {
                    id: dados.objetivo.id,
                    descricao: dados.objetivo.descricao
                } : null,
                situacao: dados.situacao,
                tipopessoa: {
                    id: dados.tipopessoa.id,
                    descricao: dados.tipopessoa.descricao
                },
                contato: null,
                endereco: null
            };
        });
        console.log('Processo concluido');
        return res.status(200).json({ page: skip, pageSize: take, total: total, dados: pessoa });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ msg: `Houve um erro ao realizar o cadastro. ${error}` });
    }
}
exports.default = SelectPeople;
