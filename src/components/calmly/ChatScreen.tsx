"use client";

import { useState, useRef, useEffect } from "react";
import { Cloud, Send, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Exercise } from "@/app/page";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestedExercise?: Exercise;
}

interface ChatScreenProps {
  onStartExercise: (exercise: Exercise) => void;
  onGoHome: () => void;
}

export function ChatScreen({ onStartExercise, onGoHome }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Estou aqui para te ouvir. Como você está se sentindo agora? 💙",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, messages }),
      });

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          suggestedExercise: data.suggestedExercise,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, tive um problema. Pode tentar novamente? 🌸",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cloud className="w-8 h-8 text-blue-400" fill="currentColor" />
          <div>
            <h2 className="font-semibold text-gray-800">Nori</h2>
            <p className="text-xs text-gray-500">Sua assistente emocional</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onGoHome}
          className="text-gray-600 hover:text-gray-800"
        >
          <Home className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index}>
            <div
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <Cloud className="w-8 h-8 text-blue-300 flex-shrink-0 mt-1" fill="currentColor" />
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>

            {/* Suggested Exercise */}
            {message.suggestedExercise && (
              <div className="flex justify-start mt-3 ml-11">
                <Button
                  onClick={() => onStartExercise(message.suggestedExercise!)}
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700 hover:bg-purple-100 rounded-full"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Experimentar exercício
                </Button>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <Cloud className="w-8 h-8 text-blue-300 flex-shrink-0 mt-1" fill="currentColor" />
            <div className="bg-white rounded-2xl px-5 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Compartilhe seus sentimentos..."
            className="flex-1 rounded-full border-gray-300 focus:border-purple-400 focus:ring-purple-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="rounded-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
