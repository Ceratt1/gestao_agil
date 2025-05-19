import { useState, useEffect } from "react";

// As categorias disponíveis, iguais ao seu model Django
const categorias = [
  "Bolso",
  "Mesa",
  "Parede",
  "Pulso",
  "Torre",
  "Todas",
  "Corda",
  "Automatico",
  "Bateria",
  "Solar",
  "Quartzo",
];

type ProdutoAPI = {
  id?: number;
  titulo?: string;
  valor?: string;
  descricao?: string;
  caminho_imagem?: string;
  categoria?: string;
};

type Props = {
  produto: ProdutoAPI;
  onSubmit: () => void;
};

export default function AdminProductForm({ produto, onSubmit }: Props) {
  const [titulo, setTitulo] = useState(produto.titulo || "");
  const [valor, setValor] = useState(produto.valor || "");
  const [descricao, setDescricao] = useState(produto.descricao || "");
  const [caminhoImagem, setCaminhoImagem] = useState(produto.caminho_imagem || "");
  const [categoria, setCategoria] = useState(produto.categoria || "Todas");

  useEffect(() => {
    setTitulo(produto.titulo || "");
    setValor(produto.valor || "");
    setDescricao(produto.descricao || "");
    setCaminhoImagem(produto.caminho_imagem || "");
    setCategoria(produto.categoria || "Todas");
  }, [produto]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const payload = {
    titulo,
    valor,
    descricao,
    caminho_imagem: caminhoImagem,
    categoria,
  };

  const method = produto.id ? "PUT" : "POST";
  // Use a rota interna da API do Next.js
  const url = produto.id
    ? `/api/produtos?id=${produto.id}`
    : "/api/produtos";

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  onSubmit();
};
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
        <input
          type="text"
          className="bg-white w-full text-black border border-gray-300"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Valor</label>
        <input
          type="number"
          className="bg-white w-full text-black border border-gray-300"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
        <textarea
          className="bg-white w-full text-black border border-gray-300"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Caminho da Imagem</label>
        <input
          type="text"
          className="bg-white w-full text-black border border-gray-300"
          value={caminhoImagem}
          onChange={e => setCaminhoImagem(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
        <select
          className="bg-white w-full text-black border border-gray-300"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          required
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Salvar
      </button>
    </form>
  );
}