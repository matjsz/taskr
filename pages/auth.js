import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import React, { useEffect } from 'react'
import AuthForm from '../utils/components/AuthForm'
import Navbar from '../utils/components/navbar'
import Router from 'next/router'
import { formatCode } from '../utils/authErrorCode'

// Classe de componente React nativo da página
class LandingPage extends React.Component{
    state = {
        err: false
    }

    componentDidMount(){
        // Checa se houve algum erro no processo de autenticação na URL: /handshake.
        try{
            if(err){
                this.setState({
                    err: true
                })
            }
        } catch(e){
            window.err = undefined
        }
    }

    // Layout da página
    render(){
        return (
            <div>
                <Head>
                    <title>Taskr | Autenticação</title>
                    <meta name="description" content="Taskr é um app para organização de anotações." />
                    <link rel="icon" href="/favicon.ico" />

                    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
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

                {
                    this.state.err ? 
                    <div className='ml-10 mr-10 mt-10'>
                        <div
                        className="p-4 text-red-700 border rounded border-red-900/10 bg-red-50"
                        role="alert"
                        >
                        <strong className="text-sm font-medium"> {formatCode(err.code).title} </strong>

                        <p className="mt-1 text-xs">
                            {formatCode(err.code).desc}
                        </p>
                        </div>
                    </div>
                    :
                    <></>
                }

                <AuthForm r={false} />
            </div>
        )
    }
}

export default function Landing() {
    useEffect(() => {
        // Checa se o usuário está logado ou não, caso ele esteja, é redirecionado para a dashbaord (dashboard.js ou URL: /dashboard)
        onAuthStateChanged(auth, (user) => {
            if(user){
                Router.push('/dashboard')
            }
        })
    })

	return (
        // Layout da página em forma de classe para usufruir das funções nativas do componente React low-level
		<LandingPage/>
	)
}
