// services/deputadosService.ts
import { Login } from "@/app/models/Login";

class LoginService {
    private readonly URL = "http://localhost:8080";



    async login(email: string, password: string): Promise<Login[]> {
        console.log(this.URL)
        const response = await fetch(`${this.URL}/users/login`, {
            cache: "no-store",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        console.log(response);

        if (!response.ok) {
            throw new Error("Erro ao buscar usuario");
        }
        console.log(response);
        return response.json();
    }
}

export const loginService = new LoginService();
