// services/deputadosService.ts
import { User } from "@/app/models/User";

interface GetProjetosDeLeiParams {
    ano: string;
    pagina?: number; // opcional, default 1
    itens?: number;  // opcional, default 20
}
class ProposicaoService {
    private readonly URL = "http://localhost:8080";

    async getProjetosDeLei(ano: number): Promise<any[]> {

        const url = new URL(`${this.URL}/proposicao/projetos-lei`);
        url.searchParams.set("ano", String(ano));

        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Erro ao buscar proposições: ${response.statusText}`);
        }

        const data = await response.json();

        return data.dados || [];
    }

    async getProposicaoById(id: string): Promise<any[]> {
        const response = await fetch(
            `${this.URL}/proposicao/detalhes/${id}`,
            { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhe da proposicao: ${response.statusText}`);
        }

        const data = await response.json();

        // Se quiser, você pode já extrair apenas a lista de proposições:
        return data;
    }
    async getProposicaoPorIdDeputado(
        id: string,
        pagina: number,
        tipo?: string
    ): Promise<any> {

        let url = `${this.URL}/proposicao/${id}/proposicoes?pagina=${pagina}`;

        if (tipo) {
            url += `&tipo=${tipo}`;
        }

        const response = await fetch(url, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar proposições");
        }

        return response.json();
    }
    async syncProposicoes(): Promise<string> {
        const response = await fetch(`${this.URL}/proposicao/sincronizar-pl`, {
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


    async vincularDeputados(): Promise<string> {
        const response = await fetch(`${this.URL}/proposicao/vincular-autores`, {
            method: "POST",
            cache: "no-store"
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erro backend:", errorText);
            throw new Error("Erro ao vincular proposições com deputados");
        }


        const data = await response.json();

        return data;
    }
    async getProposicaoPorIdDeputadoDadosTotais(id: string): Promise<any[]> {
        const response = await fetch(
            `${this.URL}/proposicao/${id}/proposicoes/dadosTotais`,
            { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Erro ao buscar dados totais da proposicao por id de deputado: ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    }
}

export const proposicaoService = new ProposicaoService();
