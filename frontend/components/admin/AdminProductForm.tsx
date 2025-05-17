import { useState, useEffect } from "react";

type ProdutoAPI = {
  id?: number;
  titulo?: string;
  valor?: string;
  descricao?: string;
  caminho_imagem?: string;
};

export default function AdminProductForm({
  produto,
  onSubmit,
}: {
  produto?: ProdutoAPI | null;
  onSubmit: () => void;
}) {
  const [titulo, setTitulo] = useState(produto?.titulo || "");
  const [valor, setValor] = useState(produto?.valor || "");
  const [descricao, setDescricao] = useState(produto?.descricao || "");
  const [caminho_imagem, setCaminhoImagem] = useState(produto?.caminho_imagem || "");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitulo(produto?.titulo || "");
    setValor(produto?.valor || "");
    setDescricao(produto?.descricao || "");
    setCaminhoImagem(produto?.caminho_imagem || "");
  }, [produto]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("valor", valor);
    formData.append("descricao", descricao);
    formData.append("caminho_imagem", caminho_imagem);

    const url = produto?.id
      ? `http://localhost:8000/api/produtos/${produto.id}/`
      : "http://localhost:8000/api/produtos/";
    const method = produto?.id ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
      });

      if (response.ok) {
        setMensagem(produto?.id ? "Produto atualizado!" : "Produto cadastrado!");
        onSubmit();
      } else {
        const data = await response.json();
        setMensagem(data.detail || data.error || "Erro ao salvar produto.");
      }
    } catch {
      setMensagem("Erro ao salvar produto.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-1">Nome</label>
        <input
          type="text"
          name="titulo"
          className="bg-white w-full text-black border border-gray-300"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-md font-semibold text-gray-700 mb-1">Preço</label>
        <input
          type="number"
          name="valor"
          className="bg-white w-full text-black border border-gray-300"
          step="0.01"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
        <input
          type="text"
          name="descricao"
          className="bg-white w-full text-black border border-gray-300"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Caminho da Imagem</label>
        <input
          type="text"
          name="caminho_imagem"
          className="bg-white w-full text-black border border-gray-300"
          value={caminho_imagem}
          onChange={e => setCaminhoImagem(e.target.value)}
        />
      </div>
      <button type="submit" className='bg-black cursor-pointer text-white py-2 rounded' disabled={loading}>
        {loading ? "Salvando..." : produto?.id ? "Salvar alterações" : "Cadastrar"}
      </button>
      {mensagem && <span className="text-center text-red-500">{mensagem}</span>}
    </form>
  );
}