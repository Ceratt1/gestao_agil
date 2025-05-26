import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  const chunks: Buffer[] = [];
  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", async () => {
    const body = Buffer.concat(chunks);

    // Repassa o Content-Type original do upload
    const fetchRes = await fetch("http://localhost:8000/api/upload_imagem_produto/", {
      method: "POST",
      headers: {
        "Content-Type": req.headers["content-type"] || "",
      },
      body,
    });

    const data = await fetchRes.json();
    res.status(fetchRes.status).json(data);
  });
}