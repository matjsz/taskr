import Head from 'next/head'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../../../utils/components/Loading'
import { loginUser } from '../../../utils/loginUser'
import { auth } from '../../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { createNote } from '../../../utils/createNote'
import { getNote } from '../../../utils/getNote'
import { db } from '../../../utils/firebase'
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function NewNote() {
    // Aqui, o useRouter é usado para capturar os parâmetros de URL (por exemplo: em https://link.com?p=Teste, "p" é um parâmetro de URL)
    const router = useRouter()
    const { id } = router.query


    useEffect(() => {
        deleteDoc(doc(db, "notes", id))
        Router.push('/dashboard')
    })

    // Layout da página
	return (
		<div>
			<Head>
				<title>Taskr | Anotação</title>
				<meta name="description" content="Taskr é um app para organização de anotações." />
				<link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"/>
			</Head>

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

            <center>
                <div className='flex justify-center mt-28 text-xl'>
                    <Loading/>
                    <p className=''><strong>Excluindo a anotação...</strong></p>
                </div>
            </center>
        </div>
	)
}
