"use client";
import { DeputadoCard } from "@/app/models/DeputadoCard";
import Navbar from "@/app/components/Navbar";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeputadosCard({
    id,
    nome,
    siglaPartido,
    siglaUf,
    urlFoto
}: DeputadoCard) {
    const router = useRouter();

    async function favoritarDeputado() {

        const response = await fetch(`/api/users/favorite/${id}`, {
            method: "POST"
        });

        if (!response.ok) {
            alert("Erro ao favoritar deputado");
            return;
        }

        const data = await response.json();
        console.log(data.message);

    }

    function navegarDeputadoDetalhe() {
        router.push(`/deputados-detalhe/${id}`);

    }
    return (
        <div className="relative p-4 bg-white shadow rounded w-full max-w-md">

            {/* Botão de favorito */}
            <button
                className="absolute top-3 right-3 text-gray-400 hover:text-yellow-400 transition"
                title="Favoritar deputado"
                onClick={() => favoritarDeputado()}
            >
                <Star className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
                <img
                    src={urlFoto}
                    alt={nome}
                    className="w-20 h-20 rounded-full object-cover"
                />

                <div className="flex-1">
                    <h2 className="text-lg font-bold">{nome}</h2>

                    {/* Linha com infos */}
                    <div className="flex gap-4 text-gray-600 text-sm mt-1">
                        <span>Partido: {siglaPartido}</span>
                        <span>Estado: {siglaUf}</span>
                    </div>
                </div>
            </div>

            {/* Botão embaixo */}
            <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition" onClick={navegarDeputadoDetalhe}

            >
                Ver detalhes
            </button>
        </div>
    );
}
