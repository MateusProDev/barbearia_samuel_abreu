var nomeId = document.getElementById("nomeId");
var senhaId = document.getElementById("senhaId");
var buttonId = document.getElementById("buttonId");
var spaceRetur = document.getElementById("spaceRetur");
var senhaUsuario = "2468";
var inscricao = document.getElementById("inscricaoId");

buttonId.addEventListener('click', function() {
    var senha = senhaId.value;

    if (senha === senhaUsuario) {  // Compare as strings
        var nome = nomeId.value.trim();
        if (nome !== "") {
            var novaDiv = document.createElement('div');
            //novaDiv.textContent = 'Olá, ' + nome + ', Seja bem-vindo!';
            spaceRetur.appendChild(novaDiv);
            spaceRetur.style.display = 'block';

            // Aguarde 2 segundos antes de redirecionar para "main.html"
            setTimeout(function() {
                window.location.href = "adm.html";
            }, 2000);
        } else {
            alert('Insira seu nome'); 
        }
    } 
    else if(nome === ""){
        window.alert('insira seu nome');
    }
    else if(senha === ""){
        window.alert('insira sua senha');
    }
    else {
        window.alert("Senha incorreta");
    }
});
