"use client";

import Navbar from "@/app/components/Navbar";
import { useForm } from "react-hook-form";

type FormData = {
    nome: string;
    sobrenome: string;
    cidade: string;
    cpf: string;
    email: string;
    estado: string;
    senha: string;
};

export default function CreatePage() {
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Usuário criado:", result);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    };

    return (
        <>
            <Navbar />

            <div className="mt-24 px-6 flex justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 rounded-2xl shadow-lg w-96"
                >
                    <h1 className="text-2xl font-bold mb-6 text-center">Crie seu usuário</h1>

                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            {...register("nome", { required: true })}
                            type="text"
                            className="w-full mt-2 p-2 border text-black rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Sobrenome</label>
                        <input
                            {...register("sobrenome", { required: true })}
                            type="text"
                            className="w-full mt-2 p-2 border text-black rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="w-full mt-2 p-2 border text-black rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Cidade</label>
                        <input
                            {...register("cidade", { required: true })}
                            type="text"
                            className="w-full mt-2 p-2 border text-black rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Estado</label>
                        <input
                            {...register("estado", { required: true })}
                            type="text"
                            className="w-full mt-2 p-2 border text-black rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">CPF</label>
                        <input
                            {...register("cpf", { required: true })}
                            type="text"
                            className="w-full mt-2 p-2 border text-black rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Senha</label>
                        <input
                            {...register("senha", { required: true })}
                            type="password"
                            className="w-full mt-2 p-2 border text-black rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Criar Usuário
                    </button>
                </form>
            </div>
        </>
    );
}
