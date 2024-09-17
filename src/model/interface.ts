export interface PessoaDTO {
    id: number;
    codigo: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    datanascimento: Date;
    sexo: number;
    tipofisico?: TipofisicoDTO | null;
    nivelatividade?: NivelatividadeDTO | null;
    objetivo?: ObjetivoDTO | null;
    situacao: number;
    tipopessoaid?: number;
    tipopessoa: TipopessoaDTO;
    contato?: ContatoDTO | null;
    endereco?: EnderecoDTO | null;
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
    email?: string | null;
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