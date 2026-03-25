import { NextResponse } from "next/server";

import { deputadosService } from "@/app/services/deputadosService";



export async function POST() {
    try {
        const message = await deputadosService.syncDeputados();

        return NextResponse.json({
            success: true,
            message
        });

    } catch (error) {
        console.error("Erro na rota:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erro ao sincronizar deputados"
            },
            { status: 500 }
        );
    }
}