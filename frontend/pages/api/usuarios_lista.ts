import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = typeof req.query.id === "string" ? req.query.id : Array.isArray(req.query.id) ? req.query.id[0] : undefined;
  const auth = req.headers.authorization || "";

  try {
    // GET: lista todos os usuários
    if (req.method === "GET") {
      const response = await fetch("http://localhost:8000/listar_usuarios/");
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // DELETE: deleta usuário pelo id
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID obrigatório para deletar" });
      const response = await fetch(`http://localhost:8000/api/usuarios/${id}/deletar_usuario/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth,
        },
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // PUT/PATCH: atualiza usuário pelo id
    if (req.method === "PUT" || req.method === "PATCH") {
      if (!id) return res.status(400).json({ error: "ID obrigatório para atualizar" });

      // Garante que o body seja string
      let body = req.body;
      if (typeof body !== "string") {
        body = JSON.stringify(body);
      }

      const response = await fetch(`http://localhost:8000/api/usuarios/${id}/atualizar_usuario/`, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth,
        },
        body,
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro interno do servidor";
    return res.status(500).json({ error: message });
  }
}