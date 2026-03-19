const itemsSelect = document.getElementById("itemsPerPage");
const cards = document.querySelectorAll(".character-card");

let visibleCount = 20; // padrão

function updateVisibleCharacters() {

    cards.forEach((card, index) => {

        if (index < visibleCount) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}

// inicializa
updateVisibleCharacters();

// muda quantidade
itemsSelect.addEventListener("change", () => {

    visibleCount = Number(itemsSelect.value);
    updateVisibleCharacters();

});