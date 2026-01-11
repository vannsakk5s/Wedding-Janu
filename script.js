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

  const popup = document.getElementById('imagePopup');
  const popupImg = document.getElementById('popupImage');

  function openPopup(src) {
    popupImg.src = src;
    popup.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden'; 
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.add('hidden');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }


  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("weddingMusic");
    const openBtn = document.getElementById("openTicket");

    // ១. ប្រសិនបើនៅក្នុងទំព័រ index.html (មានប៊ូតុងបើកសំបុត្រ)
    if (openBtn && music) {
        openBtn.addEventListener("click", function() {
            music.play().then(() => {
                // រក្សាទុកក្នុង LocalStorage ថាភ្ញៀវបានអនុញ្ញាតឱ្យលេងភ្លេងហើយ
                localStorage.setItem("musicPlaying", "true");
                
                // ពន្យារពេលបន្តិចមុននឹងទៅកាន់ទំព័រថ្មី ដើម្បីឱ្យភ្លេងចាប់ផ្តើមស្រួល
                setTimeout(() => {
                    window.location.href = "./detail.html";
                }, 300);
            }).catch(error => {
                console.log("Music play failed:", error);
                window.location.href = "./detail.html";
            });
        });
    }

    // ២. ប្រសិនបើភ្ញៀវកំពុងស្ថិតក្នុងទំព័រ detail.html ឬទំព័រផ្សេងទៀត
    // យើងឆែកមើលថាតើគេធ្លាប់ចុច "Play" កាលពីនៅទំព័រមុនឬនៅ
    if (localStorage.getItem("musicPlaying") === "true") {
        // បង្កើត Audio Element ថ្មីសម្រាប់ទំព័រ detail.html បើមិនទាន់មាន
        let autoMusic = document.getElementById("weddingMusic");
        if (!autoMusic) {
            autoMusic = new Audio("./music/love.mp3");
            autoMusic.loop = true;
        }
        autoMusic.play().catch(e => console.log("Auto-play blocked"));
    }
});