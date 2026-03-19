"use client";

import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

export default function ProjetoLeiPage({ ano = "2025" }: { ano?: string }) {
   // const [pagina, setPagina] = useState(1);
    const [dados, setDados] = useState<any[]>([]);
    //const [temProxima, setTemProxima] = useState(true); // controla botão Próxima
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();
const [anoSelecionado, setAnoSelecionado] = useState(ano);
   useEffect(() => {
    const fetchDados = async () => {
        setCarregando(true);

        try {
            const res = await fetch(`/api/proposicoes/${anoSelecionado}`);
            const data = await res.json();

            setDados(data || []);
        } catch (err) {
            console.error("Erro ao buscar proposições:", err);
            setDados([]);
        } finally {
            setCarregando(false);
        }
    };

    fetchDados();
}, [anoSelecionado]);

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold text-center mb-2">Projetos de Lei - Ano {ano}</h2>
               <div className="flex justify-center gap-2 mb-4">
  {[2026, 2025, 2024, 2023].map((anoBotao) => (
    <button
      key={anoBotao}
      onClick={() => setAnoSelecionado(String(anoBotao))}
      className={`px-4 py-2 rounded-md border 
        ${String(anoBotao) === ano
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-gray-100"
        }`}
    >
      {anoBotao}
    </button>
  ))}
</div>

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
                                        <td className="px-4 py-2">{p.resumoIA}</td>
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

               
            </div>
            <Footer />
        </>
    );
}
