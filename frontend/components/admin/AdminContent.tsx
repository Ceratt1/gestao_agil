import { Categoria } from "@/@types/Categoria.enum"
import { Produtos } from "@/@types/Produtos"
import { v4 as uuidv4 } from "uuid"
import { UUIDTypes } from "uuid"


const produtosExemplo: Produtos[] = [
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Elegance Classic",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Elegance%20Classic",
    preco: 1299.9,
    categoria: Categoria.MECANICO_BATERIA,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Sport Pro",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Sport%20Pro",
    preco: 1599.9,
    categoria: Categoria.SOLAR,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Urban Style",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Urban%20Style",
    preco: 899.9,
    categoria: Categoria.BOLSO,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Luxury Gold",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Luxury%20Gold",
    preco: 2999.9,
    categoria: Categoria.CORDA,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Adventure X",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Adventure%20X",
    preco: 1799.9,
    categoria: Categoria.QUARTZO,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Minimal Black",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Minimal%20Black",
    preco: 1099.9,
    categoria: Categoria.MECANICO_BATERIA,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Classic Silver",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Classic%20Silver",
    preco: 1399.9,
    categoria: Categoria.MECANICO_BATERIA,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Ocean Blue",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Ocean%20Blue",
    preco: 1899.9,
    categoria: Categoria.BOLSO,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Retro Chic",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Retro%20Chic",
    preco: 999.9,
    categoria: Categoria.BOLSO,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Modern Steel",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Modern%20Steel",
    preco: 1499.9,
    categoria: Categoria.MECANICO_BATERIA,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Explorer",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Explorer",
    preco: 2099.9,
    categoria: Categoria.CORDA,
  },
  {
    uuid: uuidv4() as UUIDTypes,
    nome: "Vintage Leather",
    imagemCaminho: "/placeholder4.jpg",
    whatsappLink: "https://wa.me/555197274193?text=Tenho%20interesse%20no%20Vintage%20Leather",
    preco: 1199.9,
    categoria: Categoria.QUARTZO,
  },
]


export default function AdminContent() {
    return (
        <main className="flex-1 p-6 bg-gray-300">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
                    <p className="text-gray-600">Comecar a fazer o crud aqui</p>
                    <ul className="mt-6">
                        {produtosExemplo.map((produto) => (
                            <li key={String(produto.uuid)} className="mb-2">
                                <span className="font-bold">{produto.nome}</span> - R$ {produto.preco.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}
