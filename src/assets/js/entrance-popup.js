// 이미지 프리로딩 함수
function preloadImages(images) {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 이미지 배열 정의
const mobileImages = [
    './src/assets/images/popup/promotion_modal_mobile.png',
    './src/assets/images/popup/promotion_modal_mobile_2.png'
];
const webImages = [
    './src/assets/images/popup/promotion_modal_web.png',
    './src/assets/images/popup/promotion_modal_web_2.png'
];

// 페이지 로드 시 이미지 프리로딩
document.addEventListener('DOMContentLoaded', function() {
    const isMobileDevice = window.innerWidth <= 768;
    const entrancePopup = document.getElementById('entrance-popup');
    const popupImage = document.querySelector('.entrance-popup-image img');
    
    // 이미지 프리로딩
    preloadImages(isMobileDevice ? mobileImages : webImages);
    
    if (entrancePopup) {
        // 모바일 기기인 경우 이미지 경로 변경
        if (isMobileDevice && popupImage) {
            popupImage.src = mobileImages[Math.floor(Math.random() * mobileImages.length)];
        } else if (popupImage) {
            popupImage.src = webImages[Math.floor(Math.random() * webImages.length)];
        }
        
        // 페이지 로드 후 약간의 딜레이 후 팝업 표시
        setTimeout(function() {
            entrancePopup.style.display = 'flex';
        }, 500);
    }
});

// 팝업 닫기 함수
function hideEntrancePopup() {
    const entrancePopup = document.getElementById('entrance-popup');
    
    // 애니메이션 효과와 함께 팝업 숨기기
    if (entrancePopup) {
        entrancePopup.style.opacity = '0';
        entrancePopup.style.transform = 'translateY(-30px)';
        entrancePopup.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // 애니메이션 후 팝업 완전히 숨기기
        setTimeout(function() {
            entrancePopup.style.display = 'none';
        }, 300);
    }
}

// ESC 키 누를 때 팝업 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideEntrancePopup();
    }
});

// 팝업 외부 영역 클릭 시 팝업 닫기
document.addEventListener('click', function(event) {
    const entrancePopup = document.getElementById('entrance-popup');
    const entrancePopupContent = document.querySelector('.entrance-popup-content');
    
    if (entrancePopup && entrancePopupContent && 
        event.target === entrancePopup && 
        !entrancePopupContent.contains(event.target)) {
        hideEntrancePopup();
    }
});

// 윈도우 리사이즈 이벤트 처리 - 디바운스 적용
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        const isMobileDevice = window.innerWidth <= 768;
        const popupImage = document.querySelector('.entrance-popup-image img');
        
        if (popupImage) {
            // 디바이스 타입이 변경된 경우에만 이미지 변경
            const currentIsMobile = popupImage.src.includes('mobile');
            if (isMobileDevice !== currentIsMobile) {
                if (isMobileDevice) {
                    popupImage.src = mobileImages[Math.floor(Math.random() * mobileImages.length)];
                } else {
                    popupImage.src = webImages[Math.floor(Math.random() * webImages.length)];
                }
            }
        }
    }, 250); // 250ms 디바운스
}); 