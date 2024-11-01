document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('#bg-video');
    
    if (video) {
        // 비디오 로드 완료 후 재생하는 함수
        function playVideo() {
            video.play().catch(function(error) {
                console.log("Video play failed:", error);
            });
        }

        // 비디오 메타데이터 로드 완료 후 재생 시도
        video.addEventListener('loadedmetadata', function() {
            playVideo();
        });

        // 비디오 종료 시 다시 재생
        video.addEventListener('ended', playVideo, false);

        // 비디오 로드 실패 시 처리
        video.addEventListener('error', function(e) {
            console.log("Video load failed:", e);
        });

        // 사용자 상호작용(터치) 시 재생
        document.addEventListener('touchstart', playVideo, {once: true});
    }
});