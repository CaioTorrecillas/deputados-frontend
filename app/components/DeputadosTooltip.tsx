import { useState } from "react";
import { Deputado } from "../models/Deputado";
import DeputadosCard from "./DeputadosCard";

export default function DeputadosTooltip({ visible, x, y, deputados }: any) {
    if (!visible) return null;

    function agruparPorPartido(deputados: any) {
        const mapa: any = {};
        console.log(deputados)
        deputados.forEach((dep: any) => {
            const partido = dep.siglaPartido || "Outro";
            mapa[partido] = (mapa[partido] || 0) + 1;
        });

        return mapa;
    }
    const total = deputados.length;
    const partidos = agruparPorPartido(deputados);
    return (
        <div
            style={{
                position: "fixed",
                top: y + 10,
                left: x + 10,
                background: "#111",
                color: "#fff",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "12px",
                width: "220px",
                zIndex: 9999,
                pointerEvents: "none"
            }}
        >
            <strong>Total: {total}</strong>

            <div style={{ marginTop: "8px" }}>
                {Object.entries(partidos).map(([partido, qtd]) => {
                    const porcentagem = (qtd / total) * 100;

                    return (
                        <div key={partido} style={{ marginBottom: "6px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>{partido}</span>
                                <span>{qtd}</span>
                            </div>

                            <div style={{
                                background: "#333",
                                height: "6px",
                                borderRadius: "4px"
                            }}>
                                <div
                                    style={{
                                        width: `${porcentagem}%`,
                                        background: "#4f46e5",
                                        height: "100%",
                                        borderRadius: "4px"
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}