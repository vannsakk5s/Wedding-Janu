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


  function openPopup(src) {
    document.getElementById('popupImage').src = src;
    document.getElementById('imagePopup').classList.remove('hidden');
  }

  // ❌ Close popup
  function closePopup() {
    document.getElementById('imagePopup').classList.add('hidden');
  }

  // Also close when clicking outside the image
  document.getElementById('imagePopup').addEventListener('click', (e) => {
    if (e.target.id === 'imagePopup') {
      closePopup();
    }
  });
