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
      return;
    }
    console.log('Login realizado com sucesso!', data);
    localStorage.setItem('token', data.message);
    localStorage.setItem('untilDate', new Date().setMinutes(new Date().getMinutes() + 10));
    navigateTo('painel-usuario');
  })
  .catch(error => {
    console.error('Erro ao realizar login:', error);
  });
}
