function loadContent(page) {
  const appContainer = document.getElementById('app');

  fetch(`./src/pages/${page}.html`)
    .then(response => response.text())
    .then(html => {
      appContainer.innerHTML = html;
    })
    .catch(error => console.error('Erro ao carregar conteúdo:', error));
}

function navigateTo(page, event) {
  if (event) {
    event.preventDefault();
  }

  if (page === 'login'
    && !(localStorage.getItem('token') !== null && localStorage.getItem('token') == '')
    && !(localStorage.getItem('untilDate') !== null && localStorage.getItem('untilDate') == '')
    && localStorage.getItem('untilDate') > new Date()
  ) {
    navigateTo('painel-usuario');
    return;
  }

  history.pushState({ page }, null, `/#${page}`);
  loadContent(page);
  updateHeaderMenu();

  setTimeout(() => {
    if (page === 'painel-usuario' || page === 'gerenciar-grupos') getMeusGrupos(page);
    if (page === 'amigos') getMeusAmigos();
  }, 500);

}

window.onload = function () {
  navigateTo('home');
};

document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A' && event.target.getAttribute('data-page')) {
    const page = event.target.getAttribute('data-page');
    navigateTo(page, event);
  }
});