import { Request, Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

async function DeleteUser(prisma: PrismaClient, req: Request, res: Response, id: number){

    try {

        await prisma.$transaction(async (prismaTransaction) => {

            console.log('Buscando cadastro para deletar');

            const response = await prismaTransaction.usuario.findUnique({ where: { id: id, situacao: 1 }});

            if(response) {

                try {

                    console.log('Inativando usuário na base');

                    await prismaTransaction.usuario.update({ where: { id: id }, data: { situacao: 0 }});

                    console.log('Usuário inativado na base');

                    return res.status(200).json({msg: "Usuário inativado com sucesso"});

                } catch (error) {

                    console.log(error);

                    return res.status(400).json({msg: error});

                }

            } else {

                console.log('Usuário não encontrado na base');

                return res.status(400).json({msg: 'Não foi possivel localizar este cadastro'});

            }

        });

    } catch (error) {

        console.log(error);

        return res.status(400).json({msg: error});

    }

}

export default DeleteUser;