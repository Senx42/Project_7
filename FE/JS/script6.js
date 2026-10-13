let string = "Манго — плоди манго індійського (Mangifera indica), рослини роду Манго родини сумахових. Плоди мають волокнисту структуру та солодкий смак, шкірка забарвлена ​​в тони червоного, зеленого або жовтого кольорів, у м'якоті колір жовтий або помаранчевий.";
let count1 = 0;
let count2 = 0;
for (let i = 0; i < string.length; i++) {
    if (string[i] == "а") {
        count1++;
    }

    if (string[i] == "о") {
        count2++;
    }
}
document.getElementById("container").innerHTML += "<h4>Рядок: " + string + "</h4>";
document.getElementById("container").innerHTML +=
    count1 > count2 ? "Букв 'а' більше: true<br>Букв 'о' більше: false" :
    count1 < count2 ? "Букв 'о' більше: true<br>Букв 'а' більше: false" :
    "Кількість букв 'а' та 'о' однакова";