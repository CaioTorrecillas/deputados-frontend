"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function handleVotacaoClick(tipo: string, temVotacao: boolean) {

        router.push("/proposicao/projeto-lei");
    }

    return (
        <nav className="w-full bg-blue-600 text-white px-6 py-4 shadow">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold">Portal Político</h1>

                <ul className="flex space-x-6 items-center">
                    <li>
                        <a href="/protected/home" className="hover:underline">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="/deputados" className="hover:underline">
                            Deputados
                        </a>
                    </li>


                    {/* Dropdown de Votação */}
                    <li className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="hover:underline flex items-center gap-1"
                        >
                            Votação ▾
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded shadow-lg z-50">
                                <ul className="py-1 text-sm">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() =>
                                            handleVotacaoClick("PL", true)
                                        }
                                    >
                                        Projetos de Lei (PL)
                                    </li>

                                    <li
                                        className="px-4 py-2 text-gray-400 cursor-not-allowed"
                                    >
                                        Propostas de Emenda à Constituição (em breve)
                                    </li>

                                    <li
                                        className="px-4 py-2 text-gray-400 cursor-not-allowed"
                                    >
                                        Medidas Provisórias (em breve)
                                    </li>

                                    <li
                                        className="px-4 py-2 text-gray-400 cursor-not-allowed"
                                    >
                                        Requerimentos (em breve)
                                    </li>

                                    <li
                                        className="px-4 py-2 text-gray-400 cursor-not-allowed"
                                    >
                                        Destaques (em breve)
                                    </li>

                                    <li
                                        className="px-4 py-2 text-gray-400 cursor-not-allowed"
                                    >
                                        Emendas (em breve)
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>

                    <li>
                        <a href="/user-page" className="hover:underline">
                            Usuário
                        </a>
                    </li>


                    <li

                    >
                        <a href="/login" className="hover:underline">
                            Logout
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
