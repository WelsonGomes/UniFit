import { PrismaClient } from "@prisma/client";
import { importCityes, publicCityes } from "./execute/city";
import { publicStates } from "./execute/state";
import { peopleType } from "./execute/people";
import { physicalType } from './execute/physicalType'
import { activityLevel } from './execute/activitylevel';
import { objective } from './execute/objective';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Verificando se já existe estados na base')
    let estados = await prisma.estado.count();
    if(estados <= 0){
        console.log('Adicionando os estados na base');
        await publicStates();
    } else {
        console.log('Estados já cadastrado na base');
    };
    console.log('Verificando se já existe cidades na base');
    const cidades = await prisma.cidade.count();
    if(cidades <= 0) {
        estados = await prisma.estado.count();
        if(estados > 0){
            console.log('Verificando se já existe o arquivo de cidades');
            const filePath = path.join(__dirname, 'cidades.txt');
            if (fs.existsSync(filePath)) {
                console.log('Inserindo as cidades do arquivo na base');
                await importCityes();
            } else {
                console.log('Criando arquivo de cidades');
                const response = await publicCityes();
                if(response){
                    console.log('Inserindo as cidades do arquivo na base');
                    await importCityes();
                }
            }
        } else {
            console.log('É necessário inserir primeiro os estados na base');
        }
    } else {
        console.log('Cidades já cadastrado na base');
    };
    console.log('Verificando se já existe os tipos de pessoas');
    const type = await prisma.tipoPessoa.count();
    if(type <= 0){
        console.log('Preparando para inserir os tipos de pessoas');
        await peopleType();
    } else {
        console.log('Tipos de pessoas já cadastrado na base');
    };
    console.log('Verificando se já existe os tipos fisicos de pessoas');
    const physical = await prisma.tipoFisico.count();
    if( physical <= 0){
        console.log('Preparando para inserir os tipos fisicos de pessoas');
        await physicalType();
    } else {
        console.log('Tipos fisicos de pessoas já cadastrado na base');
    }
    console.log('Verificando se já existe os niveis de atividades das pessoas');
    const activity = await prisma.nivelAtividade.count();
    if(activity <= 0){
        console.log('Preparando para inserir os niveis de atividades de pessoas');
        await activityLevel();
    } else {
        console.log('Niveis de atividades de pessoas já cadastrado na base');
    }
    console.log('Verificando se já existe os objetivos das pessoas');
    const obj = await prisma.objetivo.count();
    if(obj <= 0){
        console.log('Preparando para inserir os objetivos de pessoas');
        await objective();
    } else {
        console.log('Objetivos de pessoas já cadastrado na base');
    }
};

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});