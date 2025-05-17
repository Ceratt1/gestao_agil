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

    // 1. Primeiro, autentica pelo /login/
    const loginResponse = await fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usuario, password: senha }),
    });

    const loginData = await loginResponse.json();

    if (loginResponse.ok && loginData.success) {
      // 2. Agora pega o token e permissões pelo /api-token-auth/
      const tokenResponse = await fetch("http://localhost:8000/api-token-auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario, password: senha }),
      });
      const tokenData = await tokenResponse.json();

      if (tokenResponse.ok && tokenData.token) {
        setMensagem("Login realizado com sucesso!");
        localStorage.setItem("token", tokenData.token);
        localStorage.setItem("username", usuario);
        localStorage.setItem("is_staff", tokenData.is_staff ? "true" : "false");
        localStorage.setItem("is_superuser", tokenData.is_superuser ? "true" : "false");
        window.location.href = "/";
      } else {
        setMensagem(tokenData.non_field_errors?.[0] || tokenData.error || "Erro ao obter token.");
      }
    } else {
      setMensagem(loginData.error || "Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="flex justify-center items-center h-140">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg items-stretch content-center">
        <p className="text-center md:text-left text-lg text-gray-300 md:text-xl max-w-2xl">
          Login
        </p>
        <Input
          type="text"
          className="bg-white text-black"
          placeholder="usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <Input
          type="password"
          className="bg-white text-black"
          placeholder="senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <Button className="group bg-white text-black hover:bg-gray-200 rounded-full px-8 cursor-pointer" size="lg">
          Entrar
        </Button>
        {mensagem && <span className="text-center text-red-500">{mensagem}</span>}
      </form>
    </div>
  );
}