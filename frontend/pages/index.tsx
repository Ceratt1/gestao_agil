import Header from "@/components/header/header"
import Hero from "@/components/hero/hero"
import FeaturedProducts from "@/components/products/feature-products"
import AboutUs from "@/components/about-us/about-us"
import Footer from "@/components/footer/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="relative">
        <div className="absolute inset-0 flex items-center px-4">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 text-sm text-gray-500 uppercase tracking-widest">Coleção exclusiva</span>
        </div>
      </div>
      <FeaturedProducts />
      <AboutUs />
      <Footer />
    </main>
  )
}
