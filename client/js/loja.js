/*-----poderes dos personagens----*/
function getCards() {
    return document.querySelectorAll(".character-card");
}

function updateVisibleCharacters() {

    const cards = getCards();

    cards.forEach((card, index) => {

        if (index < visibleCount) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

/*-----Base da loja-----*/

const grid = document.getElementById("charactersGrid");

fetch("../data/characters/heroes.json")
    .then(res => res.json())
    .then(characters => {

        characters.forEach(char => {


            const card = document.createElement("div");

            card.classList.add("character-card", char.rarity);
            card.dataset.name = char.name.toLowerCase();
            card.dataset.value = char.price;
            card.dataset.edition = char.edition ? char.edition.toLowerCase() : "";
            card.dataset.team = char.team ? char.team.toLowerCase() : "";

            if (char.backImage) {
                card.dataset.back = char.backImage;
            }

            card.innerHTML = `
            <img src="${char.image}">
            <h3>${char.name}</h3>
            <span class="rarity">${char.rarity}</span>
            <p class="price">
            <img src="../assets/sprites/ui/dialcoin.png" class="coin-icon">
            ${char.price} DialCoin</p>
            <button class="buy-btn">COMPRAR</button>`;

            grid.appendChild(card);

        });
        updatePagination(); // ✅ só uma vez no final
    });

/*-----ZOOM-----*/

const modal = document.getElementById("imageModal");
const modalFront = document.getElementById("modalFront");
const modalBack = document.getElementById("modalBack");
const modalCard = document.getElementById("modalCard");

let hasBack = false;
let isFlipped = false;

grid.addEventListener("click", (e) => {

    if (e.target.tagName === "IMG") {

        const card = e.target.closest(".character-card");

        const frontSrc = e.target.src;
        const backSrc = card.dataset.back;

        modal.style.display = "flex";

        modalFront.src = frontSrc;

        if (backSrc) {
            hasBack = true;
            modalBack.src = backSrc;
        } else {
            hasBack = false;
            modalBack.src = ""; // 🔥 limpa o verso
        }

        // 🔥 SEMPRE começa mostrando a frente
        modalFront.classList.add("active");
        modalBack.classList.remove("active");

        isFlipped = false;

    }
});

/* clicar no card → vira */
modalCard.addEventListener("click", (e) => {

    e.stopPropagation(); // 🔥 impede fechar

    if (!hasBack) return; // 🔥 só vira se tiver verso

    isFlipped = !isFlipped;

    if (isFlipped) {
        modalFront.classList.remove("active");
        modalBack.classList.add("active");
    } else {
        modalFront.classList.add("active");
        modalBack.classList.remove("active");
    }
});

/* clicar fora → fecha */
modal.addEventListener("click", (e) => {
    if (!modalCard.contains(e.target)) {
        modal.style.display = "none";
    }
});

/*-----Buscar de personagens filtros-----*/
/*nome*/
const searchInput = document.getElementById("searchName");

searchInput.addEventListener("input", () => {
    currentPage = 0;
    updatePagination();
});
/*raridade*/
const rarityFilter = document.getElementById("filterRarity");

rarityFilter.addEventListener("change", () => {
    currentPage = 0;
    updatePagination();
});

/*edição*/
filterEdition.addEventListener("change", () => {
    currentPage = 0;
    updatePagination();
});

/*time*/
const filterTeam = document.getElementById("filterTeam");
document.getElementById("filterTeam").addEventListener("change", () => {
    currentPage = 0;
    updatePagination();
});

/*pontos*/
const point = document.getElementById("point");
document.getElementById("point").addEventListener("input", () => {
    currentPage = 0;
    updatePagination();
});


/*dialcoin*/
const dialcoin = document.getElementById("dialcoin");
document.getElementById("dialcoin").addEventListener("input", () => {
    currentPage = 0;
    updatePagination();
});

/*organização*/
const sortOrder = document.getElementById("sortOrder");
document.getElementById("sortOrder").addEventListener("change", () => {
    currentPage = 0;
    updatePagination();
});
/*-----Filtro por raridade lateral-----*/
const rarityButtons = document.querySelectorAll(".raridades-bar button");
let currentFilter = "all";

rarityButtons.forEach(button => {

    button.addEventListener("click", () => {

        // 🎯 ativa filtro de raridade
        currentFilter = button.value;

        // 🔥 LIMPA TODOS OS CAMPOS DE BUSCA
        document.getElementById("searchName").value = "";
        document.getElementById("filterRarity").value = "all";
        document.getElementById("filterEdition").value = "";
        document.getElementById("filterTeam").value = "";
        document.getElementById("point").value = "";
        document.getElementById("dialcoin").value = "";

        // 🔥 reseta pagina
        currentPage = 0;

        updatePagination();
    });

});

document.getElementById("clearFilters").addEventListener("click", () => {

    // 🔥 LIMPA TODOS OS CAMPOS
    document.getElementById("searchName").value = "";
    document.getElementById("filterRarity").value = "all";
    document.getElementById("filterEdition").value = "";
    document.getElementById("filterTeam").value = "";
    document.getElementById("point").value = "";
    document.getElementById("dialcoin").value = "";

    // 🔥 RESETA ORGANIZAÇÃO
    document.getElementById("sortOrder").value = "default";

    // 🔥 RESETA BOTÃO DE RARIDADE
    currentFilter = "all";

    document.querySelectorAll(".raridades-bar button").forEach(btn => {
        btn.classList.remove("active");
    });

    document.querySelector('.raridades-bar button[value="all"]').classList.add("active");

    // 🔥 RESET PAGINA
    currentPage = 0;

    updatePagination();
});
/*-----Efeito de folhear a pagina de herois-----*/
let currentPage = 0;
const itemsPerPage = 6;

function updatePagination() {
    const cards = getCards();

    // 🔥 filtra primeiro
    const filteredCards = getFilteredCards();

    // 🔥 REORGANIZA NO DOM (ESSENCIAL PRA SORT FUNCIONAR)
    filteredCards.forEach(card => grid.appendChild(card));

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    // 🔥 esconde tudo primeiro
    cards.forEach(card => card.style.display = "none");

    // 🔥 mostra apenas os filtrados + paginados
    filteredCards.forEach((card, index) => {
        if (index >= start && index < end) {
            card.style.display = "block";
        }
    });

    // 🔥 controle botões
    prevBtn.style.display = currentPage === 0 ? "none" : "inline-block";

    const maxPage = Math.max(0, Math.ceil(filteredCards.length / itemsPerPage) - 1);

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    // -----VOLTAR (correto, só aparece se saiu da página 0)
    prevBtn.style.display = currentPage > 0 ? "inline-block" : "none";

    // -----PRÓXIMO (aqui está a correção REAL)
    nextBtn.style.display = filteredCards.length > itemsPerPage
        ? (currentPage < maxPage ? "inline-block" : "none")
        : "inline-block";

}

/*-----botao proximo e voltar-----*/

document.getElementById("nextBtn").addEventListener("click", () => {

    const filteredCards = getFilteredCards();

    if ((currentPage + 1) * itemsPerPage < filteredCards.length) {
        currentPage++;
        updatePagination();
    }
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updatePagination();
    }
});
function getFilteredCards() {
    const cards = getCards();

    const searchValue = document.getElementById("searchName").value.toLowerCase();
    const raritySelect = document.getElementById("filterRarity").value;
    const editionValue = document.getElementById("filterEdition").value.toLowerCase();
    const teamValue = document.getElementById("filterTeam").value.toLowerCase();
    const pointValue = document.getElementById("point").value;
    const coinValue = document.getElementById("dialcoin").value;
    const sortOrder = document.getElementById("sortOrder").value;

    let filtered = Array.from(cards).filter(card => {

        const name = card.dataset.name;
        const price = parseInt(card.dataset.value);

        if (searchValue && !name.includes(searchValue)) return false;

        if (raritySelect !== "all" && !card.classList.contains(raritySelect)) return false;

        if (currentFilter !== "all" && !card.classList.contains(currentFilter)) return false;

        if (editionValue) {
            const editions = (card.dataset.edition || "")
                .split(",")
                .map(e => e.trim().toLowerCase());

            if (!editions.includes(editionValue)) return false;
        }

        if (teamValue) {
            const teams = (card.dataset.team || "")
                .split(",")
                .map(t => t.trim().toLowerCase());

            if (!teams.includes(teamValue)) return false;
        }

        if (pointValue && price !== parseInt(pointValue)) return false;

        if (coinValue && price !== parseInt(coinValue)) return false;

        return true;
    });

    // 🔥 ORDENAÇÃO (NO LUGAR CERTO)
    if (sortOrder === "az") {
        filtered.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name, 'pt-BR'));
    }

    if (sortOrder === "za") {
        filtered.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name, 'pt-BR'));
    }
    if (sortOrder === "low") {
        filtered.sort((a, b) => parseInt(a.dataset.value) - parseInt(b.dataset.value));
    }

    if (sortOrder === "high") {
        filtered.sort((a, b) => parseInt(b.dataset.value) - parseInt(a.dataset.value));
    }

    return filtered;
}

