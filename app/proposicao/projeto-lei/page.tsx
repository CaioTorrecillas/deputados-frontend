"use client";

import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

export default function ProjetoLeiPage({ ano = "2025" }: { ano?: string }) {
    const [pagina, setPagina] = useState(1);
    const [dados, setDados] = useState<any[]>([]);
    const [temProxima, setTemProxima] = useState(true); // controla botão Próxima
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchDados = async () => {
            setCarregando(true);
            try {
                const res = await fetch(`/api/proposicoes/${ano}?pagina=${pagina}&itens=20`);
                const data = await res.json();
                setDados(data || []);
                console.log("DADOS" + data)
                // Se a resposta tiver menos itens que o solicitado, significa que não há próxima página
                setTemProxima(!data.dados || data.dados.length < 20 ? false : true);
            } catch (err) {
                console.error("Erro ao buscar proposições:", err);
                setDados([]);
                setTemProxima(false);
            } finally {
                setCarregando(false);
            }
        };

        fetchDados();
    }, [ano, pagina]);

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold text-center mb-2">Projetos de Lei - Ano {ano}</h2>
                <p className="text-center mb-4">Página {pagina}</p>

                {carregando ? (
                    <p className="text-center">Carregando...</p>
                ) : dados.length === 0 ? (
                    <p className="text-center">Nenhuma proposição encontrada.</p>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg mb-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left">PL</th>
                                    <th className="px-4 py-2 text-left">Número</th>
                                    <th className="px-4 py-2 text-left">Ano</th>
                                    <th className="px-4 py-2 text-left">Data</th>
                                    <th className="px-4 py-2 text-left">Ementa</th>
                                    <th className="px-4 py-2 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dados.map((p, index) => (
                                    <tr
                                        key={p.id}
                                        className={index % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}
                                    >
                                        <td className="px-4 py-2">{p.siglaTipo}</td>
                                        <td className="px-4 py-2">{p.numero}</td>
                                        <td className="px-4 py-2">{p.ano}</td>
                                        <td className="px-4 py-2">
                                            {p.dataApresentacao
                                                ? new Date(p.dataApresentacao).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="px-4 py-2">{p.ementa}</td>

                                        {/* Coluna de ações */}
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => router.push(`/proposicao/proposicao-detalhe/${p.id}`)}
                                                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setPagina((p) => p - 1)}
                        disabled={pagina === 1 || carregando}
                        className={`px-4 py-2 rounded-md text-white ${pagina === 1 || carregando ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => setPagina((p) => p + 1)}
                        disabled={!temProxima || carregando}
                        className={`px-4 py-2 rounded-md text-white ${!temProxima || carregando ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        Próxima
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
