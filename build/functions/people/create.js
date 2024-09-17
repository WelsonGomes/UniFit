"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const validaCpfCnpj_1 = require("../validaCpfCnpj");
dotenv_1.default.config();
async function CreatePeople(prisma, pessoaDTO, req, res) {
    try {
        console.log('Validando cpf');
        if (!await (0, validaCpfCnpj_1.getValidaCpfCnpj)(pessoaDTO.cpf)) {
            return res.status(400).json({ msg: 'Este CPF é inválido. Favor verifique.' });
        }
        ;
        console.log('CPF valido');
        console.log('Pegando o tipo da pessoa');
        let tipoPessoa = 0;
        const rota = req.route.path;
        switch (rota) {
            case '/professor':
                tipoPessoa = 2;
                break;
            case '/aluno':
                tipoPessoa = 3;
                break;
            default:
                return res.status(400).json({ msg: 'Não foi possível identificar o tipo da pessoa.' });
        }
        ;
        console.log('Abrindo transação com o banco de dados para persisitencia dos dados');
        const response = await prisma.$transaction(async (prismaTransaction) => {
            const pessoa = await prismaTransaction.pessoa.create({
                data: Object.assign(Object.assign(Object.assign(Object.assign({ codigo: pessoaDTO.codigo, nome: pessoaDTO.nome, sobrenome: pessoaDTO.sobrenome, cpf: pessoaDTO.cpf.replace(/[^\d]+/g, ''), datanascimento: new Date(pessoaDTO.datanascimento), sexo: pessoaDTO.sexo }, (pessoaDTO.tipofisico != undefined && { tipofisicoid: pessoaDTO.tipofisico.id })), (pessoaDTO.nivelatividade != undefined && { nivelatividadeid: pessoaDTO.nivelatividade.id })), (pessoaDTO.objetivo != undefined && { objetivoid: pessoaDTO.objetivo.id })), { situacao: pessoaDTO.situacao, tipopessoaid: tipoPessoa })
            });
            let contato = null;
            if (pessoaDTO.contato) {
                contato = await prismaTransaction.contato.create({
                    data: {
                        pessoaid: pessoa.id,
                        telefone: pessoaDTO.contato.telefone,
                        celular: pessoaDTO.contato.celular,
                        email: pessoaDTO.contato.email
                    }
                });
            }
            ;
            let endereco = null;
            if (pessoaDTO.endereco) {
                endereco = await prismaTransaction.endereco.create({
                    data: {
                        pessoaid: pessoa.id,
                        cep: pessoaDTO.endereco.cep,
                        rua: pessoaDTO.endereco.rua,
                        numero: pessoaDTO.endereco.numero,
                        cidadeid: pessoaDTO.endereco.cidadeid,
                        bairro: pessoaDTO.endereco.bairro,
                        estadoid: pessoaDTO.endereco.estadoid,
                        complemento: pessoaDTO.endereco.complemento
                    }
                });
            }
            ;
            return { pessoa, contato, endereco };
        });
        if (response) {
            console.log('Novo cadastro realizado com sucesso.');
            return res.status(201).json({ msg: 'Novo cadastro realizado com sucesso.' });
        }
        else {
            console.log('Houve um erro ao realizar o cadastro.');
            return res.status(400).json({ msg: 'Houve um erro ao realizar o cadastro.' });
        }
        ;
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ msg: `Houve um erro ao realizar o cadastro. ${error}` });
    }
}
exports.default = CreatePeople;
