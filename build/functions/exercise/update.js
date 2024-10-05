"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function UpdateExercise(prisma, exercicioDTO, req, res, id) {
    try {
        console.log('Iniciando processo de atualização do cadastro de exercício');
        console.log('Exercício a ser atualizado ' + id);
        const updateExercise = {};
        const updateData = {};
        console.log(exercicioDTO);
        console.log('Verificando os campos a serem alterados no cadastro de exercício');
        if (exercicioDTO.nome) {
            updateExercise.nome = exercicioDTO.nome;
        }
        ;
        if (exercicioDTO.descricao) {
            updateExercise.descricao = exercicioDTO.descricao;
        }
        ;
        if (exercicioDTO.execucao) {
            updateExercise.execucao = exercicioDTO.execucao;
        }
        ;
        if (exercicioDTO.equipamento) {
            updateExercise.equipamento = exercicioDTO.equipamento;
        }
        ;
        if (exercicioDTO.grupomuscular) {
            updateExercise.grupomuscular = exercicioDTO.grupomuscular;
        }
        ;
        if (exercicioDTO.imagemurl) {
            updateExercise.imagemurl = exercicioDTO.imagemurl;
        }
        ;
        console.log(updateExercise);
        console.log('Iniciando processo de atualização na base');
        await prisma.$transaction(async (prismaTransaction) => {
            let exerc = {};
            if (updateExercise.nome || updateExercise.descricao || updateExercise.execucao || updateExercise.equipamento || updateExercise.grupomuscular || updateExercise.imagemurl) {
                console.log('atualizando exercício');
                exerc = await prismaTransaction.exercicio.update({
                    where: { id: id },
                    data: updateExercise
                });
            }
            ;
            return { exerc };
        });
        return res.status(200).json({ msg: 'Atualização de cadastro realizado com sucesso.' });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
exports.default = UpdateExercise;
