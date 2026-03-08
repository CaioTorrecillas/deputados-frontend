export default function Footer() {
    return (
        <footer className="mt-16 bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Linha principal */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Nome do projeto */}
                    <div className="text-center md:text-left">
                        <h2 className="text-lg font-semibold text-white">
                            Portal Político
                        </h2>
                        <p className="text-sm text-gray-400">
                            Transparência e informação acessível
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6 text-sm">
                        <a href="/deputados" className="hover:text-white transition">
                            Deputados
                        </a>
                        <a href="/projetos-lei" className="hover:text-white transition">
                            Projetos de Lei
                        </a>
                        <a href="/perfil" className="hover:text-white transition">
                            Meu Perfil
                        </a>
                    </div>
                </div>

                {/* Linha inferior */}
                <div className="mt-6 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Portal Político. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}
