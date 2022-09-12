import Head from 'next/head'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../../utils/components/Loading'
import { loginUser } from '../../utils/loginUser'
import { auth } from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { createNote } from '../../utils/createNote'
import { getNote } from '../../utils/getNote'
import { db } from '../../utils/firebase'
import { deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function NewNote() {
    // Aqui, o useRouter é usado para capturar os parâmetros de URL (por exemplo: em https://link.com?p=Teste, "p" é um parâmetro de URL)
    const router = useRouter()
    const { id } = router.query
    const [logged, changeLogged] = useState(false)
    const [user, changeUser] = useState({})
    const [docData, changeDocData] = useState({})
    const [tab, changeTab] = useState('view')
    const [editorContent, changeEditor] = useState('')
    const [titleContent, changeTitle] = useState('')
    const [firstLoad, changeFirstLoad] = useState(true)
    const [realOwner, changeRealOwner] = useState(true)

    useEffect(() => {
        if(logged){
            getDoc(doc(db, "notes", id))
                .then((doc) => {
                    try{    
                        if(doc.data().owner == user.uid){
                            if(firstLoad){
                                changeDocData(doc.data())
                                changeEditor(doc.data().content)
                                changeTitle(doc.data().title)
                                changeFirstLoad(false)
                            }
                        } else{
                            changeRealOwner(false)
                        }
                    } catch(e){}
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

    const getEditorContent = () => {
        changeTab('editor')
    }

    const changeEditorContent = (e) => {
        changeEditor(e.target.value)   
    }

    const changeTitleContent = (e) => {
        changeTitle(e.target.value)
    }

    const saveChanges = () => {
        updateDoc(doc(db, "notes", id), {
            title: titleContent,
            content: editorContent,
            updatedOn: new Date()
        })
        changeFirstLoad(true)
    }

    const deleteNote = () => {
        Router.push('/e/d/'+id)
    }

    // Layout da página
	return (
		<div style={{overflowX: 'hidden'}}>
			<Head>
				<title>Taskr | Anotação</title>
				<meta name="description" content="Taskr é um app para organização de anotações." />
				<link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"/>
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
                        <a href="/dashboard" className="block py-2 pr-4 pl-3 text-white bg-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0">Dashboard</a>
                    </li>
                    <li>
                        <a href="/about" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Sobre</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>

            {
                realOwner ? 
                    <>
                        <div className='w-screen' style={{height: '25vh', backgroundColor: docData.banner}}></div>

                        <div className="inline-flex rounded-md shadow-sm ml-10 mt-5" role="group">
                            <button type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-teal-700 focus:text-teal-700" onClick={getEditorContent}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                            </button>
                            <button type="button" className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-teal-700 focus:text-teal-700" onClick={() => {changeTab('view')}}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                            </button>
                            <button type="button" className="py-2 px-4 ml-5 text-sm font-medium text-white bg-teal-600 rounded-md border border-gray-200 hover:bg-teal-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-teal-700 focus:text-white" onClick={saveChanges}>
                                Salvar
                            </button>
                            <button type="button" className="py-2 px-4 ml-1 text-sm font-medium text-white bg-red-600 rounded-md border border-gray-200 hover:bg-red-700 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-white" onClick={deleteNote}>
                                Excluir
                            </button>
                        </div>

                        <div className='prose w-screen mr-10 mt-5' style={{height: '200vh'}}>                
                            {
                                tab == 'view' ?
                                    <>
                                        <div className='ml-5 mb-5'>
                                            {
                                                firstLoad ? 
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    <>
                                                        Última atualização: <strong>{docData.updatedOn.toDate().toLocaleDateString('pt-BR')}</strong> às <strong>{docData.updatedOn.toDate().toLocaleTimeString('pt-BR').slice(0, 5)}</strong>
                                                    </>
                                            }
                                        </div>
                                        <div className='ml-10'>
                                            <h1 className='mt-5 mb-5 w-screen'>{titleContent}</h1>
                                            <ReactMarkdown children={editorContent} remarkPlugins={[remarkGfm]} />
                                        </div>
                                    </>
                                    :                       
                                    <>
                                        <div className='ml-5 mb-5'>
                                            {
                                                firstLoad ? 
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                    :
                                                    <>
                                                        Última atualização: <strong>{docData.updatedOn.toDate().toLocaleDateString('pt-BR')}</strong> às <strong>{docData.updatedOn.toDate().toLocaleTimeString('pt-BR').slice(0, 5)}</strong>
                                                    </>
                                            }
                                        </div>
                                        <form>
                                            <div className="mb-2">
                                                <input type="text" id="large-input" className="block p-4 w-screen text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500" value={titleContent} onChange={changeTitleContent} />
                                            </div>
                                            <div className="mb-4 w-screen bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="py-2 px-4 bg-white rounded-b-lg">
                                                    <label for="editor" className="sr-only">Anotação</label>
                                                    <textarea id="editor" rows="50" className="block px-0 w-full text-sm text-gray-800 bg-white border-0 focus:ring-0" placeholder="Escreva sua anotação..." value={editorContent} onChange={changeEditorContent}></textarea>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                            }
                        </div>
                    </>
                :
                    <>
                        <div className="max-w-xl mt-20 mx-auto text-center">
                            <h2 className="text-2xl font-bold sm:text-3xl">Acesso negado</h2>

                            <p className="mx-auto mt-4 text-gray-500">
                                Esta anotação não pertence a você :( <br/>
                                Que tal criar uma nova anotação só sua?
                            </p>

                            <a
                                href="/e/new"
                                className="flex items-center justify-between px-5 py-3 mt-8 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-600 group"
                            >
                                <span className="text-lg font-medium group-hover:text-white">
                                Criar nova anotação
                                </span>

                                <span
                                className="flex-shrink-0 p-2 ml-4 bg-white border border-teal-600 rounded-full"
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                                </span>
                            </a>
                        </div>
                    </>
            }
		</div>
	)
}
