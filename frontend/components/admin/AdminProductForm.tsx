import { useEffect, useState, useRef } from "react";
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ProdutoAPI } from '@/@types/ProdutoAPI';
import { fetchAuth } from "@/utils/fetchAuth";

const categoriasExemplo = [
  'Bolso', 'Mesa', 'Parede', 'Pulso', 'Torre',
  'Todas', 'Corda', 'Automatico', 'Bateria', 'Solar', 'Quartzo'
];

type ImagemProduto = {
  id: string;
  imagem: string;
  descricao?: string;
};

type ProductFormProps = {
  produto: ProdutoAPI;
  onSubmit: () => void;
};

export default function AdminProductForm({ produto, onSubmit }: ProductFormProps) {
  const [imagens, setImagens] = useState<ImagemProduto[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [showImagensMenu, setShowImagensMenu] = useState(false);

  // Carrega imagens ao abrir o menu de edição de imagens ou ao trocar de produto
  useEffect(() => {
    if (showImagensMenu && produto.id) {
      fetchAuth(`/api/produtos_lista?id=${produto.id}`)
        .then(res => res.json())
        .then(data => setImagens(data.imagens || []));
    }
  }, [showImagensMenu, produto.id]);

  // Excluir imagem existente
  const handleExcluirImagem = async (imagemId: string) => {
    await fetchAuth(`/api/imagem_produto/${imagemId}/`, { method: "DELETE" });
    setImagens(imagens.filter(img => img.id !== imagemId));
  };

  // Adicionar novas imagens (abre o input de arquivo)
  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  // Trocar imagem existente
  const handleEditImageClick = (imgId: string) => {
    setEditandoId(imgId);
    setTimeout(() => {
      editFileInputRef.current?.click();
    }, 100);
  };

  // Ao selecionar novo arquivo para editar imagem
  const handleEditFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editandoId || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imagem", file);
    await fetch(`/api/imagem_produto/${editandoId}/`, {
      method: "PATCH",
      body: formData,
    });
    // Atualiza galeria
    if (produto.id) {
      fetchAuth(`/api/produtos_lista?id=${produto.id}`)
        .then(res => res.json())
        .then(data => setImagens(data.imagens || []));
    }
    setEditandoId(null);
    e.target.value = ""; // limpa input
  };

  // Ao adicionar novas imagens
  const handleAddFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!produto.id || !e.target.files || e.target.files.length === 0) return;
    const formData = new FormData();
    formData.append("produto_id", String(produto.id));
    Array.from(e.target.files).slice(0, 5).forEach(file => formData.append("imagens", file));
    await fetch("/api/upload_imagem_produto", {
      method: "POST",
      body: formData,
    });
    // Atualiza galeria
    fetchAuth(`/api/produtos_lista?id=${produto.id}`)
      .then(res => res.json())
      .then(data => setImagens(data.imagens || []));
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // 1. Cria ou atualiza o produto
    const payload = {
      titulo: (form.elements.namedItem('nome') as HTMLInputElement)?.value || '',
      descricao: (form.elements.namedItem('descricao') as HTMLInputElement)?.value || '',
      valor: (form.elements.namedItem('preco') as HTMLInputElement)?.value || '',
      categoria: (form.elements.namedItem('categoria') as HTMLSelectElement)?.value || '',
    };

    let produtoId = produto.id;
    if (!produto.id) {
      // Criação
      const res = await fetchAuth("/api/produtos_lista", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      produtoId = data.id;
    } else {
      // Atualização
      await fetchAuth(`/api/produtos_lista?id=${produto.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    }

    // 2. Upload das imagens (se houver)
    const files = (form.elements.namedItem('imagens') as HTMLInputElement)?.files;
    if (files && files.length > 0 && produtoId) {
      const formData = new FormData();
      formData.append("produto_id", String(produtoId));
      Array.from(files).slice(0, 5).forEach(file => formData.append("imagens", file));
      await fetch("/api/upload_imagem_produto", {
        method: "POST",
        body: formData,
      });
    }

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
          defaultValue={produto.titulo || ""}
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
          defaultValue={produto.valor || ""}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
        <textarea
          name="descricao"
          className="bg-white w-full text-black border border-gray-300"
          defaultValue={produto.descricao || ""}
        />
      </div>

      {/* Botão para abrir submenu de edição de imagens */}
      {Boolean(produto.id) && (
        <div>
          <Button
            type="button"
            className="mb-2 bg-gray-700 text-white"
            onClick={() => setShowImagensMenu(v => !v)}
          >
            {showImagensMenu ? "Fechar edição de imagens" : "Editar imagens"}
          </Button>
          {showImagensMenu && (
            <div className="mb-4 p-3 border rounded bg-gray-50">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Imagens do produto</label>
              <div className="flex gap-4 flex-wrap">
                {imagens.map(img => (
                  <div key={img.id} className="relative group w-28 h-28">
                    <img
                      src={
                        img.imagem.startsWith("http")
                          ? `${img.imagem.replace(/\\/g, "/")}?v=${img.id}`
                          : `/media/${img.imagem.replace(/\\/g, "/").replace(/^\/?media\/?/, "")}?v=${img.id}`
                      }
                      alt=""
                      className="w-full h-full object-cover rounded border"
                    />
                    {/* Botão Excluir */}
                    <button
                      type="button"
                      onClick={() => handleExcluirImagem(img.id)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs opacity-80 hover:opacity-100"
                      title="Excluir imagem"
                    >🗑️</button>
                 
                   
                  </div>
                ))}
                {/* Botão para adicionar nova imagem */}
                <div
                  className="w-28 h-28 flex items-center justify-center border-2 border-dashed rounded cursor-pointer hover:bg-gray-100"
                  onClick={handleAddImageClick}
                  title="Adicionar nova imagem"
                >
                  <span className="text-3xl text-gray-400">+</span>
                  <Input
                    type="file"
                    name="imagens"
                    className="hidden"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAddFileChange}
                  />
                </div>
                {/* Input oculto para editar imagem */}
                <Input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={editFileInputRef}
                  onChange={handleEditFileChange}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Caso não esteja editando, mostra o input normalmente */}
      {!produto.id && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Imagens (até 5)</label>
          <Input
            type="file"
            name="imagens"
            className="bg-white w-full text-black border border-gray-300"
            multiple
            accept="image/*"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
        <select
          name="categoria"
          className="mt-1 block w-full h-10 px-4 py-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
          required
          defaultValue={produto.categoria || ""}
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