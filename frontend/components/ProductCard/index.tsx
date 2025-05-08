interface ProductCardParameters {
    nome: string
    imagem: string
    preco?: number
}

export function ProductCard({nome, imagem, preco}: ProductCardParameters) {
    return (
        <a className="h-60 w-50 bg-gray-200 p-4 flex flex-col justify-between cursor-pointer" href="/whatsapp">
            <div>
            <p>{nome}</p>
            <img src={imagem ? imagem : undefined} />
            </div>
            <div className="text-right">
            {preco && (<p>{new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(preco)}</p>)}

            </div>
        </a>
    )
}