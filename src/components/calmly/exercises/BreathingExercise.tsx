"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

type Phase = "inhale" | "hold" | "exhale" | "rest";

const phaseDurations = {
  inhale: 4,
  hold: 7,
  exhale: 8,
  rest: 0,
};

const phaseTexts = {
  inhale: "Inspire pelo nariz",
  hold: "Segure a respiração",
  exhale: "Expire pela boca",
  rest: "Prepare-se",
};

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("rest");
  const [countdown, setCountdown] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    // Move to next phase
    const phases: Phase[] = ["inhale", "hold", "exhale"];
    const currentIndex = phases.indexOf(phase);
    const nextPhase = phases[(currentIndex + 1) % phases.length];

    if (nextPhase === "inhale") {
      setCycleCount((prev) => prev + 1);
    }

    setPhase(nextPhase);
    setCountdown(phaseDurations[nextPhase]);
  }, [isActive, countdown, phase]);

  const handleStart = () => {
    setIsActive(true);
    setPhase("inhale");
    setCountdown(phaseDurations.inhale);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("rest");
    setCountdown(0);
    setCycleCount(0);
  };

  const getCircleScale = () => {
    if (phase === "inhale") return "scale-150";
    if (phase === "exhale") return "scale-75";
    return "scale-100";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
      {/* Breathing Circle */}
      <div className="relative mb-12">
        <div
          className={`w-64 h-64 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 transition-transform duration-1000 ease-in-out ${getCircleScale()} shadow-2xl`}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-white text-2xl font-semibold mb-2">
            {countdown > 0 ? countdown : ""}
          </p>
          <p className="text-white text-lg">
            {phase !== "rest" ? phaseTexts[phase] : "Pronto para começar"}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center mb-8 space-y-2">
        <p className="text-gray-700 font-medium">
          Ciclos completados: {cycleCount}
        </p>
        <p className="text-sm text-gray-500 max-w-md">
          {phase === "rest"
            ? "Clique em iniciar e siga o ritmo da respiração"
            : "Continue respirando no ritmo indicado"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!isActive && phase === "rest" && (
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white rounded-full px-8"
          >
            <Play className="w-5 h-5 mr-2" />
            Iniciar
          </Button>
        )}

        {isActive && (
          <Button
            onClick={handlePause}
            size="lg"
            variant="outline"
            className="rounded-full px-8"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pausar
          </Button>
        )}

        {(phase !== "rest" || cycleCount > 0) && (
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="rounded-full px-8"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reiniciar
          </Button>
        )}
      </div>

      {/* Info */}
      <div className="mt-12 p-6 bg-white/60 rounded-2xl max-w-md">
        <h3 className="font-semibold text-gray-800 mb-3">Como funciona?</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Inspire pelo nariz por 4 segundos</li>
          <li>• Segure a respiração por 7 segundos</li>
          <li>• Expire pela boca por 8 segundos</li>
          <li>• Repita por 3-4 ciclos para melhor efeito</li>
        </ul>
      </div>
    </div>
  );
}
