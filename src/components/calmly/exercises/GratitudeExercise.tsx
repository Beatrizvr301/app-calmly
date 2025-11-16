"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Sparkles, Check } from "lucide-react";

export function GratitudeExercise() {
  const [gratitudes, setGratitudes] = useState<string[]>(["", "", ""]);
  const [completed, setCompleted] = useState(false);

  const handleChange = (index: number, value: string) => {
    const newGratitudes = [...gratitudes];
    newGratitudes[index] = value;
    setGratitudes(newGratitudes);
  };

  const handleComplete = () => {
    const filledCount = gratitudes.filter((g) => g.trim()).length;
    if (filledCount >= 3) {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setGratitudes(["", "", ""]);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
          <Heart className="w-12 h-12 text-white" fill="currentColor" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Lindo!</h2>
        <p className="text-gray-600 text-center max-w-md mb-8">
          Você reconheceu 3 coisas boas do seu dia. Praticar gratidão 
          regularmente aumenta o bem-estar e a felicidade. 💖
        </p>
        
        <div className="w-full max-w-md mb-8 space-y-4">
          {gratitudes.map((gratitude, index) => (
            <div
              key={index}
              className="bg-white/60 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">{index + 1}</span>
                </div>
                <p className="text-gray-700 flex-1 pt-1">{gratitude}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleReset}
          size="lg"
          className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full px-8"
        >
          Fazer novamente
        </Button>
      </div>
    );
  }

  const filledCount = gratitudes.filter((g) => g.trim()).length;
  const canComplete = filledCount >= 3;

  return (
    <div className="flex flex-col items-center justify-start min-h-full px-6 py-12">
      {/* Header */}
      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mb-6 shadow-xl">
        <Sparkles className="w-10 h-10 text-white" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">Diário de Gratidão</h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        Liste 3 coisas boas que aconteceram hoje, por menores que sejam
      </p>

      {/* Gratitude Inputs */}
      <div className="w-full max-w-md space-y-6 mb-8">
        {gratitudes.map((gratitude, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                gratitude.trim() 
                  ? "bg-gradient-to-br from-pink-400 to-purple-400" 
                  : "bg-gray-200"
              }`}>
                {gratitude.trim() ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-gray-500 font-semibold">{index + 1}</span>
                )}
              </div>
              <label className="text-sm font-medium text-gray-700">
                Gratidão {index + 1}
              </label>
            </div>
            <Textarea
              value={gratitude}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Ex: Tomei um café delicioso pela manhã..."
              className="min-h-[100px] rounded-2xl resize-none"
            />
          </div>
        ))}
      </div>

      {/* Complete Button */}
      <Button
        onClick={handleComplete}
        disabled={!canComplete}
        size="lg"
        className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-full px-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Heart className="w-5 h-5 mr-2" />
        Concluir ({filledCount}/3)
      </Button>

      {/* Info */}
      <div className="mt-12 p-6 bg-white/60 rounded-2xl max-w-md">
        <h3 className="font-semibold text-gray-800 mb-3">Por que gratidão?</h3>
        <p className="text-sm text-gray-600">
          Estudos mostram que praticar gratidão diariamente melhora o humor, 
          reduz estresse e aumenta a satisfação com a vida. Pequenas coisas 
          também contam! ✨
        </p>
      </div>
    </div>
  );
}
