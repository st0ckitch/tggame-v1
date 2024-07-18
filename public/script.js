document.addEventListener("DOMContentLoaded", () => {
    const blackCircle = document.getElementById("black-circle");
    const yellowCircle = document.getElementById("yellow-circle");
    const message = document.getElementById("message");
    const container = document.getElementById("game-container");
    const containerRect = container.getBoundingClientRect();
    let hasMoved = false;

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleMotion);
    } else {
        alert("DeviceMotionEvent is not supported on your device.");
    }

    function handleMotion(event) {
        if (hasMoved) return;

        const acc = event.accelerationIncludingGravity;
        const shakeThreshold = 5;

        if (Math.abs(acc.x) > shakeThreshold || Math.abs(acc.y) > shakeThreshold || Math.abs(acc.z) > shakeThreshold) {
            const posX = (containerRect.width / 2) + (acc.x * 5);
            const posY = containerRect.height - (acc.y * 5) - 50;  // Subtracting 50 to place it correctly

            moveBlackCircle(posX, posY);
            checkWinCondition(posX, posY);
            hasMoved = true;
        }
    }

    function moveBlackCircle(x, y) {
        blackCircle.style.left = `${x}px`;
        blackCircle.style.top = `${y}px`;
    }

    function checkWinCondition(x, y) {
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
            message.textContent = "Try Again!";
        }
    }

    // Initialize the black circle at the bottom center
    const initPosX = containerRect.width / 2 - 25;  // Center horizontally, subtracting half the circle's width
    const initPosY = containerRect.height - 50;  // Position at bottom, subtracting the circle's height
    blackCircle.style.left = `${initPosX}px`;
    blackCircle.style.top = `${initPosY}px`;
});
