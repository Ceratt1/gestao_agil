"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Filter,
  Search,
  X,
} from "lucide-react"
import { Produtos } from "@/@types/Produtos"
import { UUIDTypes } from "uuid"
import { Categoria } from "@/@types/Categoria.enum"

export default function CatalogoHome() {
  const [produtos, setProdutos] = useState<Produtos[]>([])
  const [filteredProdutos, setFilteredProdutos] = useState<Produtos[]>([])
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria>(Categoria.TODAS)
  const [precoRange, setPrecoRange] = useState<[number, number]>([0, 4000])
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredId, setHoveredId] = useState<UUIDTypes | null>(null)

  // Busca produtos do backend ao montar
  useEffect(() => {
    fetch("/api/catalogo")
      .then(res => res.json())
      .then(data => {
        // Mapeia os campos da API para o seu tipo Produtos
        const produtosApi: Produtos[] = data.produtos.map((p: any) => ({
          uuid: p.id,
          nome: p.titulo,
          imagemCaminho: p.caminho_imagem || "/placeholder4.jpg",
          whatsappLink: `https://wa.me/555197274193?text=Tenho%20interesse%20no%20${encodeURIComponent(p.titulo)}`,
          preco: Number(p.valor),
          categoria: p.categoria || Categoria.TODAS,
          descricao: p.descricao,
        }))
        setProdutos(produtosApi)
        setFilteredProdutos(produtosApi)
        // Ajusta faixa de preço inicial
        if (produtosApi.length > 0) {
          const min = Math.min(...produtosApi.map(p => p.preco))
          const max = Math.max(...produtosApi.map(p => p.preco))
          setPrecoRange([min, max])
        }
      })
      .catch(() => {
        setProdutos([])
        setFilteredProdutos([])
      })
  }, [])

  // Atualiza filtros
  useEffect(() => {
    let result = [...produtos]

    if (categoriaFiltro !== Categoria.TODAS) {
      result = result.filter((p) => p.categoria === categoriaFiltro)
    }

    result = result.filter((p) => p.preco >= precoRange[0] && p.preco <= precoRange[1])

    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof p.categoria === "string" && p.categoria.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProdutos(result)
  }, [categoriaFiltro, precoRange, searchTerm, produtos])

  // Use as categorias do enum Categoria
  const categorias = Object.values(Categoria)
  const minPreco = produtos.length > 0 ? Math.min(...produtos.map((p) => p.preco)) : 0
  const maxPreco = produtos.length > 0 ? Math.max(...produtos.map((p) => p.preco)) : 4000

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 ml-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar relógios..."
                  className="px-4 py-2 pr-10 rounded-md bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className={`bg-white py-4 transition-all duration-300 ${showFilters ? "block" : "hidden"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categorias</label>
              <Select value={categoriaFiltro} onValueChange={(value) => setCategoriaFiltro(value as Categoria)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent className="w-full bg-black text-white">
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Faixa de Preço</label>
                <span className="text-sm text-gray-500">
                  {formatarPreco(precoRange[0])} - {formatarPreco(precoRange[1])}
                </span>
              </div>
              <Slider
                defaultValue={[minPreco, maxPreco]}
                min={minPreco}
                max={maxPreco}
                step={100}
                value={precoRange}
                onValueChange={(value) => setPrecoRange(value as [number, number])}
                className="w-full bg-gray-400 rounded-md"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-2 md:mt-0"
              onClick={() => {
                setCategoriaFiltro(Categoria.TODAS)
                setPrecoRange([minPreco, maxPreco])
                setSearchTerm("")
              }}
            >
              <X className="h-4 w-4 mr-2" onClick={() => setPrecoRange([minPreco, maxPreco])} />
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>

      <section className="py-12 container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Nossos Relógios
            <span className="text-gray-500 ml-2 text-lg">({filteredProdutos.length} produtos)</span>
          </h2>
        </div>

        {filteredProdutos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">Nenhum produto encontrado com os filtros selecionados.</p>
            <Button
              variant="link"
              onClick={() => {
                setCategoriaFiltro(Categoria.TODAS)
                setPrecoRange([minPreco, maxPreco])
                setSearchTerm("")
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProdutos.map((produto) => (
              <div
                key={produto.uuid.toString()}
                className={`group relative overflow-hidden rounded-xl bg-white transition-all duration-500 ${
                  hoveredId === produto.uuid ? "shadow-2xl" : "shadow-md"
                }`}
                onMouseEnter={() => setHoveredId(produto.uuid)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                      {produto.categoria}
                    </span>
                  </div>
                  <img
                    src={produto.imagemCaminho || "/placeholder.svg"}
                    alt={produto.nome}
                    className="object-cover transition-transform duration-700 group-hover:scale-110 mx-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <a
                      href={produto.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center text-white bg-black px-4 py-2 rounded-md hover:bg-white hover:text-black text-center w-full h-full"
                      style={{ minHeight: "40px" }}
                    >
                      <span className="w-full text-center">Conversar no WhatsApp</span>
                    </a>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-black">{produto.nome}</h3>
                  <p className="text-sm text-gray-600 mt-1">{formatarPreco(produto.preco)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}