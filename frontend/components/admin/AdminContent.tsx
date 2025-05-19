import { useEffect, useState } from "react";
import Table from "./Table";
import AdminProductForm from "./AdminProductForm";

type ProdutoAPI = {
  id: number;
  titulo: string;
  valor: string;
  descricao?: string;
  caminho_imagem?: string;
  categoria?: string;
  url_editar?: string;
  url_excluir?: string;
};

export default function AdminContent() {
  const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [produtoEditando, setProdutoEditando] = useState<ProdutoAPI | null>(null);

  // Buscar produtos do backend (agora via API interna)
  const fetchProdutos = () => {
    setLoading(true);
    fetch("/api/produtos")
      .then(res => res.json())
      .then(data => {
        setProdutos(data.produtos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função chamada ao clicar em "Editar" (agora via API interna)
  const handleEditar = async (id: number) => {
    const res = await fetch(`/api/produtos?id=${id}`);
    const data = await res.json();
    setProdutoEditando(data);
  };

  // Fechar o formulário/modal de edição
  const fecharEdicao = () => setProdutoEditando(null);

  return (
    <main className="flex-1 p-6 bg-gray-300">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
          <p className="text-gray-600">Começar a fazer o crud aqui</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setProdutoEditando({
              id: 0,
              titulo: "",
              valor: "",
              descricao: "",
              caminho_imagem: "",
              categoria: "",
            })}
          >
            Novo Produto
          </button>
        </div>
        {loading ? (
          <div className="text-center mt-6">Carregando...</div>
        ) : (
          <Table produtos={produtos} onEditar={handleEditar} />
        )}

        {/* Formulário de edição em modal */}
        {produtoEditando && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-lg">
              <button
                onClick={fecharEdicao}
                className="absolute top-2 right-2 text-xl"
                aria-label="Fechar"
              >
                ×
              </button>
              <AdminProductForm
                produto={produtoEditando}
                onSubmit={() => {
                  fecharEdicao();
                  fetchProdutos();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}