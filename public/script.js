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

        const posX = (containerRect.width / 2) + (acc.x * 10);
        const posY = containerRect.height - (acc.y * 10) - 50;  // Subtracting 50 to place it correctly

        moveBlackCircle(posX, posY);
        checkWinCondition(posX, posY);
        hasMoved = true;
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
});
