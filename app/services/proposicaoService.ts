// services/deputadosService.ts
import { User } from "@/app/models/User";

interface GetProjetosDeLeiParams {
    ano: string;
    pagina?: number; // opcional, default 1
    itens?: number;  // opcional, default 20
}
class ProposicaoService {
    private readonly URL = "http://localhost:8080";

    async getProjetosDeLei(params: GetProjetosDeLeiParams): Promise<any[]> {
        const { ano, pagina = 1, itens = 20 } = params;

        const url = new URL(`${this.URL}/proposicao/projetos-lei`);
        url.searchParams.set("ano", ano);
        url.searchParams.set("pagina", String(pagina));
        url.searchParams.set("itens", String(itens));

        const response = await fetch(url.toString(), { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Erro ao buscar proposições: ${response.statusText}`);
        }

        const data = await response.json();

        // Se quiser, você pode já extrair apenas a lista de proposições:
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
    async getProposicaoPorIdDeputado(id: string, pagina: number): Promise<any[]> {
        const response = await fetch(
            `${this.URL}/proposicao/${id}/proposicoes?pagina=${pagina}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(
                `Erro ao buscar detalhe da proposicao por id de deputado: ${response.statusText}`
            );
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
        // Se quiser, você pode já extrair apenas a lista de proposições:
        return data;
    }
}

export const proposicaoService = new ProposicaoService();
