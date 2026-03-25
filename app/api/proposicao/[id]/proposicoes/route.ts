import { NextResponse } from "next/server";
import { proposicaoService } from "@/app/services/proposicaoService";

type Params = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const { searchParams } = new URL(request.url);
    const pagina = searchParams.get("pagina") || "1";
    const tipo = searchParams.get("tipo") || undefined;

    const data = await proposicaoService.getProposicaoPorIdDeputado(
        id,
        Number(pagina),
        tipo

    );

    return Response.json(data);
}