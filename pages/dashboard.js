import { auth, db } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AuthForm from '../utils/components/AuthForm'
import Router from 'next/router'
import NotesArea from '../utils/components/NotesArea'
import Loading from '../utils/components/Loading'
import { getAllLists } from '../utils/getAllLists'
import { getAllNotes } from '../utils/getAllNotes'
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { removeFromList } from '../utils/removeFromList'
import { addToList } from '../utils/addToList'

// Página da Dashboard
export default function Dashboard() {
    const [logged, changeLogged] = useState(false)
    const [lists, changeLists] = useState([])
    const [notes, changeNotes] = useState([])
    const [user, changeUser] = useState({})
    const [first, changeFirst] = useState(true)

    useEffect(() => {
        // Checa se o usuário está logado ou não, caso não esteja ele é redirecionado para a página de autenticação (auth.js ou URL: /auth)
        onAuthStateChanged(auth, (u) => {
            if(u){
                changeLogged(true)
                changeUser(u)
                
                if(first){
                    const notesRef = collection(db, "notes")
                    const q = query(notesRef, where("owner", "==", u.uid))
                    onSnapshot(q, (query) => {
                        const notes = []
                        query.forEach((doc) => {
                            notes.push({id: doc.id, data: doc.data()})
                        })    
                        changeNotes(notes)
                    })
                    const listsRef = collection(db, "lists")
                    const q2 = query(listsRef, where("owner", "==", u.uid))
                    onSnapshot(q2, (query) => {
                        const lists = []
                        query.forEach((doc) => {
                            lists.push({id: doc.id, data: doc.data()})
                        })    
                        changeLists(lists)
                    })
                    changeFirst(false)
                }
            } else{
                Router.push('/auth')
            }
        })
    })

    const deleteList = (listID) => {
        getDoc(doc(db, "lists", listID))
            .then((data) => {
                data.data().notes.forEach((note) => {
                    updateDoc(doc(db, "notes", note), {
                        list: 'none'
                    }).then(() => {
                        deleteDoc(doc(db, "lists", listID))
                        window.location.reload()
                    })
                })
            })
    }

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

            <div className='bg-teal-700' style={{minHeight: '100vh'}}>
            {
                logged ? 
                    <>
                        <section>
                            <div className="px-4 py-16 max-w-screen-xl sm:px-6 lg:px-8">
                                <div
                                className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center"
                                >
                                    <div className="md:absolute top-20 mt-10 left-5 max-w-lg mx-auto text-center lg:ml-10 lg:text-left lg:mx-0">
                                        <img className="inline-block h-12 w-12 mb-5 bg-white rounded-full ring-2 ring-white" src={user.photoURL}/>
                                        <h2 className="text-3xl text-white font-bold sm:text-4xl">Olá, {user.displayName}!</h2>

                                        <p className="mt-4 text-white">
                                        Bem-vindo à sua Dashboard.

                                        <a
                                        className="block w-60 mt-5 p-4 shadow-sm rounded-xl focus:outline-none bg-teal-800 focus:ring hover:border-teal-900 hover:ring-1 hover:ring-teal-900"
                                        href="/e/new"
                                        style={{minHeight: '7rem'}}
                                        >
                                            <center>
                                                <h6 className="mt-2 text-white font-bold">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                                </h6>
                                            </center>
                                            <h6 className="mt-2 text-white font-bold text-center">Nova anotação</h6>
                                        </a>                                    
                                        </p>
                                    </div>

                                    <div class="" style={{minWidth: '10rem'}}>

                                    </div>

                                    <div>
                                        {
                                            notes.length > 0 ?
                                                <>
                                                <h3 className="text-1xl text-white sm:text-2xl mb-4">Anotações sem lista</h3>
                                                {
                                                    <div className="grid mb-4 grid-cols-2 gap-4 sm:grid-cols-3">
                                                        <NotesArea owner={user.uid} listID='none' />
                                                    </div>
                                                }
                                                </>
                                            :
                                                <section class="bg-teal-700">
                                                    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                                                        <div class="mx-auto max-w-screen-sm text-center">
                                                            <p class="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">Ainda não há anotações.</p>
                                                            <p class="mb-4 text-lg font-light text-white">Crie uma nova anotação para começar sua jornada!</p>
                                                        </div>   
                                                    </div>
                                                </section>
                                        }
                                        {
                                            lists.map((list) => {
                                                list.data.notes.length > 0 ? <div class="inline-flex mt-5 justify-center items-center w-full">
                                                <div class="text-center px-4 text-2xl text-white bg-teal-700">
                                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                                                </div>
                                            </div> : <></>
                                            })
                                        }
                                        {
                                            lists.map((list) => {
                                                return list.data.notes.length > 0 ? <>
                                                    <div class="flex gap-4 mb-5">
                                                        <h3 className="text-2xl text-white font-bold sm:text-3xl">{list.data.name}</h3>
                                                        <button type="button" className=" my-auto text-sm font-medium text-white bg-none rounded-md hover:bg-red-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-white" onClick={() => {deleteList(list.id)}}>
                                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                    <div className="grid mb-4 grid-cols-2 gap-4 sm:grid-cols-3">
                                                        <NotesArea owner={user.uid} listID={list.id} />
                                                    </div>
                                                </> : <></>
                                            })
                                        }
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
