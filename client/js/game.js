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

loginBtn.addEventListener("click", () => {

```
loginModal.style.display = "flex";
```

});

/* ================================
ABRIR MODAL CADASTRO
================================ */

registerBtn.addEventListener("click", () => {

```
registerModal.style.display = "flex";
```

});

/* ================================
FECHAR MODAL CLICANDO FORA
================================ */

window.addEventListener("click", (event) => {

```
if(event.target === loginModal){

    loginModal.style.display = "none";

}

if(event.target === registerModal){

    registerModal.style.display = "none";

}
```

});

/* ================================
FUTURO: SISTEMA DE LOGIN
================================ */

function loginUser(){

```
console.log("Login iniciado");
```

}

/* ================================
FUTURO: SISTEMA DE CADASTRO
================================ */

function registerUser(){

```
console.log("Cadastro iniciado");
```

}
