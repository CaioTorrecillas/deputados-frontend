import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { proposicaoService } from "@/app/services/proposicaoService";


export async function GET(req: Request,
    { params }: { params: { ano: string } }) {

    const { ano } = await params;
    // Query params opcionais
    const url = new URL(req.url);
    const pagina = url.searchParams.get("pagina") || "1"; // default 1
    const itens = url.searchParams.get("itens") || "20";  // default 20

    const result = await proposicaoService.getProjetosDeLei({
        ano,
        pagina: Number(pagina),
        itens: Number(itens),
    });

    console.log(result)


    /* if (result.status !== 200) {
         return NextResponse.json(
             { error: "Erro ao buscar favoritos" },
             { status: result.status }
         );
     }*/

    return NextResponse.json(result);

}