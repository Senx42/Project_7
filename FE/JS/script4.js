function calculateTime() {
    let now = new Date();

    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();
    let currentSecond = now.getSeconds();

    let lessons = [
        { hour: 10, minute: 20 },
        { hour: 11, minute: 50 },
        { hour: 13, minute: 50 }
    ];

    for (let lesson of lessons) {

        if (
            currentHour < lesson.hour || (currentHour === lesson.hour && currentMinute < lesson.minute)
        ) {
            const currentTime = currentHour * 3600 + currentMinute * 60 + currentSecond;
            const endTime = lesson.hour * 3600 + lesson.minute * 60;
            const difference = endTime - currentTime;
            const hours = Math.floor(difference / 3600);
            const minutes = Math.floor((difference % 3600) / 60);
            const seconds = difference % 60;

            document.getElementById("result").innerHTML = 
                "До кінця пари: " + hours + " год. " + minutes + " хв. " + seconds + " сек.";
            return;
        }
    }
}