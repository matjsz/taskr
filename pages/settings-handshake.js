import Head from 'next/head'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'
import Loading from '../utils/components/Loading'
import Navbar from '../utils/components/navbar'
import { loginUser } from '../utils/loginUser'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function Landing() {
    // Aqui, o useRouter é usado para capturar os parâmetros de URL (por exemplo: em https://google.com?q=Teste, "q" é um parâmetro de URL)
    const { query } = useRouter()

    useEffect(() => {
        // Tenta logar o usuário, se houver algum erro nos dados inseridos, o usuário é redirecionado para a página de autenticação e um código de erro é registrado no sistema, sendo mostrado para o usuário ao voltar para a página de autenticação.
        onAuthStateChanged(auth, (user) => {
            loginUser(query.e, query.p)
                .then((userCredential) => {
                    Router.push('/settings')
                    window.err = undefined
                })
                .catch((err) => {
                    if(err.code != 'auth/missing-email'){
                        Router.push('/reauth')
                        window.err = err   
                    }
                })
        })
    })

    // Layout da página
	return (
		<div>
			<Head>
				<title>Taskr | Verificando credenciais...</title>
				<meta name="description" content="Taskr é um app para organização de anotações." />
				<link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"/>
			</Head>

            <div>
                <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                    <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <a href="/">
                        <span className="sr-only">Taskr</span>
                        <img alt="Your Company" className="h-10 w-auto sm:h-16" src="/logo.png"/>
                        </a>
                    </div>
                    </div>
                </nav>
                </div>
            </div>

            <div className='flex justify-center mt-28 text-xl'>
                <Loading/>
                <p className=''><strong>Verificando suas credenciais...</strong></p>
            </div>

		</div>
	)
}
