"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";


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
    const tiposPrincipais = ["PL", "PEC", "PLV", "PDL"];
    const [deputado, setDeputado] = useState<Deputado | null>(null);
    const [modoGrafico, setModoGrafico] = useState("principais");
    const [despesas, setDespesas] = useState<any[]>([]);
    const [proposicao, setProposicao] = useState<any[]>([]);
    const [proposicaoDadosTotais, setProposicaoDadosTotais] = useState<any[]>([]);
    const [paginaProposicoes, setPaginaProposicoes] = useState(1);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"gerais" | "despesas" | "proposicoes" | "proposicoesDT">("gerais");
    useEffect(() => {
        /*if (activeTab === "proposicoes") {
            fetch(`/api/proposicao/${id}/proposicoes?pagina=${paginaProposicoes}`)
                .then(res => res.json())
                .then(data => setProposicao(data))
                .catch(err => console.error(err));
        }*/
        async function fetchDeputado() {
            try {
                const response = await fetch(`/api/deputados/${id}`);
                const responseDespesas = await fetch(`/api/deputados/${id}/despesas`);
                const responseProposicao = await fetch(`/api/proposicao/${id}/proposicoes`);
                const responseProposicaoDadosTotais = await fetch(`/api/proposicao/${id}/proposicoes/dadosTotais`);

                const dataProposicao = await responseProposicao.json();
                const dataDespesas = await responseDespesas.json();
                const dataProposicaoDT = await responseProposicaoDadosTotais.json();




                setProposicaoDadosTotais(dataProposicaoDT);




                setDespesas(dataDespesas);
                setProposicao(dataProposicao);
                const data = await response.json();
                console.log(dataProposicaoDT)
                setDeputado(data);
            } catch (error) {
                console.error("Erro ao buscar deputado", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDeputado();
    }, [id, paginaProposicoes, activeTab]);

    if (loading) {
        return <p className="p-6">Carregando...</p>;
    }

    if (!deputado) {
        return <p className="p-6">Deputado não encontrado</p>;
    }

    const { ultimoStatus } = deputado;
    const dadosGrafico = proposicaoDadosTotais
        ? Object.entries(proposicaoDadosTotais.porTipo).map(([tipo, valor]) => ({
            tipo,
            valor
        }))
        : [];

    const dadosPrincipais = dadosGrafico
        .filter((item) => tiposPrincipais.includes(item.tipo))
        .sort((a, b) => b.valor - a.valor);

    const dadosDetalhados = [...dadosGrafico]
        .sort((a, b) => b.valor - a.valor);

    return (

        <>
            <Navbar />


            <div className="max-w-5xl mx-auto p-6 space-y-6">

                {/* 🟦 Card: Cabeçalho (SEMPRE VISÍVEL) */}
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





                {/* 🟦 Tabs (SEMPRE VISÍVEL) */}
                <div className="border-b flex gap-6">
                    <button
                        onClick={() => setActiveTab("gerais")}
                        className={`pb-3 font-medium ${activeTab === "gerais"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Detalhes Gerais
                    </button>

                    <button
                        onClick={() => setActiveTab("despesas")}
                        className={`pb-3 font-medium ${activeTab === "despesas"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Despesas
                    </button>

                    <button
                        onClick={() => setActiveTab("proposicoes")}
                        className={`pb-3 font-medium ${activeTab === "proposicoes"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Proposições
                    </button>
                    <button
                        onClick={() => setActiveTab("proposicoesDT")}
                        className={`pb-3 font-medium ${activeTab === "proposicoesDT"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Proposições Dados
                    </button>
                </div>






                {/* 🔁 CONTEÚDO QUE MUDA */}
                {activeTab === "gerais" && (
                    <>
                        {/* Mandato / Gabinete */}
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
                    </>
                )}
                {activeTab === "despesas" && (

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Despesas do Deputado
                        </h2>
                        {despesas.map((despesa) => (
                            <div
                                key={`${despesa.codDocumento}-${despesa.parcela}`}
                                className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
                            >
                                {/* Tipo da despesa */}
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {despesa.tipoDespesa}
                                </h3>

                                {/* Fornecedor */}
                                <p className="text-gray-600 mt-1">
                                    <span className="font-medium">Fornecedor:</span> {despesa.nomeFornecedor}
                                </p>

                                {/* Data + Documento */}
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(despesa.dataDocumento).toLocaleDateString("pt-BR")} •
                                    Documento nº {despesa.numDocumento}
                                </p>
                                {/* Parcela */}
                                <p className="mt-2 text-green-700 font-bold text-lg">
                                    <span className="font-medium">Parcela:</span> {despesa.parcela}

                                </p>
                                {/* Valor */}
                                <p className="mt-2 text-green-700 font-bold text-lg">
                                    R$ {despesa.valorLiquido.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}
                                </p>

                                {/* Link da nota */}
                                {despesa.urlDocumento && (
                                    <a
                                        href={despesa.urlDocumento}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-sm underline mt-2 inline-block"
                                    >
                                        Ver nota fiscal
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "proposicoes" && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Proposições do Deputado
                        </h2>

                        {proposicao?.dados?.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
                            >
                                {/* Tipo da proposição */}
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {item.siglaTipo} {item.numero}/{item.ano}
                                </h3>

                                {/* Data de apresentação */}
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(item.dataApresentacao).toLocaleDateString("pt-BR")}
                                </p>

                                {/* Código interno */}
                                <p className="text-gray-600 mt-1">
                                    <span className="font-medium">Código Tipo:</span> {item.codTipo}
                                </p>

                                {/* Ementa */}
                                <p className="mt-2 text-gray-700">
                                    <span className="font-medium">Ementa:</span> {item.ementa}
                                </p>

                                {/* ID técnico */}
                                <p className="mt-2 text-sm text-gray-400">
                                    ID da proposição: {item.id}
                                </p>
                            </div>
                        ))}
                        <div className="flex justify-center items-center gap-4 mt-6">

                            {/* Botão anterior */}
                            <button
                                onClick={() => setPaginaProposicoes((prev) => Math.max(prev - 1, 1))}
                                disabled={paginaProposicoes === 1}
                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            >
                                ← Anterior
                            </button>

                            <span className="text-gray-700 font-medium">
                                Página {paginaProposicoes}
                            </span>

                            {/* Botão próxima */}
                            <button
                                onClick={() => setPaginaProposicoes((prev) => prev + 1)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Próxima →
                            </button>

                        </div>
                    </div>
                )}
                {activeTab === "proposicoesDT" && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Proposições Dados
                        </h2>



                        <ResponsiveContainer width="100%" height={500}>
                            <BarChart data={modoGrafico === "principais" ? dadosPrincipais : dadosDetalhados}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="tipo" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="valor" />
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={() => setModoGrafico("principais")}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Principais
                            </button>

                            <button
                                onClick={() => setModoGrafico("detalhado")}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Todos os Tipos
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />

        </>
    );














}

