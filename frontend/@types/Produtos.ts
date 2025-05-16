import { UUIDTypes } from "uuid";
import { Categoria } from "./Categoria.enum";

export type Produtos =  {
    uuid: UUIDTypes;
    nome: string;
    imagemCaminho: string;
    whatsappLink: string;
    preco: number;
    categoria: Categoria;
}