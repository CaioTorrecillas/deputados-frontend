"use client";
import Navbar from "@/app/components/Navbar";

type FormData = {
    email: string;
    password: string;
};

export default function HomePage() {
    console.log("[HOME - PAGE] - Carregando Home page")


    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-6">Home</h1>
                <h1 className="text-2xl font-bold mb-6">Veja todos os deputados</h1>




            </div>
        </>

    );
}
