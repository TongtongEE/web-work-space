// languageToggle.js
document.addEventListener('DOMContentLoaded', function() {
    const langOptions = document.querySelectorAll('.lang-option');
    const koElements = document.querySelectorAll('.lang-ko');
    const enElements = document.querySelectorAll('.lang-en');

    function setLanguage(lang) {
        console.log('Setting language to:', lang);

        // 언어 설정을 localStorage에 저장
        localStorage.setItem('selectedLanguage', lang);

        // 언어 옵션 버튼 상태 업데이트
        langOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });

        const isKorean = lang === 'ko';

        // 언어별 요소 표시/숨김
        koElements.forEach(el => el.style.display = isKorean ? '' : 'none');
        enElements.forEach(el => el.style.display = isKorean ? 'none' : '');

        // CONTACT 링크 업데이트 (필요한 경우)
        const koContact = document.querySelector('.contact-link.lang-ko');
        const enContact = document.querySelector('.contact-link.lang-en');
        if (koContact) koContact.style.display = isKorean ? '' : 'none';
        if (enContact) enContact.style.display = isKorean ? 'none' : '';

        // body 태그에 언어 클래스 추가
        document.body.classList.remove('lang-ko', 'lang-en');
        document.body.classList.add('lang-' + lang);

        // HTML lang 속성 업데이트
        document.documentElement.lang = lang;

        // 이미지 전환 로직 추가
        const productImage = document.getElementById('product-image');
        if (productImage) {
            if (isKorean) {
                productImage.src = "src/assets/images/section2_product/Post-Me_set_white2.png";
                productImage.alt = "제품 구성 이미지";
            } else {
                productImage.src = "src/assets/images/section2_product/Post-Me_set_white2_en.png";
                productImage.alt = "Product Configuration Image";
            }
        }

        // angle.jsx의 요소들 업데이트
        if (typeof changeLanguage === 'function') {
            changeLanguage(lang);
        } else {
            console.warn('changeLanguage function not found. Make sure angle.jsx is loaded.');
            updateAngleContent(lang);
        }

        console.log('Language set complete');
    }

    // 언어 옵션 버튼에 이벤트 리스너 추가
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            setLanguage(this.dataset.lang);
        });
    });

    // 페이지 로드 시 저장된 언어 설정 확인 및 적용
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    } else {
        // 저장된 설정이 없으면 기본값으로 'ko' 사용
        setLanguage('ko');
    }
});

// angle.jsx의 요소들을 업데이트하는 함수
function updateAngleContent(lang) {
    const isKorean = lang === 'ko';

    // 제목 업데이트
    document.querySelector('.keyfeature1-title .lang-ko').style.display = isKorean ? '' : 'none';
    document.querySelector('.keyfeature1-title .lang-en').style.display = isKorean ? 'none' : '';

    // 부제목 업데이트
    document.querySelector('.keyfeature1-subtitle .lang-ko').style.display = isKorean ? '' : 'none';
    document.querySelector('.keyfeature1-subtitle .lang-en').style.display = isKorean ? 'none' : '';

    // 설명 업데이트
    document.querySelector('.keyfeature1-description .lang-ko').style.display = isKorean ? '' : 'none';
    document.querySelector('.keyfeature1-description .lang-en').style.display = isKorean ? 'none' : '';

    // 버튼 텍스트 업데이트
    const buttons = document.querySelectorAll('.keyfeature1-button');
    buttons.forEach(button => {
        button.textContent = isKorean ? 
            button.getAttribute('data-text-ko') : 
            button.getAttribute('data-text-en');
    });

    // 기타 텍스트 요소 업데이트
    updateTextContent('left-title', isKorean ? '로봇 무빙' : 'Robot Moving');
    updateTextContent('right-title', isKorean ? '사진 촬영본' : 'Photo Shots');
    
    // 현재 선택된 앵글에 따라 설명 업데이트
    const currentAngle = document.querySelector('.keyfeature1-button.active').getAttribute('onclick').match(/'(.+)'/)[1];
    updateAngleDescription(currentAngle, isKorean);
}

function updateTextContent(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

function updateAngleDescription(angle, isKorean) {
    const descriptions = {
        'high-angle': {
            ko: '최대 3m 높이에서 유행하는 항공샷, 정수리샷 등 촬영할 수 있어요.',
            en: 'You can take trending aerial shots and top-down shots from a maximum height of 3m.'
        },
        'middle-angle': {
            ko: '일반적인 네컷사진, 증명사진 등 촬영할 수 있어요.',
            en: 'You can take typical four-cut photos, ID photos, etc.'
        },
        'low-angle': {
            ko: '로우 앵글샷, 롱다리샷 등을 촬영할 수 있어요.',
            en: 'You can take low angle shots, long leg shots, etc.'
        },
        'multi-angle': {
            ko: '하이, 일반, 로우 앵글을 하나의 포토 프레임에 인쇄할 수 있어요.',
            en: 'You can print high, normal, and low angles\nin a single photo frame.'
        }
    };

    const description = descriptions[angle][isKorean ? 'ko' : 'en'];
    updateTextContent('right-description', description);
}