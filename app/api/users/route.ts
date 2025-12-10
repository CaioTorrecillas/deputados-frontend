import { NextResponse } from "next/server";
import { userService } from "@/app/services/userService";

export async function GET() {
    try {
        const users = await userService.getAllUsers();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao buscar usuários" },
            { status: 500 }
        );
    }
}
export async function POST(req: Request) {
    try {
        const body = await req.json(); // Aqui vem o usuário
        const usuarioSalvo = await userService.saveUser(body);

        return NextResponse.json(usuarioSalvo, { status: 201 });

    } catch (error: any) {
        return NextResponse.json(
            { erro: error.message || "Erro ao criar usuário" },
            { status: 400 }
        );
    }
}