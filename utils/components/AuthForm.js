import React from "react"

class Form extends React.Component{
    state = {
        form: 'login'
    }

    changeForm = (tab) => {
        this.setState({
            form: tab
        })
    }

    render(){
        if(this.state.form == 'login'){
            return (
                <>
                    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                    <div class="max-w-lg mx-auto text-center">
                        <h1 class="text-2xl font-bold sm:text-3xl">Entrar</h1>
        
                        <p class="mt-4 text-gray-500">
                            {this.props.r ? <p>Insira suas credenciais novamente para alterar seus dados.</p> : 
                                            <p>Bem vindo de volta ao <strong>Taskr</strong>!</p>}
                        </p>
                    </div>
        
                    <form action={this.props.r == true ? '/settings-handshake' : '/handshake'} class="max-w-md mx-auto mt-8 mb-0 space-y-4">
                        <div>
                            <label for="email" class="sr-only">Email</label>
            
                            <div class="relative">
                                <input
                                name="e"
                                type="email"
                                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Email"
                                />
            
                                <span class="absolute inset-y-0 inline-flex items-center right-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                                </span>
                            </div>
                        </div>
        
                        <div>
                            <label for="password" class="sr-only">Password</label>
                            <div class="relative">
                                <input
                                name="p"
                                type="password"
                                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Senha"
                                />
            
                                <span class="absolute inset-y-0 inline-flex items-center right-4">
                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </span>
                            </div>
                        </div>
        
                        <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">
                            Ainda não tem uma conta? <a class="underline cursor-pointer" onClick={() => {this.changeForm('register')}}>Criar conta</a>
                        </p>
                        <p class="text-sm text-gray-500">
                            Esqueceu a senha? <a class="underline cursor-pointer" onClick={() => {this.changeForm('forgotPassword')}}>Recuperar conta</a>
                        </p>
        
                        <button
                            type="submit"
                            class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-teal-600 rounded-lg"
                        >
                            Entrar
                        </button>
                        </div>
                    </form>
                    </div>
                </>
            )
        } else if(this.state.form == 'register'){
            return (
                <>
                    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                    <div class="max-w-lg mx-auto text-center">
                        <h1 class="text-2xl font-bold sm:text-3xl">Criar uma conta</h1>
        
                        <p class="mt-4 text-gray-500">
                            Você está a um passo de criar sua mais nova conta no <strong>Taskr</strong>!
                        </p>
                    </div>
        
                    <form action="/register" class="max-w-md mx-auto mt-8 mb-0 space-y-4">
                        <div>
                            <label for="text" class="sr-only">Nome</label>
            
                            <div class="relative">
                                <input
                                name="n"
                                type="text"
                                class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Nome"
                                />
            
                                <span class="absolute inset-y-0 inline-flex items-center right-4">
                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>

                                </span>
                            </div>
                        </div>

                        <div>
                        <label for="email" class="sr-only">Email</label>
        
                        <div class="relative">
                            <input
                            name="e"
                            type="email"
                            class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="Email"
                            />
        
                            <span class="absolute inset-y-0 inline-flex items-center right-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                            </span>
                        </div>
                        </div>
        
                        <div>
                        <label for="password" class="sr-only">Password</label>
                        <div class="relative">
                            <input
                            name="p"
                            type="password"
                            class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="Senha"
                            />
        
                            <span class="absolute inset-y-0 inline-flex items-center right-4">
                            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </span>
                        </div>
                        </div>
        
                        <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">
                            Já tem uma conta? <a class="underline cursor-pointer" onClick={() => {this.changeForm('login')}}>Entrar</a>
                        </p>
        
                        <button
                            type="submit"
                            class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-teal-600 rounded-lg"
                        >
                            Entrar
                        </button>
                        </div>
                    </form>
                    </div>
                </>
            )
        } else if(this.state.form == 'forgotPassword'){
            return (
                <>
                    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                    <div class="max-w-lg mx-auto text-center">
                        <h1 class="text-2xl font-bold sm:text-3xl">Recuperar conta</h1>
        
                        <p class="mt-4 text-gray-500">
                            Insira seu email para recuperar sua conta do <strong>Taskr</strong>
                        </p>
                    </div>
        
                    <form action="/recovery" class="max-w-md mx-auto mt-8 mb-0 space-y-4">
                        <div>
                        <label for="email" class="sr-only">Email</label>
        
                        <div class="relative">
                            <input
                            name="e"
                            type="email"
                            class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                            placeholder="Email"
                            />
        
                            <span class="absolute inset-y-0 inline-flex items-center right-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                            </span>
                        </div>
                        </div>
        
                        <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-500">
                            Já recuperou sua senha? <a class="underline cursor-pointer" onClick={() => {this.changeForm('login')}}>Entrar</a>
                        </p>
        
                        <button
                            type="submit"
                            class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-teal-600 rounded-lg"
                        >
                            Entrar
                        </button>
                        </div>
                    </form>
                    </div>
                </>
            )
        }
    }
}

export default function AuthForm(props){
    return <Form r={props.r} />
}