"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const validaCpfCnpj_1 = require("../validaCpfCnpj");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
async function CreatePeople(prisma, pessoaDTO, req, res) {
    var _a;
    try {
        console.log('Validando cpf');
        if (!await (0, validaCpfCnpj_1.getValidaCpfCnpj)(pessoaDTO.cpf)) {
            return res.status(400).json({ msg: 'Este CPF é inválido. Favor verifique.' });
        }
        ;
        console.log('CPF valido');
        console.log('Valida se tem email');
        if (!((_a = pessoaDTO.contato) === null || _a === void 0 ? void 0 : _a.email)) {
            console.log('Email é obrigatório');
            return res.status(400).json({ msg: 'É obrigatório informar o email' });
        }
        ;
        console.log('Pegando o tipo da pessoa');
        let tipoPessoa = 0;
        let permissao = '';
        const rota = req.route.path;
        switch (rota) {
            case '/admin':
                tipoPessoa = 1;
                permissao = 'admin';
            case '/professor':
                tipoPessoa = 2;
                permissao = 'professor';
                break;
            case '/aluno':
                tipoPessoa = 3;
                permissao = 'aluno';
                break;
            default:
                return res.status(400).json({ msg: 'Não foi possível identificar o tipo da pessoa.' });
        }
        ;
        console.log('Abrindo transação com o banco de dados para persisitencia dos dados');
        const response = await prisma.$transaction(async (prismaTransaction) => {
            const pessoa = await prismaTransaction.pessoa.create({
                data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ codigo: pessoaDTO.codigo, nome: pessoaDTO.nome, sobrenome: pessoaDTO.sobrenome, cpf: pessoaDTO.cpf.replace(/[^\d]+/g, ''), datanascimento: new Date(pessoaDTO.datanascimento), sexo: pessoaDTO.sexo }, (pessoaDTO.tipofisicoid && { tipofisicoid: pessoaDTO.tipofisicoid })), (pessoaDTO.nivelatividadeid && { nivelatividadeid: pessoaDTO.nivelatividadeid })), (pessoaDTO.objetivoid && { objetivoid: pessoaDTO.objetivoid })), { situacao: pessoaDTO.situacao, tipopessoaid: tipoPessoa }), (pessoaDTO.professorid && { professorid: pessoaDTO.professorid }))
            });
            let contato = await prismaTransaction.contato.create({
                data: {
                    pessoaid: pessoa.id,
                    telefone: pessoaDTO.contato.telefone,
                    celular: pessoaDTO.contato.celular,
                    email: pessoaDTO.contato.email
                }
            });
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
            let hashPassword = await bcrypt_1.default.hash('UniFit@1234567', 10);
            let usuario = await prismaTransaction.usuario.create({
                data: {
                    pessoaid: pessoa.id,
                    permissao: permissao,
                    usuario: pessoaDTO.contato.email,
                    password: hashPassword,
                    dtacadastro: new Date(Date.now())
                }
            });
            return { pessoa, contato, endereco, usuario };
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
