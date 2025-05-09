"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search, X, ShoppingBag, ExternalLink, ArrowRight } from "lucide-react"

// Definição do tipo UUID
type UUIDTypes = string

// Definição do tipo Produtos conforme fornecido
export type Produtos = {
  uuid: UUIDTypes
  nome: string
  imagemCaminho: string
  whatsappLink: string
  preco: number
  categoria: string
}

// Dados de exemplo para o catálogo
const produtosExemplo: Produtos[] = [
  {
    uuid: "1",
    nome: "Elegance Classic",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Elegance%20Classic",
    preco: 1299.9,
    categoria: "Luxo",
  },
  {
    uuid: "2",
    nome: "Sport Pro",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Sport%20Pro",
    preco: 899.9,
    categoria: "Esportivo",
  },
  {
    uuid: "3",
    nome: "Minimalist",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Minimalist",
    preco: 599.9,
    categoria: "Casual",
  },
  {
    uuid: "4",
    nome: "Diamond Elite",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Diamond%20Elite",
    preco: 2499.9,
    categoria: "Luxo",
  },
  {
    uuid: "5",
    nome: "Urban Style",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Urban%20Style",
    preco: 799.9,
    categoria: "Casual",
  },
  {
    uuid: "6",
    nome: "Chronograph Master",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Chronograph%20Master",
    preco: 1899.9,
    categoria: "Esportivo",
  },
  {
    uuid: "7",
    nome: "Vintage Collection",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Vintage%20Collection",
    preco: 1099.9,
    categoria: "Vintage",
  },
  {
    uuid: "8",
    nome: "Smart Watch Pro",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Smart%20Watch%20Pro",
    preco: 1499.9,
    categoria: "Smart",
  },
  {
    uuid: "9",
    nome: "Diver 200m",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Diver%20200m",
    preco: 1699.9,
    categoria: "Esportivo",
  },
  {
    uuid: "10",
    nome: "Executive Gold",
    imagemCaminho: "/placeholder.svg?height=300&width=300",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Executive%20Gold",
    preco: 3299.9,
    categoria: "Luxo",
  },
]

export default function CatalogoHome() {
  const [produtos, setProdutos] = useState<Produtos[]>(produtosExemplo)
  const [filteredProdutos, setFilteredProdutos] = useState<Produtos[]>(produtosExemplo)
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("Todas")
  const [precoRange, setPrecoRange] = useState<[number, number]>([0, 4000])
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredId, setHoveredId] = useState<UUIDTypes | null>(null)

  // Obter todas as categorias únicas
  const categorias = ["Todas", ...Array.from(new Set(produtos.map((p) => p.categoria)))]

  // Preço mínimo e máximo para o slider
  const minPreco = Math.min(...produtos.map((p) => p.preco))
  const maxPreco = Math.max(...produtos.map((p) => p.preco))

  // Aplicar filtros quando os estados mudarem
  useEffect(() => {
    let result = [...produtos]

    // Filtrar por categoria
    if (categoriaFiltro !== "Todas") {
      result = result.filter((p) => p.categoria === categoriaFiltro)
    }

    // Filtrar por preço
    result = result.filter((p) => p.preco >= precoRange[0] && p.preco <= precoRange[1])

    // Filtrar por termo de busca
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredProdutos(result)
  }, [categoriaFiltro, precoRange, searchTerm, produtos])

  // Formatar preço para exibição
  const formatarPreco = (preco: number) => {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 md:mb-0">CHRONO ELEGANCE</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar relógios..."
                  className="px-4 py-2 pr-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
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

      {/* Filtros */}
      <div className={`bg-gray-100 py-4 transition-all duration-300 ${showFilters ? "block" : "hidden"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <Select value={categoriaFiltro} onValueChange={(value) => setCategoriaFiltro(value)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
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
                className="w-full"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-2 md:mt-0"
              onClick={() => {
                setCategoriaFiltro("Todas")
                setPrecoRange([minPreco, maxPreco])
                setSearchTerm("")
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Resultados */}
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
                setCategoriaFiltro("Todas")
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

                  {/* sim genio, eu conheço o image do next, mas estou com bugs... */}
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
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                    >
                      <ShoppingBag size={16} />
                      Comprar agora
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-lg font-medium text-black">{produto.nome}</h3>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-black">{formatarPreco(produto.preco)}</p>

                    <a
                      href={produto.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-full bg-gray-100 p-2 text-black transition-colors hover:bg-gray-200"
                      aria-label={`Mais informações sobre ${produto.nome}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800 px-8" size="lg">
            <a
              href="https://wa.me/555197274193?text=Olá,%20gostaria%20de%20ver%20mais%20produtos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Ver Catálogo Completo
              <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </section>

    
    </main>
  )
}
