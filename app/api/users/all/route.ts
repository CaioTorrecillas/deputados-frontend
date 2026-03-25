import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { userService } from "@/app/services/userService";
export async function GET() {

    //const cookieStore = await cookies();

    //const token = cookieStore.get("accessToken")?.value;


    // if (!token) {
    //     return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    //}
    const userResult: any = await userService.getAllUsers();



    return NextResponse.json(userResult);
}
