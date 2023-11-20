function getMeusAmigos() {
    fetch(`https://empresta-ai.onrender.com/amigos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Amigos não encontrados.") {
                containerAmigos.innerHTML = "<p>Não há amigos.</p>"
                return []
            }

            console.log('Sucesso em pegar amigos!', data);
            const amigos = data.message;
            const container = document.getElementById('containerAmigos');
            amigos.forEach(amigo => {
                container.innerHTML += `
            <div class="cardAmigos">
            <img src="../../public/assets/images/foto_amigo.png" alt="imagem do produto">
            <div>
                <h3>${amigo.nome}</h3>
                <h4>${amigo.email}</h4>
            </div>
            <button class="btnDesfazerAmizade" onclick="openModal('dv-modalExcluirAmigo')">Desfazer Amizade</button>
            </div>
            <div id="dv-modalExcluirAmigo" class="modal">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Tem certeza que deseja excluir esse amigo ${amigo.nome}?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="{excluirAmigo('${amigo.id}')}">Sim</button>
                    <button class="btn" onclick="{closeModal('dv-modalExcluirAmigo'), navigateTo('amigos')}">Cancelar</button>
                </div>
            </div>
            </div>
            `;
            });

        })
        .catch(error => {
            console.error('Erro: ', error)
            navigateTo('login');
        });

}

function excluirAmigo(amigoId) {
    fetch(`https://empresta-ai.onrender.com/amigos/excluir/${amigoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.status === 204) {
                console.log('Amigo excluído com sucesso!');
                openModal('dv-confirmacaoExclusaoAmigo');
            }
        })

        .catch(error => {
            console.error('Erro: ', error)
            navigateTo('login');
        });

}