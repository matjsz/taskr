export default function Navbar(){
    // Código da navbar padrão exibida na tela de autenticação (auth.js)
    return (
        <>
            <div>
                <div class="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav class="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                    <div class="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div class="flex w-full items-center justify-between md:w-auto">
                        <a href="/">
                        <span class="sr-only">Taskr</span>
                        <img alt="Your Company" class="h-10 w-auto sm:h-16" src="/logo.png"/>
                        </a>
                    </div>
                    </div>
                </nav>
                </div>
            </div>
        </>
    )
}