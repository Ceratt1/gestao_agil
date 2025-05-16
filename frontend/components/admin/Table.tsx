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

export default function Table() {

    return (
        <div className="overflow-x-auto bg-white">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="text-black text-left border-b border-orange-400">
                        <th className="px-4 py-2 font-bold text-base">ID</th>
                        <th className="px-4 py-2 font-bold text-base">Nome</th>
                        <th className="px-4 py-2 font-bold text-base">Preço</th>
                        <th className="px-4 py-2 font-bold text-base">Categoria</th>

                        <th className="px-4 py-2 font-bold text-base">Foto</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {produtosExemplo.map((emp, index) => (
                        <tr
                            key={emp.uuid}
                            className="hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-none text-left"
                        >
                            <td className="px-4 py-2">{emp.uuid}</td>
                            <td className="px-4 py-2">{emp.nome}</td>
                            <td className="px-4 py-2">{emp.preco}</td>
                            <td className="px-4 py-2">{emp.categoria}</td>
                            <td className="px-4 py-2">{emp.imagemCaminho}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}