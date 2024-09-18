import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function objective(): Promise<{retorno: boolean}> {
    console.log('Montando JSON para inserir os tipos fisicos de pessoas');
    const obj = [
        {"descricao": "Perder pesso"},
        {"descricao": "Ganhar peso"},
        {"descricao": "Ganhar musculo"},
        {"descricao": "Alinhamento corporal"}
    ];
    console.log('Processando inserção dos dados na base');
    try {
        const objective = await prisma.objetivo.createMany({
            data: obj
        });    
        if(objective){
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

export { objective }