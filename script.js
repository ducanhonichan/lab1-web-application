const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.setAttribute("aria-pressed", "true");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
}

themeToggle.addEventListener("click", () => {
    const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");

        themeToggle.setAttribute("aria-pressed", "false");
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");

        themeToggle.setAttribute("aria-pressed", "true");
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
});
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.textContent = "Message sent successfully.";
    contactForm.reset();
});

const retryButton = document.getElementById("retry-button");



// T-03: Resilient Component State Machine

const projectStates = {
    loading: document.getElementById("loading-state"),
    live: document.getElementById("live-data-state"),
    empty: document.getElementById("empty-state"),
    error: document.getElementById("error-state")
};

function showProjectState(state) {
    Object.entries(projectStates).forEach(([name, element]) => {
        element.hidden = name !== state;
    });
}

// Start with Loading state
showProjectState("loading");

// Simulate loading data
setTimeout(() => {
    showProjectState("live");
}, 1000);

// Retry returns to Loading, then Live Data
retryButton.addEventListener("click", () => {
    showProjectState("loading");

    setTimeout(() => {
        showProjectState("live");
    }, 1000);
});

function playSound(key) {
    const pad = document.querySelector(
        `.drum-pad[data-key="${key.toLowerCase()}"]`
    );

    if (!pad) return;

    const audio = new Audio(pad.dataset.sound);
    audio.play();

    pad.classList.add("active");

    setTimeout(() => {
        pad.classList.remove("active");
    }, 100);
}


const beatQueue = [];

window.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    const key = event.key.toLowerCase();

    playSound(key);

    beatQueue.push({
        key: key,
        timestamp: Date.now()
    });
});

// HW3 Slice 1: Drift-Free Countdown Engine

const countdownDisplay = document.getElementById("countdown-display");

const targetTime = new Date(
    "2026-12-31T23:59:59Z"
).getTime();

function updateCountdown() {
    const remaining = targetTime - Date.now();

    if (remaining <= 0) {
        countdownDisplay.textContent = "Countdown finished.";
        return;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownDisplay.textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown();

setInterval(updateCountdown, 1000);