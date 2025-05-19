import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const baseUrl = "http://localhost:8000/api/produtos/";

  if (req.method === "GET") {
    // Últimos 4 produtos (seu uso atual)
    const response = await fetch("http://localhost:8000/listar_ultimos_4produtos/");
    const data = await response.json();
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    if (!id) return res.status(400).json({ error: "ID não informado" });
    const response = await fetch(`${baseUrl}${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  }

  if (req.method === "POST") {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  }

  if (req.method === "DELETE") {
    if (!id) return res.status(400).json({ error: "ID não informado" });
    const response = await fetch(`${baseUrl}${id}/`, {
      method: "DELETE",
    });
    // O DRF geralmente retorna 204 No Content para delete
    if (response.status === 204) {
      return res.status(204).end();
    }
    const data = await response.json();
    return res.status(response.status).json(data);
  }

  return res.status(405).json({ error: "Método não permitido" });
}