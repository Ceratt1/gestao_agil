import { UUIDTypes } from "uuid";

export type Produtos =  {
    uuid: UUIDTypes;
    nome: string;
    imagemCaminho: string;
    whatsappLink: string;
    preco: number;
    categoria: string;
}