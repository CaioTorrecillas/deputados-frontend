import { NextResponse } from "next/server";

import { deputadosService } from "@/app/services/deputadosService";
import { proposicaoService } from "@/app/services/proposicaoService";



export async function POST() {
    try {
        const message = await proposicaoService.vincularDeputados();

        return NextResponse.json({
            success: true,
            message
        });

    } catch (error) {
        console.error("Erro na rota:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erro ao vincular proposições com deputados"
            },
            { status: 500 }
        );
    }
}