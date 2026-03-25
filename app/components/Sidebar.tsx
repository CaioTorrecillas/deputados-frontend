"use client";

import { useState } from "react";

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    return (
        <aside
            className={`
         top-0 left-0 h-screen
         bg-gray-900 text-white
        transition-all duration-300
        ${open ? "w-64" : "w-20"}
        flex flex-col shadow-lg
      `}
        >
            {/* Topo */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                {open && <span className="text-lg font-bold">Menu</span>}

                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded hover:bg-gray-800 transition"
                >
                    {open ? "←" : "→"}
                </button>
            </div>

            {/* Usuário */}
            <div className="px-4 py-3 border-b border-gray-800">
                {open ? (
                    <p className="text-sm">
                        Olá, <span className="text-lg font-bold">Caio</span>
                    </p>
                ) : (
                    <p className="text-center">👤</p>
                )}
            </div>

            {/* Menu */}
            <nav className="flex-1 mt-4">
                <ul className="space-y-2 px-2">

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition">

                        {open && <span>Meus Deputados</span>}
                    </li>

                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition">
                        <a href="/user-page">
                            {open && <span>Meu Perfil</span>}
                        </a>

                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition">
                        <a href="/admin-page">
                            {open && <span>Painel do Administrador</span>}
                        </a>

                    </li>

                </ul>
            </nav>

            {/* Rodapé */}
            {open && (
                <div className="p-4 text-xs text-gray-400 border-t border-gray-800">
                    © 2026
                </div>
            )}
        </aside>
    );
}