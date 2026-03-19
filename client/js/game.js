/* ================================
HEROCLIX WEB - GAME.JS
Controle inicial da interface
================================ */

/* ELEMENTOS */

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");

/* ================================
ABRIR MODAL LOGIN
================================ */

const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const userDisplay = document.getElementById("userDisplay");

let isLogged = false;

loginBtn.addEventListener("click", () => {

    // LOGIN
    if (!isLogged) {

        const username = usernameInput.value;

        if (username === "") {
            alert("Digite um usuário");
            return;
        }

        // salva nome
        userDisplay.innerText = `Olá, ${username}`;

        // muda estado
        isLogged = true;

        // UI
        usernameInput.style.display = "none";
        passwordInput.style.display = "none";

        userDisplay.style.display = "block";

        loginBtn.innerText = "Sair";
        registerBtn.style.display = "none";

    } 
    
    // LOGOUT
    else {

        isLogged = false;

        // limpa campos
        usernameInput.value = "";
        passwordInput.value = "";

        // UI volta
        usernameInput.style.display = "block";
        passwordInput.style.display = "block";

        userDisplay.style.display = "none";

        loginBtn.innerText = "Entrar";
        registerBtn.style.display = "block";

    }

});

/* ================================
ABRIR MODAL CADASTRO
================================ */

registerBtn.addEventListener("click", () => {


registerModal.style.display = "flex";


});

/* ================================
FECHAR MODAL CLICANDO FORA
================================ */

window.addEventListener("click", (event) => {


if(event.target === loginModal){

    loginModal.style.display = "none";

}

if(event.target === registerModal){

    registerModal.style.display = "none";

}


});

/* ================================
FUTURO: SISTEMA DE LOGIN
================================ */

function loginUser(){


console.log("Login iniciado");


}

/* ================================
FUTURO: SISTEMA DE CADASTRO
================================ */

function registerUser(){


console.log("Cadastro iniciado");


}
/*------ANIMAÇÃO DA LOGO ARENACLIX-----*/

const playBtn = document.getElementById("playBtn");
const gameLogo = document.getElementById("gameLogo");

let rotation = 0;
let isLoading = false;

playBtn.addEventListener("click", () => {

    if(isLoading) return; // evita clicar várias vezes

    isLoading = true;

    // desativa botão visualmente
    playBtn.innerText = "Carregando...";
    playBtn.style.opacity = "0.6";
    playBtn.style.cursor = "not-allowed";

    // inicia rotação em ticks
    const interval = setInterval(() => {

        rotation += 11.9; // menor = mais suave tipo relógio
        gameLogo.style.transform = `rotate(${rotation}deg)`;

    }, 160); // velocidade do "tic"

    // após 5 segundos
    setTimeout(() => {

        clearInterval(interval);

        // redireciona pro jogo
        window.location.href = "game.html";

    }, 5000);

});
