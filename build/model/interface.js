"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converteUsuario = converteUsuario;
function converteUsuario(usuario) {
    const usuarioLoginDTO = {
        pessoaid: usuario.pessoaid,
        nome: usuario.pessoa.nome + ' ' + usuario.pessoa.sobrenome,
        cliente: usuario.cliente,
        permissao: usuario.permissao
    };
    return usuarioLoginDTO;
}
