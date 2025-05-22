import { Button } from "../ui/button";

type UsuarioAPI = {
  id: number;
  username: string;
  email: string;
  regra?: string;
};

type TableUsuarioProps = {
  usuarios: UsuarioAPI[];
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
};

export default function TableUsuario({ usuarios = [], onEditar, onExcluir }: TableUsuarioProps) {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-black text-left border-b border-orange-400">
            <th className="px-4 py-2 font-bold text-base">ID</th>
            <th className="px-4 py-2 font-bold text-base">Usuário</th>
            <th className="px-4 py-2 font-bold text-base">Email</th>
            <th className="px-4 py-2 font-bold text-base">Regra</th>
            <th className="px-4 py-2 font-bold text-base">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {usuarios.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-none text-left">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.regra || "-"}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button
                  onClick={e => {
                    e.preventDefault();
                    onEditar(user.id);
                  }}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Editar
                </Button>
                <Button
                  onClick={e => {
                    e.preventDefault();
                    onExcluir(user.id);
                  }}
                  className="text-red-600 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}