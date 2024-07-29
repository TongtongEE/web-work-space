document.addEventListener('DOMContentLoaded', () => {
    const slideTrack = document.getElementById('slideTrack');
    const videoReference = document.getElementById('videoReference');
    let isHovered = false;
    let animationFrame;
    let startTime;
    let currentPosition = 0;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        const speed = isHovered ? 0.01 : 0.02; // 호버 시 속도 감소
        currentPosition -= speed;

        if (currentPosition <= -50) {
            currentPosition = 0;
        }

        slideTrack.style.transform = `translateX(${currentPosition}%)`;
        animationFrame = requestAnimationFrame(animate);
    }

    animationFrame = requestAnimationFrame(animate);

    videoReference.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    videoReference.addEventListener('mouseleave', () => {
        isHovered = false;
    });
});