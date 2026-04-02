"use client";
import { useState } from "react";
import { GET } from "@/app/api/deputados/route";
import { Deputado } from "@/app/models/Deputado";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Modal from "@/app/components/Modal";
import DeputadosCard from "@/app/components/DeputadosCard";
import Footer from "@/app/components/Footer";
import Map from "@/app/components/Map";
import Sidebar from "@/app/components/Sidebar";
import DeputadosPanel from "@/app/components/DeputadosPanel";
import DeputadosTooltip from "@/app/components/DeputadosTooltip";



export default function HomePage() {
    const [deputados, setDeputados] = useState<Deputado[]>([]);
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroUF, setFiltroUF] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"success" | "error">("success");
    const [ufSelecionada, setUfSelecionada] = useState<string | null>(null);
    const [isHoveringMapa, setIsHoveringMapa] = useState(false);
    const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);

    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        deputados: []
    });


    const handleLeaveEstado = () => {
        setTooltip(prev => ({ ...prev, visible: false }));
    };
    useEffect(() => {

        async function carregar() {
            try {
                const response = await fetch("/api/deputados");
                const data = await response.json();
                setDeputados(data);
                console.log(data);

            } catch (error) {
                console.error("Erro:", error);
            } finally {
                //setLoading(false);
            }
        }

        carregar();
    }, []);

    const handleHoverEstado = (event: any, uf: any) => {


        const deputadosDoEstado = deputados.filter(d => d.siglaUf === uf);
        setTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            deputados: deputadosDoEstado
        });
    };

    function handleFavoriteResult(success: boolean, message?: string) {
        setModalMessage(
            message ??
            (success
                ? "Deputado favoritado com sucesso ⭐"
                : "Erro ao favoritar deputado ❌")
        );

        setModalType(success ? "success" : "error");
        setModalOpen(true);
    }
    return (
        <>
           

            <div className="flex">


                <Sidebar />
                <div className="flex-1 mt-24 px-6">
                    <div className="flex justify-center">
                        <div className="max-w-5xl w-full bg-white/80 p-6 rounded-lg shadow-lg">

                            <h1 className="text-3xl font-bold mb-6 text-center">
                                Deputados
                            </h1>
                            <Map setUfSelecionada={setUfSelecionada}
                                onHoverEstado={handleHoverEstado}
                                onLeaveEstado={handleLeaveEstado} />
                            <DeputadosPanel
                                uf={ufSelecionada}
                                deputados={deputados}
                                onClose={() => setUfSelecionada(null)} />

                            <DeputadosTooltip
                                visible={tooltip.visible}
                                x={tooltip.x}
                                y={tooltip.y}
                                deputados={tooltip.deputados}
                            />

                        </div>
                    </div>
                </div>
            </div>

         

        </>
    )

}