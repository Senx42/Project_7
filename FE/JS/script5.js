var array = Array(10);
for (var i = 0; i < 10; i++) {
    array[i] = Math.floor(Math.random() * 10) + 1;
}
var element = Math.floor(Math.random() * 10)+1;
function getElement() {
    var i = 0;

    while (i < array.length && array[i] != element) {
        i++;
    }

    if (i < array.length)
        return "Знайден";
    else
        return "Не знайден";
}
document.getElementById("container").innerHTML += "<h4>Масив: [" + array.join(", ") + "]</h4>";
document.getElementById("container").innerHTML += "<h4>Елемент зі значенням " + element + ": " + getElement() + "</h4>";