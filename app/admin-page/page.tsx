"use client";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { Deputado } from "@/app/models/Deputado";
import { User } from "@/app/models/User";

export default function AdminPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState<string | null>(null);
    const [isUsersOpen, setIsUsersOpen] = useState(true);
    const [syncLoading, setSyncLoading] = useState(false);
    const [syncMessage, setSyncMessage] = useState<string | null>(null);
    useEffect(() => {
        fetch("/api/users/all")
            .then((res) => res.json())
            .then((data) => {
                console.log("PAGE GET ALL USERS: ", data)
                setUsers(data);
                setLoadingUsers(false);
            })

            .catch(() => {
                setErrorUsers("Erro ao carregar usuários");
                setLoadingUsers(false);
            });


    }, []);
    const handleSyncPLs = async () => {
        try {
            setSyncLoading(true);
            setSyncMessage(null);

            const res = await fetch(`/api/sync/proposicao-pl-2025`, {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Erro na sincronização");
            }

            const data = await res.json();

            setSyncMessage(`✅ PLs sincronizado com sucesso`);
        } catch (err) {
            console.error(err);
            setSyncMessage(`❌ Erro ao sincronizar`);
        } finally {
            setSyncLoading(false);
        }
    };
    const handleDeputados = async () => {
        try {
            setSyncLoading(true);
            setSyncMessage(null);

            const res = await fetch(`/api/sync/deputados`, {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Erro na sincronização");
            }

            const data = await res.json();

            setSyncMessage(`Deputados sincronizados com sucesso`);
        } catch (err) {
            console.error(err);
            setSyncMessage(`Erro ao sincronizar`);
        } finally {
            setSyncLoading(false);
        }
    };
    const handleVincularPropDeputados = async () => {
        try {
            setSyncLoading(true);
            setSyncMessage(null);

            const res = await fetch(`/api/proposicao/vincular-deputados`, {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Erro na vinculação de proposição com deputados");
            }

            const data = await res.json();

            setSyncMessage(`Deputados vinculados com proposições!`);
        } catch (err) {
            console.error(err);
            setSyncMessage(`Erro ao vincular`);
        } finally {
            setSyncLoading(false);
        }
    };
    return (
        <>
            <Navbar />

            <div className="mt-24 px-6 flex justify-center">
                <div className="max-w-6xl w-full space-y-6">

                    {/* 🔷 Header */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h1 className="text-3xl font-bold text-center">
                            Painel do Administrador
                        </h1>
                        <p className="text-gray-500 text-center mt-2">
                            Controle geral do sistema
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-2xl font-semibold mb-4">
                            Sincronização de Dados
                        </h2>

                        <p className="text-gray-500 mb-4">
                            Atualize manualmente os dados do sistema com a API externa
                        </p>

                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() => handleSyncPLs()}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                            >
                                🔄 Sincronizar Proposições PLs 2025
                            </button>
                            <button
                                onClick={() => handleDeputados()}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                            >
                                🔄 Sincronizar no banco Deputados
                            </button>
                            <button
                                onClick={() => handleVincularPropDeputados()}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                            >
                                🔄 Sincronizar no banco vinculação de autores com PLs
                            </button>



                        </div>

                        {/* 🔄 loading */}
                        {syncLoading && (
                            <p className="text-gray-500 mt-4">
                                Sincronizando dados...
                            </p>
                        )}

                        {/* 📢 mensagem */}
                        {syncMessage && (
                            <p className="mt-4 font-medium">
                                {syncMessage}
                            </p>
                        )}
                    </div>
                    {/* 📊 Cards resumo */}


                    {/* 👥 Lista de usuários */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">

                        {/* 🔘 Header clicável */}
                        <button
                            onClick={() => setIsUsersOpen(!isUsersOpen)}
                            className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition"
                        >
                            <h2 className="text-2xl font-semibold">
                                Usuários cadastrados
                            </h2>

                            {/* seta */}
                            <span
                                className={`transform transition-transform duration-300 ${isUsersOpen ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        {/* 📦 Conteúdo colapsável */}
                        <div
                            className={`transition-all duration-300 ease-in-out ${isUsersOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                                } overflow-hidden px-6`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-500 text-white p-4 rounded-xl shadow">
                                    <p className="text-sm">Total de usuários</p>
                                    <h2 className="text-2xl font-bold">{users.length}</h2>
                                </div>

                                <div className="bg-green-500 text-white p-4 rounded-xl shadow">
                                    <p className="text-sm">Usuários com favoritos</p>
                                    <h2 className="text-2xl font-bold">
                                        {users.filter(u => u.favoriteDeputados?.length > 0).length}
                                    </h2>
                                </div>

                                <div className="bg-purple-500 text-white p-4 rounded-xl shadow">
                                    <p className="text-sm">Total de favoritos</p>
                                    <h2 className="text-2xl font-bold">
                                        {users.reduce((acc, u) => acc + (u.favoriteDeputados?.length || 0), 0)}

                                    </h2>
                                </div>
                            </div>
                            {loadingUsers && (
                                <p className="text-gray-500 py-4">Carregando...</p>
                            )}

                            {errorUsers && (
                                <p className="text-red-500 py-4">{errorUsers}</p>
                            )}

                            {!loadingUsers && users.length === 0 && (
                                <p className="text-gray-500 py-4">
                                    Nenhum usuário encontrado.
                                </p>
                            )}

                            {!loadingUsers && users.length > 0 && (
                                <div className="overflow-x-auto pb-6">
                                    <table className="w-full border rounded-lg overflow-hidden">
                                        <thead className="bg-gray-100 text-gray-600 text-sm">
                                            <tr>
                                                <th className="p-3 text-left">Nome</th>
                                                <th className="p-3 text-left">Email</th>
                                                <th className="p-3 text-left">Cidade</th>
                                                <th className="p-3 text-center">Favoritos</th>
                                                <th className="p-3 text-center">Ações</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {users.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-t hover:bg-gray-50 transition"
                                                >
                                                    <td className="p-3">
                                                        <div className="font-medium">
                                                            {user.nome} {user.sobrenome}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            ID: {user.id}
                                                        </div>
                                                    </td>

                                                    <td className="p-3">{user.email}</td>

                                                    <td className="p-3">
                                                        {user.cidade} - {user.estado}
                                                    </td>

                                                    <td className="p-3 text-center">
                                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                                                            {user.favoriteDeputados?.length || 0}
                                                        </span>
                                                    </td>

                                                    <td className="p-3 text-center space-x-2">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400 text-sm">
                                                            Ver
                                                        </button>
                                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm">
                                                            Deletar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>




                </div>
            </div>

            <Footer />
        </>
    );
}