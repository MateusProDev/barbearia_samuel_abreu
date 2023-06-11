const barbearia = document.querySelector('.barbearia');
const navLinks = document.querySelector('.nav-links');

barbearia.addEventListener('click', () => {
  barbearia.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// função da box animation

window.onload = function() {
  var boxes = document.querySelectorAll('.box_cortes');
  var leftBoxes = document.querySelectorAll('.box_cortes.left');
  var rightBoxes = document.querySelectorAll('.box_cortes.right');

  for (var i = 0; i < leftBoxes.length; i++) {
    leftBoxes[i].style.animationDelay = i * 0.7 + 's';
  }

  for (var j = 0; j < rightBoxes.length; j++) {
    rightBoxes[j].style.animationDelay = j * 0.7 + 's';
  }
};

// ação do formulario

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém o valor do campo de e-mail
  var email = document.getElementById("email").value;

  // Configuração do endpoint do Getform.io
  var endpoint = "YOUR_FORM_ENDPOINT";

  // Envia os dados do formulário para o endpoint usando o Fetch API
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email })
  })
    .then(function(response) {
      // Exibe a mensagem de sucesso
      var successMessage = document.getElementById("success-message");
      successMessage.classList.remove("hidden");
    })
    .catch(function(error) {
      // Exibe mensagem de erro
      console.error("Erro ao enviar o e-mail:", error);
    });
});







