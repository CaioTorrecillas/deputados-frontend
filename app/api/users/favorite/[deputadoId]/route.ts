import { NextResponse } from "next/server";
import { userService } from "@/app/services/userService";
import { cookies } from "next/headers";


export async function POST(
    req: Request,
    { params }: { params: Promise<{ deputadoId: string }> }

) {
    const { deputadoId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const userId = cookieStore.get("userId")?.value;




    if (!token || !userId) {
        return NextResponse.json(
            { error: "Usuário não autenticado" },
            { status: 401 }
        );
    }
    console.log(deputadoId)
    try {
        //const body = await req.json(); // Aqui vem o usuário
        const { status, data } = await userService.favoriteDeputado(token, deputadoId, userId);
        return NextResponse.json(data, { status });


    } catch (error: any) {
        return NextResponse.json(
            { erro: error.message || "Erro ao favoritar deputado" },
            { status: 500 }
        );
    }
}