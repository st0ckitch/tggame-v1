document.addEventListener("DOMContentLoaded", () => {
    const chip = document.getElementById("chip");
    const message = document.getElementById("message");
    const container = document.getElementById("game-container");
    const containerRect = container.getBoundingClientRect();
    let isShaking = false;
    let shakeStartTime;

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', handleMotion);
    } else {
        alert("DeviceMotionEvent is not supported on your device.");
    }

    function handleMotion(event) {
        const acc = event.accelerationIncludingGravity;
        const shakeThreshold = 15;

        if (Math.abs(acc.x) > shakeThreshold || Math.abs(acc.y) > shakeThreshold || Math.abs(acc.z) > shakeThreshold) {
            if (!isShaking) {
                isShaking = true;
                shakeStartTime = Date.now();
                startShake();
            }
        }

        if (isShaking) {
            const timeElapsed = (Date.now() - shakeStartTime) / 1000;
            const newPosX = (acc.x * timeElapsed * 100) % containerRect.width;
            const newPosY = (acc.y * timeElapsed * 100) % containerRect.height;

            chip.style.left = `${newPosX}px`;
            chip.style.top = `${newPosY}px`;
        }
    }

    function startShake() {
        message.textContent = "Shaking...";
        setTimeout(stopShake, 2000);
    }

    function stopShake() {
        isShaking = false;
        message.textContent = "Stopped!";
        const rect = chip.getBoundingClientRect();
        const middleX = containerRect.width / 2;
        const middleY = containerRect.height / 2;

        if (Math.abs(rect.left + rect.width / 2 - middleX) < 20 && Math.abs(rect.top + rect.height / 2 - middleY) < 20) {
            message.textContent = "You Win!";
        } else {
            message.textContent = "Try Again!";
        }

        resetChipPosition();
    }

    function resetChipPosition() {
        chip.style.transition = "transform 2s";
        chip.style.transform = "translate(-50%, -50%)";
    }
});
