import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { produtoId } = req.query;

  try {
    const response = await fetch(`http://localhost:8000/link_pagamento_whatsapp/${produtoId}/`);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro interno do servidor";
    return res.status(500).json({ error: message });

  }
}