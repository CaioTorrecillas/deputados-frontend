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
    CartesianGrid,
    Cell
} from "recharts";

const coresTipos = {

    // Projetos legislativos
    PL: "#2563eb",
    PEC: "#1d4ed8",
    PLV: "#3b82f6",
    PRC: "#60a5fa",

    // Emendas
    EMC: "#16a34a",
    EMP: "#22c55e",
    EMA: "#4ade80",
    EMR: "#15803d",

    // Requerimentos / solicitações
    REQ: "#f59e0b",
    RIC: "#fbbf24",
    RCP: "#f97316",
    REC: "#fb923c",
    RAT: "#fdba74",
    RPD: "#ea580c",
    RDF: "#fed7aa",

    // Relatórios / pareceres
    PRL: "#9333ea",
    PRLE: "#a855f7",
    PRLP: "#c084fc",

    // Substitutivos / destaques
    SBT: "#8b5cf6",
    DTQ: "#7c3aed",

    // Outros tipos
    DOC: "#6b7280",
    PPR: "#9ca3af",
    PPP: "#4b5563",
    SLD: "#374151",
    PEP: "#64748b",
    PROC: "#94a3b8",
    SSP: "#475569",
    INC: "#334155",
    CVO: "#1f2937",
    ATACN: "#71717a"

};
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
const significadoTipos = {
    ATACN: "Ata da Comissão",
    CVO: "Comunicação de voto",
    DOC: "Documento",
    DTQ: "Destaque para votação em separado",
    EMA: "Emenda aditiva",
    EMC: "Emenda de comissão",
    EMP: "Emenda",
    EMR: "Emenda de redação",
    INC: "Indicação",
    PEC: "Proposta de Emenda à Constituição",
    PEP: "Proposta de Emenda de Plenário",
    PL: "Projeto de Lei",
    PLV: "Projeto de Lei de Conversão",
    PPR: "Pedido de prorrogação",
    PPP: "Pedido de preferência",
    PRC: "Projeto de Resolução da Câmara",
    PRL: "Parecer do relator",
    PRLE: "Parecer de relator em comissão especial",
    PRLP: "Parecer de relator em plenário",
    PROC: "Processo",
    RAT: "Ratificação",
    RCP: "Requerimento de criação de CPI",
    REC: "Recurso",
    REQ: "Requerimento",
    RDF: "Redação final",
    RIC: "Requerimento de informação",
    RPD: "Requerimento de retirada de pauta",
    SBT: "Substitutivo",
    SLD: "Solicitação de devolução",
    SSP: "Subscrição de proposição"
};
export default function DeputadoDetalhePage() {
    const { id } = useParams();
    const tiposPrincipais = ["PL", "PEC", "PLV", "PDL"];
    const [deputado, setDeputado] = useState<Deputado | null>(null);
    const [mostrarLegenda, setMostrarLegenda] = useState(false);
    const [modoGrafico, setModoGrafico] = useState("principais");
    const [despesas, setDespesas] = useState<any[]>([]);
    const [proposicao, setProposicao] = useState<any[]>([]);
    const [proposicaoDadosTotais, setProposicaoDadosTotais] = useState<any[]>([]);
    const [paginaProposicoes, setPaginaProposicoes] = useState(1);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"gerais" | "despesas" | "proposicoes" | "proposicoesDT" | "atividades">("gerais");
    const [tipoFiltro, setTipoFiltro] = useState("");
    const [atividades, setAtividades] = useState<any[]>([]);

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


    useEffect(() => {
        if (activeTab !== "despesas") return;

        async function fetchDespesas() {
            try {
                const response = await fetch(`/api/deputados/${id}/despesas`);
                const data = await response.json();
                setDespesas(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDespesas();
    }, [id, activeTab]);

    useEffect(() => {
        if (activeTab !== "atividades") return;

        async function fetchAtividades() {
            try {
                const response = await fetch(`/api/atividades/deputado/${id}`);
                const data = await response.json();

                setAtividades(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAtividades();
    }, [activeTab, id]);

    useEffect(() => {
        async function fetchDadosTotais() {
            try {
                const response = await fetch(
                    `/api/proposicao/${id}/proposicoes/dadosTotais`
                );

                const data = await response.json();
                setProposicaoDadosTotais(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDadosTotais();
    }, [id]);

    useEffect(() => {
        if (activeTab !== "proposicoes") return;

        async function fetchProposicoes() {
            try {
                let url = `/api/proposicao/${id}/proposicoes?pagina=${paginaProposicoes}`;

                if (tipoFiltro) {
                    url += `&tipo=${tipoFiltro}`;
                }

                const response = await fetch(url);
                const data = await response.json();

                setProposicao(data.dados);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProposicoes();
    }, [id, paginaProposicoes, activeTab, tipoFiltro]);


    if (loading) {
        return <p className="p-6">Carregando...</p>;
    }

    if (!deputado) {
        return <p className="p-6">Deputado não encontrado</p>;
    }

    const { ultimoStatus } = deputado;
    const dadosGrafico = proposicaoDadosTotais?.porTipo
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
                    <button
                        onClick={() => setActiveTab("atividades")}
                        className={`pb-3 font-medium ${activeTab === "atividades"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Atividades
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
                        {despesas.map((despesa, index) => (
                            <div
                                key={`${despesa.codDocumento}-${despesa.parcela}-${index}`}
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
                {activeTab === "atividades" && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Atividades do Deputado
                        </h2>

                        {atividades.map((atividade, index) => (
                            <div
                                key={`${atividade.id}-${atividade.referenciaId}-${index}`}
                                className="border rounded-lg p-4 mb-3 shadow-sm bg-white"
                            >
                                {/* 🧠 Descrição */}
                                <h3 className="font-semibold text-lg text-gray-800">
                                    Descrição da votação: <span className="font-medium">{atividade.descricao}</span> 
                                </h3>

                                {/* 📅 Data */}
                                <p className="text-sm text-gray-500 mt-1">
                                    Data da votação: {new Date(atividade.dataAtividade).toLocaleDateString("pt-BR")}
                                </p>

                                {/* 🏷 Tipo */}
                                <p className="text-gray-600 mt-2">
                                    <span className="font-medium">Tipo:</span> {atividade.tipo}
                                </p>

                                {/* 🧩 Referência (se existir) */}
                                {atividade.referenciaId && (
                                    <p className="text-gray-500 text-sm mt-1">
                                        Ref: {atividade.referenciaId}
                                    </p>
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
                        <div className="flex gap-4 mb-4">
                            <select
                                value={tipoFiltro}
                                onChange={(e) => {
                                    setTipoFiltro(e.target.value);
                                    setPaginaProposicoes(1); // resetar pagina
                                }}
                                className="border p-2 rounded"
                            >

                                <option value="PL">Projeto de Lei (PL) 2025</option>
                                <option value="PEC" disabled>PEC (to do)</option>
                                <option value="REQ" disabled>Requerimento(to do)</option>
                                <option value="EMC" disabled>Emenda de Comissão(to do)</option>

                            </select>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto border rounded p-3">

                            {proposicao?.map((item) => (
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
                        </div>
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
                        <h3 className="text-lg font-semibold mb-2">
                            Total de proposições: {proposicaoDadosTotais.total}
                        </h3>



                        <ResponsiveContainer width="100%" height={500}>
                            <BarChart data={modoGrafico === "principais" ? dadosPrincipais : dadosDetalhados}
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="tipo"
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="valor">
                                    {dadosGrafico.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={coresTipos[entry.tipo] || "#6b7280"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="flex gap-5 mb-8 mt-8">
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
                        <button
                            onClick={() => setMostrarLegenda(!mostrarLegenda)}
                            className="mt-4 text-blue-600 hover:underline"
                        >
                            {mostrarLegenda ? "Esconder explicação das siglas" : "Ver significado das siglas"}
                        </button>
                        {mostrarLegenda && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700 mt-4">
                                {Object.entries(significadoTipos).map(([sigla, significado]) => (
                                    <p key={sigla}>
                                        <b>{sigla}</b> — {significado}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>


        </>
    );














}

