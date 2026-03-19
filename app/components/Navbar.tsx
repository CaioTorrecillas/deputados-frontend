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
        <nav className="w-full bg-gray-900 text-white  px-6 py-4 shadow">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold">Portal Político</h1>

                <ul className="flex space-x-6 items-center">
                    <li>
                        <a href="/protected/home" className="hover:underline">
                            Home
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
