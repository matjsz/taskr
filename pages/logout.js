import Head from 'next/head'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'
import Loading from '../utils/components/Loading'
import Navbar from '../utils/components/navbar'
import { registerUser } from '../utils/registerUser'
import { logout } from '../utils/logout'

export default function Landing() {
    const { query } = useRouter()

    useEffect(() => {
        logout()
            .then(() => {
                Router.push('/auth')
            })
    })

	return (
		<div>
			<Head>
				<title>Taskr | Até mais!</title>
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
                <p className=''><strong>Saindo...</strong></p>
            </div>

		</div>
	)
}
