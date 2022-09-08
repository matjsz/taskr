import Head from 'next/head'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { useEffect } from 'react'
import Loading from '../utils/components/Loading'
import Navbar from '../utils/components/navbar'
import { registerUser } from '../utils/registerUser'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Antigo código usado para a Dashboard, não é mais usado na versão atual.
export default function Dashboard(props) {
	return (
		<div>
            Bem vindo, {props.user.username}
		</div>
	)
}
