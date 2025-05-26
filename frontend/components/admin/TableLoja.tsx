import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { fetchAuth } from "../../utils/fetchAuth";

type LojaAPI = {
  nome: string;
  descricao: string;
  whatsapp: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  horario_funcionamento: string;
  instagram: string;
  facebook: string;
};

export default function TableLoja() {
  const [loja, setLoja] = useState<LojaAPI | null>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Partial<LojaAPI>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 useEffect(() => {
  fetchAuth("/api/loja")
    .then(res => res.json())
    .then(data => setLoja(data));
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setForm(loja || {});
    setEdit(true);
  };

  const handleSave = async () => {
    await fetchAuth("/api/loja", {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setLoja({ ...(loja as LojaAPI), ...form });
    setEdit(false);
  };

  if (!mounted || !loja) return <div>Carregando...</div>;

  return (
    <div className="md:mx-0 md:my-4 lg:m-4">
      <div className="p-4 rounded-b-lg bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-black text-left border-b border-orange-400">
                <th className="px-4 py-2 font-bold text-base">Campo</th>
                <th className="px-4 py-2 font-bold text-base">Valor</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {Object.entries(loja)
                .filter(([key]) => key !== "id")
                .map(([key, value]) => (
                  <tr
                    key={key}
                    className="hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-none text-left"
                  >
                    <td className="px-4 py-2 font-semibold">{key}</td>
                    <td className="px-4 py-2">
                      {edit ? (
                        <Input
                          name={key}
                          value={form[key as keyof LojaAPI] ?? ""}
                          onChange={handleChange}
                          className="text-black"
                        />
                      ) : (
                        <span className="text-black">{value}</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-2">
          {edit ? (
            <Button onClick={handleSave} className="bg-black text-white">Salvar</Button>
          ) : (
            <Button onClick={handleEdit} className="bg-black text-white">Editar</Button>
          )}
          {edit && (
            <Button onClick={() => setEdit(false)} className="bg-gray-300 text-black">Cancelar</Button>
          )}
        </div>
      </div>
    </div>
  );
}