export type ProdutoAPI = {
  id: number;
  titulo: string;
  valor: string;
  descricao?: string;
  caminho_imagem?: string;
  imagens?: {
      id: string;
      imagem: string;
  }[];
  categoria?: string;
  url_editar?: string;
  url_excluir?: string;
};
