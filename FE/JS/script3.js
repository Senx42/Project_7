function f(x) {
    return Math.sqrt(Math.pow(Math.sin(x), 2) + 0.5);
}
function calculate() {
    const a = Number(document.getElementById('startX').value);
    const b = Number(document.getElementById('endX').value);
    const h = Number(document.getElementById('stepH').value);
    let For = [];
    for (let x = a; x <= b + h/10; x += h) {
        For.push({ x: Number(x.toFixed(3)), y: Number(f(x).toFixed(5)) });
    }
    let While = [];
    let x1 = a;
    while (x1 <= b + h/10) {
        While.push({ x: Number(x1.toFixed(3)), y: Number(f(x1).toFixed(5)) });
        x1 += h;
    }
    let DoWhile = [];
    let x2 = a;
    if (x2 <= b) {
        do {
            DoWhile.push({ x: Number(x2.toFixed(3)), y: Number(f(x2).toFixed(5)) });
            x2 += h;
        } while (x2 <= b + h/10);
    }
fillTable('tFor', For);
fillTable('tWhile', While);
fillTable('tDoWhile', DoWhile);
drawChart(For);
}
function fillTable(id, data) {
    const table = document.querySelector(`#${id} tbody`);
    table.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        table.innerHTML += `<tr><td>${data[i].x}</td><td>${data[i].y}</td></tr>`;
    }
}
function drawChart(data) {
    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pad = 21;
    const w = canvas.width - 2 * pad;
    const h = canvas.height - 2 * pad;
    let minX = data[0].x, maxX = data[data.length - 1].x;
    let minY = Math.min(...data.map(d => d.y));
    let maxY = Math.max(...data.map(d => d.y));
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, canvas.height - pad);
    ctx.lineTo(canvas.width - pad, canvas.height - pad);
    ctx.stroke();
    ctx.font = "12px Arial";
    ctx.fillText("X", canvas.width - pad + 10, canvas.height - pad + 5);
    ctx.fillText("Y", pad - 10, pad - 10);
    for (let i = 0; i < data.length; i++) {
        let cx = pad + ((data[i].x - minX) / (maxX - minX)) * w;
        ctx.fillText(data[i].x, cx - 10, canvas.height - pad + 15);
    }
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
        let cx = pad + ((data[i].x - minX) / (maxX - minX)) * w;
        let cy = (canvas.height - pad) - ((data[i].y - minY) / (maxY - minY)) * h;

        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    for (let i = 0; i < data.length; i++) {
        let cx = pad + ((data[i].x - minX) / (maxX - minX)) * w;
        let cy = (canvas.height - pad) - ((data[i].y - minY) / (maxY - minY)) * h;

        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}
window.onload = function() {
    calculate();
};