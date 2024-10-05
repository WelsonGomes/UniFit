"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
const peopleController_1 = require("./controller/peopleController");
const exerciseController_1 = require("./controller/exerciseController");
const userController_1 = require("./controller/userController");
dotenv_1.default.config();
/************************Rota de Professor******************************************** */
router.post('/admin', peopleController_1.createPeople);
router.get('/admin', peopleController_1.selectPeople);
router.put('/admin', peopleController_1.updatePeople);
router.delete('/admin', peopleController_1.deletePeople);
/************************Rota de Professor******************************************** */
router.post('/professor', peopleController_1.createPeople);
router.get('/professor', peopleController_1.selectPeople);
router.put('/professor', peopleController_1.updatePeople);
router.delete('/professor', peopleController_1.deletePeople);
/************************Rota de Aluno*********************************************** */
router.post('/aluno', peopleController_1.createPeople);
router.get('/aluno', peopleController_1.selectPeople);
router.put('/aluno', peopleController_1.updatePeople);
router.delete('/aluno', peopleController_1.deletePeople);
/************************Rota de Exercício*********************************************** */
router.post('/exercicio', exerciseController_1.createExercise);
router.get('/exercicio', exerciseController_1.selectExercise);
router.put('/exercicio', exerciseController_1.updateExercise);
router.delete('/exercicio', exerciseController_1.deleteExercise);
/************************Rota de Usuário*********************************************** */
router.get('/usuario', userController_1.selectUser);
router.put('/usuario', userController_1.updateUser);
router.delete('/usuario', userController_1.deleteUser);
module.exports = router;
