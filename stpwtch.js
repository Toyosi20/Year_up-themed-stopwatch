let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;

document.getElementById('startTimer').addEventListener('click', () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById('pauseTimer').addEventListener('click', () => {
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = '00 : 00 : 00 : 000 ';
});

document.getElementById('countdownTimer').addEventListener('click', () => {
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    let countdownTime = prompt("Enter countdown time in format hh:mm:ss");
    if (countdownTime) {
        let timeParts = countdownTime.split(':');
        hours = parseInt(timeParts[0]);
        minutes = parseInt(timeParts[1]);
        seconds = parseInt(timeParts[2]);
        milliseconds = 0;
    }
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayCountdown, 10);
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    updateDisplay();
}

function displayCountdown() {
    if (milliseconds == 0 && seconds == 0 && minutes == 0 && hours == 0) {
        clearInterval(int);
        alert("Time's up!");
        return;
    }
    if (milliseconds == 0) {
        milliseconds = 990;
        if (seconds == 0) {
            seconds = 59;
            if (minutes == 0) {
                minutes = 59;
                hours--;
            } else {
                minutes--;
            }
        } else {
            seconds--;
        }
    } else {
        milliseconds -= 10;
    }
    updateDisplay();
}

function updateDisplay() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}
