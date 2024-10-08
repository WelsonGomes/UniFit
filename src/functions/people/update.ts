import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import { PessoaDTO } from '../../model/interface';
dotenv.config();

async function UpdatePeople(prisma: PrismaClient, pessoaDTO: PessoaDTO, req: Request, res: Response, id: number) {
    try {
        console.log('Iniciando processo de atualização de cadastro');
        console.log('Pessoa a ser atualizada ' + id);
        const updatePeople: any = {};
        const updateData: any = {};
        console.log(pessoaDTO);
        console.log('Verificando os campos a serem alterados no cadastro de pessoa');
        if(pessoaDTO.nome){updatePeople.nome = pessoaDTO.nome};
        if(pessoaDTO.sobrenome){updatePeople.sobrenome = pessoaDTO.sobrenome};
        if(pessoaDTO.datanascimento){updatePeople.datanascimento = pessoaDTO.datanascimento};
        if(pessoaDTO.sexo){updatePeople.sexo = pessoaDTO.sexo};
        if(pessoaDTO.situacao){updatePeople.situacao = 0};
        if(pessoaDTO.tipopessoaid){updatePeople.tipopessoaid = pessoaDTO.tipopessoaid};
        if(pessoaDTO.professorid){updatePeople.professorid = pessoaDTO.professorid};
        console.log(updatePeople);
        if(pessoaDTO.contato){
            console.log('Verificando os campos a serem alterados no cadastro de contato da pessoa');
            updateData.contato = {};
            const c = pessoaDTO.contato;
            if(c.telefone){updateData.contato.telefone = c.telefone};
            if(c.celular){updateData.contato.celular = c.celular};
            if(c.email){updateData.contato.email = c.email}
            console.log(updateData.contato);
        };
        if(pessoaDTO.endereco){
            console.log('Verificando os campos a serem alterados no cadastro de endereço da pessoa');
            updateData.endereco = {};
            const e = pessoaDTO.endereco;
            if(e.cep){updateData.endereco.cep = e.cep};
            if(e.rua){updateData.endereco.rua = e.rua};
            if(e.numero){updateData.endereco.numero = e.numero};
            if(e.cidadeid){updateData.endereco.cidadeid = e.cidadeid};
            if(e.bairro){updateData.endereco.bairro = e.bairro};
            if(e.estadoid){updateData.endereco.estadoid = e.estadoid};
            if(e.complemento){updateData.endereco.complemento = e.complemento};
            console.log(updateData.endereco);
        };
        console.log('Iniciando processo de atualização na base');
        await prisma.$transaction(async (prismaTransaction) => {
            let people: any = {};
            if(updatePeople.nome || updatePeople.sobrenome || updatePeople.datanascimento || updatePeople.sexo || updatePeople.situacao || updatePeople.tipopessoaid){
                console.log('atualizando pessoa');
                people = await prismaTransaction.pessoa.update({
                    where: { situacao: 1, id: id },
                    data: updatePeople
                });
            }
            let contato: any = null;
            if(updateData.contato){
                console.log('Atualizando contato da pessoa');
                const c = await prismaTransaction.contato.findFirst({where: { pessoaid: id }});
                if(c){
                    contato = await prismaTransaction.contato.update({
                        where: { id: c?.id },
                        data: updateData.contato
                    });
                };
            };
            let endereco: any = null;
            if(updateData.endereco){
                console.log('Atualizando endereço da pessoa');
                const e = await prismaTransaction.endereco.findFirst({ where: { pessoaid: id }});
                if(e){
                    endereco = await prismaTransaction.endereco.update({
                        where: { id: e.id },
                        data: updateData.endereco
                    });
                }
            }
            return {people, contato, endereco};
        });
        return res.status(200).json({msg: 'Atualização de cadastro realizado com sucesso.'});
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}

export default UpdatePeople;