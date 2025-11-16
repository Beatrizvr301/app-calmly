"use client";

import { useRouter } from "next/navigation";
import { auth } from "../../firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/chat");
  };

  const loginEmail = async () => {
    await signInWithEmailAndPassword(auth, email, senha);
    router.push("/chat");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-5">
      <h2 className="text-[28px] font-semibold">Entre para continuar</h2>

      <button
        onClick={loginGoogle}
        className="mt-5 px-5 py-3 rounded-xl bg-[#8163CC] text-white border-none text-lg cursor-pointer hover:bg-[#6D52B8] transition-colors"
      >
        Entrar com Google
      </button>

      <p className="mt-6 text-base">Ou entre com e-mail</p>

      <input
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2.5 p-2.5 w-[260px] rounded-xl border border-[#8163CC] focus:outline-none focus:ring-2 focus:ring-[#8163CC]"
      />

      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="mt-2.5 p-2.5 w-[260px] rounded-xl border border-[#8163CC] focus:outline-none focus:ring-2 focus:ring-[#8163CC]"
      />

      <button
        onClick={loginEmail}
        className="mt-4 px-5 py-3 rounded-xl bg-[#5B3A7E] text-white border-none text-lg cursor-pointer hover:bg-[#4A2F66] transition-colors"
      >
        Entrar
      </button>
    </div>
  );
}
