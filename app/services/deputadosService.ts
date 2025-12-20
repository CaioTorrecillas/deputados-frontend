// services/deputadosService.ts
import { Deputado } from "@/app/models/Deputado";

class DeputadosService {
    private readonly URL = "http://localhost:8080";

    async getDeputados(): Promise<Deputado[]> {
        const response = await fetch(`${this.URL}/deputados`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar deputados");
        }

        return response.json();
    }
    async getDeputadoById(id: string): Promise<any> {
        const response = await fetch(`${this.URL}/deputados/${id}`, {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar deputados");
        }

        return response.json();
    }
}

export const deputadosService = new DeputadosService();
