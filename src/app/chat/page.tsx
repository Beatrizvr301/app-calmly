"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Oi! Eu sou a Nori. Estou aqui com você. Como está se sentindo agora?",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.reply && data.reply.content) {
        setMessages([...newMessages, { role: "assistant", content: data.reply.content }]);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <div className="h-screen bg-[#F6F0FF] flex flex-col p-4">
      <h3 className="text-center text-[#6D52B8] text-xl font-semibold">
        Conversa com a Nori
      </h3>

      <div className="flex-1 overflow-y-auto mt-2.5 pb-5 flex flex-col gap-2.5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-3 rounded-2xl text-lg leading-relaxed ${
              msg.role === "user"
                ? "self-end bg-[#8163CC] text-white"
                : "self-start bg-white text-[#5B3A7E]"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escreva aqui..."
          className="flex-1 p-3.5 text-base rounded-xl border border-[#C9B7FF] focus:outline-none focus:ring-2 focus:ring-[#8163CC]"
        />
        <button
          onClick={sendMessage}
          className="bg-[#6D52B8] text-white border-none text-base rounded-xl px-5 py-3 cursor-pointer hover:bg-[#5B3A7E] transition-colors"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
