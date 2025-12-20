import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { userService } from "@/app/services/userService";
export async function GET() {

    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!userId || !token) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const result = await userService.getAllFavoriteDeputados(userId, token);


    if (result.status !== 200) {
        return NextResponse.json(
            { error: "Erro ao buscar favoritos" },
            { status: result.status }
        );
    }

    return NextResponse.json(result.data);
}
