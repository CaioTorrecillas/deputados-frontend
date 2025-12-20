export default function Navbar() {
    return (
        <nav className="w-full bg-blue-600 text-white px-6 py-4 shadow">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold">Portal Político</h1>

                <ul className="flex space-x-6">
                    <li>
                        <a href="/protected/home" className="hover:underline">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/deputados" className="hover:underline">
                            Deputados
                        </a>
                    </li>
                    <li>
                        <a href="/user-page" className="hover:underline">
                            Usuário
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
