"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [loadingLogout, setLoadingLogout] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const user = localStorage.getItem("username")
    setUsername(user)
    // Checa se é admin/superuser/staff
    const staff = localStorage.getItem("is_staff") === "true"
    const superuser = localStorage.getItem("is_superuser") === "true"
    setIsAdmin(staff || superuser)
  }, [])

  const handleLogout = async () => {
    setLoadingLogout(true)
    try {
      const token = localStorage.getItem("token")
      await fetch("http://localhost:8000/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Token ${token}` } : {}),
        },
      })
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      localStorage.removeItem("is_staff")
      localStorage.removeItem("is_superuser")
      setUsername(null)
      setIsAdmin(false)
      window.location.reload()
    } catch {
      alert("Erro ao fazer logout.")
    }
    setLoadingLogout(false)
  }

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
          <Link
            href="/#reparos"
            className="text-sm font-medium text-black hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
          >
            Reparos
          </Link>
          {isAdmin && (
            <Link
              href="/dashboard/admin"
              className="text-sm font-bold text-orange-500 hover:text-orange-700 transition-colors"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Botões Desktop */}
        {!username ? (
          <div className="hidden md:flex items-center space-x-4">
            <Button className="rounded-full bg-black text-white hover:bg-gray-800" size="sm">
              <a href="https://wa.me/555197274193" target="_blank" rel="noopener noreferrer">
                Contato
              </a>
            </Button>
            <Link href="/dashboard/login">
              <Button className="rounded-full bg-orange-400 text-white hover:bg-orange-500" size="sm">
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <span className="ml-4 text-green-600 font-semibold">
              Você está logado como {username}
            </span>
            <Button
              className="rounded-full bg-red-500 text-white hover:bg-red-600"
              size="sm"
              onClick={handleLogout}
              disabled={loadingLogout}
            >
              {loadingLogout ? "Saindo..." : "Logout"}
            </Button>
          </div>
        )}

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
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
            {isAdmin && (
              <Link
                href="/dashboard/admin"
                className="text-sm font-bold text-orange-500 hover:text-orange-700 py-2 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <div className="flex items-center space-x-4 pt-2">
              {!username ? (
                <>
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
                  <Link href="/dashboard/login" className="w-full">
                    <Button className="rounded-full bg-orange-400 text-white hover:bg-orange-500 w-full" size="sm">
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="ml-4 text-green-600 font-semibold w-full block text-center">
                    Você está logado como {username}
                  </span>
                  <Button
                    className="rounded-full bg-red-500 text-white hover:bg-red-600 w-full"
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false)
                      handleLogout()
                    }}
                    disabled={loadingLogout}
                  >
                    {loadingLogout ? "Saindo..." : "Logout"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}