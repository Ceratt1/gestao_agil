import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import CatalogoHome from "@/components/catalogo/Catalogo"

export default function Catalogo() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
        
      <CatalogoHome/>

      <Footer />
    </main>
  )
}
