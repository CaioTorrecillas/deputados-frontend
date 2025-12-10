"use client";
import { useState } from "react";
import { GET } from "@/app/api/deputados/route";
import { Deputado } from "@/app/models/Deputado";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import DeputadosCard from "@/app/components/DeputadosCard";


export default function DeputadosPage() {
    const [deputados, setDeputados] = useState<Deputado[]>([]);
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroUF, setFiltroUF] = useState("");

    useEffect(() => {
        async function carregar() {
            try {
                const response = await fetch("/api/deputados");
                const data = await response.json();
                setDeputados(data.dados);
                console.log(data);
            } catch (error) {
                console.error("Erro:", error);
            } finally {
                //setLoading(false);
            }
        }

        carregar();
    }, []);

    const deputadosFiltrados = deputados.filter((dep) => {
        const nomeOK = dep.nome.toLowerCase().includes(filtroNome.toLowerCase());
        const ufOK = filtroUF === "" || dep.siglaUf === filtroUF;
        return nomeOK && ufOK;
    });
    return (
        <>
            <Navbar />

            {/* Container da página */}
            <div className="mt-24 px-6 flex justify-center">
                <div className="max-w-5xl w-full bg-white/80 p-6 rounded-lg shadow-lg">

                    <h1 className="text-3xl font-bold mb-6 text-center">Deputados</h1>

                    {/* 🔎 Barra de busca */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Buscar por nome..."
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                            className="flex-1 p-2 border rounded"
                        />

                        <select
                            value={filtroUF}
                            onChange={(e) => setFiltroUF(e.target.value)}
                            className="p-2 border rounded w-40"
                        >
                            <option value="">Todos os Estados</option>
                            {[
                                "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
                                "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO",
                                "RR", "SC", "SP", "SE", "TO"
                            ].map((uf) => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                    </div>

                    {/* 🟦 Grid dos deputados */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {deputadosFiltrados.map((dep) => (
                            <DeputadosCard
                                key={dep.id}
                                nome={dep.nome}
                                siglaPartido={dep.siglaPartido}
                                siglaUf={dep.siglaUf}
                                urlFoto={dep.urlFoto ?? ""}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )

}