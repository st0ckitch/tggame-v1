document.addEventListener("DOMContentLoaded", () => {
    const blackCircle = document.getElementById("black-circle");
    const yellowCircle = document.getElementById("yellow-circle");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");
    const container = document.getElementById("game-container");
    const containerRect = container.getBoundingClientRect();
    let hasMoved = false;
    let motionSupported = false;

    // Check for DeviceMotionEvent support
    if (window.DeviceMotionEvent) {
        motionSupported = true;
        window.addEventListener('devicemotion', handleMotion);
    } else {
        alert("DeviceMotionEvent is not supported on your device.");
    }

    function handleMotion(event) {
        if (hasMoved) return;

        const acc = event.accelerationIncludingGravity;
        const shakeThreshold = 12; // Adjust as needed

        if (Math.abs(acc.x) > shakeThreshold || Math.abs(acc.y) > shakeThreshold || Math.abs(acc.z) > shakeThreshold) {
            hasMoved = true;
            let power = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z) - 9.8; // Subtracting gravity
            moveBlackCircle(power);
        }
    }

    function moveBlackCircle(power) {
        const duration = 3000; // 3 seconds
        const startX = parseFloat(getComputedStyle(blackCircle).left);
        const endX = containerRect.width - 50; // End position just before container edge

        const startTime = performance.now();
        function animateCircle(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Limit progress to 1
            const newX = startX + (endX - startX) * progress * (power / 15); // Adjust 15 for sensitivity

            blackCircle.style.left = `${newX}px`;

            if (progress < 1) {
                requestAnimationFrame(animateCircle);
            } else {
                checkWinCondition();
            }
        }

        requestAnimationFrame(animateCircle);
    }

    function checkWinCondition() {
        const blackRect = blackCircle.getBoundingClientRect();
        const yellowRect = yellowCircle.getBoundingClientRect();

        if (
            blackRect.left < yellowRect.right &&
            blackRect.right > yellowRect.left &&
            blackRect.top < yellowRect.bottom &&
            blackRect.bottom > yellowRect.top
        ) {
            message.textContent = "You Win!";
        } else {
            message.textContent = "You Lose!";
        }

        resetButton.style.display = "block";
    }

    function resetGame() {
        hasMoved = false;
        blackCircle.style.left = "50%";
        message.textContent = "";
        resetButton.style.display = "none";
    }

    resetButton.addEventListener('click', resetGame);
});
