import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/**
 * Recebe o formulário de contato do site e dispara o e-mail via Resend.
 *
 * Roda no servidor justamente para a RESEND_API_KEY nunca ir para o bundle
 * do navegador — por isso a variável NÃO tem o prefixo VITE_.
 */

const MAX = { nome: 100, email: 150, telefone: 20, mensagem: 3000 };

type Campos = { nome: string; email: string; telefone: string; mensagem: string };

const escapar = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function validar(body: unknown): { erro: string } | { dados: Campos } {
  if (typeof body !== 'object' || body === null) return { erro: 'Requisição inválida.' };
  const b = body as Record<string, unknown>;

  const texto = (chave: keyof typeof MAX) => (typeof b[chave] === 'string' ? (b[chave] as string).trim() : '');
  const dados: Campos = {
    nome: texto('nome'),
    email: texto('email'),
    telefone: texto('telefone'),
    mensagem: texto('mensagem'),
  };

  for (const [chave, limite] of Object.entries(MAX) as [keyof typeof MAX, number][]) {
    if (!dados[chave]) return { erro: 'Preencha todos os campos.' };
    if (dados[chave].length > limite) return { erro: 'Algum campo excede o tamanho permitido.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(dados.email)) return { erro: 'E-mail inválido.' };
  if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(dados.telefone)) return { erro: 'Telefone inválido.' };

  return { dados };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ erro: 'Método não permitido.' });
  }

  // Honeypot: campo escondido no form. Só bot preenche — responde 200 e descarta.
  if (typeof req.body?.website === 'string' && req.body.website.length > 0) {
    return res.status(200).json({ ok: true });
  }

  const resultado = validar(req.body);
  if ('erro' in resultado) return res.status(400).json({ erro: resultado.erro });
  const { nome, email, telefone, mensagem } = resultado.dados;

  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.MAIL_TO;
  const remetente = process.env.MAIL_FROM ?? 'Portfólio <onboarding@resend.dev>';

  if (!apiKey || !destino) {
    console.error('Faltam variáveis de ambiente: RESEND_API_KEY e/ou MAIL_TO');
    return res.status(500).json({ erro: 'Serviço de e-mail indisponível no momento.' });
  }

  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from: remetente,
      to: [destino],
      replyTo: email, // responder no Gmail vai direto para o visitante
      subject: `Novo contato do site — ${nome}`,
      text: `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\n${mensagem}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px">
          <h2 style="margin:0 0 16px">Novo contato pelo portfólio</h2>
          <p style="margin:4px 0"><strong>Nome:</strong> ${escapar(nome)}</p>
          <p style="margin:4px 0"><strong>E-mail:</strong> ${escapar(email)}</p>
          <p style="margin:4px 0"><strong>Telefone:</strong> ${escapar(telefone)}</p>
          <p style="margin:16px 0 4px"><strong>Mensagem:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${escapar(mensagem)}</p>
        </div>`,
    });

    if (error) {
      console.error('Resend recusou o envio:', error);
      return res.status(502).json({ erro: 'Não foi possível enviar agora. Tente novamente.' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (e) {
    console.error('Falha ao chamar o Resend:', e);
    return res.status(500).json({ erro: 'Erro inesperado ao enviar. Tente novamente.' });
  }
}
