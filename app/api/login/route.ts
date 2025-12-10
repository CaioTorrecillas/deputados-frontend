import { NextResponse } from "next/server";
import { loginService } from "@/app/services/loginService";

export async function POST(request: Request) {
    console.log(request);
    try {
        const body = await request.json(); console.log(body);
        const result = await loginService.login(body.email, body.password);
        console.log(result)
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: "Não autorizado" },
            { status: 400 }
        );
    }
}
