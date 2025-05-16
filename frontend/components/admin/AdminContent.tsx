
import Table from "./Table";

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
                <Table />
            </div>
        </main>
    )
}
