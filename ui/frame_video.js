document.addEventListener('DOMContentLoaded', function() {
    const video1 = document.getElementById('photo-frame-video-1');
    const video2 = document.getElementById('photo-frame-video-2');
    
    video1.addEventListener('timeupdate', function() {
        const duration = video1.duration;
        const currentTime = video1.currentTime;
        
        if (duration - currentTime <= 1) {
            video2.currentTime = 0;
            video2.play();
        }
    });

    video1.addEventListener('ended', function() {
        video1.currentTime = 0;
        video1.play();
    });
});