import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(pathname)
    // Se estiver na raiz "/", envia para "/login"
    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Para todas as outras rotas, segue normalmente
    return NextResponse.next();
}

export const config = {
    matcher: ['/'], // middleware vai rodar só na rota raiz
};
