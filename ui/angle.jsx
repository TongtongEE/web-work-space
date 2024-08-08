function changeContent(contentType) {
    const leftTitle = document.getElementById('left-title');
    const leftVideo = document.getElementById('left-video');
    const rightTitle = document.getElementById('right-title');
    const rightDescription = document.getElementById('right-description');
    const rightImage1 = document.getElementById('right-image1');
    const rightImage2 = document.getElementById('right-image2');
    const rightImage3 = document.getElementById('right-image3');
    const rightImage4 = document.getElementById('right-image4');

    // 비디오 소스 설정
    let videoSrc;
    if (contentType === 'high-angle') {
        videoSrc = 'src/assets/videos/HighAngle2.mp4';
        leftTitle.innerHTML = '로봇 무빙 (High Angle)';
        rightTitle.innerHTML = 'High Angle';
        rightDescription.innerHTML = '최대 3m 높이에서 유행하는 항공샷, 정수리샷 등 촬영할 수 있어요.';
    } else if (contentType === 'middle-angle') {
        videoSrc = 'src/assets/videos/MiddleAngle.mp4';
        leftTitle.innerHTML = '로봇 무빙 (Middle Angle)';
        rightTitle.innerHTML = 'Middle Angle';
        rightDescription.innerHTML = '일반적인 네컷사진, 증명사진 등 촬영할 수 있어요.';
    } else if (contentType === 'low-angle') {
        videoSrc = 'src/assets/videos/LowAngle.mp4';
        leftTitle.innerHTML = '로봇 무빙 (Low Angle)';
        rightTitle.innerHTML = 'Low Angle';
        rightDescription.innerHTML = '로우 앵글샷, 롱다리샷 등을 촬영할 수 있어요.';
    } else if (contentType === 'multi-angle') {
        videoSrc = 'src/assets/videos/MultiAngle.mp4';
        leftTitle.innerHTML = '로봇 무빙 (Multi Angle)';
        rightTitle.innerHTML = 'Multi Angle';
        rightDescription.innerHTML = '하이, 일반, 로우 앵글을 하나의 포토 프레임에 인쇄할 수 있어요.';
    }

    // 비디오 소스 변경 및 재생
    leftVideo.src = videoSrc;
    leftVideo.load();
    leftVideo.play();

    // 우측 이미지 업데이트
    rightImage1.src = `path/to/${contentType}1.jpg`;
    rightImage2.src = `path/to/${contentType}2.jpg`;
    rightImage3.src = `path/to/${contentType}3.jpg`;
    rightImage4.src = `path/to/${contentType}4.jpg`;

    // 모든 버튼에서 'active' 클래스 제거
    const allButtons = document.querySelectorAll('.keyfeature1-button');
    allButtons.forEach(button => button.classList.remove('active'));

    // 선택된 버튼에 'active' 클래스 추가
    const selectedButton = document.querySelector(`.keyfeature1-button[onclick="changeContent('${contentType}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// 페이지 로드 시 초기 컨텐츠 설정
window.onload = function() {
    changeContent('multi-angle');
    
    // Multi Angle 버튼에 'active' 클래스 추가
    const multiAngleButton = document.querySelector('.keyfeature1-button[onclick="changeContent(\'multi-angle\')"]');
    if (multiAngleButton) {
        multiAngleButton.classList.add('active');
    }
};

// 팝업 관련 함수 (이름만 변경)
function showAnglePopup(popupId) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupImage = document.querySelector('.popup-image');

    // 팝업 내용 설정 (예시)
    if (popupId === 1) {
        popupTitle.textContent = '리프트';
        popupDescription.innerHTML = '모바일베이스에 리프트 탑재로<br>높은 앵글 (최대 3m) 에서 촬영이 가능해요.';
        popupImage.style.backgroundImage = "url('path/to/lift-image.jpg')";
    }
    // 다른 팝업 ID에 대한 내용 설정...

    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.opacity = '1';
    }, 10);
}

function hideAnglePopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('slide-out');
    setTimeout(() => {
        popup.style.display = 'none';
        popup.classList.remove('slide-out');
        popup.style.opacity = '0';
    }, 500);
}

// 모바일 메뉴 관련 함수 (기존 코드 유지)
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const overlay = document.getElementById('overlay');

    menuIcon.addEventListener('click', function() {
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
    });

    closeIcon.addEventListener('click', function() {
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// 슬라이드 관련 함수 (기존 코드 유지)
let isMouseDown = false;
let startX;
let scrollLeft;

const slider = document.querySelector('.video-reference');
const track = document.querySelector('.slide-track');

slider.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

slider.addEventListener('mouseup', () => {
    isMouseDown = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
});