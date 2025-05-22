import { useEffect, useRef, useState } from "react";
import AdminNavs from "@/components/admin/AdminNavs";
import TableUsuarios from "@/components/admin/TableUsuario";
import AdminUsuarioForm from "@/components/admin/AdminUsuariosForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { fetchAuth } from "@/utils/fetchAuth";
import DashboardGuard from "@/components/admin/DashboardGuard"; // <-- importe o guard

type UsuarioAPI = {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  regra?: string;
  contato_whatsapp?: string;
};

export default function AdminUsuarios() {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [usuarios, setUsuarios] = useState<UsuarioAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioEditando, setUsuarioEditando] = useState<UsuarioAPI | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        fecharEdicao();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchUsuarios = () => {
    setLoading(true);
    fetch("/api/usuarios_lista")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data.usuarios);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleEditar = (id: string) => {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
      setUsuarioEditando(usuario);
    }
  };

  const handleExcluir = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    const response = await fetchAuth(`/api/usuarios_lista?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchUsuarios();
    } else {
      alert("Erro ao excluir usuário");
    }
  };

  const fecharEdicao = () => setUsuarioEditando(null);

  return (
    <DashboardGuard>
      <AdminNavs page="Usuários">
        <main>
          <div className="md:mx-0 md:my-4 lg:m-4">
            <div className="flex justify-between items-center text-black p-4 bg-white m-px rounded-t-lg">
              <p className="text-2xl font-light tracking-tight text-black">Tabela de usuários</p>
              <Button
                onClick={() => setUsuarioEditando({
                  id: "",
                  username: "",
                  email: "",
                  first_name: "",
                  last_name: "",
                  regra: "",
                  contato_whatsapp: "",
                })}
                className="rounded-full bg-orange-400 text-white hover:bg-orange-300 cursor-pointer"
              >
                <Plus />
              </Button>
            </div>
            <div className="p-4 rounded-b-lg bg-white">
              {loading ? (
                <div className="text-center mt-6">Carregando...</div>
              ) : (
                <TableUsuarios usuarios={usuarios} onEditar={handleEditar} onExcluir={handleExcluir} />
              )}
            </div>
          </div>

          {usuarioEditando && (
            <>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-2 w-48 rounded-lg bg-white shadow-lg w-sm"
                ref={popoverRef}
              >
                <div className="p-4 text-sm text-gray-700">
                  <button
                    onClick={fecharEdicao}
                    className="absolute top-2 right-2 text-xl"
                    aria-label="Fechar"
                  >
                    ×
                  </button>
                  <AdminUsuarioForm
                    usuario={usuarioEditando}
                    onSubmit={() => {
                      fecharEdicao();
                      fetchUsuarios();
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