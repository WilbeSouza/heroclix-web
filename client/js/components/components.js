async function loadHeader() {
    const response = await fetch("/client/components/header.html");
    const data = await response.text();

    document.getElementById("header-container").innerHTML = data;

    initHeaderEvents(); // importante
}

/* EVENTOS DO HEADER */
function initHeaderEvents() {

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            loginModal.style.display = "flex";
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            registerModal.style.display = "flex";
        });
    }
}

loadHeader();