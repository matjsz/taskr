import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AuthForm from '../utils/components/AuthForm'
import Navbar from '../utils/components/navbar'
import Router from 'next/router'
import NotesArea from '../utils/components/NotesArea'
import Loading from '../utils/components/Loading'
import { storage } from '../utils/firebase'
import { updateEmail, updateProfile, updatePassword } from "firebase/auth"
import { ref, uploadBytes } from "firebase/storage"

const uid = function(){
    return Math.random().toString(16).slice(2)
}

// Página da Dashboard
export default function Dashboard() {
    const [logged, changeLogged] = useState(false)
    const [user, changeUser] = useState({})
    const [firstRead, changeFirstRead] = useState(true)
    const [emailChanged, changeEmailStatus] = useState(false)
    const [passwordChanged, changePasswordStatus] = useState(false) 

    const [name, changeName] = useState('')
    const [email, changeEmail] = useState('')
    const [password, changePassword] = useState('')
    const [avatarFile, changeAvatarFile] = useState(null)

    const [success, changeSuccess] = useState(false)

    useEffect(() => {
        if(logged){
            if(firstRead){
                changeName(user.displayName)
                changeEmail(user.email)
                changeFirstRead(false)
            }
        }
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

        if(success){
            setTimeout(() => {
                changeSuccess(false)
            }, 3000)
        }
    })

    const handleName = (e) => {
        changeName(e.target.value)
    }

    const handleEmail = (e) => {
        changeEmail(e.target.value)
        changeEmailStatus(true)
    }

    const handlePassword = (e) => {
        changePassword(e.target.value)
        changePasswordStatus(true)
    }

    const handleAvatar = (e) => {
        const file = e.target.files[0]
        changeAvatarFile(file)
    }

    const changeSettings = () => {
        if(avatarFile != null){
            var fileName = uid()

            console.log('doing')
            const mountainsRef = ref(storage, `${fileName}`);
        
            uploadBytes(mountainsRef, avatarFile)
                .then((snap) => {
                    updateProfile(user, {
                        photoURL: `https://firebasestorage.googleapis.com/v0/b/taskr-8e593.appspot.com/o/${fileName}?alt=media`
                    })
                })
        }

        updateProfile(user, {
            displayName: name
        })

        if(emailChanged){
            updateEmail(user, email)
                .catch((e) => {
                    if(e.code == 'auth/requires-recent-login'){
                        Router.push('/reauth')
                    }
                })
        }

        if(passwordChanged){
            updatePassword(user, password)
        }

        changeSuccess(true)
    }

    // Layout da página
    return (
        <div>
            <Head>
                <title>Taskr | Configurações</title>
                <meta name="description" content="Taskr é um app para organização de anotações." />
                <link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />
                <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>

            </Head>

            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="https://flowbite.com/" className="flex items-center">
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
                            <a href="/dashboard" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 ">Configurações</a>
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
                        <a href="/dashboard" className="block py-2 pr-4 pl-3 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0">Dashboard</a>
                    </li>
                    <li>
                        <a href="/about" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Sobre</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

            <div className='pt-2 bg-teal-700'>
            {
                logged ? 
                        <>
                        {
                            success ? 
                                <div className="flex bottom-5 right-5 absolute p-4 mx-10 mt-1 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                    <span className="font-medium">Alterações realizadas com sucesso!</span>
                                </div>
                                :
                                <></>
                        }
                        <div className='grid gap-6 mb-6 md:grid-cols-2'>
                            <div>
                                <div className='flex gap-6 m-8'>     
                                    <img className="w-20 h-20 bg-white rounded-full" src={user.photoURL} alt="Large avatar"/>                               
                                    <input className="block h-10 my-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer" id="avatar_input" type="file" onChange={handleAvatar} accept=".jpg, .jpeg, .png" />
                                </div>
                                <div className="m-8">
                                    <div>
                                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nome</label>
                                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Fulano" value={name} onChange={handleName} required="" />
                                    </div>
                                </div>
                                <div className="m-8">
                                    <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="fulano@email.com" value={email} onChange={handleEmail} required="" />
                                    </div>
                                </div>
                                <div className="m-8">
                                    <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nova Senha</label>
                                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" value={password} onChange={handlePassword} required="" />
                                    </div>
                                </div>
                                <button className="lg:m-8 text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={changeSettings}>Salvar</button>
                            </div>
                            <div className='md:mt-20'>
                                <img src='/settings.svg'/>
                            </div>
                        </div>
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
