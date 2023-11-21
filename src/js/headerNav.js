function updateHeaderMenu() {
  const headerMenu = document.getElementById("headerMenu");

  let dataPage;
  let text;
  let dataPage2;
  let text2;
  let logoutButton;

  const token = localStorage.getItem('token')
  if (token !== null) {
    dataPage = "painel-usuario";
    text = "Painel do Usuário";
    dataPage2 = "home";
    text2 = "Sair";
    logoutButton = "realizarLogout()";

  } else {
    dataPage = "cadastro";
    text = "Quero me cadastrar";
    dataPage2 = "login";
    text2 = "Login";
  }

  const navMenuHeader = `
    <ul role="menu" id="menu">
    <div>
        <li class="menuitem">
            <a href="#" data-page="home" role="menuitem">
                Home
            </a>
        </li>
        <li class="menuitem">
            <a href="#" data-page=${dataPage} role="menuitem">
                ${text}
            </a>
        </li>
    </div>
    <li class="menuitem" id="loginUser">
        <a href="#" data-page=${dataPage2} onclick="${logoutButton}" role="menuitem">
            ${text2}
        </a>
    </li>
    </ul>
  `

  headerMenu.innerHTML = navMenuHeader;
}

