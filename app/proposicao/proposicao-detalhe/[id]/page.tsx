"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
type StatusProposicao = {
    descricaoSituacao: string;
    descricaoTramitacao: string;
    despacho: string;
    regime: string;
    siglaOrgao: string;
};

type ProposicaoDetalhe = {
    id: number;
    numero: number;
    ano: number;
    siglaTipo: string;
    descricaoTipo: string;
    ementa: string;
    dataApresentacao: string;
    statusProposicao: StatusProposicao;
    urlInteiroTeor: string;
};

export default function ProposicaoDetalhePage() {
    const { id } = useParams();
    const [proposicao, setProposicao] = useState<ProposicaoDetalhe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregar() {
            try {
                const res = await fetch(`/api/proposicoes/detalhe/${id}`, {
                    cache: "no-store",
                });
                const data = await res.json();
                console.log(
                    "detalhe proposicao:",
                    JSON.stringify(data, null, 2)
                ); setProposicao(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, [id]);

    if (loading) {
        return <p className="mt-20 text-center">Carregando...</p>;
    }

    if (!proposicao) {
        return <p className="mt-20 text-center">Proposição não encontrada.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="mt-24 px-6 flex justify-center">
                <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow">

                    {/* Cabeçalho */}
                    <div className="flex flex-col gap-2 mb-6">
                        <h1 className="text-3xl font-bold">
                            {proposicao.siglaTipo} {proposicao.numero}/{proposicao.ano}
                        </h1>

                        <span className="inline-block w-fit px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                            {proposicao.statusProposicao.descricaoSituacao}
                        </span>
                    </div>

                    {/* Infos principais */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm text-gray-700">
                        <div className="flex flex-col">
                            <p className="text-gray-500">
                                <strong>Tipo:</strong> {proposicao.descricaoTipo}
                            </p>
                            <p className="text-gray-500">
                                <strong>Sigla do tipo:</strong> {proposicao.siglaTipo}
                            </p>
                        </div>
                        <p>
                            <strong>Data de apresentação:</strong>{" "}
                            {new Date(proposicao.dataApresentacao).toLocaleDateString()}
                        </p>
                        <p><strong>Órgão:</strong> {proposicao.statusProposicao.siglaOrgao}</p>
                        <p><strong>Regime:</strong> {proposicao.statusProposicao.regime}</p>
                    </div>

                    {/* Ementa */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Ementa</h2>
                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                            {proposicao.ementa}
                        </p>
                    </div>

                    {/* Tramitação */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Tramitação</h2>

                        <p className="mb-2">
                            <strong>Situação:</strong>{" "}
                            {proposicao.statusProposicao.descricaoTramitacao}
                        </p>

                        <p className="text-gray-700 whitespace-pre-line">
                            <strong>Despacho:</strong>{" "}
                            {proposicao.statusProposicao.despacho}
                        </p>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-4">
                        <a
                            href={proposicao.urlInteiroTeor}
                            target="_blank"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Ver texto integral
                        </a>

                        {/* Futuro */}
                        <button
                            disabled
                            className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
                        >
                            Ver votações (em breve)
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}
