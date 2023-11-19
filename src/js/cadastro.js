function cadastrar() {
  const form = document.getElementById('cadastroForm');
  const formData = new FormData(form);

  const cadastroData = {};
  formData.forEach((value, key) => {
    cadastroData[key] = value;
  });

  fetch('https://empresta-ai.onrender.com/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cadastroData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cadastro realizado com sucesso!', data);
    // Lógica adicional após o cadastro, se necessário
  })
  .catch(error => {
    console.error('Erro ao cadastrar:', error);
  });
}
