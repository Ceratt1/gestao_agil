import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Registro() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    const response = await fetch("http://localhost:8000/registro/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usuario, email, password: senha }),
    });

    const data = await response.json();
    if (response.ok && data.success) {
      setMensagem("Usuário registrado com sucesso! Faça login.");
      setUsuario("");
      setEmail("");
      setSenha("");
    } else {
      setMensagem(data.error || "Erro ao registrar.");
    }
  };

  return (
    <div className="flex justify-center items-center h-140">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg items-stretch content-center">
        <p className="text-center md:text-left text-lg text-gray-300 md:text-xl max-w-2xl">
          Registro
        </p>
        <Input
          type="text"
          className="bg-white text-black"
          placeholder="Usuário"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <Input
          type="email"
          className="bg-white text-black"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          className="bg-white text-black"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <Button className="group bg-white text-black hover:bg-gray-200 rounded-full px-8 cursor-pointer" size="lg">
          Registrar
        </Button>
        {mensagem && <span className="text-center text-red-500">{mensagem}</span>}
      </form>
    </div>
  );
}