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
    console.log('Login realizado com sucesso!', data);
    navigateTo('painel-usuario');
  })
  .catch(error => {
    console.error('Erro ao realizar login:', error);
  });
}
