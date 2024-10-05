import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createPeople, selectPeople, updatePeople, deletePeople } from './controller/peopleController'
import { createExercise, deleteExercise, selectExercise, updateExercise } from './controller/exerciseController';
import { deleteUser, selectUser, updateUser } from './controller/userController';
dotenv.config();

/************************Rota de Professor******************************************** */
router.post('/admin', createPeople);
router.get('/admin', selectPeople);
router.put('/admin', updatePeople);
router.delete('/admin', deletePeople);

/************************Rota de Professor******************************************** */
router.post('/professor', createPeople);
router.get('/professor', selectPeople);
router.put('/professor', updatePeople);
router.delete('/professor', deletePeople);

/************************Rota de Aluno*********************************************** */
router.post('/aluno', createPeople);
router.get('/aluno', selectPeople);
router.put('/aluno', updatePeople);
router.delete('/aluno', deletePeople);

/************************Rota de Exercício*********************************************** */
router.post('/exercicio', createExercise);
router.get('/exercicio', selectExercise);
router.put('/exercicio', updateExercise);
router.delete('/exercicio', deleteExercise);

/************************Rota de Usuário*********************************************** */
router.get('/usuario', selectUser);
router.put('/usuario', updateUser);
router.delete('/usuario', deleteUser);

module.exports = router;