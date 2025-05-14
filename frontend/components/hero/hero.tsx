"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"

export default function Hero() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedTime = currentTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70"></div>
        <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center opacity-100 mix-blend-overlay"></div>
        </div>

      <div className="container relative z-10 mx-auto px-4 py-28 md:py-40">
        <div className="flex flex-col items-center md:items-start max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm mb-8">
            <Clock size={16} className="text-gray-300" />
            <span className="text-sm font-medium text-gray-300">{formattedTime}</span>
          </div>

          <h1 className="mb-6 text-center md:text-left text-4xl font-light tracking-tight md:text-6xl lg:text-7xl">
            O tempo é <span className="font-semibold">precioso</span>.<br />
            Seu relógio também deve ser.
          </h1>

          <p className="mb-10 text-center md:text-left text-lg text-gray-300 md:text-xl max-w-2xl">
            Descubra nossa coleção exclusiva de relógios que combinam design sofisticado com a mais alta qualidade.
            Peças que transcendem o tempo.
          </p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <Button className="group bg-white text-black hover:bg-gray-200 rounded-full px-8" size="lg" asChild>
              <a href="#produtos" className="flex items-center gap-2">
                Ver Coleção
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              variant="outline"
              className="border-white text-black hover:bg-white/10 rounded-full px-8"
              size="lg"
              asChild
            >
              <a
                href="https://wa.me/555197274193?text=Olá, vim pelo seu novo site!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Fale Conosco
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}
