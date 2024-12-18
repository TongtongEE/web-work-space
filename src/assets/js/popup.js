// 언어별 타이틀과 설명
var titles = {
    ko: ["리프트", "AI를 탑재한 고성능 카메라", "높은 안전성이 인증된 로봇", "편리한 키오스크 시스템", "카드, NFC, 쿠폰 결제를 한번에", "높은 퀄리티 사진 인쇄"],
    en: ["Lift", "AI-assisted Auto-framing & Tracking", "Safety-certified Robot", "Convenient Kiosk System", "All-in-One Payment Options", "High Quality Photo Printing"]
};

var descriptions = {
    ko: [
        "모바일베이스에 리프트 탑재로<br>높은 앵글 (최대 3m) 에서 촬영이 가능해요",
        "AI 오토 트래킹 기능과<br>고성능 카메라로 4K 촬영까지 가능해요", 
        "최고 수준의 안전성을 인증받은<br>협동로봇 사용으로 안심하고 사용할 수 있어요",
        "사진과 동영상 촬영, 결제, 인쇄까지<br>직관적인 UI로 사용이 편리해요",
        "IC / MSR, 삼성페이, 애플페이 등<br>다양한 결제 옵션이 있어요.<br>바코드 리더기 탑재로 쿠폰 결제가 가능해요",
        "기본 300 dpi (최대 300x600 dpi) 해상도로<br>퀄리티 높은 사진 인화가 가능해요"
    ],
    en: [
        "Capture images from high angles (up to 3 meters)<br>using a lift mounted on the robot base.",
        "The AI intelligently recognizes subjects,<br>ensuring they are always perfectly framed<br>in the shot (up to 4K resolution).", 
        "Use with confidence, as this collaborative robot<br>is certified to the highest safety standards.",
        "Enjoy easy-to-use functionality with an intuitive UI<br> for photo and video shooting, payment processing,<br>printing, and downloading via the Post-Me server.",
        "Enjoy a variety of payment methods, including<br>credit card (IC/MSR), NFC (Samsung & Apple Pay),<br>and QR or barcode coupons.",
        "Achieve high-quality photo printing<br>with resolutions of up to 300x600 dpi."
    ]
};

var mediaContent = [
    '<video autoplay loop muted playsinline><source src="./src/assets/videos/LiftDetail.mp4" type="video/mp4"></video>',
    '<video autoplay loop muted playsinline><source src="./src/assets/videos/AiTracking.mp4" type="video/mp4"></video>',
    '<video autoplay loop muted playsinline><source src="./src/assets/videos/Cobot.mp4" type="video/mp4"></video>',
    '<video autoplay loop muted playsinline><source src="./src/assets/videos/AppUse3.mp4" type="video/mp4"></video>',
    '<video autoplay loop muted playsinline><source src="./src/assets/videos/PaymentDetail.mp4" type="video/mp4"></video>',
    '<video autoplay loop muted playsinline><source src="./src/assets/videos/PrintDetail.mp4" type="video/mp4"></video>'
];

var currentButtonNumber = 0;

function isMobile() {
    return window.innerWidth <= 768;
}

function showPopup(buttonNumber) {
    var popup = document.getElementById('popup');
    var title = document.getElementById('popup-title');
    var description = document.getElementById('popup-description');
    var imageContainer = document.querySelector('.popup-image');
    var productImage = document.querySelector('.product-image');

    var currentLang = document.documentElement.lang; // 현재 언어 가져오기

    title.innerHTML = titles[currentLang][buttonNumber - 1];
    description.innerHTML = descriptions[currentLang][buttonNumber - 1];
    imageContainer.innerHTML = mediaContent[buttonNumber - 1];

    currentButtonNumber = buttonNumber;

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

    currentButtonNumber = 0;
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

// 언어 변경 시 팝업 내용 업데이트
function updatePopupLanguage() {
    var currentLang = document.documentElement.lang;
    var popupTitle = document.getElementById('popup-title');
    var popupDescription = document.getElementById('popup-description');

    if (popupTitle && popupDescription && currentButtonNumber > 0) {
        popupTitle.innerHTML = titles[currentLang][currentButtonNumber - 1];
        popupDescription.innerHTML = descriptions[currentLang][currentButtonNumber - 1];
    }
}
