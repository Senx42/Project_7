let name = prompt("Введіть своє ім'я:");
document.getElementById("player").textContent = "Гравець: " + (name || "Гість");
let images = [
    { name: "Merkava Tank", src: "../Photo/Merkava.jpg", chance: 3, reward: 10000 },
    { name: "Benjamin Netanyahu", src: "../Photo/Benjamin.jpg", chance: 1, reward: 100000 },
    { name: "David Star", src: "../Photo/David.png", chance: 2, reward: 50000 },
    { name: "Israel", src: "../Photo/Israel.jpg", chance: 15, reward: 2000 },
    { name: "F-35", src: "../Photo/F-35.jpg", chance: 3, reward: 25000 },
    { name: "Hanuka", src: "../Photo/Hanuka.jpg", chance: 15, reward: 500 },
    { name: "Shekel", src: "../Photo/Shekel.jpg", chance: 15, reward: 250 },
    { name: "Tora", src: "../Photo/Torah.png", chance: 15, reward: 400 },
    { name: "IDF", src: "../Photo/IDF.webp", chance: 3, reward: 5000 }
];
let money = 7000;
let spinPrice = 200;
let spinning = false;
let game = document.getElementById("game");
let result = document.getElementById("result");
let balance = document.getElementById("money");
let button = document.getElementById("spin");
let cells = [];
let jackpotImage = images.find(image => image.name === "Benjamin Netanyahu");
function updateBalance() {
    balance.textContent = money.toLocaleString("uk-UA");
}
function showJackpot() {
    document.getElementById("jackpot").style.display = "flex";
}
function showPlaceholder(cell) {
    cell.innerHTML = '<img src="../Photo/Placeholder.png" alt="Placeholder" class="placeholder">';
}
function showImage(cell, image) {
    cell.innerHTML = "";
    let img = document.createElement("img");
    img.src = image.src;
    img.alt = image.name;
    cell.appendChild(img);
}
for (let row = 0; row < 3; row++) {
    cells[row] = [];
    for (let column = 0; column < 3; column++) {
        let cell = document.createElement("div");
        cell.className = "slot-cell";
        showPlaceholder(cell);
        cells[row][column] = cell;
        game.appendChild(cell);
    }
}
function weightedRandom(excluded = []) {
    let available = images.filter(image => !excluded.includes(image.name));
    let totalChance = available.reduce((sum, image) => sum + image.chance, 0);
    let random = Math.random() * totalChance;
    for (let image of available) {
        random -= image.chance;
        if (random < 0) return image;
    }
    return available[available.length - 1];
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function createResult() {
    let slots = [[], [], []];
    let winningImage = Math.random() < 0.2 ? weightedRandom() : null;
    let winningRow = Math.floor(Math.random() * 3);
    for (let column = 0; column < 3; column++) {
        let usedImages = winningImage ? [winningImage.name] : [];
        for (let row = 0; row < 3; row++) {
            if (row === winningRow && winningImage) {
                slots[row][column] = winningImage;
            } else {
                let image = weightedRandom(usedImages);
                slots[row][column] = image;
                usedImages.push(image.name);
            }
        }
    }
    return slots;
}
async function animateSlots(slots) {
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            showPlaceholder(cells[row][column]);
        }
    }
    for (let column = 0; column < 3; column++) {
        for (let row = 0; row < 3; row++) {
            cells[row][column].classList.add("spinning");
        }
        await sleep(300);
        for (let row = 0; row < 3; row++) {
            cells[row][column].classList.remove("spinning");
            showImage(cells[row][column], slots[row][column]);
        }
        await sleep(300);
    }
}
async function spin() {
    if (spinning || money < spinPrice) return;
    spinning = true;
    button.disabled = true;
    money -= spinPrice;
    updateBalance();
    result.textContent = "Крутіння...";
    let slots = createResult();
    await animateSlots(slots);
    let totalReward = 0;
    let winningImages = [];
    for (let row = 0; row < 3; row++) {
        if (slots[row][0].name === slots[row][1].name &&
            slots[row][1].name === slots[row][2].name) {
            let image = slots[row][0];
            totalReward += image.reward;
            winningImages.push(image.name + " (+" + image.reward.toLocaleString("uk-UA") + " ₪)");
        }
    }
    money += totalReward;
    updateBalance();
    result.textContent = totalReward
        ? "Перемога! Переможні комбінації: " + winningImages.join(", ")
        : "Невдача! Спробуйте ще раз.";
    if (money < spinPrice) result.textContent += " Недостатньо шекелів!";
if (slots.some(row => row.every(image => image.name === jackpotImage.name))) {
    showJackpot();
}
    spinning = false;
    button.disabled = money < spinPrice;
}
async function secretJackpot() {
    if (spinning || money < spinPrice) return;
    spinning = true;
    button.disabled = true;
    money -= spinPrice;
    updateBalance();
    result.textContent = "SECRET JACKPOT!";
    await animateSlots([
        [jackpotImage, jackpotImage, jackpotImage],
        [jackpotImage, jackpotImage, jackpotImage],
        [jackpotImage, jackpotImage, jackpotImage]
    ]);
    money += jackpotImage.reward;
    updateBalance();
    result.textContent = "SECRET JACKPOT! +100 000 ₪";
    showJackpot();
    spinning = false;
    button.disabled = money < spinPrice;
}
function closeJackpot() {
    document.getElementById("jackpot").style.display = "none";
}
document.addEventListener("keydown", function(event) {
    if (event.key === "F9") secretButton.hidden = false;
});
let pressTimer;
let gameTitle = document.getElementById("gameTitle");
let secretButton = document.getElementById("secretSpin");
gameTitle.addEventListener("touchstart", function() {
    pressTimer = setTimeout(() => secretButton.hidden = false, 1500);
});
gameTitle.addEventListener("touchend", () => clearTimeout(pressTimer));
gameTitle.addEventListener("touchmove", () => clearTimeout(pressTimer));
gameTitle.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    secretButton.hidden = false;
});