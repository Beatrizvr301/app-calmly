"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Home, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Exercise } from "@/app/page";
import { BreathingExercise } from "./exercises/BreathingExercise";
import { GroundingExercise } from "./exercises/GroundingExercise";
import { GratitudeExercise } from "./exercises/GratitudeExercise";

interface ExerciseScreenProps {
  exercise: Exercise;
  onBack: () => void;
  onGoHome: () => void;
}

const exerciseTitles = {
  breathing: "Respiração 4-7-8",
  grounding: "Grounding 5-4-3-2-1",
  gratitude: "Diário de Gratidão",
};

const exerciseDescriptions = {
  breathing: "Uma técnica de respiração que acalma o sistema nervoso",
  grounding: "Conecte-se com o presente através dos seus sentidos",
  gratitude: "Reconheça as coisas boas do seu dia",
};

export function ExerciseScreen({ exercise, onBack, onGoHome }: ExerciseScreenProps) {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onGoHome}
            className="text-gray-600 hover:text-gray-800"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Cloud className="w-8 h-8 text-blue-400" fill="currentColor" />
          <div>
            <h2 className="font-semibold text-gray-800">{exerciseTitles[exercise]}</h2>
            <p className="text-xs text-gray-500">{exerciseDescriptions[exercise]}</p>
          </div>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 overflow-y-auto">
        {exercise === "breathing" && <BreathingExercise />}
        {exercise === "grounding" && <GroundingExercise />}
        {exercise === "gratitude" && <GratitudeExercise />}
      </div>
    </div>
  );
}
