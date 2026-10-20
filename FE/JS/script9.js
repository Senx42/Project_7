let name = prompt("Введіть своє ім'я:")?.trim();
if (!name) {
    name = "Гравець 1";
}
document.getElementById("name1").textContent = name;
const cards = [
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "В", value: 2 },
    { name: "Д", value: 3 },
    { name: "К", value: 4 },
    { name: "Т", value: 1 }
];
const suits = ["♥", "♦", "♣", "♠"];
let score1 = 0;
let score2 = 0;
let round = 0;
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const result = document.getElementById("result");
const play = document.getElementById("play");
play.onclick = function () {
    const a = cards[Math.floor(Math.random() * cards.length)];
    const b = cards[Math.floor(Math.random() * cards.length)];
    const suit1 = suits[Math.floor(Math.random() * suits.length)];
    const suit2 = suits[Math.floor(Math.random() * suits.length)];
    card1.textContent = a.name + suit1;
    card2.textContent = b.name + suit2;
    card1.className = "card" + (suit1 === "♣" || suit1 === "♠" ? " black" : "");
    card2.className = "card" + (suit2 === "♣" || suit2 === "♠" ? " black" : "");
    score1 += a.value;
    score2 += b.value;
    round++;
    document.getElementById("score1").textContent = `Очки: ${score1}`;
    document.getElementById("score2").textContent = `Очки: ${score2}`;
    document.getElementById("round").textContent = `Раунд: ${round} / 3`;
    if (a.value > b.value) {
        result.textContent = `Раунд виграв ${name}!`;
    } else if (b.value > a.value) {
        result.textContent = "Раунд виграв комп'ютер!";
    } else {
        result.textContent = "Нічия в раунді!";
    }
    if (round === 3) {
        play.disabled = true;
        if (score1 > score2) {
            result.textContent =
                `${name} переміг! ${score1} : ${score2}`;
        } else if (score2 > score1) {
            result.textContent =
                `Комп'ютер переміг! ${score2} : ${score1}`;
        } else {
            result.textContent =
                `Нічия! Рахунок ${score1} : ${score2}`;
        }
    }
};
document.getElementById("restart").onclick = function () {
    score1 = 0;
    score2 = 0;
    round = 0;
    card1.textContent = "?";
    card2.textContent = "?";
    card1.className = "card";
    card2.className = "card";
    document.getElementById("score1").textContent = "Очки: 0";
    document.getElementById("score2").textContent = "Очки: 0";
    document.getElementById("round").textContent = "Раунд: 0 / 3";
    result.textContent = "Натисни кнопку, щоб витягнути карти!";
    play.disabled = false;
};