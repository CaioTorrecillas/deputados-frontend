import { NextResponse } from "next/server";

import { proposicaoService } from "@/app/services/proposicaoService";



export async function POST() {
    try {
        const message = await proposicaoService.syncProposicoes();

        return NextResponse.json({
            success: true,
            message
        });

    } catch (error) {
        console.error("Erro na rota:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erro ao sincronizar proposições"
            },
            { status: 500 }
        );
    }
}