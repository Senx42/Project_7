function showAlert() {
    alert("21 варіант, Под'ячев Іван Денисович");
}
showAlert();

function Numbers() {
let N = 21;
let a = 4*N-13;
let b = 2*N-6;
let add = a + b;
let sub = a - b;
let mul = a * b;
let div = a / b;
let mod = a % b; 
let ink = a++;
let dek = b--;
document.write("Number a = " + a + "<br>");
document.write("Number b = " + b + "<br>");
document.write("Addition = " + add + "<br>");
document.write("Subtraction = " + sub + "<br>");
document.write("Multiplication = " + mul + "<br>");
document.write("Division = " + div + "<br>");
document.write("Modulus = " + mod + "<br>");
document.write("Increment = " + ink + "<br>");
document.write("Decrement = " + dek + "<br>");
}