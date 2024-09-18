import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createPeople, selectPeople, updatePeople, deletePeople } from './controller/peopleController'
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

module.exports = router;