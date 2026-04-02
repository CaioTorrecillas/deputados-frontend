import { NextResponse } from "next/server";
import { deputadosService } from "@/app/services/deputadosService";
type Params = {
    params: {
        id: string;
    };
};
export async function GET(request: Request,
    { params }: Params) {
    try {
        const { id } = await params;
        const deputados = await deputadosService.getAtividades(id);
        return NextResponse.json(deputados);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar deputados" },
            { status: 500 }
        );
    }
}
