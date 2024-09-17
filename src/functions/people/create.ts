import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { getValidaCpfCnpj } from '../validaCpfCnpj';
import { PessoaDTO } from '../../model/interface';
dotenv.config();

async function CreatePeople(prisma: PrismaClient, pessoaDTO: PessoaDTO, req: Request, res: Response) {
    try {
        console.log('Validando cpf');
        if(!await getValidaCpfCnpj(pessoaDTO.cpf)){
            return res.status(400).json({msg: 'Este CPF é inválido. Favor verifique.'})
        };
        console.log('CPF valido');
        console.log('Pegando o tipo da pessoa');
        let tipoPessoa = 0;
        const rota = req.route.path as string;
        switch (rota){
            case '/professor':
                tipoPessoa = 2;
                break;
            case '/aluno':
                tipoPessoa = 3;
                break;
            default:
                return res.status(400).json({msg: 'Não foi possível identificar o tipo da pessoa.'});
        };
        console.log('Abrindo transação com o banco de dados para persisitencia dos dados');
        const response = await prisma.$transaction(async (prismaTransaction) => {
            const pessoa = await prismaTransaction.pessoa.create({
                data: {
                    codigo: pessoaDTO.codigo,
                    nome: pessoaDTO.nome,
                    sobrenome: pessoaDTO.sobrenome,
                    cpf: pessoaDTO.cpf.replace(/[^\d]+/g, ''),
                    datanascimento: new Date(pessoaDTO.datanascimento),
                    sexo: pessoaDTO.sexo,
                    ...(pessoaDTO.tipofisico != undefined && {tipofisicoid: pessoaDTO.tipofisico.id}),
                    ...(pessoaDTO.nivelatividade != undefined && {nivelatividadeid: pessoaDTO.nivelatividade.id}),
                    ...(pessoaDTO.objetivo != undefined && {objetivoid: pessoaDTO.objetivo.id}),
                    situacao: pessoaDTO.situacao,
                    tipopessoaid: tipoPessoa
                }
            });
            let contato = null;
            if(pessoaDTO.contato){
                contato = await prismaTransaction.contato.create({
                    data: {
                        pessoaid: pessoa.id,
                        telefone: pessoaDTO.contato.telefone,
                        celular: pessoaDTO.contato.celular,
                        email: pessoaDTO.contato.email
                    }
                });
            };
            let endereco = null;
            if(pessoaDTO.endereco){
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
            };
            return { pessoa, contato, endereco };
        });
        if(response){
            console.log('Novo cadastro realizado com sucesso.');
            return res.status(201).json({msg: 'Novo cadastro realizado com sucesso.'})
        } else {
            console.log('Houve um erro ao realizar o cadastro.');
            return res.status(400).json({msg: 'Houve um erro ao realizar o cadastro.'})
        };
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: `Houve um erro ao realizar o cadastro. ${error}`})
    }
}

export default CreatePeople;