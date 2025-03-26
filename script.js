document.addEventListener('DOMContentLoaded', function() {
    // COUNTDOWN IMPLEMENTATION
    // Set Q-Day to April 14, 2030 at midnight UTC
    const qDay = new Date(Date.UTC(2030, 3, 14)).getTime();
    
    // Declare countdownInterval at a higher scope
    let countdownInterval;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = qDay - now;
    
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Removed milliseconds calculation
    
            document.getElementById("days").textContent = days.toString().padStart(2, "0");
            document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
            // Removed milliseconds display
            
            updateThreatLevel(now);
        } else {
            document.querySelector(".countdown").innerHTML = 
                "<div style='font-size: 2rem;'>Q-DAY HAS ARRIVED</div>";
            document.getElementById("threat-level").style.width = "100%";
            clearInterval(countdownInterval);
        }
    }
    function updateThreatLevel(currentTime) {
        const referenceDate = new Date(Date.UTC(2020, 0, 1)).getTime();
        const totalDuration = qDay - referenceDate;
        const elapsedTime = currentTime - referenceDate;
        const threatPercentage = Math.min(100, (elapsedTime / totalDuration) * 100);
        document.getElementById("threat-level").style.width = `${threatPercentage}%`;
    }

    // Initialize immediately and set update interval
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1);

    // Share button functionality
    document.getElementById("share-btn").addEventListener("click", function() {
        if (navigator.share) {
            navigator.share({
                title: "Countdown to Q-Day",
                text: `Check out how much time we have until quantum computers break RSA encryption! Only ${document.getElementById("days").textContent} days left!`,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent("Countdown to Q-Day - the day quantum computers break RSA encryption. Only " + document.getElementById("days").textContent + " days left!")}&url=${encodeURIComponent(window.location.href)}`;
            window.open(shareUrl, '_blank');
        }
    });
});