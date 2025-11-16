"use client";

import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeScreenProps {
  onStart: () => void;
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      {/* Nori - Nuvem Fofinha */}
      <div className="relative mb-12 animate-bounce-slow">
        <div className="relative">
          <Cloud 
            className="w-40 h-40 text-blue-200 drop-shadow-2xl" 
            strokeWidth={1.5}
            fill="currentColor"
          />
          {/* Rostinho da Nori */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center -mt-4">
              {/* Olhinhos */}
              <div className="flex gap-6 mb-2">
                <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
              </div>
              {/* Sorriso */}
              <div className="w-8 h-4 border-b-2 border-gray-700 rounded-b-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Texto de Boas-vindas */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Olá, sou a Nori
        </h1>
        <p className="text-xl text-gray-600 max-w-md">
          Como você está se sentindo hoje?
        </p>
      </div>

      {/* Botão Principal */}
      <Button
        onClick={onStart}
        size="lg"
        className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-12 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        Começar conversa
      </Button>

      {/* Mensagem Sutil */}
      <p className="text-sm text-gray-400 mt-8 text-center max-w-xs">
        Um espaço seguro para compartilhar seus sentimentos
      </p>
    </div>
  );
}
