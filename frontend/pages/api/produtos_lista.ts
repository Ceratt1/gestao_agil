import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const { id } = req.query;
  let url = `${process.env.NEXT_PUBLIC_API_URL}/listar_produtos/`;
  if (id) url += `?id=${id}`;

  if (!["GET", "POST", "PUT", "DELETE"].includes(method || "")) {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader as string } : {}),
      },
    };
    if (["POST", "PUT"].includes(method || "")) {
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