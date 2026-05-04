const teamInput = document.getElementById("team");
const targetContainer = document.getElementById("targetContainer");

const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");

const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const pointsInput = document.getElementById("points");

const moveContainer = document.getElementById("moveContainer");
const attackContainer = document.getElementById("attackContainer");
const defenseContainer = document.getElementById("defenseContainer");
const damageContainer = document.getElementById("damageContainer");

const clicksSelector = document.getElementById("clicksSelector");
const addCharacter = document.getElementById("addCharacter");

const editorPanel = document.getElementById("editorPanel");
const powerOptions = document.getElementById("powerOptions");
const cellValueInput = document.getElementById("cellValue");
const saveCellBtn = document.getElementById("saveCell");

let currentCell = null;
let currentType = null;
let selectedPower = null;

let selectedClicks = 0;

/* IMAGEM */
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        if (previewImage) previewImage.src = reader.result;
    };

    reader.readAsDataURL(file);
});

/* BOTÕES DE CLIQUE (1 a 24) */
for (let i = 1; i <= 24; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("click-btn");

    btn.addEventListener("click", () => {
        selectedClicks = i;

        document.querySelectorAll(".click-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        createDial(moveContainer, i);
        createDial(attackContainer, i);
        createDial(defenseContainer, i);
        createDial(damageContainer, i);
    });

    clicksSelector.appendChild(btn);
}

/* CRIAR DIAL */
function createDial(container, clicks) {
    container.innerHTML = "";

    for (let i = 0; i < clicks + 1; i++) // +1 pro slot especial

        if (i === 0) {
            cell.innerText = "⚙️"; // slot especial
            cell.classList.add("ability-slot");

            cell.addEventListener("click", () => {
                openIconSelector(container.id.replace("Container", ""));
            });

        } else {
            cell.innerText = "?";

            cell.addEventListener("click", () => {
                currentCell = cell;
                currentType = container.id.replace("Container", "");

                selectedPower = null;

                editorPanel.classList.remove("hidden");
                loadPowerOptions(currentType);

                cellValueInput.value = "";
            });
        }
    addCharacter.addEventListener("click", () => {

        let size;

        if (selectedClicks <= 12) size = "1x1";
        else if (selectedClicks <= 24) size = "2x2";
        else size = "3x6";

        const newCharacter = {
            name: nameInput.value,
            number: numberInput.value,
            points: pointsInput.value,
            clicks: selectedClicks,
            size: size,
            image: previewImage ? previewImage.src : null,
            abilities: selectedAbilities,
            dial: {
                move: getDialData(moveContainer),
                attack: getDialData(attackContainer),
                defense: getDialData(defenseContainer),
                damage: getDialData(damageContainer)
            }
        };

        let saved = JSON.parse(localStorage.getItem("characters")) || [];

        saved.push(newCharacter);

        localStorage.setItem("characters", JSON.stringify(saved));

        alert("Personagem criado com sucesso!");
    });
    /*poderes*/
    const powers = {
        move: [
            { name: "FURRY", color: "red", desc: "Realize até dois ataques corpo a corpo" },
            { name: "LEAP/CLIMB", color: "orange", desc: "pode subir terrenos elevados" },
            { name: "PHASING/TELEPORT", color: "yellow", desc: "pode se teleportas a quantidade de quadrados de movimento ignorando terrenos bloqueadores, elevados" },
            { name: "EARTHBOUND/NEUTRALIZED", color: "lightgreen", desc: "Move até 2 quadrados grátis" },
            { name: "CHARGE", color: "green", desc: "ande a metade de quadrados maximos que você pode andar e realize um ataque corpo a corpo" },
            { name: "MIND CONTROL", color: "lightblue", desc: " CORPO A CORPO/À DISTÂNCIA: Alcance mínimo 4. Faça um ataque CORPO A CORPO/À DISTÂNCIA. Em vez de dano normal, cada personagem atingido tem sua velocidade reduzida pela metade e se torna aliado da sua força e, um de cada vez, pode, em qualquer ordem: Moverse e/ou realizar um ataque, depois volta para outro jogador." },
            { name: "PLASTICITY", color: "blue", desc: " Este personagem se separa em qualquer resultado, exceto um [1]. Personagens oponentes adjacentes que não podem usar Faseamento/Teletransporte, Plasticidade, Salto/Escalada ou Velocidade Hipersônica só se separam em um." },
            { name: "FORCE BLAST", color: "purple", desc: "Alcance mínimo 4. Repulsa um personagem oponente dentro do alcance e da linha de visão a 3 quadrados de distância deste personagem." },
            { name: "SIDESTEP", color: "lightpink", desc: " LIVRE: Mova-se até 2 casas." },
            { name: "HYPERSONIC SPEED", color: "brown", desc: "Reduz a autonomia pela metade (Para esta ação, este personagem tem seu alcance reduzido pela metade, não pode carregar nada e pode se mover através de quadrados ocupados por ou adjacentes a um personagem oponente sem parar. Ele ainda precisa se desvencilhar). Mova-se, depois faça um ataque e, em seguida, mova-se até o valor da sua velocidade menos o número de quadrados que você acabou de percorrer." },
            { name: "STEALTH", color: "black", desc: "Quando não for sua vez, as linhas de fogo obstruídas desenhadas para este personagem por personagens não adjacentes são bloqueados." },
            { name: "RUNNING SHOT", color: "gray", desc: "ande a metade de quadrados maximos que pode andar e realize um ataque a distancia." },
            { name: "POWER SPECIAL", color: "white", desc: "abrir uma caixa para escrever a descrição do poder!." }
        ],
        attack: [
            { name: "Blades/Claws/Fangs", color: "red", desc: "Dano baseado em d6" },
            { name: "Energy Explosion", color: "orange", desc: "Dano em área (2 fixo)" },
            { name: "Pulse Wave", color: "pink", desc: "Ignora poderes, dano 1" }
        ],
        defense: [
            { name: "Toughness", color: "brown", desc: "Reduz dano em 1" },
            { name: "Invincible", color: "gray", desc: "Reduz dano em 2" },
            { name: "Super Senses", color: "blue", desc: "Chance de evitar ataque" }
        ],
        damage: [
            { name: "Outwit", color: "purple", desc: "Remove poder inimigo" },
            { name: "Probability Control", color: "blue", desc: "Rerrolar dado" },
            { name: "Perplex", color: "brown", desc: "Modifica atributos +1/-1" }
        ]
    };

    /*visual*/
    function loadPowerOptions(type) {

        powerOptions.innerHTML = "";

        powers[type].forEach(power => {

            const div = document.createElement("div");
            div.classList.add("power-option");

            const colorBox = document.createElement("div");
            colorBox.classList.add("power-color");
            colorBox.style.background = power.color;

            const label = document.createElement("span");
            label.innerText = power.name;

            div.appendChild(colorBox);
            div.appendChild(label);

            div.title = power.desc;

            div.addEventListener("click", () => {

                document.querySelectorAll(".power-option")
                    .forEach(el => el.classList.remove("active"));

                div.classList.add("active");

                selectedPower = power;

                // 🔥 REGRA DO BRANCO
                if (power.color === "white") {
                    specialPowerContainer.classList.remove("hidden");
                } else {
                    specialPowerInput.value = "";
                    specialPowerContainer.classList.add("hidden");

                }
            });

            powerOptions.appendChild(div);
        });
    }

    /*salvar*/
    saveCellBtn.addEventListener("click", () => {

        if (!currentCell || !selectedPower) return;

        currentCell.innerText = cellValueInput.value;
        currentCell.style.background = selectedPower.color;

        let powerName = selectedPower.name;
        let powerDesc = selectedPower.desc;

        // 🔥 SE FOR BRANCO
        if (selectedPower.color === "white") {
            powerDesc = specialPowerInput.value || "Poder especial";
        }

        currentCell.dataset.power = powerName;
        currentCell.dataset.special = powerDesc;

        currentCell.setAttribute("title", powerName + " - " + powerDesc);

        editorPanel.classList.add("hidden");

        selectedPower = null;

    });
    /*habilidades de movimento, ataque, defesa, dano*/
    const iconPanel = document.getElementById("iconPanel");
    const iconOptions = document.getElementById("iconOptions");
    const saveIconBtn = document.getElementById("saveIcon");

    let currentAbilityType = null;
    let selectedIcon = null;

    const selectedAbilities = {
        move: null,
        attack: null,
        defense: null,
        damage: null
    };
    function getDialData(container) {
        const data = [];

        container.querySelectorAll(".dial-cell").forEach(cell => {
            data.push({
                value: cell.innerText,
                color: cell.style.background,
                power: cell.dataset.power || null,
                special: cell.dataset.special || null
            });
        });

        return data;
    }


    const abilities = {
        move: [
            {
                name: "Andar",
                icon: "../assets/icons/move/andar.png",
                desc: "movimento padrão, tem que subir por escadas"
            },
            {
                name: "Nadar",
                icon: "../assets/icons/move/nadar.png",
                desc: "Se este personagem ocupar terreno aquático, ele não poderá ser alvo de personagens oponentes, a menos que estejam a 4 quadrados de distância."
            },
            {
                name: "Voar",
                icon: "../assets/icons/move/voar.png",
                desc: "Movimento padrão"
            },
        ],

        attack: [
            {
                name: "Range",
                icon: "../assets/icons/attack/range.png",
                desc: "Ataque à distância"
            }
        ],

        defense: [
            {
                name: "Evasion",
                icon: "../assets/icons/defense/evasion.png",
                desc: "Chance de evitar ataques"
            }
        ],

        damage: [
            {
                name: "Penetrating",
                icon: "../assets/icons/damage/penetrating.png",
                desc: "Ignora redução de dano"
            }
        ]
    };

    function openIconSelector(type) {
        currentAbilityType = type;
        selectedIcon = null;

        iconOptions.innerHTML = "";

        abilities[type].forEach(icon => {

            const div = document.createElement("div");
            div.classList.add("power-option");

            const img = document.createElement("img");
            img.src = icon.icon;
            img.style.width = "40px";

            div.appendChild(img);

            div.title = icon.name + " - " + icon.desc;

            div.addEventListener("click", () => {

                document.querySelectorAll("#iconOptions .power-option")
                    .forEach(el => el.classList.remove("active"));

                div.classList.add("active");

                selectedIcon = icon;
            });

            iconOptions.appendChild(div);
        });

        iconPanel.classList.remove("hidden");
    }

    document.getElementById("moveAbility").onclick = () => openIconSelector("move");
    document.getElementById("attackAbility").onclick = () => openIconSelector("attack");
    document.getElementById("defenseAbility").onclick = () => openIconSelector("defense");
    document.getElementById("damageAbility").onclick = () => openIconSelector("damage");

    /*salvar icones de habilidades*/
    saveIconBtn.addEventListener("click", () => {

        if (!selectedIcon) return;

        selectedAbilities[currentAbilityType] = selectedIcon;

        const box = document.getElementById(currentAbilityType + "Ability");
        const preview = box.querySelector(".selected-icon");

        preview.innerHTML = `<img src="${selectedIcon.icon}">`;

        box.setAttribute("title", selectedIcon.name + " - " + selectedIcon.desc);

        iconPanel.classList.add("hidden");
    });
}