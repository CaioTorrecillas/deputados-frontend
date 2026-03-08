import { NextResponse } from "next/server";
import { proposicaoService } from "@/app/services/proposicaoService";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    request: Request,
    { params }: Params
) {
    try {
        const { id } = await params;

        const despesasInfo =
            await proposicaoService.getProposicaoPorIdDeputado(id);

        return NextResponse.json(despesasInfo);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar despesas do deputado" },
            { status: 500 }
        );
    }
}