/*-----poderes e valores------ */

const dialData = [
    {
        row: "attack",
        cells: [
            { value: 9, color: "red", power: "Super Strength" },
            { value: 9, color: "red", power: "Super Strength" },
            { value: 8, color: "orange", power: "Blast" },
            { value: 7, color: "yellow", power: "Precision Strike" }
        ]
    },
    {
        row: "defense",
        cells: [
            { value: 18, color: "blue", power: "Invincible" },
            { value: 17, color: "green", power: "Toughness" }
        ]
    }
];
const overlay = document.getElementById("dialOverlay");

function renderDial(data) {

    overlay.innerHTML = ""; // limpa tudo

    data.forEach((rowData, rowIndex) => {

        const row = document.createElement("div");
        row.classList.add("dial-row", `row-${rowData.row}`);

        rowData.cells.forEach((cellData, colIndex) => {

            const cell = document.createElement("div");
            cell.classList.add("dial-cell");

            // valor visível
            cell.innerText = cellData.value;

            // cor
            cell.style.background = cellData.color;

            // tooltip
            cell.dataset.power = cellData.power;

            // posição proporcional
            cell.style.left = `${colIndex * 8}%`;

            // 🔥 MODO ADMIN
            if (isAdminMode) {
                cell.addEventListener("click", () => editCell(cell, cellData));
            }

            row.appendChild(cell);
        });

        overlay.appendChild(row);
    });
}
/*-----modo admin cadastro personagens-----*/
let isAdminMode = false; // depois vem do login

function editCell(cell, data) {

    const newValue = prompt("Novo valor:", data.value);
    const newColor = prompt("Nova cor:", data.color);
    const newPower = prompt("Novo poder:", data.power);

    if (newValue) data.value = newValue;
    if (newColor) data.color = newColor;
    if (newPower) data.power = newPower;

    renderDial(dialData);
}

/*-----Loja passa a ler LOCALSTORAGE-----*/
const localChars = JSON.parse(localStorage.getItem("characters")) || [];

const allCharacters = [...characters, ...localChars];

/*renderizar novos cards*/
const container = document.getElementById("charactersContainer");

const characters = JSON.parse(localStorage.getItem("characters")) || [];

characters.forEach(char => {

    const card = document.createElement("div");

    card.innerHTML = `
        <img src="${char.image}" width="150">
        <h3>${char.name}</h3>
        <p>${char.points} pts</p>
    `;

    container.appendChild(card);
});