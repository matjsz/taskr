import { onAuthStateChanged } from 'firebase/auth'
import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { auth } from '../utils/firebase'

export default function Home() {
	return (
		<div>
			<Head>
                <title>Taskr | Sobre</title>
                <meta name="description" content="Taskr é um app para organização de anotações." />
                <link rel="icon" href="/favicon.ico" />

                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.3/dist/flowbite.min.css" />
                <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
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

            <div className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-lg font-semibold text-teal-600">TASKR</h2>
                        <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">Uma maneira melhor de anotar suas ideias</p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">Com o Taskr, anotar fica bem mais fácil.</p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                            <div className="relative">
                            <dt>
                                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-teal-500 text-white">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                                </div>
                                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Sistema na nuvem</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">Temos orgulho de dizer que nosso sistema funciona graças ao <strong>Google Cloud (Firebase)</strong>, dando mais flexibilidade e segurança à aplicação. As ferramentas disponibilizadas pela Google nos ajudam a criar uma experiência cada vez melhor e cada vez mais otimizada.</dd>
                            </div>

                            <div className="relative">
                            <dt>
                                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-teal-500 text-white">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                                </svg>
                                </div>
                                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">A segurança é uma prioridade.</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">Com o uso das ferramentas da <strong>Google</strong>, é possível fornecer um sistema de autenticação de ponta. No nosso sistema, os dados do usuário são criptografados e mantidos em segredo. Além da autenticação, as anotações dos usuários são privadas e só eles tem acesso às suas criações.</dd>
                            </div>

                            <div className="relative">
                            <dt>
                                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-teal-500 text-white">

                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                                </div>
                                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Rapidez é o nosso sobrenome</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">A estrutura do site é baseada em <strong>Next.js</strong>, <strong>React.js</strong> e o sofisticado <strong>TailwindCSS</strong>, com a junção dessas três poderosas ferramentas, o Taskr se torna extremamente ágil e ocupa a menor quantidade de memória possível. Rapidez é o nosso sobrenome e otimização o nosso lema.</dd>
                            </div>

                            <div className="relative">
                            <dt>
                                <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-teal-500 text-white">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                                </div>
                                <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Com amor, a Equipe do Taskr</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">O Taskr foi feito com muita dedicação, e continuará sendo mantido com a mesma dedicação de sempre. O time por trás do desenvolvimento da aplicação está apto a desenvolver um Taskr cada vez melhor. <strong>Juntos, podemos criar algo incrível</strong></dd>
                            </div>
                        </dl>
                        <hr className='mt-5' />
                        <div className="text-center mt-5 space-x-2 overflow-hidden">
                            <a href="https://www.youtube.com/channel/UCXl4cf7u-7GAm1gOqwcUY6g">
                                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://rotony.com.br/wp-content/uploads/2021/09/free-youtube-logo-icon-2431-thumb.png" alt=""/>
                            </a>
                            <a href="https://twitter.com/TaskerProject?t=0mwOI1Jv8CnUfseaJiZopA&s=08">
                                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://www.torqlite.com/wp-content/uploads/2017/02/60414c58e954d7236837248225e0216f_new-twitter-logo-vector-eps-twitter-logo-clipart_518-518.png" alt=""/>
                            </a>
                            <a href="https://www.instagram.com/taskerproject/">
                                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>

		</div>
	)
}
