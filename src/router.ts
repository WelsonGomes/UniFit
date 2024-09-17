import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
import { createPeople, selectPeople, updatePeople, deletePeople } from './controller/peopleController'
dotenv.config();

router.post('/professor', createPeople);
router.get('/professor', selectPeople);
router.put('/professor', updatePeople);
router.delete('/professor', deletePeople);

module.exports = router;