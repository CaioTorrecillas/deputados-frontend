"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import DeputadosCard from "@/app/components/DeputadosCard";

export default function UserDeputadosPage() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadFavorites() {
            try {
                const res = await fetch("/api/users/favorite/all", {
                    method: "GET",
                    credentials: "include",
                });

                const data = await res.json();
                setFavorites(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadFavorites();
    }, []);

    return (
        <>
      

            <div className="mt-24 px-6 flex justify-center">
                <div className="max-w-6xl w-full">

                   
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold">
                           Seus Deputados Favoritos
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Acompanhe facilmente quem você escolheu monitorar
                        </p>
                    </div>

                
                    {loading && (
                        <div className="text-center py-20">
                            <div className="animate-pulse text-gray-500">
                                Carregando deputados...
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-red-500 py-10">
                            Erro ao carregar: {error}
                        </div>
                    )}

                   
                    {!loading && favorites.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-xl shadow">
                            <p className="text-gray-600 text-lg">
                                Você ainda não adicionou deputados aos favoritos.
                            </p>
                        </div>
                    )}

                    {/* 🟦 Grid bonito */}
                    {!loading && favorites.length > 0 && (
                        <div className="
                            grid 
                            grid-cols-1 
                            sm:grid-cols-2 
                            lg:grid-cols-3 
                            gap-6
                        ">
                            {favorites.map((dep) => (
                                <DeputadosCard
                                    key={dep.id}
                                    id={dep.id}
                                    nome={dep.ultimoStatus.nome}
                                    siglaPartido={dep.ultimoStatus.siglaPartido}
                                    siglaUf={dep.ultimoStatus.siglaUf}
                                    urlFoto={dep.ultimoStatus.urlFoto ?? ""}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>

          
        </>
    );
}