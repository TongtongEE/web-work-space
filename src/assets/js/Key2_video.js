document.addEventListener('DOMContentLoaded', function() {
    const leftVideo = document.getElementById('key2-left-video');
    const rightVideo = document.getElementById('key2-right-video');

    function syncVideos() {
        // 왼쪽 비디오를 기준으로 오른쪽 비디오 동기화
        if (Math.abs(leftVideo.currentTime - rightVideo.currentTime) > 0.1) {
            rightVideo.currentTime = leftVideo.currentTime;
        }
    }

    // 비디오 로드 완료 시 실행
    leftVideo.onloadedmetadata = rightVideo.onloadedmetadata = function() {
        // 두 비디오 모두 로드되면 재생 시작
        if (leftVideo.readyState >= 4 && rightVideo.readyState >= 4) {
            leftVideo.play();
            rightVideo.play();
        }
    };

    // 주기적으로 동기화 체크
    setInterval(syncVideos, 1000);

    // 비디오 재생/일시정지 동기화
    leftVideo.onplay = function() { rightVideo.play(); };
    leftVideo.onpause = function() { rightVideo.pause(); };

    // 사용자 상호작용으로 비디오 재생 시작 (자동 재생 정책 대응)
    document.body.addEventListener('click', function() {
        leftVideo.play();
        rightVideo.play();
    }, { once: true });
});
