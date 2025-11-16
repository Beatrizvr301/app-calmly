"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex justify-center items-center flex-col text-center p-5">
      <div className="w-[140px] h-[140px] bg-[#DCD3FF] rounded-full flex justify-center items-center text-6xl">
        ☁️
      </div>

      <h1 className="mt-5 text-[32px] font-semibold">Olá! Eu sou a Nori</h1>

      <p className="text-lg max-w-[280px] mt-3">
        Estou aqui para caminhar com você. Como você está hoje?
      </p>

      <button
        onClick={() => router.push("/chat")}
        className="mt-8 bg-[#8163CC] text-white border-none rounded-xl px-5 py-3 text-lg cursor-pointer hover:bg-[#6D52B8] transition-colors"
      >
        Começar
      </button>
    </div>
  );
}
