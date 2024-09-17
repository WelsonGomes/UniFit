import axios from 'axios';
import fs from 'fs';
import path from 'path'; 
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function publicCityes(): Promise<{retorno: boolean}> {
    try {
        console.log('Conectando com API do governo...');
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        const cidades = response.data;

        const estados = [
            { id: 1, uf: "AC" }, { id: 2, uf: "AL" }, { id: 3, uf: "AP" }, { id: 4, uf: "AM" }, { id: 5, uf: "BA" },
            { id: 6, uf: "CE" }, { id: 7, uf: "DF" }, { id: 8, uf: "ES" }, { id: 9, uf: "GO" }, { id: 10, uf: "MA" },
            { id: 11, uf: "MT" }, { id: 12, uf: "MS" }, { id: 13, uf: "MG" }, { id: 14, uf: "PA" }, { id: 15, uf: "PB" },
            { id: 16, uf: "PR" }, { id: 17, uf: "PE" }, { id: 18, uf: "PI" }, { id: 19, uf: "RJ" }, { id: 20, uf: "RN" },
            { id: 21, uf: "RS" }, { id: 22, uf: "RO" }, { id: 23, uf: "RR" }, { id: 24, uf: "SC" }, { id: 25, uf: "SP" },
            { id: 26, uf: "SE" }, { id: 27, uf: "TO" }
        ];

        console.log('Mapeando as cidades com os estados para montar os JSON...');
        const cidadesProcessadas = cidades.map((cidade: any) => {
            const estado = estados.find(estado => estado.uf === cidade.microrregiao.mesorregiao.UF.sigla);
            return {
                nome: cidade.nome,
                estadoid: estado?.id,
                codigoibge: cidade.id
            };
        });

        console.log('Processando para salvar os dados em arquivo...');
        cidadesProcessadas.sort((a: any, b: any) => a.nome.localeCompare(b.nome));

        // Caminho do arquivo
        const filePath = path.join(__dirname, 'cidades.txt');

        // Montando os dados para serem salvos no arquivo
        const fileContent = cidadesProcessadas
            .map((c: { nome: string; estadoid: number; codigoibge: number }) => 
                `Nome: ${c.nome}, EstadoID: ${c.estadoid}, CodigoIBGE: ${c.codigoibge}`
            )
            .join('\n');

        // Salvando no arquivo
        fs.writeFileSync(filePath, fileContent, { encoding: 'utf8' });

        console.log('Finalizando operação e salvando o arquivo em cidades.txt');
        return { retorno: true };
    } catch (error) {
        console.log('Erro:', error);
        return { retorno: false };
    }
}

async function importCityes(): Promise<{retorno: boolean}> {
    try {
        // Caminho do arquivo cidades.txt
        const filePath = path.join(__dirname, 'cidades.txt');

        // Lendo o conteúdo do arquivo .txt
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

        // Convertendo o conteúdo do arquivo para JSON
        const cidades = fileContent.split('\n').map(linha => {
            const [nome, estadoid, codigoibge] = linha.replace('Nome: ', '')
                .replace(', EstadoID: ', ',')
                .replace(', CodigoIBGE: ', ',')
                .split(',');

            return {
                nome: nome.trim(),
                estadoid: Number(estadoid.trim()),
                codigoibge: Number(codigoibge.trim())
            };
        });

        // Inserindo os dados no banco
        const cidadesCreate = await prisma.cidade.createMany({
            data: cidades,
            skipDuplicates: true // Evitar inserção de duplicados
        });

        console.log(`Inseridas ${cidadesCreate.count} cidades no banco de dados.`);
        return { retorno: true };
    } catch (error) {
        console.log('Erro ao importar cidades:', error);
        return { retorno: false };
    }
}

export { publicCityes, importCityes };
