"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = middleware;
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("./prisma");
dotenv_1.default.config();
function middleware(req, res, next) {
    console.log('verificando cliente na requisição');
    const schema = req.query.schema;
    console.log('Cliente request: ' + schema);
    if (!schema) {
        return res.status(400).json({ error: 'Cliente não definido...' });
    }
    ;
    req.prisma = (0, prisma_1.getPrismaClient)(schema);
    next();
}
