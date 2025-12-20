import { NextResponse } from "next/server";
import { loginService } from "@/app/services/loginService";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = await loginService.login(body.email, body.password);
        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 401 });
        }
        // Cria resposta com cookie HttpOnly
        const response = NextResponse.json({ message: "Login bem-sucedido" });
        response.cookies.set({
            name: "accessToken",
            value: result.accessToken!,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hora
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: "Não autorizado" },
            { status: 400 }
        );
    }
}
