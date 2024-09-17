"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
const peopleController_1 = require("./controller/peopleController");
dotenv_1.default.config();
router.post('/professor', peopleController_1.createPeople);
router.get('/professor', peopleController_1.selectPeople);
router.put('/professor', peopleController_1.updatePeople);
router.delete('/professor', peopleController_1.deletePeople);
module.exports = router;
