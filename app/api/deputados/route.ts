import { NextResponse } from "next/server";
import { deputadosService } from "@/app/services/deputadosService";

export async function GET() {
    try {
        const deputados = await deputadosService.getDeputados();
        return NextResponse.json(deputados);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar deputados" },
            { status: 500 }
        );
    }
}
