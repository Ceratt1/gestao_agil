import { UUIDTypes } from "uuid";
import { Categoria } from "./Categoria.enum";

export type Produtos =  {
    uuid: UUIDTypes;
    nome: string;
    imagemCaminho: string;
    imagens: {
        id: string;
        imagem: string;
    }[];
    whatsappLink: string;
    preco: number;
    categoria: Categoria;
}