"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-light tracking-widest text-black">
            <span className="font-semibold">ATRmundial</span>
          </span>
        </Link>

        <nav className="hidden space-x-10 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-black hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Início
          </Link>
          <Link
            href="/#produtos"
            className="text-sm font-medium text-black hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Coleção
          </Link>
          <Link
            href="/#sobre"
            className="text-sm font-medium text-black hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Sobre Nós
          </Link>
          <Link
            href="/#contato"
            className="text-sm font-medium text-black hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Contato
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button className="rounded-full bg-black text-white hover:bg-gray-800" size="sm">
            <a href="https://wa.me/555197274193" target="_blank" rel="noopener noreferrer">
              Contato
            </a>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:text-gray-600 py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="#produtos"
              className="text-sm font-medium text-black hover:text-gray-600 py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Coleção
            </Link>
            <Link
              href="#sobre"
              className="text-sm font-medium text-black hover:text-gray-600 py-2 border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              href="#contato"
              className="text-sm font-medium text-black hover:text-gray-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>

            <div className="flex items-center space-x-4 pt-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingBag size={20} />
              </Button>
              <Button className="rounded-full bg-black text-white hover:bg-gray-800 w-full" size="sm">
                <a href="https://wa.me/555197274193" target="_blank" rel="noopener noreferrer">
                  Contato via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
