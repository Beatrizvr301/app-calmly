"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Ear, Hand, Droplet, Apple, Check } from "lucide-react";

type Step = {
  number: 5 | 4 | 3 | 2 | 1;
  sense: string;
  icon: any;
  prompt: string;
  color: string;
};

const steps: Step[] = [
  {
    number: 5,
    sense: "Visão",
    icon: Eye,
    prompt: "5 coisas que você pode VER",
    color: "from-blue-400 to-blue-500",
  },
  {
    number: 4,
    sense: "Tato",
    icon: Hand,
    prompt: "4 coisas que você pode TOCAR",
    color: "from-purple-400 to-purple-500",
  },
  {
    number: 3,
    sense: "Audição",
    icon: Ear,
    prompt: "3 coisas que você pode OUVIR",
    color: "from-pink-400 to-pink-500",
  },
  {
    number: 2,
    sense: "Olfato",
    icon: Droplet,
    prompt: "2 coisas que você pode CHEIRAR",
    color: "from-orange-400 to-orange-500",
  },
  {
    number: 1,
    sense: "Paladar",
    icon: Apple,
    prompt: "1 coisa que você pode SABOREAR",
    color: "from-green-400 to-green-500",
  },
];

export function GroundingExercise() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [completed, setCompleted] = useState(false);

  const currentStep = steps[currentStepIndex];
  const Icon = currentStep.icon;

  const handleAddItem = () => {
    if (!currentInput.trim()) return;

    const newItems = [...items, currentInput.trim()];
    setItems(newItems);
    setCurrentInput("");

    if (newItems.length >= currentStep.number) {
      if (currentStepIndex < steps.length - 1) {
        setTimeout(() => {
          setCurrentStepIndex(currentStepIndex + 1);
          setItems([]);
        }, 500);
      } else {
        setCompleted(true);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setItems([]);
    setCurrentInput("");
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mb-8 shadow-2xl">
          <Check className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Parabéns!</h2>
        <p className="text-gray-600 text-center max-w-md mb-8">
          Você completou o exercício de grounding. Como você está se sentindo agora?
        </p>
        <Button
          onClick={handleReset}
          size="lg"
          className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-full px-8"
        >
          Fazer novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                index < currentStepIndex
                  ? "bg-green-400 text-white"
                  : index === currentStepIndex
                  ? `bg-gradient-to-br ${step.color} text-white shadow-lg scale-110`
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {step.number}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className={`w-24 h-24 bg-gradient-to-br ${currentStep.color} rounded-full flex items-center justify-center mb-6 shadow-2xl`}>
        <Icon className="w-12 h-12 text-white" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentStep.sense}</h2>
      <p className="text-gray-600 mb-8">{currentStep.prompt}</p>

      {/* Items List */}
      <div className="w-full max-w-md mb-6 space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white/60 rounded-lg px-4 py-3 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className={`w-6 h-6 bg-gradient-to-br ${currentStep.color} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Check className="w-4 h-4 text-white" />
            </div>
            <p className="text-gray-700">{item}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      {items.length < currentStep.number && (
        <div className="w-full max-w-md">
          <div className="flex gap-3">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Digite algo que você pode ${currentStep.sense.toLowerCase()}...`}
              className="flex-1 rounded-full"
            />
            <Button
              onClick={handleAddItem}
              disabled={!currentInput.trim()}
              className={`rounded-full bg-gradient-to-r ${currentStep.color} hover:opacity-90 text-white`}
            >
              Adicionar
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
            {currentStep.number - items.length} {currentStep.number - items.length === 1 ? "item restante" : "itens restantes"}
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-12 p-6 bg-white/60 rounded-2xl max-w-md">
        <h3 className="font-semibold text-gray-800 mb-3">Sobre o Grounding</h3>
        <p className="text-sm text-gray-600">
          Esta técnica ajuda a trazer sua atenção para o momento presente, 
          reduzindo ansiedade e pensamentos acelerados através da conexão 
          com seus cinco sentidos.
        </p>
      </div>
    </div>
  );
}
