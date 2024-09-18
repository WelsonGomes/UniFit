import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function physicalType(): Promise<{retorno: boolean}> {
    console.log('Montando JSON para inserir os tipos fisicos de pessoas');
    const type = [
        {"descricao": "Sedentário"},
        {"descricao": "Obeso"},
        {"descricao": "Magrelo"},
        {"descricao": "Masculo"}
    ];
    console.log('Processando inserção dos dados na base');
    try {
        const physicalType = await prisma.tipoFisico.createMany({
            data: type
        });    
        if(physicalType){
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

export { physicalType }