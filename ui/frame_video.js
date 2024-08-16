document.addEventListener('DOMContentLoaded', function() {
    function logVideoStatus(video, label) {
        console.log(`${label} - readyState: ${video.readyState}, paused: ${video.paused}, ended: ${video.ended}, currentTime: ${video.currentTime}, duration: ${video.duration}`);
    }

    function syncVideos(video1, video2) {
        if (Math.abs(video1.currentTime - video2.currentTime) > 0.1) {
            video2.currentTime = video1.currentTime;
        }
    }

    function setupVideoSequence(firstVideoId1, secondVideoId1, firstVideoId2, secondVideoId2) {
        const video1_1 = document.getElementById(firstVideoId1);
        const video1_2 = document.getElementById(secondVideoId1);
        const video2_1 = document.getElementById(firstVideoId2);
        const video2_2 = document.getElementById(secondVideoId2);

        if (!video1_1 || !video1_2 || !video2_1 || !video2_2) {
            console.error('Video elements not found');
            return;
        }

        function playVideos(v1, v2) {
            v1.play().then(() => {
                v2.play();
                console.log(`${v1.id} and ${v2.id} started playing`);
                logVideoStatus(v1, v1.id);
                logVideoStatus(v2, v2.id);
            }).catch(e => console.error(`Error playing videos:`, e));
        }

        playVideos(video1_1, video2_1);

        video1_1.addEventListener('ended', function() {
            console.log(`${video1_1.id} ended, starting ${video1_2.id}`);
            video1_1.style.display = 'none';
            video1_2.style.display = 'block';
            video2_1.style.display = 'none';
            video2_2.style.display = 'block';
            
            video1_2.currentTime = 0;
            video2_2.currentTime = 0;
            playVideos(video1_2, video2_2);
        });

        // 주기적으로 비디오 상태 로깅 및 동기화
        setInterval(() => {
            syncVideos(video1_1, video2_1);
            syncVideos(video1_2, video2_2);
            logVideoStatus(video1_1, firstVideoId1);
            logVideoStatus(video1_2, secondVideoId1);
            logVideoStatus(video2_1, firstVideoId2);
            logVideoStatus(video2_2, secondVideoId2);
        }, 1000); // 1초마다 상태 로깅 및 동기화
    }

    // 양쪽 비디오 시퀀스 설정
    setupVideoSequence('photo-frame-video-1-1', 'photo-frame-video-1-2', 'photo-frame-video-2-1', 'photo-frame-video-2-2');

    // 자동 재생 정책 문제 해결을 위한 사용자 상호작용 처리
    document.body.addEventListener('click', function() {
        document.querySelectorAll('video').forEach(video => {
            video.play().catch(e => console.error('Error playing video:', e));
        });
    }, { once: true });
});