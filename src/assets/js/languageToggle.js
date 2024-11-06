document.addEventListener('DOMContentLoaded', function() {
    const langOptions = document.querySelectorAll('.lang-option');
    const koElements = document.querySelectorAll('.lang-ko');
    const enElements = document.querySelectorAll('.lang-en');

    // 모바일/웹 버전 표시 상태를 관리하는 함수
    function updateVersionDisplay(isKorean) {
        const isMobile = window.innerWidth <= 720;
        const style = document.createElement('style');
        
        if (!isKorean) {
            style.textContent = `
                @media screen and (max-width: 720px) {
                    .lang-en .web-version {
                        display: none !important;
                    }
                    .lang-en .mobile-version {
                        display: block !important;
                    }
                }
                @media screen and (min-width: 721px) {
                    .lang-en .web-version {
                        display: block !important;
                    }
                    .lang-en .mobile-version {
                        display: none !important;
                    }
                }
            `;
        }
        
        // 이전 스타일 제거 후 새로운 스타일 추가
        const prevStyle = document.getElementById('version-styles');
        if (prevStyle) {
            prevStyle.remove();
        }
        style.id = 'version-styles';
        document.head.appendChild(style);
    }

    function setLanguage(lang) {
        // URL 해시 업데이트
        window.location.hash = lang;

        // 언어 설정을 localStorage에 저장
        localStorage.setItem('selectedLanguage', lang);

        // 언어 옵션 버튼 상태 업데이트
        langOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });

        const isKorean = lang === 'ko';

        // 언어별 요소 표시/숨김
        koElements.forEach(el => {
            el.style.setProperty('display', isKorean ? 'block' : 'none', 'important');
        });
        enElements.forEach(el => {
            el.style.setProperty('display', isKorean ? 'none' : 'block', 'important');
        });

        // 모바일/웹 버전 업데이트
        updateVersionDisplay(isKorean);

        // CONTACT 링크 업데이트
        const koContact = document.querySelector('.contact-link.lang-ko');
        const enContact = document.querySelector('.contact-link.lang-en');
        if (koContact) koContact.style.setProperty('display', isKorean ? 'block' : 'none', 'important');
        if (enContact) enContact.style.setProperty('display', isKorean ? 'none' : 'block', 'important');

        // body 태그에 언어 클래스 추가
        document.body.classList.remove('lang-ko', 'lang-en');
        document.body.classList.add(`lang-${lang}`);

        // HTML lang 속성 업데이트
        document.documentElement.lang = lang;

        // 이미지 전환 로직
        const productImage = document.getElementById('product-image');
        if (productImage) {
            productImage.src = isKorean ? 
                "./src/assets/images/section2_product/Post-Me_set_white2.png" : 
                "./src/assets/images/section2_product/Post-Me_set_white2_en.png";
            productImage.alt = isKorean ? "제품 구성 이미지" : "Product Configuration Image";
        }

        // angle.jsx의 요소들 업데이트
        updateAngleContent(lang);
    }

    // 언어 옵션 버튼에 이벤트 리스너 추가
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage(this.dataset.lang);
        });
    });

    // 페이지 로드 시 URL 해시 또는 저장된 언어 설정 확인 및 적용
    function initLanguage() {
        const hash = window.location.hash.substring(1);
        const savedLanguage = localStorage.getItem('selectedLanguage');
        
        if (hash === 'en' || hash === 'ko') {
            setLanguage(hash);
        } else if (savedLanguage === 'en' || savedLanguage === 'ko') {
            setLanguage(savedLanguage);
        } else {
            setLanguage('ko'); // 기본값
        }
    }

    // 초기 언어 설정 적용
    initLanguage();

    // URL 해시 변경 감지
    window.addEventListener('hashchange', initLanguage);

    // 창 크기 변경 감지 (디바운스 처리)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const currentLang = document.documentElement.lang;
            setLanguage(currentLang);
        }, 250);
    });

    // 페이지 로드 완료 시 실행
    window.addEventListener('load', function() {
        const currentLang = document.documentElement.lang;
        setLanguage(currentLang);
    });
});

// angle.jsx의 요소들을 업데이트하는 함수
function updateAngleContent(lang) {
    const isKorean = lang === 'ko';

    // 제목 업데이트
    updateDisplayBySelector('.keyfeature1-title .lang-ko', isKorean);
    updateDisplayBySelector('.keyfeature1-title .lang-en', !isKorean);

    // 부제목 업데이트
    updateDisplayBySelector('.keyfeature1-subtitle .lang-ko', isKorean);
    updateDisplayBySelector('.keyfeature1-subtitle .lang-en', !isKorean);

    // 설명 업데이트
    updateDisplayBySelector('.keyfeature1-description .lang-ko', isKorean);
    updateDisplayBySelector('.keyfeature1-description .lang-en', !isKorean);

    // 버튼 텍스트 업데이트
    document.querySelectorAll('.keyfeature1-button').forEach(button => {
        button.textContent = isKorean ? 
            button.getAttribute('data-text-ko') : 
            button.getAttribute('data-text-en');
    });

    // 기타 텍스트 요소 업데이트
    updateTextContent('left-title', isKorean ? '로봇 무빙' : 'Robot Moving');
    updateTextContent('right-title', isKorean ? '사진 촬영본' : 'Photo Shots');
    
    // 현재 선택된 앵글에 따른 설명 업데이트
    const activeButton = document.querySelector('.keyfeature1-button.active');
    if (activeButton) {
        const currentAngle = activeButton.getAttribute('onclick').match(/'(.+)'/)[1];
        updateAngleDescription(currentAngle, isKorean);
    }
}

// 헬퍼 함수들
function updateDisplayBySelector(selector, show) {
    const element = document.querySelector(selector);
    if (element) {
        element.style.setProperty('display', show ? 'block' : 'none', 'important');
    }
}

function updateTextContent(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
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
            en: 'You can print high, normal, and low angles in a single photo frame.'
        }
    };

    const description = descriptions[angle][isKorean ? 'ko' : 'en'];
    updateTextContent('right-description', description);
}
