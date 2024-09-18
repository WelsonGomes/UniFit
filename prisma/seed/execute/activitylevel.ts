import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function activityLevel(): Promise<{retorno: boolean}> {
    console.log('Montando JSON para inserir os tipos fisicos de pessoas');
    const type = [
        {"descricao": "Iniciante"},
        {"descricao": "Intermediário"},
        {"descricao": "Esperto"},
        {"descricao": "Profissional"}
    ];
    console.log('Processando inserção dos dados na base');
    try {
        const activityLevel = await prisma.nivelAtividade.createMany({
            data: type
        });    
        if(activityLevel){
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

export { activityLevel }