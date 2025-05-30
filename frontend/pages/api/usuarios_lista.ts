import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = typeof req.query.id === "string" ? req.query.id : Array.isArray(req.query.id) ? req.query.id[0] : undefined;
  const method = req.method;

  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader as string } : {}),
      },
    };

    // GET: lista todos os usuários (protegido)
    if (method === "GET") {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listar_usuarios/`, fetchOptions);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // DELETE: deleta usuário pelo id
    if (method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID obrigatório para deletar" });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${id}/deletar_usuario/`, fetchOptions);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // PUT/PATCH: atualiza usuário pelo id
    if (method === "PUT" || method === "PATCH") {
      if (!id) return res.status(400).json({ error: "ID obrigatório para atualizar" });

      let body = req.body;
      if (typeof body !== "string") {
        body = JSON.stringify(body);
      }
      fetchOptions.body = body;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${id}/atualizar_usuario/`, fetchOptions);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro interno do servidor";
    return res.status(500).json({ error: message });
  }
}