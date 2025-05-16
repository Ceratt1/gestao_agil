"use client"
import Form from 'next/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';

function saveProduct() {
    console.log("Opa")
}

const categoriasExemplo = [
  'Bolso', 'Mesa', 'Parede', 'Pulso', 'Torre',
  'Todas', 'Corda', 'Automatico', 'Bateria', 'Solar', 'Quartzo'
];



 
export default function AdminProductForm({onSubmit}: {onSubmit: () => void}) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const formData = {
            nome: (form.elements.namedItem('nome') as HTMLInputElement)?.value || '',
            preco: (form.elements.namedItem('preco') as HTMLInputElement)?.value || '',
            imagem: (form.elements.namedItem('imagem') as HTMLInputElement)?.value || '',
            categoria: (form.elements.namedItem('categoria') as HTMLSelectElement)?.value || '',
        };

        console.log('Form Data:', formData);

        onSubmit()
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Nome</label>
                <Input
                    type="text"
                    id="nome"
                    name="nome"
                    className="bg-white w-full text-black border border-gray-300"
                    required
                />
            </div>

            <div>
                <label className="block text-md font-semibold text-gray-700 mb-1">Preço</label>
                <Input
                    type="number"
                    name="preco"
                    className="bg-white w-full text-black border border-gray-300"
                    step="0.01"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Imagem</label>
                <Input
                    type="file"
                    name="imagem"
                    className="bg-white w-full text-black border border-gray-300"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
                <select
                    name="categoria"
                    className="mt-1 block w-full h-10 px-4 py-2 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
                    required
                >
                    <option value="">Selecione uma categoria</option>
                        {categoriasExemplo.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                </select>
            </div>

            <Button type="submit" className='bg-black cursor-pointer text-white'>Enviar</Button>
        </form>
    )
}

    // <div>
    //             <Select value={category} onValueChange={(value) => setCategory(value)}>
    //                 <SelectTrigger>
    //                     <SelectValue className="text-white" placeholder="Selecione um tipo" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                     {categoriasExemplo.map(cat => (
    //                         <SelectItem key={cat} value={cat}>{cat}</SelectItem>
    //                     ))}
    //                 </SelectContent>
    //             </Select>
    //         </div>