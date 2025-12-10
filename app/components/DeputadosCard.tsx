import { DeputadoCard } from "@/app/models/DeputadoCard"
import Navbar from "@/app/components/Navbar";
export default function DeputadosCard({ nome, siglaPartido, siglaUf, urlFoto }: DeputadoCard) {
    return (
        <div className="p-4 bg-white shadow rounded flex items-center gap-4">
            <img
                src={urlFoto}
                alt={nome}
                className="w-20 h-20 rounded-full object-cover"
            />

            <div>
                <h2 className="text-lg font-bold">{nome}</h2>
                <p className="text-gray-600">
                    Sigla do Partido: {siglaPartido}

                </p>
                <p className="text-gray-600">
                    Estado: {siglaUf}
                </p>

            </div>
            {/* Empurra o botão para o final */}
            <div className="mt-4 w-full">
                <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Ver detalhes
                </button>
            </div>
        </div>
    );
}