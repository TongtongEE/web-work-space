
    // 비디오 재생 함수
    function playVideo() {
        video.play().catch(function(error) {
            console.log("Video play failed:", error);
        });
    }

    // 비디오 종료 시 다시 재생
    video.addEventListener('ended', playVideo, false);
    
    // 페이지 로드 시 재생 시도
    playVideo();

    // 사용자 상호작용(터치) 시 재생
    document.addEventListener('touchstart', playVideo, {once: true});
