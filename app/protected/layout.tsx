import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    console.log("🔥 ProtectedLayout executado");

    const cookieStore = await cookies(); // aguarda a promise
    const token = cookieStore.get("accessToken")?.value;
    console.log("🔐 TOKEN NO LAYOUT:", token);

    if (!token) {
        redirect("/login");
    }

    return <>{children}</>;
}
