function realizarLogin() {
  const form = document.getElementById('loginForm');
  const formData = new FormData(form);

  const loginData = {};
  formData.forEach((value, key) => {
    loginData[key] = value;
  });

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
    // redirecionar usuário
  })
  .catch(error => {
    console.error('Erro ao realizar login:', error);
  });
}
