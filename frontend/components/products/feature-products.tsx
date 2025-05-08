"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Product type definition
type Product = {
  id: number
  name: string
  price: number
  image: string
  whatsappLink: string
  category: string
}

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Chronograph Classic",
    price: 1299.99,
    image: "/placeholder.svg?height=400&width=400",
    whatsappLink: "https://wa.me/5500000000000?text=Olá,%20tenho%20interesse%20no%20Chronograph%20Classic",
    category: "Luxo",
  },
  {
    id: 2,
    name: "Silver Automatic",
    price: 2499.99,
    image: "/placeholder.svg?height=400&width=400",
    whatsappLink: "https://wa.me/5500000000000?text=Olá,%20tenho%20interesse%20no%20Silver%20Automatic",
    category: "Premium",
  },
  {
    id: 3,
    name: "SmartTime Elite",
    price: 1899.99,
    image: "/placeholder.svg?height=400&width=400",
    whatsappLink: "https://wa.me/5500000000000?text=Olá,%20tenho%20interesse%20no%20SmartTime%20Elite",
    category: "Smart",
  },
  {
    id: 4,
    name: "Golden Elegance",
    price: 1599.99,
    image: "/placeholder.svg?height=400&width=400",
    whatsappLink: "https://wa.me/5500000000000?text=Olá,%20tenho%20interesse%20no%20Golden%20Elegance",
    category: "Feminino",
  },
]

export default function FeaturedProducts() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
              key={product.id}
              className={`group relative overflow-hidden rounded-xl bg-white transition-all duration-500 ${
                hoveredId === product.id ? "shadow-2xl" : "shadow-md"
              }`}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                    {product.category}
                  </span>
                </div>

                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                <h3 className="mb-2 text-lg font-medium text-black">{product.name}</h3>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-black">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(product.price)}
                  </p>

                  <a
                    href={product.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full bg-gray-100 p-2 text-black transition-colors hover:bg-gray-200"
                    aria-label={`Mais informações sobre ${product.name}`}
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
      </div>
    </section>
  )
}
