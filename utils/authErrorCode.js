function formatCode(code){
    const codes = {
        'auth/email-already-exists': {
            'title': 'Email em uso',
            'desc': 'Este email já está em uso por outra pessoa. Tente um novo email para criar sua conta.'
        },
        'auth/user-not-found': {
            'title': 'Usuário não encontrado',
            'desc': 'Esta conta não existe. Tente criar uma nova conta.'
        },
        'auth/invalid-email': {
            'title': 'Email inválido',
            'desc': 'O email inserido é inválido. Tente novamente.'
        },
        'auth/wrong-password': {
            'title': 'Senha incorreta',
            'desc': 'A senha inserida está incorreta. Tente novamente.'
        }
    }

    if(codes[code] == undefined){
        return {
            'title': 'Algo deu errado',
            'desc': 'Tente novamente.'
        }
    } else{
        return codes[code]
    }
}

module.exports.formatCode = formatCode