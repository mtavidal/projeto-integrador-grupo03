function getMeusGrupos(page) {
    fetch('https://empresta-ai.onrender.com/grupos/meus-grupos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const gruposContainer = page === 'painel-usuario' ? document.getElementById('containerGrupos') : document.getElementById('containerCardsMeusGrupos');
        if (data.message === 'Não há grupos para esse usuário.') {
            gruposContainer.innerHTML = "<p>Não há grupos.</p>"
            return []
        }
        console.log('Sucesso!', data);
        const grupos = data.message;
        console.log('container',gruposContainer)
        grupos.forEach(grupo => {
        gruposContainer.innerHTML += page === 'painel-usuario' ? `
            <div class="cardGrupos" onclick="navigateTo('detalhes'), getGruposDetalhes('${grupo.grupoId}')">
            <h3>${grupo.nomeGrupo}</h3>
            <img src="../../public/assets/images/foto_produto.png" alt="imagem do produto">
            <h4>${grupo.nomeProduto}</h4>
            <h5>Status</h5>
            </div>
        ` : `
            <div class="cardParticipantes">
                <img src="../../public/assets/images/foto_participante.png" alt="Foto participante">
                <h2>${grupo.nomeGrupo}</h2>
            </div>
        `
        });
    })
    .catch(error => {
        console.error('Erro: ', error)
        navigateTo('login');
    });
}

function getGruposDetalhes(grupoId) {
    fetch(`https://empresta-ai.onrender.com/grupos/detalhes/${grupoId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Grupo não encontrado.") {
            return []
        }
        console.log('Sucesso em pegar o grupo!', data);
        const grupo = data.message;
        const container = document.getElementById('containerDadosGrupo')
        container.innerHTML += `
            <div>
                <h3>${grupo.nomeGrupo}</h3>
                <h3 id="descricaoProduto">${grupo.descricaoProduto}</h3>
                <h3>Status: Emprestado</h3>
                <h3>Produto com: ${getNomeDoUsuario(grupo.email)}</h3>
                <button type="button" class="btnAzulClaro" onclick="{openModal('dv-modal')}">Deixar de
                    Participar</button>
            </div>
            <img src="../../public/assets/images/foto_produto.png" alt="">
        `;
    })
    .catch(error => {
        console.error('Erro: ', error)
        navigateTo('login');
    });

}

function criarGrupo() {
    const nomeGrupo = document.getElementById('nomeGrupo').value
    const emailsToDeserialize = document.getElementById('emailsConvidados').value
    const nomeProduto = document.getElementById('nomeProduto').value
    const descricaoProduto = document.getElementById('descriçãoProduto').value

    const criarGrupoData = {
        nomeGrupo,
        emails: emailsToDeserialize.split(','),
        nomeProduto,
        descricaoProduto,
    }
    fetch('https://empresta-ai.onrender.com/grupos/criar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(criarGrupoData)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            console.error(data)
            return
        }
        console.log('Sucesso!', data);
        grupos = data.message;
        return grupos;
    })
    .catch(error => {
        console.error('Erro: ', error)
        navigateTo('login');
    });
}