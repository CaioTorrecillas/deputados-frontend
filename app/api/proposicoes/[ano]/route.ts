import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { proposicaoService } from "@/app/services/proposicaoService";



export async function GET(
  req: Request,
  context: { params: Promise<{ ano: string }> }
) {

  const { ano } = await context.params;

  const result = await proposicaoService.getProjetosDeLei(Number(ano));

  return NextResponse.json(result);
}