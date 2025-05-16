/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { ExternalLink, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Produtos } from "@/@types/Produtos"
import { UUIDTypes, v4 as uuidv4 } from "uuid"
import { Categoria } from "@/@types/Categoria.enum"

const products: Produtos[] = [
  {
    uuid: uuidv4(),
    nome: "Chronograph Classic",
    preco: 1299.99,
    imagemCaminho: "/placeholder3.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Olá,%20tenho%20interesse%20no%20Chronograph%20Classic",
    categoria: Categoria.PULSO,
  },{
    uuid: uuidv4(),
    nome: "Chronograph Classic",
    preco: 1299.99,
    imagemCaminho: "/placeholder3.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Olá,%20tenho%20interesse%20no%20Chronograph%20Classic",
    categoria: Categoria.PULSO,
  },{
    uuid: uuidv4(),
    nome: "Chronograph Classic",
    preco: 1299.99,
    imagemCaminho: "/placeholder3.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Olá,%20tenho%20interesse%20no%20Chronograph%20Classic",
    categoria: Categoria.PULSO,
  },{
    uuid: uuidv4(),
    nome: "Chronograph Classic",
    preco: 1299.99,
    imagemCaminho: "/placeholder3.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Olá,%20tenho%20interesse%20no%20Chronograph%20Classic",
    categoria: Categoria.PULSO,
  },
]

export default function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<UUIDTypes | null>(null)

  return (
    <section id="produtos" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light tracking-tight text-black md:text-5xl mb-4">
            Nossa <span className="font-semibold">Coleção</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada relógio é cuidadosamente selecionado para oferecer o melhor em design e funcionalidade. Descubra peças
            que combinam tradição e inovação.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.uuid.toString()}
              className={`group relative overflow-hidden rounded-xl bg-white transition-all duration-500 ${
                hoveredId === product.uuid ? "shadow-2xl" : "shadow-md"
              }`}
              onMouseEnter={() => setHoveredId(product.uuid)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                    {product.categoria}
                  </span>
                </div>

                <img
                  src={product.imagemCaminho || "/placeholder.svg"}
                  alt={product.nome}
                  className="object-cover transition-transform duration-700 group-hover:scale-110 mx-auto"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <a
                    href={product.whatsappLink}
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
                <h3 className="mb-2 text-lg font-medium text-black">{product.nome}</h3>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-black">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.preco)}
                  </p>

                  <a
                    href={product.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full bg-gray-100 p-2 text-black transition-colors hover:bg-gray-200"
                    aria-label={`Mais informações sobre ${product.nome}`}
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
            <a
              href="/catalogo"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              
              Ver Catálogo Completo
              <ArrowRight size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
