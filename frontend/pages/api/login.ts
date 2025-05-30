import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { username, password } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // 1. Autentica pelo /login/
    const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const loginData = await loginRes.json();

    if (!loginRes.ok || !loginData.success) {
      return res.status(400).json({ error: loginData.error || "Usuário ou senha inválidos." });
    }

    // 2. Pega o token e permissões pelo /api-token-auth/
    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api-token-auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.token) {
      return res.status(400).json({ error: tokenData.non_field_errors?.[0] || tokenData.error || "Erro ao obter token." });
    }

    return res.status(200).json(tokenData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro interno do servidor";
    return res.status(500).json({ error: message });

  }
}