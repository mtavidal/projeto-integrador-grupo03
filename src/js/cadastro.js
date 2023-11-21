function cadastrar() {
  const nome = document.getElementById('nome').value;
  const sobrenome = document.getElementById('sobrenome').value;
  const cidade = document.getElementById('cidade').value;
  const genero = document.getElementById('genero').value;
  const dataNascimento = document.getElementById('nascimento').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const cadastroData = {
    nome,
    sobrenome,
    cidade,
    genero,
    dataNascimento,
    email,
    senha,
    amigos: []
  };

  console.log('cadastro', cadastroData);

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
