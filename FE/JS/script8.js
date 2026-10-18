let name = prompt("Введіть своє ім'я:")?.trim();
if (!name) {
    name = "Гравець";
}
document.getElementById("name1").textContent = name;
document.getElementById("name2").textContent = "Комп'ютер";
let score1 = 0;
let score2 = 0;
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const result = document.getElementById("result");
const play = document.getElementById("play");
play.onclick = function () {
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    number1.textContent = a;
    number2.textContent = b;
    if (a > b) {
        score1++;
        result.textContent = `1 бал для ${name}!`;
    } else if (b > a) {
        score2++;
        result.textContent = "1 бал для комп'ютера!";
    } else {
        result.textContent = "Нічия! Бали не нараховуються.";
    }
    document.getElementById("score1").textContent = `Кількість балів: ${score1}`;
    document.getElementById("score2").textContent = `Кількість балів: ${score2}`;
    if (score1 === 3 || score2 === 3) {
        result.textContent = score1 === 3
            ? `${name} переміг у грі! 🏆`
            : "Комп'ютер переміг у грі! 🤖";
        play.disabled = true;
    }
};
document.getElementById("restart").onclick = function () {
    score1 = 0;
    score2 = 0;
    number1.textContent = "?";
    number2.textContent = "?";
    document.getElementById("score1").textContent = "Кількість балів: 0";
    document.getElementById("score2").textContent = "Кількість балів: 0";
    result.textContent = "Гра починається знову!";
    play.disabled = false;
};