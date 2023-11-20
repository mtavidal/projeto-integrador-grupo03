function getIdDoUsuario(email) {
    fetch('https://empresta-ai.onrender.com/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
        .then(data => {
            const loggedUser = data.find(user => user.email === email)
            localStorage.setItem('id', loggedUser.id)
        })
        .catch(error => {
            console.error('Erro: ', error)
            navigateTo('login');
        });
}

function getNomeDoUsuario(email) {
    fetch('https://empresta-ai.onrender.com/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
        .then(data => {
            const loggedUser = data.find(user => user.email === email)
            console.log(loggedUser);
            localStorage.setItem('nomeUsuario', `${loggedUser.nome} ${loggedUser.sobrenome}`);
        })
        .catch(error => {
            console.error('Erro: ', error)
            navigateTo('login');
        });
}