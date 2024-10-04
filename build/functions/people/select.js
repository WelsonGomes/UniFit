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
                },
                usuario: true
            }
        });
        if (!people) {
            console.log("Não foi encontrado pessoas");
            return res.status(200).json({ page: skip, pageSize: take, total: total, dados: [] });
        }
        ;
        console.log('Processando os dados para retorno');
        const pessoa = people.map((dados) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
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
                professorid: (_a = dados.professorid) !== null && _a !== void 0 ? _a : null,
                contato: {
                    id: (_c = (_b = dados.contato) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : 0,
                    pessoaid: (_e = (_d = dados.contato) === null || _d === void 0 ? void 0 : _d.pessoaid) !== null && _e !== void 0 ? _e : 0,
                    telefone: (_g = (_f = dados.contato) === null || _f === void 0 ? void 0 : _f.telefone) !== null && _g !== void 0 ? _g : null,
                    celular: (_j = (_h = dados.contato) === null || _h === void 0 ? void 0 : _h.celular) !== null && _j !== void 0 ? _j : null,
                    email: (_l = (_k = dados.contato) === null || _k === void 0 ? void 0 : _k.email) !== null && _l !== void 0 ? _l : ""
                },
                endereco: dados.endereco ? {
                    id: dados.endereco.id,
                    pessoaid: dados.endereco.pessoaid,
                    cep: dados.endereco.cep,
                    rua: dados.endereco.rua,
                    numero: (_m = dados.endereco.numero) !== null && _m !== void 0 ? _m : null,
                    cidadeid: dados.endereco.cidadeid,
                    cidade: {
                        id: dados.endereco.cidade.id,
                        nome: dados.endereco.cidade.nome,
                        estado: {
                            id: dados.endereco.cidade.estado.id,
                            nome: dados.endereco.cidade.estado.nome,
                            uf: dados.endereco.cidade.estado.uf,
                            pais: dados.endereco.cidade.estado.pais
                        },
                        codigoibge: dados.endereco.cidade.codigoibge
                    },
                    bairro: dados.endereco.bairro,
                    estadoid: dados.endereco.estadoid,
                    complemento: dados.endereco.complemento
                } : null,
                usuario: {
                    id: (_p = (_o = dados.usuario) === null || _o === void 0 ? void 0 : _o.id) !== null && _p !== void 0 ? _p : 0,
                    pessoaid: (_r = (_q = dados.usuario) === null || _q === void 0 ? void 0 : _q.pessoaid) !== null && _r !== void 0 ? _r : 0,
                    permissao: (_t = (_s = dados.usuario) === null || _s === void 0 ? void 0 : _s.permissao) !== null && _t !== void 0 ? _t : "",
                    usuario: "",
                    password: "",
                    dtacadastro: (_v = (_u = dados.usuario) === null || _u === void 0 ? void 0 : _u.dtacadastro) !== null && _v !== void 0 ? _v : new Date(Date.now())
                }
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
