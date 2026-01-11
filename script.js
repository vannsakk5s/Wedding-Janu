const eventDate = new Date("January 31, 2026 17:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Stop the timer when the countdown ends
    if (distance <= 0) {
        clearInterval(timer);
        document.getElementById("days").innerText = "0";
        document.getElementById("hours").innerText = "0";
        document.getElementById("minutes").innerText = "0";
        document.getElementById("seconds").innerText = "0";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);

const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImage");
const popupContent = document.getElementById("popupContent");

window.openPopup = function (src) {
    popupImg.src = src;
    popup.classList.remove("hidden");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
};

window.closePopup = function () {
    popup.classList.add("hidden");
    popupImg.src = "";
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
};

popup.addEventListener("click", (e) => {
    if (!popupContent.contains(e.target)) window.closePopup();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !popup.classList.contains("hidden")) {
        window.closePopup();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("weddingMusic");
    const openBtn = document.getElementById("openTicket");

    if (openBtn && music) {
        openBtn.addEventListener("click", function () {
            music.play().then(() => {
                localStorage.setItem("musicPlaying", "true");
                setTimeout(() => {
                    window.location.href = "./detail.html";
                }, 300);
            }).catch(error => {
                console.log("Music play failed:", error);
                window.location.href = "./detail.html";
            });
        });
    }

    if (localStorage.getItem("musicPlaying") === "true") {
        let autoMusic = document.getElementById("weddingMusic");
        if (!autoMusic) {
            autoMusic = new Audio("./music/love.mp3");
            autoMusic.loop = true;
        }
        autoMusic.play().catch(e => console.log("Auto-play blocked"));
    }
});

const BOT_TOKEN = "8344922561:AAGmEuydfLYsAUv6G1UG9TSkD5CsczJNrOk";
const CHAT_ID = -1003674232536;

const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("status");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!username || !phone) {
        statusEl.textContent = "Please fill username and phone number.";
        statusEl.className = "text-sm mt-3 text-center text-red-600";
        return;
    }

    const text =
        `💌 Message by viewer
-----------------------
👤 ឈ្មោះ​        : ${username}
📞 លេខទូរស័ព្ទ: ${phone}
📝 សារ           : ${message || "(no message)"}`;

    try {
        sendBtn.disabled = true;
        sendBtn.textContent = "កំពុងផ្ញើសាររបស់អ្នក...";

        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text,
                parse_mode: "HTML"
            })
        });

        const data = await res.json();
        if (!data.ok) throw new Error(data.description || "Telegram error");

        statusEl.textContent = "✅ បានផ្ញើសារដោយជោគជ័យ";
        statusEl.className = "text-sm mt-3 kantum text-center text-green-700";
        form.reset();
    } catch (err) {
        statusEl.textContent = "❌ សាររបស់អ្នកមានបញ្ហា: " + err.message;
        statusEl.className = "text-sm mt-3 kantum text-center text-red-600";
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "ផ្ញើសារ";
    }
});