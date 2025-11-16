import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `Você é Nori, uma assistente emocional gentil e empática em formato de nuvem fofinha. 

Seu papel:
- Ouvir ativamente e validar os sentimentos do usuário
- Fazer perguntas abertas e acolhedoras
- Oferecer suporte emocional sem julgar
- Sugerir exercícios quando apropriado (respiração, grounding, gratidão)
- Usar linguagem calorosa, simples e reconfortante
- Responder em português ou inglês conforme o idioma do usuário

Diretrizes:
- Seja breve (2-3 frases por resposta)
- Use emojis sutis para transmitir calor (💙, 🌸, ✨)
- Nunca dê conselhos médicos ou psicológicos profissionais
- Se detectar crise grave, sugira buscar ajuda profissional
- Foque em técnicas de bem-estar emocional básicas

Quando sugerir exercícios:
- Ansiedade/estresse → Respiração 4-7-8
- Desconexão/dissociação → Grounding 5-4-3-2-1
- Tristeza/negatividade → Diário de gratidão

Se sugerir exercício, inclua no JSON: { "suggestedExercise": "breathing" | "grounding" | "gratitude" }`;

export async function POST(req: NextRequest) {
  try {
    const { message, messages } = await req.json();

    const chatMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: chatMessages as any,
      temperature: 0.8,
      max_tokens: 200,
    });

    const responseText = completion.choices[0].message.content || "Desculpe, não consegui processar isso. 🌸";

    // Detect if exercise should be suggested
    let suggestedExercise = null;
    const lowerResponse = responseText.toLowerCase();
    
    if (lowerResponse.includes("respiração") || lowerResponse.includes("respir")) {
      suggestedExercise = "breathing";
    } else if (lowerResponse.includes("grounding") || lowerResponse.includes("sentidos")) {
      suggestedExercise = "grounding";
    } else if (lowerResponse.includes("gratidão") || lowerResponse.includes("grat")) {
      suggestedExercise = "gratitude";
    }

    return NextResponse.json({
      message: responseText,
      suggestedExercise,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { 
        message: "Desculpe, tive um problema técnico. Pode tentar novamente? 💙",
        suggestedExercise: null,
      },
      { status: 500 }
    );
  }
}
