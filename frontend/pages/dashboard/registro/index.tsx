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

    const response = await fetch("/api/registro", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-10 py-10 flex flex-col gap-6 w-full max-w-md border border-orange-200"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">Registro</h1>
        <p className="text-center text-gray-500 mb-4">
          Crie sua conta preenchendo os campos abaixo.
        </p>
        <Input
          type="text"
          className="bg-gray-100 text-black"
          placeholder="Usuário"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          autoFocus
        />
        <Input
          type="email"
          className="bg-gray-100 text-black"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          className="bg-gray-100 text-black"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <Button
          className="rounded-full bg-orange-500 text-white hover:bg-orange-400 px-8 py-2 text-lg font-semibold transition"
          size="lg"
        >
          Registrar
        </Button>
        {mensagem && (
          <span
            className={`text-center text-sm ${
              mensagem.includes("sucesso") ? "text-green-600" : "text-red-500"
            }`}
          >
            {mensagem}
          </span>
        )}
      </form>
    </div>
  );
}