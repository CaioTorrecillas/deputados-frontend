// services/deputadosService.ts
import { Login } from "@/app/models/Login";

class LoginService {
    private readonly URL = "http://localhost:8080";



    async login(email: string, password: string): Promise<{ accessToken?: string; refreshToken?: string; error?: string }> {
        console.log(this.URL)
        const response = await fetch(`${this.URL}/auth/login`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log(response)
        if (!response.ok) {
            // Retorna o erro para o front-end tratar
            return { error: data.error || "Erro ao autenticar usuário" };
        }

        // Retorna os tokens
        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
        };
    }
}

export const loginService = new LoginService();
