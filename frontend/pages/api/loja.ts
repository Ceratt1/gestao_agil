import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const url = "http://localhost:8000/loja/";

  if (!["GET", "PUT", "PATCH"].includes(method || "")) {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Pega o token do header Authorization enviado pelo frontend (ex: "Token abc123")
    const authHeader = req.headers.authorization;

    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { "Authorization": authHeader } : {}),
      },
    };

    if (method === "PUT" || method === "PATCH") {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro interno do servidor";
    return res.status(500).json({ error: message });
  }
}