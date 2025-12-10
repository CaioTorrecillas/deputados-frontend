"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })

    });

    const result = await response.json();

    console.log("Resultado: " + response.status);
    if (response.status == 200) {
      router.push("home");

    }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full mt-2 p-2 border text-black rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Senha</label>
          <input
            {...register("password")}
            type="password"
            className="w-full mt-2 p-2 border text-black rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
        <div className="mt-2" style={{ display: 'flex', gap: '5px' }}>
          <h2 className="">É novo?</h2>
          <Link href="/create-user" className="text-blue-600 underline hover:text-blue-800">Crie uma conta</Link >
        </div>


      </form>
    </div>
  );
}
