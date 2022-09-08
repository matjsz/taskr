import Head from 'next/head'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../../utils/components/Loading'
import { loginUser } from '../../utils/loginUser'
import { auth } from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { createNote } from '../../utils/createNote'

export default function NewNote() {
    // Aqui, o useRouter é usado para capturar os parâmetros de URL (por exemplo: em https://link.com?p=Teste, "p" é um parâmetro de URL)
    const { query } = useRouter()
    const [logged, changeLogged] = useState(false)
    const [user, changeUser] = useState({})

    useEffect(() => {
        // Caso o usuário esteja logado, seus dados já foram capturados e ja é possível usar sua UID para criar a anotação no banco de dados.
        if(logged){
            // Auto-explicativo. Cria a anotação e dps que criar, redireciona o usuário para a dashboard.
            createNote(user.uid)
                .then((id) => {
                    Router.push('/e/'+id)
                })
        }
        // Checa se o usuário está logado ou não, caso não esteja ele é redirecionado para a página de autenticação (auth.js ou URL: /auth)
        onAuthStateChanged(auth, (u) => {
            if(u){
                changeUser(u)
                changeLogged(true)
            } else{
                Router.push('/auth')
            }
        })
    })

    // Layout da página
	return (
		<div>
			<Head>
				<title>Taskr | Criando sua nova anotação...</title>
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
                <p className=''><strong>Criando sua anotação...</strong></p>
            </div>

		</div>
	)
}
