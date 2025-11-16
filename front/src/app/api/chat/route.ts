import { NextResponse } from 'next/server';

// 1. AJUSTE AQUI: Esta é a URL do seu backend NestJS
const NEST_API_URL = 'http://localhost:3000/interviewer-ai';

export async function POST(req: Request) {
  try {
    const { text } = await req.json(); // Pega o texto do ChatPanel

    // 2. Envia para o NestJS no formato que ele espera
    const nestResponse = await fetch(NEST_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }), // Envia o { text: "..." }
    });

    if (!nestResponse.ok) {
      throw new Error(`Erro no NestJS: ${nestResponse.statusText}`);
    }

    // 3. Recebe a resposta do NestJS (Ex: { reply: "Olá" })
    const data = await nestResponse.json();

    // 4. Envia a resposta de volta para o ChatPanel
    return NextResponse.json({ responseText: data.reply });

  } catch (error) {
    console.error('Erro na /api/chat:', error);
    return NextResponse.json(
      { responseText: 'Erro ao conectar ao servidor.' },
      { status: 500 }
    );
  }
}