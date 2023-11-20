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
            console.log('container', gruposContainer)
            grupos.forEach(grupo => {
                gruposContainer.innerHTML += page === 'painel-usuario' ? `
            <div class="cardGrupos" onclick="navigateTo('detalhes'), getGruposDetalhes('${grupo.grupoId}')">
            <h3>${grupo.nomeGrupo}</h3>
            <img src="../../public/assets/images/foto_produto.png" alt="imagem do produto">
            <h4>${grupo.nomeProduto}</h4>
            <h5>Status</h5>
            </div>
        ` : `
            <div class="cardMeusGrupos">
            <h3>${grupo.nomeGrupo}</h3>
            <div>
                <button id="linkEditar" onclick="{openModal('dv-modal4')}">Editar</button>
                <button id="linkExcluir" onclick="{openModal('dv-modal2')}">Excluir</button>
            </div>
            </div>
            <div id="dv-modal2" class="modal">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Tem certeza que deseja excluir esse grupo?</p>
                </div>

                <div class="modal-footer">
                    <button class="btn" onclick="{deletarGrupo('${grupo.grupoId}'), navegateTo(${page})}">Sim</button>
                    <button class="btn" onclick="{closeModal('dv-modal2')}">Cancelar</button>
                </div>
            </div>
            </div>
            <div id="dv-modal4" class="modal">
            <div class="modal-content">
                <div class=" modal-body">
                    <div id="containerCriarGrupo">
                        <h2 style="padding-bottom: 10px;">Editar Grupo</h2>
                        <form action="#">
                            <div>
                                <input type="text" id="nomeAtualizadoGrupo" required
                                    placeholder="Digite o nome atualizado do grupo">
                                <input type="text" id="emailsAtualizadoConvidados" required
                                    placeholder="Digite os emails dos novos convidados">
                            </div>
                            <div>
                                <input type="text" id="nomeAtualizadoProduto" required
                                    placeholder="Digite o nome atualizado do produto">
                                <input type="file" id="imagemAtualizadoProduto" required
                                    placeholder="Inserir nova imagem do produto">
                            </div>
                            <textarea type="text" id="descriçãoAtualizadoProduto" required
                                placeholder="Inserir a descrição atualizada do produto"></textarea>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="{editarGrupo('${grupo.grupoId}')}">Editar</button>
                    <button class="btn" onclick="{closeModal('dv-modal4')}">Cancelar</button>
                </div>
            </div>
         </div>
        `
            });
        })
        .catch(error => {
            console.error('Erro: ', error);
            localStorage.removeItem('token');
            localStorage.removeItem('untilDate');
            localStorage.removeItem('nomeUsuario');
            navigateTo('login');
            updateHeaderMenu();
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
            const container = document.getElementById('containerDadosGrupo');
            container.innerHTML += `
            <div>
                <h3>${grupo.nomeGrupo}</h3>
                <h3 id="descricaoProduto">${grupo.descricaoProduto}</h3>
                <h3>Status: Emprestado</h3>
                <h3>Produto com: ${localStorage.getItem('nomeUsuario')}</h3>
                <button type="button" class="btnAzulClaro" onclick="{openModal('dv-modal')}">Deixar de
                    Participar</button>
            </div>
            <img src="../../public/assets/images/foto_produto.png" alt="">
        `;
        })
        .catch(error => {
            console.error('Erro: ', error)
            localStorage.removeItem('token');
            localStorage.removeItem('untilDate');
            localStorage.removeItem('nomeUsuario');
            navigateTo('login');
            updateHeaderMenu();
        });

}

function criarGrupo(modal) {
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
            openModal(modal);
            return grupos;
        })
        .catch(error => {
            console.error('Erro: ', error)
            localStorage.removeItem('token');
            localStorage.removeItem('untilDate');
            localStorage.removeItem('nomeUsuario');
            navigateTo('login');
            updateHeaderMenu();
        });
}

function deletarGrupo(grupoId) {
    fetch(`https://empresta-ai.onrender.com/grupos/remover/${grupoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.status === 204) {
                console.log('Grupo excluído com sucesso!');
                openModal('dv-modal3');
            }
        })

        .catch(error => {
            console.error('Erro: ', error)
            localStorage.removeItem('token');
            localStorage.removeItem('untilDate');
            localStorage.removeItem('nomeUsuario');
            navigateTo('login');
            updateHeaderMenu();
        });

}

function editarGrupo(grupoId) {
    const nomeGrupo = document.getElementById('nomeAtualizadoGrupo').value
    const emailsToDeserialize = document.getElementById('emailsAtualizadoConvidados').value
    const nomeProduto = document.getElementById('nomeAtualizadoProduto').value
    const descricaoProduto = document.getElementById('descriçãoAtualizadoProduto').value

    const editarGrupoData = {
        nomeGrupo,
        emails: emailsToDeserialize.split(','),
        nomeProduto,
        grupoId,
        descricaoProduto,
    }
    fetch(`https://empresta-ai.onrender.com/grupos/editar/${grupoId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(editarGrupoData)
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error(data)
                return
            }
            console.log('Sucesso!', data);
            grupos = data.message;
            openModal('dv-modal5');
            return grupos;
        })
        .catch(error => {
            console.error('Erro: ', error)
            localStorage.removeItem('token');
            localStorage.removeItem('untilDate');
            localStorage.removeItem('nomeUsuario');
            navigateTo('login');
            updateHeaderMenu();
        });
}