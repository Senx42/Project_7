const style = document.createElement("style");
style.textContent = `
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        min-height: 100vh;
        padding: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: radial-gradient(ellipse, #101a20, #020711);
        font-family: Arial, sans-serif;
        color: white;
    }
    .frame {
        width: min(100%, 560px);
        min-height: min(90vh, 650px);
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        background: #050b20;
        border: 2px solid transparent;
        border-image: linear-gradient(135deg, #e72343, #d400ff) 1;
    }
    .question {
        width: 100%;
        padding: 10px 18px;
        border: none;
        border-radius: 30px;
        outline: none;
        background: #efddff;
        color: #111;
        text-align: center;
        font-size: clamp(16px, 4vw, 23px);
    }
    .question:focus {
        box-shadow: 0 0 0 3px #bd8cff;
    }
    .error {
        margin: -16px 0 0;
        color: #ff9cce;
        font-size: 14px;
        text-align: center;
    }
       .orb {
        width: min(100%, 460px);
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 5px solid #222;
        cursor: pointer;
        background-color: #111;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: 0 0 25px 8px orange;
        transition: transform 0.3s;
    }
    .orb:hover {
        transform: scale(1.025);
    }
    .orb:focus-visible {
        outline: 3px solid white;
    }
    .answer {
        max-width: 85%;
        padding: 10px 18px;
        color: white;
        font-size: clamp(23px, 6vw, 34px);
        text-align: center;
        text-shadow: 0 0 5px blue;
        overflow-wrap: anywhere;
    }
    .hint {
        margin: 0;
        color: #c9cde5;
        text-align: center;
        font-size: 14px;
    }
    @media (max-width: 420px) {
        body {
            padding: 8px;
        }
        .frame {
            padding: 18px 12px;
            gap: 20px;
            min-height: 80vh;
        }
        .orb {
            width: min(100%, 360px);
        }
    }
    @media (max-height: 540px) {
        body {
            align-items: flex-start;
        }
        .frame {
            min-height: auto;
        }
        .orb {
            width: min(65vw, 340px);
        }
    }
`;
document.head.appendChild(style);
const frame = document.createElement("main");
frame.className = "frame";
const question = document.createElement("input");
question.className = "question";
question.type = "text";
question.placeholder = "Чи отримаю я 5 по Frontend?";
question.value = "Чи отримаю я 5 по Frontend?";
question.maxLength = 120;
question.setAttribute("aria-label", "Ваше запитання");
const error = document.createElement("p");
error.className = "error";
error.setAttribute("role", "alert");
error.hidden = true;
const orb = document.createElement("div");
orb.className = "orb";
orb.tabIndex = 0;
orb.setAttribute("role", "button");
orb.setAttribute("aria-label", "Отримати відповідь магічної кулі");
const answer = document.createElement("div");
answer.className = "answer";
answer.textContent = "Натисни на кулю";
orb.appendChild(answer);
const hint = document.createElement("p");
hint.className = "hint";
hint.textContent = "Введи запитання та натисни на кулю";
frame.append(question, error, orb, hint);
document.body.appendChild(frame);
const answers = [
    "Так, без сумніву!",
    "Так",
    "Дуже ймовірно",
    "Зірки кажуть: так",
    "Можливо",
    "Важко сказати",
    "Спробуй пізніше",
    "Не варто на це розраховувати",
    "Скоріше ні",
    "Ні"
];
const orbGifs = [
    "../Photo/Kurumi (2).gif",
    "../Photo/Kurumi (3).gif",
    "../Photo/Kurumi (5).gif",
];
let currentGif = -1;
function changeGif() {
    let newGif;
    do {
        newGif = Math.floor(Math.random() * orbGifs.length);
    } while (orbGifs.length > 1 && newGif === currentGif);

    currentGif = newGif;
    orb.style.backgroundImage = `url("${orbGifs[currentGif]}")`;
}
changeGif();
function getAnswer() {
    changeGif();
    const text = question.value.trim();
    if (text.length === 0) {
        error.textContent = "Введи запитання!";
        error.hidden = false;
        question.focus();
        return;
    }
    if (text.length < 5) {
        error.textContent =
            "Запитання має містити щонайменше 5 символів.";
        error.hidden = false;
        question.focus();
        return;
    }
if (!text.includes("?")) {
    error.textContent =
        "Запитання повинно закінчуватися знаком питання.";
    error.hidden = false;
    answer.textContent = "Помилка";
    question.focus();
    return;
}
    error.hidden = true;
    answer.textContent = "Думаю...";
    orb.style.transform = "scale(0.97)";
    setTimeout(() => {
        const index = Math.floor(Math.random() * answers.length);
        answer.textContent = answers[index];
        orb.style.transform = "";
    }, 500);
}
orb.addEventListener("click", getAnswer);
orb.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        getAnswer();
    }
});
question.addEventListener("input", () => {
    error.hidden = true;
});