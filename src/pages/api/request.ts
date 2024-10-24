// pages/api/request.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    // Simular processamento
    console.log(`Nome: ${name}, Email: ${email}`);

    // Retornar uma resposta ao front-end
    res.status(200).json({ message: 'Dados recebidos com sucesso!' });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
