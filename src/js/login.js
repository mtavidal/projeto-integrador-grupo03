function realizarLogin() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const loginData = {
    email,
    senha,
  };

  fetch('https://empresta-ai.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success === false) {
        console.error('Erro ao realizar login:', data);
        alert("Usuário ou senha inválidos.")
        return;
      }
      console.log('Login realizado com sucesso!', data);
      localStorage.setItem('token', data.message);
      localStorage.setItem('untilDate', new Date().setMinutes(new Date().getMinutes() + 10));
      getIdDoUsuario(email);
      getNomeDoUsuario(email);
      navigateTo('painel-usuario');
    })
    .catch(error => {
      console.error('Erro ao realizar login:', error);
    });
}

function realizarLogout() {
  fetch('https://empresta-ai.onrender.com/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Logout realizado com sucesso!', data);
      localStorage.removeItem('token');
      localStorage.removeItem('untilDate');
      localStorage.removeItem('nomeUsuario');
      navigateTo('home');
    })
    .catch(error => {
      console.error('Erro ao realizar logout:', error);
    });
}

