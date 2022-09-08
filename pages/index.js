import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { auth } from '../utils/firebase'

export default function Home() {
	useEffect(() => {
		// Checa se o usuário está logado ou não, caso ele esteja, é redirecionado para a dashbaord (dashboard.js ou URL: /dashboard)
        onAuthStateChanged(auth, (user) => {
            if(user){
                Router.push('/dashboard')
            }
        })
	})

	return (
		<div>
			<Head>
                <title>Taskr</title>
                <meta name="description" content="Taskr é um app para organização de anotações." />
                <link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />
                <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
            </Head>

			<div className="relative overflow-hidden bg-white">
				<div className="mx-auto max-w-7xl">
					<div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
					<svg className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
						<polygon points="50,0 100,0 50,100 0,100" />
					</svg>

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

					<main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
						<div className="sm:text-center lg:text-left">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block xl:inline">O site perfeito para as suas</span>
							<span className="block text-teal-600 xl:inline"> anotações</span>
						</h1>
						<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">O <strong><span className="text-teal-600">Taskr</span></strong> foi feito com muita dedicação para que você possa ter a melhor experiência possível. <span className="text-teal-600">Anote. Construa. Inove.</span> As melhores ideias nascem das anotações de mentes brilhantes. <br/><br/><a className="text-teal-600" href="/auth">Crie uma conta</a> hoje e comece sua jornada!</p>
						<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
							<div className="rounded-md shadow">
							<a href="/auth" className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 md:py-4 md:px-10 md:text-lg">Comece agora</a>
							</div>
							<div className="mt-3 sm:mt-0 sm:ml-3">
							<a href="/about" className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-100 px-8 py-3 text-base font-medium text-teal-700 hover:bg-teal-200 md:py-4 md:px-10 md:text-lg">Saiba mais</a>
							</div>
						</div>
						<p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">Já tem uma conta? <a className="text-teal-600" href="/auth">Entrar	</a></p>
						</div>
					</main>
					</div>
				</div>
				<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
					<img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""/>
				</div>
			</div>
		</div>
	)
}
