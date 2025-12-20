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

        const deputado = await deputadosService.getDeputadoById(id);
        return NextResponse.json(deputado);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar deputados" },
            { status: 500 }
        );
    }
}
