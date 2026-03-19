import { useState } from "react";
import { Deputado } from "../models/Deputado";
import DeputadosCard from "./DeputadosCard";
type Props = {
    uf: string | null;
    deputados: Deputado[];
    onClose: () => void;
};

export default function DeputadosPanel({ uf, deputados, onClose }: Props) {
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroPartido, setFiltroPartido] = useState("");
    if (!uf) return null;

    console.log(uf, deputados)

    const deputadosFiltrados = deputados.filter((dep) => {
        const ufOK = dep.siglaUf === uf;
        const nomeOK = dep.nome.toLowerCase().includes(filtroNome.toLowerCase());
        const partidoOK =
            filtroPartido === "" || dep.siglaPartido === filtroPartido;

        return ufOK && nomeOK && partidoOK;
    });

    // 🎯 lista de partidos só daquele estado
    const partidos = Array.from(
        new Set(
            deputados
                .filter((d) => d.siglaUf === uf)
                .map((d) => d.siglaPartido)
        )
    ).sort();
    return (
        <>
            {/* 🔥 Overlay */}
            <div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={onClose}
            />

            {/* 🧩 Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-[500px] max-h-[80vh] rounded-lg shadow-2xl p-4 overflow-y-auto">

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">
                            Deputados de {uf}
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                    </div>

                    {/* 🔎 Filtros */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <input
                            type="text"
                            placeholder="Buscar por nome..."
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />

                        <select
                            value={filtroPartido}
                            onChange={(e) => setFiltroPartido(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="">Todos os partidos</option>
                            {partidos.map((partido) => (
                                <option key={partido} value={partido}>
                                    {partido}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 📋 Lista */}
                    <div className="space-y-3">
                        {deputadosFiltrados.map((dep) => (
                            <DeputadosCard
                                key={dep.id}
                                id={dep.id}
                                nome={dep.nome}
                                siglaPartido={dep.siglaPartido}
                                siglaUf={dep.siglaUf}
                                urlFoto={dep.urlFoto ?? ""}
                            />
                        ))}
                    </div>

                    {/* 🧠 Estado vazio */}
                    {deputadosFiltrados.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">
                            Nenhum deputado encontrado
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}