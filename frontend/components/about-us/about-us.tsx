import { Clock, Award, Shield } from "lucide-react"
import Image from "next/image"

export default function AboutUs() {
  return (
    <section id="sobre" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/about-us.jpg" fill alt="Nossa loja" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl">
              Sobre a <span className="font-semibold text-orange-400">ATRmundial</span>
            </h2>

            <p className="mb-8 text-lg text-gray-700">
              Há mais de 56 anos no mercado, a ATRmundial é referência em conserto de relógios quartz e mecânicos. Fundada em 1968 com o nome Larp e consolidada como ATRmundial a partir de 2000, nossa história é marcada por tradição, confiança e excelência técnica.
            </p>

            <p className="mb-10 text-lg text-gray-700">
              Mais do que clientes, cultivamos amizades e parcerias duradouras com lojas, assistências autorizadas e profissionais do setor. Também atuamos com venda de peças e relógios, sempre prezando pela qualidade e pelo atendimento humanizado.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <Clock size={24} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-black">Precisão</h3>
                <p className="text-sm text-gray-600">Relógios com mecanismos de alta precisão e qualidade.</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md text-black">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <Award size={24} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-black">Qualidade</h3>
                <p className="text-sm text-gray-600">Selecionamos apenas as melhores marcas e modelos.</p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  <Shield size={24} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-black">Garantia</h3>
                <p className="text-sm text-gray-600">Todos os produtos com garantia e assistência técnica.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
