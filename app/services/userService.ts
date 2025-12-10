// services/deputadosService.ts
import { User } from "@/app/models/User";

class UserService {
    private readonly URL = "http://localhost:8080";

    async getAllUsers(): Promise<User[]> {
        const response = await fetch(`${this.URL}/users`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuarios");
        }

        return response.json();
    }
    async saveUser(user: Request): Promise<User> {
        const response = await fetch(`${this.URL}/users/salvar`, {
            cache: "no-store",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuarios");
        }

        return response.json();
    }
}

export const userService = new UserService();
