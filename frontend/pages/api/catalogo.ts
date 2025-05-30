import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listar_todos_produtos_publico/`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro interno do servidor";
    return res.status(500).json({ error: message });

  }
}