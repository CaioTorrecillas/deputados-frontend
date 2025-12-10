"use client";
import Navbar from "@/app/components/Navbar";

type FormData = {
    email: string;
    password: string;
};

export default function UserPage() {



    return (
        <>
            <Navbar />
            <div className="mt-24 px-6 flex justify-center">

                <div className="max-w-5xl w-full bg-white/80 p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6">Página do Usuário</h1>
                    <h1 className="text-2xl font-bold mb-6">Veja todos os deputados</h1>




                </div>
            </div>
        </>

    );
}
