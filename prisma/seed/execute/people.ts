import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function peopleType(): Promise<{retorno: boolean}> {
    console.log('Montando JSON para inserir os tipos de pessoas');
    const type = [
        {"descricao": "Administrador"},
        {"descricao": "Professor"},
        {"descricao": "Aluno"}
    ];
    console.log('Processando inserção dos dados na base');
    try {
        const typePeople = await prisma.tipoPessoa.createMany({
            data: type
        });    
        if(typePeople){
            console.log('Processo finalizado com sucesso');
            return { retorno: true }
        } else {
            console.log('Processo finalizado com falha');
            return { retorno: false }
        };
    } catch (error) {
        console.log(error);
        return { retorno: false }
    }
}

export { peopleType }