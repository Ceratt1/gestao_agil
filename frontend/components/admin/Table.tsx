type ProdutoAPI = {
  id: number;
  titulo: string;
  valor: string;
  // adicione outros campos se quiser
};

export default function Table({ produtos }: { produtos: ProdutoAPI[] }) {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-black text-left border-b border-orange-400">
            <th className="px-4 py-2 font-bold text-base">ID</th>
            <th className="px-4 py-2 font-bold text-base">Nome</th>
            <th className="px-4 py-2 font-bold text-base">Preço</th>
            <th className="px-4 py-2 font-bold text-base">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {produtos.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-none text-left">
              <td className="px-4 py-2">{emp.id}</td>
              <td className="px-4 py-2">{emp.titulo}</td>
              <td className="px-4 py-2">{Number(emp.valor).toFixed(2)}</td>
              <td className="px-4 py-2 flex gap-1">
                {/* Botões de ação */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}