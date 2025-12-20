import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { userService } from "@/app/services/userService";
export async function GET() {

    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;


    if (!token) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    const userResult = await userService.getUser(token);




    if (userResult.status !== 200) {
        return NextResponse.json(
            { error: "Erro ao buscar favoritos" },
            { status: userResult.status }
        );
    }

    return NextResponse.json(userResult.data);
}
