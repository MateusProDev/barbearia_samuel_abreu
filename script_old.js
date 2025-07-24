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
    leftBoxes[i].style.animationDelay = i * 0.2 + 's';
  }

  for (var j = 0; j < rightBoxes.length; j++) {
    rightBoxes[j].style.animationDelay = j * 0.2 + 's';
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

// função secao que abre

function exibirConteudo() {
  var conteudo = document.getElementById("conteudo");
  if (conteudo.style.display === "none") {
    conteudo.style.display = "block";
  } else {
    conteudo.style.display = "none";
  }
}

// ANIMAÇÃO DO BTN_REDES

function mostrarEspaco() {
  var espaco = document.getElementById("espaco");
  if (espaco.style.display === "none") {
      espaco.style.display = "block";
  } else {
      espaco.style.display = "none";
  }
}

// Substitua [URL_DO_MAPA] pela URL do seu site com o mapa incorporado
var shareButton = document.querySelector('.share-button');
    shareButton.addEventListener('click', function() {
      var encodedText = encodeURIComponent('Confira a localização da barbearia no mapa: https://goo.gl/maps/63dDmPkUGqpym9S97');
      window.open('https://wa.me/?text=' + encodedText);
    });

//comentario
const obt = document.querySelector('.container_map');

function fazer(){
  
}

