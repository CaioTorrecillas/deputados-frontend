"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

type Deputado = {
    dataNascimento: string;
    escolaridade: string;
    municipioNascimento: string;
    ufNascimento: string;
    redeSocial: string[];
    ultimoStatus: {
        nomeEleitoral: string;
        siglaPartido: string;
        siglaUf: string;
        situacao: string;
        urlFoto: string;
        gabinete: {
            predio: string;
            andar: string;
            sala: string;
            telefone: string;
            email: string;
        };
    };
};

export default function DeputadoDetalhePage() {
    const { id } = useParams();
    const [deputado, setDeputado] = useState<Deputado | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDeputado() {
            try {
                const response = await fetch(`/api/deputados/${id}`);
                const data = await response.json();
                setDeputado(data);
            } catch (error) {
                console.error("Erro ao buscar deputado", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDeputado();
    }, [id]);

    if (loading) {
        return <p className="p-6">Carregando...</p>;
    }

    if (!deputado) {
        return <p className="p-6">Deputado não encontrado</p>;
    }

    const { ultimoStatus } = deputado;

    return (
        <>
            <Navbar />

            <div className="max-w-5xl mx-auto p-6 space-y-6">

                {/* 🟦 Card: Cabeçalho */}
                <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
                    <img
                        src={ultimoStatus.urlFoto}
                        alt={ultimoStatus.nomeEleitoral}
                        className="w-32 h-32 rounded-full object-cover"
                    />

                    <div>
                        <h1 className="text-2xl font-bold">
                            {ultimoStatus.nomeEleitoral}
                        </h1>

                        <p className="text-gray-600 mt-1">
                            {ultimoStatus.siglaPartido} · {ultimoStatus.siglaUf}
                        </p>

                        <p className="text-gray-600 mt-1">
                            Situação: {ultimoStatus.situacao}
                        </p>
                    </div>
                </div>

                {/* 🟦 Card: Mandato / Gabinete */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Mandato e Gabinete
                    </h2>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                        <li><strong>Prédio:</strong> {ultimoStatus.gabinete.predio}</li>
                        <li><strong>Andar:</strong> {ultimoStatus.gabinete.andar}</li>
                        <li><strong>Sala:</strong> {ultimoStatus.gabinete.sala}</li>
                        <li><strong>Telefone:</strong> {ultimoStatus.gabinete.telefone}</li>
                        <li className="sm:col-span-2">
                            <strong>Email:</strong>{" "}
                            <a
                                href={`mailto:${ultimoStatus.gabinete.email}`}
                                className="text-blue-600 hover:underline"
                            >
                                {ultimoStatus.gabinete.email}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* 🟦 Card: Informações pessoais */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Informações pessoais
                    </h2>

                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <strong>Data de nascimento:</strong>{" "}
                            {deputado.dataNascimento}
                        </li>
                        <li>
                            <strong>Naturalidade:</strong>{" "}
                            {deputado.municipioNascimento} / {deputado.ufNascimento}
                        </li>
                        <li>
                            <strong>Escolaridade:</strong> {deputado.escolaridade}
                        </li>
                    </ul>
                </div>

                {/* 🟦 Card: Redes sociais */}
                {deputado.redeSocial?.length > 0 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Redes sociais
                        </h2>

                        <ul className="space-y-2">
                            {deputado.redeSocial.map((link) => (
                                <li key={link}>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline break-all"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );

}

