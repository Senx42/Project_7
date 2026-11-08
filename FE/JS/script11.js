document.addEventListener("DOMContentLoaded", function () {
    const words = [
        { word: '<ruby>水<rt>すい</rt></ruby><ruby>族<rt>ぞく</rt></ruby><ruby>館<rt>かん</rt></ruby>', translation: "акваріум" },
        { word: '<ruby>石<rt>いし</rt></ruby>', translation: "камінь" },
        { word: '<ruby>魚<rt>ぎょ</rt></ruby><ruby>介<rt>かい</rt></ruby><ruby>類<rt>るい</rt></ruby>', translation: "морепродукти" },
        { word: '<ruby>雑<rt>ざっ</rt></ruby><ruby>誌<rt>し</rt></ruby>', translation: "журнал" },
        { word: '<ruby>助<rt>たす</rt></ruby>ける', translation: "допомагати" },
        { word: '<ruby>物<rt>ぶつ</rt></ruby><ruby>理<rt>り</rt></ruby><ruby>学<rt>がく</rt></ruby>', translation: "фізика" },
        { word: "プリンター", translation: "принтер" },
        { word: '<ruby>電<rt>でん</rt></ruby><ruby>話<rt>わ</rt></ruby>', translation: "телефон" },
        { word: '<ruby>腕<rt>うで</rt></ruby><ruby>時<rt>じ</rt></ruby><ruby>計<rt>けい</rt></ruby>', translation: "наручний годинник" },
        { word: '<ruby>卍<rt>ばん</rt></ruby><ruby>解<rt>かい</rt></ruby>', translation: "банкай" }
    ];
    let shuffledWords = [];
    let currentStep = 0;
    let correct = 0;
    let incorrect = 0;
    const wordElement = document.getElementById("word");
    const translationInput = document.getElementById("translation");
    const currentElement = document.getElementById("current");
    const totalElement = document.getElementById("total");
    const correctElement = document.getElementById("correct");
    const incorrectElement = document.getElementById("incorrect");
    const messageElement = document.getElementById("message");
    const cardElement = document.getElementById("card");
    const modalElement = document.getElementById("resultModal");
    function shuffleWords() {
        shuffledWords = [...words];
        shuffledWords.sort(() => Math.random() - 0.5);
    }
    function showWord() {
        if (currentStep >= shuffledWords.length) {
            showResults();
            return;
        }
        wordElement.innerHTML = shuffledWords[currentStep].word;
        currentElement.textContent = currentStep + 1;
        totalElement.textContent = shuffledWords.length;
        translationInput.value = "";
        messageElement.textContent = "";
    }
    function checkAnswer() {
        let answer = translationInput.value.trim().toLowerCase();
        if (answer === "") {
            messageElement.textContent = "Введіть переклад слова!";
            return;
        }
        let correctAnswer = shuffledWords[currentStep].translation.toLowerCase();
        if (answer === correctAnswer) {
            correct++;
            messageElement.style.color = "green";
            messageElement.textContent = "Правильно!";
        } else {
            incorrect++;
            messageElement.style.color = "red";
            messageElement.textContent = "Неправильно! Правильна відповідь: " + shuffledWords[currentStep].translation;
        }
        correctElement.textContent = correct;
        incorrectElement.textContent = incorrect;
        currentStep++;
        setTimeout(showWord, 1000);
    }
    function showResults() {
        let percentage = (correct / words.length) * 100;
        let knowledgeLevel;
        if (percentage >= 90) {
            knowledgeLevel = "Відмінний рівень!";
        } else if (percentage >= 70) {
            knowledgeLevel = "Добрий рівень!";
        } else if (percentage >= 50) {
            knowledgeLevel = "Середній рівень!";
        } else {
            knowledgeLevel = "Потрібно більше практики!";
        }
        document.getElementById("result").textContent = "Правильно: " + correct + " | Неправильно: " + incorrect;
        document.getElementById("level").textContent = "Рівень знань: " + knowledgeLevel;
        modalElement.style.display = "flex";
    }
    function restart() {
        currentStep = 0;
        correct = 0;
        incorrect = 0;
        correctElement.textContent = 0;
        incorrectElement.textContent = 0;
        modalElement.style.display = "none";
        shuffleWords();
        showWord();
    }
    function handleCheck(event) {
        if (event.target === translationInput || event.target.closest("button")) {
            return;
        }
        if (currentStep < shuffledWords.length) {
            checkAnswer();
        }
    }
    cardElement.addEventListener("click", handleCheck);
    document.getElementById("check").addEventListener("click", checkAnswer);
    translationInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
    document.getElementById("restart").addEventListener("click", restart);
    shuffleWords();
    showWord();
});