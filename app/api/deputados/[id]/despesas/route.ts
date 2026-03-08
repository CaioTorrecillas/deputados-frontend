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

        const despesasInfo = await deputadosService.getDespesasById(id);
        return NextResponse.json(despesasInfo);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar despesas do deputado" },
            { status: 500 }
        );
    }
}