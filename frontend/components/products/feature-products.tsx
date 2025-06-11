import { useState, useEffect } from "react"
import { ExternalLink, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

type ProdutoAPI = {
  id: string | number
  titulo: string
  descricao: string
  valor: string
  imagens?: { id: string | number; imagem: string }[] // Suporta múltiplas imagens
  imagem?: string // Suporte legado/caso venha só uma imagem
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProdutoAPI[]>([])
  const [hoveredId, setHoveredId] = useState<string | number | null>(null)
  const [loadingId, setLoadingId] = useState<string | number | null>(null)
  const [carouselIndexes, setCarouselIndexes] = useState<{ [key: string]: number }>({})

  // Carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndexes(prev => {
        const updated: typeof prev = { ...prev }
        products.forEach(product => {
          const imagensLength = product.imagens?.length || 0
          if (imagensLength > 1) {
            const current = prev[product.id] || 0
            updated[product.id] = (current + 1) % imagensLength
          }
        })
        return updated
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [products])

  // Função para buscar o link do WhatsApp do backend e redirecionar
  const handleComprarAgora = async (produtoId: string | number) => {
    setLoadingId(produtoId)
    try {
      const res = await fetch(`/api/link_pagamento_whatsapp?produtoId=${produtoId}`)
      const data = await res.json()
      if (data.link) {
        window.open(data.link, "_blank")
      } else {
        alert(data.error || "Erro ao gerar link do WhatsApp.")
      }
    } catch {
      alert("Erro ao gerar link do WhatsApp.")
    }
    setLoadingId(null)
  }

  useEffect(() => {
    fetch("/api/produtos")
      .then(res => res.json())
      .then(data => setProducts(data.produtos))
      .catch(() => setProducts([]))
  }, [])

  return (
    <section id="produtos" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden rounded-xl bg-white transition-all duration-500 ${
                hoveredId === product.id ? "shadow-2xl" : "shadow-md"
              }`}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                {/* Carrossel de imagens com bolinhas e transição suave */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {product.imagens && product.imagens.length > 0 ? (
                    <>
                      {product.imagens.map((img, idx) => (
                        <img
                          key={img.id}
                          src={img.imagem}
                          alt={product.titulo}
                          className={`object-cover transition-opacity duration-700 absolute inset-0 w-full h-full mx-auto ${
                            idx === (carouselIndexes[product.id] || 0) ? "opacity-100 z-10" : "opacity-0 z-0"
                          }`}
                          style={{ pointerEvents: idx === (carouselIndexes[product.id] || 0) ? "auto" : "none" }}
                        />
                      ))}
                      {/* Bolinhas */}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
                        {product.imagens.map((img, idx) => (
                          <button
                            key={img.id}
                            className={`w-3 h-3 rounded-full ${idx === (carouselIndexes[product.id] || 0) ? "bg-black" : "bg-gray-300"} border border-white`}
                            style={{ outline: "none" }}
                            onClick={() =>
                              setCarouselIndexes(prev => ({ ...prev, [product.id]: idx }))
                            }
                            aria-label={`Selecionar imagem ${idx + 1}`}
                            tabIndex={0}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <img
                      src={product.imagem || "/placeholder.svg"}
                      alt={product.titulo}
                      className="object-cover transition-transform duration-700 group-hover:scale-110 mx-auto w-full h-full"
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <Button
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                    onClick={() => handleComprarAgora(product.id)}
                    disabled={loadingId === product.id}
                  >
                    <ShoppingBag size={16} />
                    {loadingId === product.id ? "Carregando..." : "Comprar agora"}
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-medium text-black">{product.titulo}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.descricao}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-black">
                    {Number(product.valor).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                  <a
                    href={`https://wa.me/555197274193?text=Olá,%20tenho%20interesse%20no%20${encodeURIComponent(product.titulo)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full bg-gray-100 p-2 text-black transition-colors hover:bg-gray-200"
                    aria-label={`Mais informações sobre ${product.titulo}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800 px-8" size="lg">
            <Link
              href="/catalogo"
              className="flex items-center gap-2"
            >
              Ver catálogo de Produtos
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}