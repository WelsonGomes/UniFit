export interface PessoaDTO {
    id: number;
    codigo: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    datanascimento: Date;
    sexo?: string | null;
    tipofisicoid?: number;
    tipofisico?: TipofisicoDTO | null;
    nivelatividadeid?: number;
    nivelatividade?: NivelatividadeDTO | null;
    objetivoid?: number;
    objetivo?: ObjetivoDTO | null;
    situacao: string;
    tipopessoaid?: number;
    tipopessoa: TipopessoaDTO;
    professorid?: number | null;
    contato: ContatoDTO;
    endereco?: EnderecoDTO | null;
    usuario: UsuarioDTO;
}

export interface TipofisicoDTO {
    id: number | null;
    descricao: string | null;
}

export interface NivelatividadeDTO {
    id: number | null;
    descricao: string | null;
}

export interface ObjetivoDTO {
    id: number | null;
    descricao: string | null;
}

export interface TipopessoaDTO {
    id: number | null;
    descricao: string | null;
}

export interface ContatoDTO {
    id: number;
    pessoaid: number;
    telefone?: string | null;
    celular?: string | null;
    email: string;
}

export interface EnderecoDTO {
    id: number;
    pessoaid: number;
    cep: string;
    rua: string;
    numero?: string | null;
    cidadeid: number;
    bairro: string;
    estadoid: number;
    complemento: string;
}

export interface PaginatedResponse<T> {
    page: number;
    pageSize: number;
    total: number;
    data: T[];
}

export interface UsuarioDTO {
    id: number;
    pessoaid: number;
    permissao: string;
    usuario: string;
    password: string;
    dtacadastro: Date;
    situacao: number;
}

export interface LoginDTO {
    user: string;
    password: string;
}

export interface UsuarioLoginDTO {
    pessoaid: number;
    nome: string;
    cliente: string;
    permissao: string;
}

export function converteUsuario(usuario: any): UsuarioLoginDTO {
    const usuarioLoginDTO: UsuarioLoginDTO = {
        pessoaid: usuario.pessoaid,
        nome: usuario.pessoa.nome + ' ' + usuario.pessoa.sobrenome,
        cliente: usuario.cliente,
        permissao: usuario.permissao
    };
    return usuarioLoginDTO;
}

export interface UsuarioLogadoDTO {
    id: number;
    nome: string;
    tipo: string;
    token: string;
}

export interface ExercicioDTO {
    nome: string;
    descricao: string;
    execucao: string;
    equipamento?: string | null;
    grupomuscular: string;
    imagemurl?: string | null;
}

export interface TreinoDTO {
    
}