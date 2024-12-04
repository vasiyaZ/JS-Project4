const eventNameInput = document.getElementById("event-name");
const eventDateInput = document.getElementById("event-date");
const eventDisplay = document.getElementById("event-display");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const alarmSound = document.getElementById("alarm-sound");

let countdown;
let isPaused = false;

function updateCountdown() {
    const eventDate = new Date(eventDateInput.value);
    const now = new Date();
    const remainingTime = eventDate - now;

    if (remainingTime <= 0) {
        clearInterval(countdown);
        alarmSound.play(); // Play alarm sound immediately

        // Update the display to indicate the event has started
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        eventDisplay.textContent = `${eventNameInput.value} has started!`;

        return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? `0${days}` : days;
    hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
}


function startCountdown() {
    const now = new Date();
    const eventDate = new Date(eventDateInput.value);
    if (eventDate <= now) {
        alert("Please select a future date!");
        return;
    }
    if (!eventDateInput.value || !eventNameInput.value) {
        alert("Please enter both: an event name and a date!");
        return;
    }

    eventDisplay.textContent = `Countdown to ${eventNameInput.value}`;
    clearInterval(countdown); // Prevent duplicate intervals
    countdown = setInterval(updateCountdown, 1000);
    isPaused = false;
}

// function pauseCountdown() {
//     clearInterval(countdown);
//     isPaused = true;

// }

function resetCountdown() {
    clearInterval(countdown);
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    eventDateInput.value = "";
    eventNameInput.value = "";
    eventDisplay.textContent = "Countdown reset!";
    isPaused = false;

    // Stop and reset the alarm sound
    if (!alarmSound.paused) {
        alarmSound.pause();
        alarmSound.currentTime = 0;  // Reset sound position
    }
}

startBtn.addEventListener("click", startCountdown);
resetBtn.addEventListener("click", resetCountdown);
