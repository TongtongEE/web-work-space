function isMobile() {
    return window.innerWidth <= 768;
}

function showPopup(buttonNumber) {
    var popup = document.getElementById('popup');
    var title = document.getElementById('popup-title');
    var description = document.getElementById('popup-description');
    var productImage = document.querySelector('.product-image');

    var titles = ["리프트", "AI를 탑재한 고성능 카메라", "높은 안전성이 인증된 로봇", "편리한 키오스크 시스템", "카드, NFC, 쿠폰 결제를 한번에", "높은 퀄리티 사진 인쇄"];
    var descriptions = [
        "모바일베이스에 리프트 탑재로<br>높은 앵글 (최대 3m) 에서 촬영이 가능해요",
        "AI 오토 트래킹 기능과<br>고성능 카메라로 4K 촬영까지 가능해요", 
        "NRTL(미국), CE(유럽), KCs(한국) 등<br>최고 수준의 안전성을 인증받은<br>두산로봇 사용으로 안심하고 사용할 수 있어요",
        "사진과 동영상 촬영, 결제, 인쇄까지<br>직관적인 UI로 사용이 편리해요",
        "IC / MSR, 삼성페이, 애플페이 등<br>다양한 결제 옵션이 있어요.<br>바코드 리더기 탑재로 쿠폰 결제가 가능해요",
        "기본 300 dpi (최대 300x600 dpi) 해상도로 퀄리티 높은 사진 인화가 가능해요"
    ];

    title.innerHTML = titles[buttonNumber - 1];
    description.innerHTML = descriptions[buttonNumber - 1];

    popup.style.display = 'block';

    if (!isMobile()) {
        popup.style.animation = 'slideIn 0.5s forwards';
        productImage.classList.add('shift-left');
        for (var i = 1; i <= 6; i++) {
            document.querySelector('.product-button-' + i).classList.add('shift-left');
        }
    } else {
        popup.style.animation = 'none';
        popup.style.opacity = 1;
    }
}

function hidePopup() {
    var popup = document.getElementById('popup');
    var productImage = document.querySelector('.product-image');

    if (!isMobile()) {
        popup.style.animation = 'slideOut 0.5s forwards';
        productImage.classList.remove('shift-left');
        for (var i = 1; i <= 6; i++) {
            document.querySelector('.product-button-' + i).classList.remove('shift-left');
        }

        setTimeout(function() {
            popup.style.display = 'none';
        }, 500);
    } else {
        popup.style.display = 'none';
    }
}

// 팝업 이외의 부분 클릭 시 팝업 닫기
window.addEventListener('click', function(event) {
    var popup = document.getElementById('popup');
    if (!popup.contains(event.target) && !event.target.classList.contains('product-button-1') &&
        !event.target.classList.contains('product-button-2') &&
        !event.target.classList.contains('product-button-3') &&
        !event.target.classList.contains('product-button-4') &&
        !event.target.classList.contains('product-button-5') &&
        !event.target.classList.contains('product-button-6')) {
        hidePopup();
    }
});

// 팝업 안쪽 클릭 시 이벤트 전파 막기
document.querySelector('.popup-content').addEventListener('click', function(event) {
    event.stopPropagation();
});

// 윈도우 리사이즈 시 팝업 위치 조정
window.addEventListener('resize', function() {
    var popup = document.getElementById('popup');
    var productImage = document.querySelector('.product-image');

    if (popup.style.display === 'block') {
        if (isMobile()) {
            popup.style.animation = 'none';
            popup.style.opacity = 1;
            productImage.classList.remove('shift-left');
            for (var i = 1; i <= 6; i++) {
                document.querySelector('.product-button-' + i).classList.remove('shift-left');
            }
        } else {
            popup.style.animation = 'slideIn 0.5s forwards';
            productImage.classList.add('shift-left');
            for (var i = 1; i <= 6; i++) {
                document.querySelector('.product-button-' + i).classList.add('shift-left');
            }
        }
    }
});