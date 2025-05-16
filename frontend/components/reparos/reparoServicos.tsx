"use client"

import { Clock, Watch, Shield, Sparkles, Link, Battery, Droplets, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WatchRepairServices() {
  const services = [
    {
      name: "Restauração",
      icon: <Sparkles className="h-10 w-10" />,
      description: "Recuperação completa de relógios antigos ou danificados mecanicamente.",
    },
    {
      name: "Folheação de caixa",
      icon: <Shield className="h-10 w-10" />,
      description: "Renovação da camada externa da caixa do relógio.",
    },
    {
      name: "Polimento de vidro",
      icon: <Clock className="h-10 w-10" />,
      description: "Remoção de arranhões e marcas do vidro do relógio.",
    },
    {
      name: "Troca de pulseira",
      icon: <Link className="h-10 w-10" />,
      description: "Substituição e ajuste de pulseiras de diversos materiais.",
    },
    {
      name: "Troca de coroas",
      icon: <Watch className="h-10 w-10" />,
      description: "Substituição de coroas danificadas ou desgastadas.",
    },
    {
      name: "Substituição de bateria",
      icon: <Battery className="h-10 w-10" />,
      description: "Troca de baterias com garantia de serviço.",
    },
    {
      name: "Vedações",
      icon: <Droplets className="h-10 w-10" />,
      description: "Reposição de vedações para proteção contra água e poeira.",
    },
    {
      name: "Revisão de mecanismos",
      icon: <Settings className="h-10 w-10" />,
      description: "Manutenção completa do mecanismo interno do relógio.",
    },
  ]

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-black">Serviços da <span className="text-orange-400">ATRmundial</span></h1>
          <p className="mx-auto max-w-2xl text-lg text-black">
            Especialistas em restauração e manutenção de relógios finos com técnicas tradicionais e tecnologia moderna.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-50 p-6 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,128,0,0.3)]"
            >
              <div className="mb-4 mx-auto rounded-full bg-orange-500/10 p-4 text-orange-500 w-fit">{service.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-black">{service.name}</h3>
              <p className="text-sm text-black">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            size="lg"
            className="group relative overflow-hidden bg-orange-500 px-8 py-6 text-lg font-medium text-white hover:bg-orange-600"
            onClick={() => window.open("https://wa.me/555197274193?text=Olá! vim em busca de reparar meu relógio.", "_blank")}
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Agende seu serviço via WhatsApp
            </span>
            <span className="absolute bottom-0 left-0 h-1 w-full bg-white transition-all duration-300 group-hover:h-full group-hover:opacity-10"></span>
          </Button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Atendemos relógios de todas as marcas e modelos, desde relógios de pulso comuns até peças de luxo e
            colecionador.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Todos os serviços incluem garantia e são realizados por técnicos certificados.
          </p>
        </div>
      </div>
    </div>
  )
}
