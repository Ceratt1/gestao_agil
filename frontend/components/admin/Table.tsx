type ProdutoAPI = {
  id: number;
  titulo: string;
  valor: string;
  categoria?: string;
  url_editar: string;
  url_excluir: string;
  // outros campos se quiser
};

type TableProps = {
  produtos: ProdutoAPI[];
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
};

export default function Table({ produtos, onEditar, onExcluir }: TableProps) {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-black text-left border-b border-orange-400">
            <th className="px-4 py-2 font-bold text-base">ID</th>
            <th className="px-4 py-2 font-bold text-base">Nome</th>
            <th className="px-4 py-2 font-bold text-base">Preço</th>
            <th className="px-4 py-2 font-bold text-base">Categoria</th>
            <th className="px-4 py-2 font-bold text-base">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {produtos.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-none text-left">
              <td className="px-4 py-2">{emp.id}</td>
              <td className="px-4 py-2">{emp.titulo}</td>
              <td className="px-4 py-2">{Number(emp.valor).toFixed(2)}</td>
              <td className="px-4 py-2">{emp.categoria || "-"}</td>
              <td className="px-4 py-2 flex gap-2">
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    onEditar(emp.id);
                  }}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Editar
                </a>
                 <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    onExcluir(emp.id);
                  }}
                  className="text-red-600 hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Excluir
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}