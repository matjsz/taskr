import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AuthForm from '../utils/components/AuthForm'
import Navbar from '../utils/components/navbar'
import Router from 'next/router'
import NotesArea from '../utils/components/NotesArea'
import Loading from '../utils/components/Loading'

// Página da Dashboard
export default function Dashboard() {
    const [logged, changeLogged] = useState(false)
    const [user, changeUser] = useState({})

    useEffect(() => {
        // Checa se o usuário está logado ou não, caso não esteja ele é redirecionado para a página de autenticação (auth.js ou URL: /auth)
        onAuthStateChanged(auth, (u) => {
            if(u){
                changeLogged(true)
                changeUser(u)

                console.log(u)
            } else{
                Router.push('/auth')
            }
        })
    })

    // Layout da página
    return (
        <div>
            <Head>
                <title>Taskr | Dashboard</title>
                <meta name="description" content="Taskr é um app para organização de anotações." />
                <link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />
                <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>

            </Head>

            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/" className="flex items-center">
                    <img src="/logo.png" className="mr-3 h-12 sm:h-9" alt="Flowbite Logo" />
                </a>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex mr-3 text-sm bg-white rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={logged ? user.photoURL : '/user-placeholder.png'} alt="Foto de perfil"/>
                    </button>
                    <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow" id="user-dropdown">
                        <div className="py-3 px-4">
                        <span className="block text-sm text-gray-900 ">{user.displayName}</span>
                        <span className="block text-sm font-medium text-gray-500 truncate">{user.email}</span>
                        </div>
                        <ul className="py-1" aria-labelledby="user-menu-button">
                        <li>
                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Dashboard</a>
                        </li>
                        <li>
                            <a href="/settings" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Configurações</a>
                        </li>
                        <li>
                            <a href="/logout" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 ">Sair</a>
                        </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0" aria-current="page">Dashboard</a>
                    </li>
                    <li>
                        <a href="/about" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Sobre</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

            <div className='bg-teal-700 h-screen'>
            {
                logged ? 
                    <>
                        <section>
                            <div className="px-4 py-16 max-w-screen-xl sm:px-6 lg:px-8">
                                <div
                                className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center"
                                >
                                <div className="max-w-lg mx-auto text-center lg:ml-10 lg:text-left lg:mx-0">
                                    <img className="inline-block h-12 w-12 mb-5 bg-white rounded-full ring-2 ring-white" src={user.photoURL}/>
                                    <h2 className="text-3xl text-white font-bold sm:text-4xl">Olá, {user.displayName}!</h2>

                                    <p className="mt-4 text-white">
                                    Bem-vindo à sua Dashboard.

                                    
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    <a
                                    className="block p-4 border border-gray-100 bg-white shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
                                    href="/e/new"
                                    style={{minHeight: '10rem'}}
                                    >
                                        <center>
                                            <h6 className="mt-8 text-teal-700 font-bold">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                            </h6>
                                        </center>
                                        <h6 className="mt-2 text-teal-700 font-bold text-center">Nova anotação</h6>
                                    </a>
                                    
                                    <NotesArea owner={user.uid} />
                                </div>
                                </div>
                            </div>
                        </section>
                    </>
                :
                    <div className='flex justify-center py-28 text-xl'>
                        <Loading/>
                        <p className=''><strong>Carregando...</strong></p>
                    </div>
            }
            </div>
        </div>
    )
}
