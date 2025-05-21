import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ProdutoAPI } from '@/@types/ProdutoAPI';

const categoriasExemplo = [
  'Bolso', 'Mesa', 'Parede', 'Pulso', 'Torre',
  'Todas', 'Corda', 'Automatico', 'Bateria', 'Solar', 'Quartzo'
];

type ProductFormProps = {
  produto: ProdutoAPI;
  onSubmit: () => void;
};
 
export default function AdminProductForm({produto, onSubmit}: ProductFormProps) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const payload = {
            nome: (form.elements.namedItem('nome') as HTMLInputElement)?.value || '',
            descricao: (form.elements.namedItem('descricao') as HTMLInputElement)?.innerText || '',
            preco: (form.elements.namedItem('preco') as HTMLInputElement)?.value || '',
            imagem: (form.elements.namedItem('imagem') as HTMLInputElement)?.value || '',
            categoria: (form.elements.namedItem('categoria') as HTMLSelectElement)?.value || '',
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
                <Input
                    type="text"
                    id="nome"
                    name="nome"
                    className="bg-white w-full text-black border border-gray-300"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preço</label>
                <Input
                    type="number"
                    name="preco"
                    className="bg-white w-full text-black border border-gray-300"
                    step="0.01"
                    required
                />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
              <textarea
                name="descricao"
                className="bg-white w-full text-black border border-gray-300"
              />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Imagem</label>
                <Input
                    type="file"
                    name="imagem"
                    className="bg-white w-full text-black border border-gray-300"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                <select
                    name="categoria"
                    className="mt-1 block w-full h-10 px-4 py-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
                    required
                >
                    <option value="">Selecione uma categoria</option>
                        {categoriasExemplo.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                </select>
            </div>

            <Button type="submit" className='bg-black cursor-pointer text-white'>Enviar</Button>
        </form>
    )
}
