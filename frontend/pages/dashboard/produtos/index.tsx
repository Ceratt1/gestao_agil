import { useEffect, useRef, useState } from "react";
import AdminNavs from "@/components/admin/AdminNavs";
import Table from "@/components/admin/Table";
import AdminProductForm from "@/components/admin/AdminProductForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DashboardGuard from "@/components/admin/DashboardGuard"; // <-- importe o guard

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
  const popoverRef = useRef<HTMLDivElement>(null);
  const [produtos, setProdutos] = useState<ProdutoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [produtoEditando, setProdutoEditando] = useState<ProdutoAPI | null>(null);

  useEffect(() => {
    fetchProdutos();
  }, []);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        fecharEdicao();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProdutos = () => {
    setLoading(true);
    fetch("/api/produtos_lista")
      .then(res => res.json())
      .then(data => {
        setProdutos(data.produtos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleEditar = (id: number) => {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
      setProdutoEditando(produto);
    }
  };

  const handleExcluir = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
    await fetch(`/api/produtos?id=${id}`, { method: "DELETE" });
    fetchProdutos();
  };

  const fecharEdicao = () => setProdutoEditando(null);

  return (
    <DashboardGuard>
      <AdminNavs page="Produtos">
        <main>
          <div className="md:mx-0 md:my-4 lg:m-4">
            <div className="flex justify-between items-center text-black p-4 bg-white m-px rounded-t-lg">
              <p className="text-2xl font-light tracking-tight text-black">Tabela de produtos</p>
              <Button onClick={() => setProdutoEditando({
                  id: 0,
                  titulo: "",
                  valor: "",
                  descricao: "",
                  caminho_imagem: "",
                  categoria: "",
                })} className="rounded-full bg-orange-400 text-white hover:bg-orange-300 cursor-pointer"><Plus /></Button>
            </div>
            <div className="p-4 rounded-b-lg  bg-white  ">
              {loading ? (
                <div className="text-center mt-6">Carregando...</div>
              ) : (
                <Table produtos={produtos} onEditar={handleEditar} onExcluir={handleExcluir}/>
              )}
            </div>
          </div>

          {produtoEditando && (
            <>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30">
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-2 w-48 rounded-lg bg-white shadow-lg w-sm" ref={popoverRef}>
                <div className="p-4 text-sm text-gray-700">
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
            </>
          )}
        </main>
      </AdminNavs>
    </DashboardGuard>
  );
}