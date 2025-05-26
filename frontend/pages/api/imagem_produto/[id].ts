import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const backendUrl = `${process.env.BACKEND_URL}/api/imagem_produto/${id}/`;

  // Copie os headers relevantes
  const headers: Record<string, string> = {};
  if (req.headers.authorization) headers['authorization'] = req.headers.authorization;
  if (req.headers.cookie) headers['cookie'] = req.headers.cookie as string;

  // Função auxiliar para tentar parsear JSON, senão retorna texto
  async function parseResponse(response: Response) {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { detail: text };
    }
  }

  if (req.method === 'GET') {
    const response = await fetch(backendUrl, { headers });
    const data = await parseResponse(response);
    return res.status(response.status).json(data);
  }

  if (req.method === 'DELETE') {
    const response = await fetch(backendUrl, { method: 'DELETE', headers });
    const data = await parseResponse(response);
    return res.status(response.status).json(data);
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    // Repassa o Content-Type original do request
    const proxyHeaders = { ...headers };
    if (req.headers['content-type']) {
      proxyHeaders['content-type'] = req.headers['content-type'] as string;
    }

    const response = await fetch(backendUrl, {
      method: req.method,
      headers: proxyHeaders,
      body: req.body,
    });
    const data = await parseResponse(response);
    return res.status(response.status).json(data);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}