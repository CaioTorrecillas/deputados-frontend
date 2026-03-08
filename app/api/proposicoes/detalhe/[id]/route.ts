import { NextResponse } from "next/server";
import { deputadosService } from "@/app/services/deputadosService";
import { proposicaoService } from "@/app/services/proposicaoService";
type Params = {
    params: {
        id: string;
    };
};
export async function GET(request: Request,
    { params }: Params) {
    try {
        const { id } = await params;
        console.log("router: " + id)
        const proposicao = await proposicaoService.getProposicaoById(id);
        console.log("router: " + proposicao)
        return NextResponse.json(proposicao);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar detalhes da proposicao" },
            { status: 500 }
        );
    }
}