import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAuth } from "@/utils/fetchAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/produtos/`;

  if (req.method === "GET") {
    // Últimos 4 produtos (público)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listar_ultimos_4produtos/`);
    const data = await response.json();
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    if (!id) return res.status(400).json({ error: "ID não informado" });
    const response = await fetchAuth(`${baseUrl}${id}/`, {
      method: "PUT",
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  }

  if (req.method === "POST") {
    const response = await fetchAuth(baseUrl, {
      method: "POST",
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  }

  if (req.method === "DELETE") {
    if (!id) return res.status(400).json({ error: "ID não informado" });
    const response = await fetchAuth(`${baseUrl}${id}/`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      return res.status(204).end();
    }
    const data = await response.json();
    return res.status(response.status).json(data);
  }

  return res.status(405).json({ error: "Método não permitido" });
}