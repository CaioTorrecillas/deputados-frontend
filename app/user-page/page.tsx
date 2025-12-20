"use client";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import DeputadosCard from "@/app/components/DeputadosCard";
import { Deputado } from "@/app/models/Deputado";
import { User } from "@/app/models/User";
type FormData = {
    email: string;
    password: string;
};

export default function UserPage() {
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deputados, setDeputados] = useState<Deputado[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadFavorites() {
            try {
                const res = await fetch("/api/users/favorite/all", {
                    method: "GET",
                    credentials: "include",
                });
                const resUser = await fetch("/api/users/me", {
                    credentials: "include",
                });

                if (resUser.ok) {
                    const data = await resUser.json();
                    setUser(data);
                }
                console.log("DEPUTADOS FAVORITOS - " + resUser)
                if (!res.ok) {
                    throw new Error("Erro ao buscar favoritos");
                }

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
            <Navbar />
            <div className="mt-24 px-6 flex justify-center">

                <div className="max-w-5xl w-full bg-white/80 p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">Nome: {user?.nome}</h1>
                    <h1 className="text-2xl font-bold mb-6">Sobrenome: {user?.sobrenome}</h1>
                    <h1 className="text-2xl font-bold mb-6">Email: {user?.email}</h1>
                    <h1 className="text-2xl font-bold mb-6">Estado: {user?.estado}</h1>
                    <h1 className="text-2xl font-bold mb-6">Cidade: {user?.cidade}</h1>
                    <h1 className="text-2xl font-bold mb-6">CPF: {user?.cpf}</h1>



                    <h1 className="text-2xl font-bold mb-6">Deputados que estão nos favoritos:</h1>

                    {/* 🟦 Grid dos deputados */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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


                </div>
            </div>
        </>

    );
}
