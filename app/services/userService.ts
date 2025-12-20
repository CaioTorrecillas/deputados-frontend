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
    async favoriteDeputado(token: string, deputadoId: string, userId: string) {

        console.log(deputadoId)
        const response = await fetch(`${this.URL}/users/${userId}/favorites/${deputadoId}`, {
            cache: "no-store",
            method: "POST",
            headers: {

                Authorization: `Bearer ${token}`
            },

        });
        console.log("USERS SERVICE - TOKEN:", token);
        console.log("USERS SERVICE - RESPONSE: " + response.status);
        console.log("USERS SERVICE - AUTH HEADER:", `Bearer ${token}`);
        console.log(response)
        const text = await response.text();
        console.log(text);
        const data = text ? JSON.parse(text) : null;

        return {
            status: response.status,
            data,
        };
    }
    async getUser(token: string) {

        const response = await fetch(`${this.URL}/users/me`, {
            cache: "no-store",
            method: "GET",
            headers: {

                Authorization: `Bearer ${token}`
            },

        });
        console.log("USERS SERVICE getUser - RESPONSE: " + response.status);
        console.log("USERS SERVICE getUser - AUTH HEADER:", `Bearer ${token}`);
        console.log(response)
        const data = await response.json();

        return {
            status: response.status,
            data,
        };
    }

    async getAllFavoriteDeputados(userId: string, token: string) {

        const response = await fetch(`${this.URL}/users/${userId}/favorites`, {
            cache: "no-store",
            method: "GET",
            headers: {

                Authorization: `Bearer ${token}`
            },

        });

        console.log("USERS SERVICE getAllFavoriteDeputados - RESPONSE: " + response.status);
        console.log("USERS SERVICE getAllFavoriteDeputados - AUTH HEADER:", `Bearer ${token}`);
        console.log(response)
        const data = response.ok ? await response.json() : null;

        return {
            status: response.status,
            data,
        };
    }
}

export const userService = new UserService();
