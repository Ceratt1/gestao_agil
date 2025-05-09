import { Clock, Award, Shield } from "lucide-react"

export default function AboutUs() {
  return (
    <section id="sobre" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/about-us.jpg" alt="Nossa loja" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl">
              Sobre a <span className="font-semibold">ATRmundial</span>
            </h2>

            <p className="mb-8 text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor. Morbi quis nulla ac lectus convallis ultrices. Nulla facilisi. Integer quis nulla et eros pretium varius.
            </p>

            <p className="mb-10 text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sit amet semper lacus, in mollis sapien. Nullam eget tellus sit amet nulla semper sodales.et eros pretium varius.
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
