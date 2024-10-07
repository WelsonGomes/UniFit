import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { ContatoDTO, PessoaDTO } from '../../model/interface';
dotenv.config();

async function SelectPeople(prisma: PrismaClient, req: Request, res: Response, skip: number, take: number, id: number, type: number) {
    try {
        skip = (skip - 1) * take;
        console.log("Buscando o total de registro na base");
        const total = await prisma.pessoa.count({ where: { situacao: 1, tipopessoaid: type }});
        console.log('Buscando os dados da(s) pessoa(s)');
        const people = await prisma.pessoa.findMany({ 
            where: { situacao: 1, tipopessoaid: type, ...(id && { id }) },
            skip: skip,
            take: take,
            orderBy: {nome: 'asc'},
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
        if(!people){
            console.log("Não foi encontrado pessoas");
            return res.status(200).json({page: skip, pageSize: take, total: total, dados: []});
        };
        console.log('Processando os dados para retorno');
        const pessoa: PessoaDTO[] = people.map((dados) => {
            return {
                id: dados.id,
                codigo: dados.codigo,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                cpf: dados.cpf,
                sexo: dados.sexo === 1 ? 'Masculino' : dados.sexo === 2 ? 'Feminino' : null,
                datanascimento: dados.datanascimento,
                tipofisico: dados.tipofisico ? {
                    id: dados.tipofisico.id,
                    descricao: dados.tipofisico.descricao
                }: null,
                nivelatividade: dados.nivelatividade ? {
                    id: dados.nivelatividade.id,
                    descricao: dados.nivelatividade.descricao
                }: null,
                objetivo: dados.objetivo ? {
                    id: dados.objetivo.id,
                    descricao: dados.objetivo.descricao
                }: null,
                situacao: dados.situacao === 1 ? 'Ativo' : 'Inativo',
                tipopessoa: {
                    id: dados.tipopessoa.id,
                    descricao: dados.tipopessoa.descricao
                },
                professorid: dados.professorid ?? null,
                contato: {
                    id: dados.contato?.id ?? 0,
                    pessoaid: dados.contato?.pessoaid ?? 0,
                    telefone: dados.contato?.telefone ?? null,
                    celular: dados.contato?.celular ?? null,
                    email: dados.contato?.email ?? ""
                },
                endereco: dados.endereco ? {
                    id: dados.endereco.id,
                    pessoaid: dados.endereco.pessoaid,
                    cep: dados.endereco.cep,
                    rua: dados.endereco.rua,
                    numero: dados.endereco.numero ?? null,
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
                }: null,
                usuario: {
                    id: dados.usuario?.id ?? 0,
                    pessoaid: dados.usuario?.pessoaid ?? 0,
                    permissao: dados.usuario?.permissao ?? "",
                    usuario: "",
                    password: "",
                    dtacadastro: dados.usuario?.dtacadastro ?? new Date(Date.now()),
                    situacao: dados.usuario?.situacao ?? 0
                }
            }
        });
        console.log('Processo concluido');
        return res.status(200).json({page: skip, pageSize: take, total: total, dados: pessoa});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: `Houve um erro ao realizar o cadastro. ${error}`})
    }
}

export default SelectPeople;