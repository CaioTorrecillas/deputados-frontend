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
    
    async getAtividades(id: string): Promise<any> {
        const response = await fetch(`${this.URL}/atividade/deputado/${id}`, {

            cache: "no-store"
        });
        console.log("service" + response)
        if (!response.ok) {
            throw new Error("Erro ao buscar despesas do deputado");
        }

        return response.json();
    }
    async getDespesasById(id: string): Promise<any> {
        const response = await fetch(`${this.URL}/deputados/${id}/despesas`, {

            cache: "no-store"
        });
        console.log("service" + response)
        if (!response.ok) {
            throw new Error("Erro ao buscar despesas do deputado");
        }

        return response.json();
    }
    async syncDeputados(): Promise<string> {
        const response = await fetch(`${this.URL}/deputados/sincronizar-deputados`, {
            method: "POST",
            cache: "no-store"
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro backend:", errorText);
            throw new Error("Erro ao sincronizar proposições");
        }


        const data = await response.json();

        return data;
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
