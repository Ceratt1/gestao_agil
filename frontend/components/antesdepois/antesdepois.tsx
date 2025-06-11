import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Phone, Mail, MapPin, CheckCircle, MessageSquare } from "lucide-react"

export default function AntesDepois() {
  const reparos = [
    {
      id: 1,
      titulo: "Restauração de Relógio Vintage Omega",
      problema: "Mostrador oxidado, ponteiros danificados e movimento travado",
      solucao: "Limpeza completa do movimento, substituição de ponteiros e restauração do mostrador",
      categoria: "Restauração Completa",
      tempo: "15 dias",
      antes: "/placeholder.svg?height=300&width=300",
      depois: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      titulo: "Reparo de Relógio Automático Seiko",
      problema: "Parou de funcionar, coroa emperrada e vidro riscado",
      solucao: "Revisão do movimento automático, substituição da coroa e troca do vidro",
      categoria: "Manutenção Técnica",
      tempo: "7 dias",
      antes: "/placeholder.svg?height=300&width=300",
      depois: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      titulo: "Restauração de Relógio de Bolso Antigo",
      problema: "Caixa amassada, corrente quebrada e mecanismo sujo",
      solucao: "Reparo da caixa, soldagem da corrente e limpeza completa do mecanismo",
      categoria: "Restauração Histórica",
      tempo: "20 dias",
      antes: "/placeholder.svg?height=300&width=300",
      depois: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      titulo: "Manutenção de Relógio Suíço Tissot",
      problema: "Atraso constante e pulseira desgastada",
      solucao: "Calibração de precisão e substituição da pulseira original",
      categoria: "Manutenção Preventiva",
      tempo: "5 dias",
      antes: "/placeholder.svg?height=300&width=300",
      depois: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      titulo: "Reparo de Relógio Digital Casio",
      problema: "Display apagado e botões não responsivos",
      solucao: "Substituição do display LCD e limpeza dos contatos dos botões",
      categoria: "Eletrônica",
      tempo: "3 dias",
      antes: "/placeholder.svg?height=300&width=300",
      depois: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      titulo: "Restauração de Relógio Feminino Citizen",
      problema: "Pulseira quebrada, mostrador manchado e parou de funcionar",
      solucao: "Nova pulseira, limpeza do mostrador e troca da bateria",
      categoria: "Reparo Completo",
      tempo: "10 dias",
      antes: "/placeholder.svg?height=300&width=300",
      depois: "/placeholder.svg?height=300&width=300",
    },
  ]

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "Restauração Completa":
        return "bg-red-100 text-red-800"
      case "Manutenção Técnica":
        return "bg-blue-100 text-blue-800"
      case "Restauração Histórica":
        return "bg-purple-100 text-purple-800"
      case "Manutenção Preventiva":
        return "bg-green-100 text-green-800"
      case "Eletrônica":
        return "bg-orange-100 text-orange-800"
      case "Reparo Completo":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div id="antesdepois" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-slate-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Antes e Depois dos Nossos Reparos</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Veja a transformação que realizamos em relógios de nossos clientes. Cada peça recebe cuidado especializado
              e atenção aos detalhes.
            </p>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">500+</div>
            <div className="text-slate-600">Relógios Reparados</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">55+</div>
            <div className="text-slate-600">Anos de Experiência</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">163</div>
            <div className="text-slate-600">Avaliações no Google</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-2">4,7</div>
            <div className="text-slate-600">Nota do Google (máx: 5,0)</div>
          </div>
        </div>

        {/* Grid de Reparos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reparos.map((reparo) => (
            <Card key={reparo.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                {/* Header do Card */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-slate-900 leading-tight">{reparo.titulo}</h3>
                    <Badge className={getCategoriaColor(reparo.categoria)}>{reparo.categoria}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    Tempo de reparo: {reparo.tempo}
                  </div>
                </div>

                {/* Imagens Antes e Depois */}
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant="destructive" className="text-xs">
                        ANTES
                      </Badge>
                    </div>
                    <Image
                      src={reparo.antes || "/placeholder.svg"}
                      alt={`Antes - ${reparo.titulo}`}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-green-600 hover:bg-green-700 text-xs">DEPOIS</Badge>
                    </div>
                    <Image
                      src={reparo.depois || "/placeholder.svg"}
                      alt={`Depois - ${reparo.titulo}`}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>

                {/* Detalhes do Reparo */}
                <div className="p-6 pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Problema Identificado
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{reparo.problema}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Solução Aplicada
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{reparo.solucao}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Seu Relógio Precisa de Reparo?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Nossa equipe especializada está pronta para devolver a vida ao seu relógio. Entre em contato conosco para
            uma avaliação gratuita.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-5 w-5 text-slate-600" />
              <span className="text-slate-700">(51) 9727-4123</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-5 w-5 text-slate-600" />
              <span className="text-slate-700">atrmundial@hotmail.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="h-5 w-5 text-slate-600" />
              <span className="text-slate-700">Rua dos Andradas, 1519</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-orange-500 px-8 py-6 text-lg font-medium text-white hover:bg-orange-600"
              onClick={() => window.open("https://wa.me/555197274193?text=Olá! vim em busca de reparar meu relógio.", "_blank")}
            >
            <span className="relative z-10 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Agende seu Reparo via WhatsApp
            </span>
            <span className="absolute bottom-0 left-0 h-1 w-full bg-white transition-all duration-300 group-hover:h-full group-hover:opacity-10"></span>
            </Button>
            </div>

        </div>

      </div>
    </div>
  )
}
