document.addEventListener("DOMContentLoaded", () => {
    const blackCircle = document.getElementById("black-circle");
    const yellowCircle = document.getElementById("yellow-circle");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");
    const container = document.getElementById("game-container");
    const containerRect = container.getBoundingClientRect();
    let hasMoved = false;
    let moveTimer = null;
    let motionSupported = false;
    let orientationSupported = false;

    // Check for DeviceMotionEvent support
    if (window.DeviceMotionEvent) {
        motionSupported = true;
        window.addEventListener('devicemotion', handleMotion);
    } else {
        alert("DeviceMotionEvent is not supported on your device.");
    }

    // Check for DeviceOrientationEvent support
    if (window.DeviceOrientationEvent) {
        orientationSupported = true;
        window.addEventListener('deviceorientation', handleOrientation);
    }

    function handleMotion(event) {
        if (hasMoved) return;

        const acc = event.accelerationIncludingGravity;
        const shakeThreshold = 10;

        if (Math.abs(acc.x) > shakeThreshold || Math.abs(acc.y) > shakeThreshold || Math.abs(acc.z) > shakeThreshold) {
            hasMoved = true;
            message.textContent = "Move the black circle!";
            moveTimer = setTimeout(() => {
                checkWinCondition();
                resetButton.style.display = "block";
            }, 3000);
        }
    }

    function handleOrientation(event) {
        if (!hasMoved) return;

        const { beta, gamma } = event; // beta is for front-back, gamma is for left-right

        let posX = (gamma / 90) * (containerRect.width / 2);
        let posY = (beta / 90) * (containerRect.height / 2);

        posX = Math.max(0, Math.min(containerRect.width - 50, containerRect.width / 2 + posX));
        posY = Math.max(0, Math.min(containerRect.height - 50, containerRect.height / 2 + posY));

        moveBlackCircle(posX, posY);
    }

    function moveBlackCircle(x, y) {
        blackCircle.style.left = `${x}px`;
        blackCircle.style.top = `${y}px`;
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
            message.textContent = "Try Again!";
        }
    }

    function resetGame() {
        hasMoved = false;
        clearTimeout(moveTimer);
        message.textContent = "";
        resetButton.style.display = "none";
        initializeBlackCircle();
    }

    function initializeBlackCircle() {
        const initPosX = containerRect.width / 2 - 25;  // Center horizontally, subtracting half the circle's width
        const initPosY = containerRect.height - 50;  // Position at bottom, subtracting the circle's height
        blackCircle.style.left = `${initPosX}px`;
        blackCircle.style.top = `${initPosY}px`;
    }

    resetButton.addEventListener('click', resetGame);

    initializeBlackCircle();
});
