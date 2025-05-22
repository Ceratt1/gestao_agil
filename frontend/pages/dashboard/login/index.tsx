import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    const loginResponse = await fetch("http://localhost:8000/api-token-auth/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usuario, password: senha }),
    });

    const tokenData = await loginResponse.json();

    if (loginResponse.ok && tokenData.token) {
      setMensagem("Login realizado com sucesso!");
      localStorage.setItem("token", tokenData.token);
      localStorage.setItem("username", usuario);
      localStorage.setItem("is_staff", tokenData.is_staff ? "true" : "false");
      localStorage.setItem("is_superuser", tokenData.is_superuser ? "true" : "false");
      localStorage.setItem("user", JSON.stringify(tokenData));
      window.location.href = "/";
    } else {
      setMensagem(tokenData.error || "Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-10 py-10 flex flex-col gap-6 w-full max-w-md border border-orange-200"
      >
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">Login</h1>
        <p className="text-center text-gray-500 mb-4">
          Entre com seu usuário e senha para acessar o sistema.
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
          Entrar
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