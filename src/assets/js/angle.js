let currentLanguage = 'ko'; // 전역 변수로 현재 언어 상태 저장

function changeContent(contentType) {
    const leftTitle = document.getElementById('left-title');
    const leftVideo = document.getElementById('left-video');
    const rightTitle = document.getElementById('right-title');
    const rightDescription = document.getElementById('right-description');
    const rightImage1 = document.getElementById('right-image1');
    const rightImage2 = document.getElementById('right-image2');
    const rightImage3 = document.getElementById('right-image3');
    const rightImage4 = document.getElementById('right-image4');
    const shootingMode = document.querySelector('.shooting-mode');
    const textRow = document.querySelector('.text-row');
    const modeGroups = document.querySelectorAll('.mode-group');

    // 비디오 소스 설정
    let videoSrc;
    if (contentType === 'high-angle') {
        videoSrc = './src/assets/videos/HighAngle2.mp4';
        setNormalLayout();
    } else if (contentType === 'middle-angle') {
        videoSrc = './src/assets/videos/MiddleAngle.mp4';
        setNormalLayout();
    } else if (contentType === 'low-angle') {
        videoSrc = './src/assets/videos/LowAngle.mp4';
        setNormalLayout();
    } else if (contentType === 'multi-angle') {
        videoSrc = './src/assets/videos/MultiAngle.mp4';
        setMultiAngleLayout();
    }

    // 비디오 소스 변경 및 재생
    leftVideo.src = videoSrc;
    leftVideo.load();
    leftVideo.play();

    // 언어에 따른 텍스트 설정
    updateContent(contentType);

    // 이미지 크기 클래스 설정
    rightImage1.className = 'right-image vertical-image';
    rightImage2.className = 'right-image vertical-image';
    rightImage3.className = 'right-image horizontal-image';
    rightImage4.className = 'right-image horizontal-image';

    // 모든 버튼에서 'active' 클래스 제거
    const allButtons = document.querySelectorAll('.keyfeature1-button');
    allButtons.forEach(button => button.classList.remove('active'));

    // 선택된 버튼에 'active' 클래스 추가
    const selectedButton = document.querySelector(`.keyfeature1-button[onclick="changeContent('${contentType}')"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

function updateContent(contentType) {
    const isKorean = currentLanguage === 'ko';
    const leftTitle = document.getElementById('left-title');
    const rightTitle = document.getElementById('right-title');
    const rightDescription = document.getElementById('right-description');

    leftTitle.textContent = isKorean ? '로봇 무빙' : 'Robot Motion';
    rightTitle.textContent = isKorean ? '사진 촬영본' : 'Photos Taken with Post-me';

    const descriptions = {
        'high-angle': {
            ko: '최대 3m 높이에서 유행하는 항공샷, 정수리샷 등 촬영할 수 있어요.',
            en: 'Capture trending aerial and top-down shots<br>from a maximum height of 3 meters.'
        },
        'middle-angle': {
            ko: '일반적인 네컷사진, 증명사진 등 촬영할 수 있어요.',
            en: 'Capture standard four-cut photos, ID photos, and more.'
        },
        'low-angle': {
            ko: '로우 앵글샷, 롱다리샷 등을 촬영할 수 있어요.',
            en: 'Capture stunning low-angle shots.'
        },
        'multi-angle': {
            ko: '하이, 일반, 로우 앵글을 하나의 포토 프레임에 인쇄할 수 있어요.',
            en: 'Print multi-angle shots featuring high, standard,<br>and low angles in a single photo.'
        }
    };

    rightDescription.innerHTML = descriptions[contentType][isKorean ? 'ko' : 'en'].replace('\n', '<br>');

    // 이미지 소스 업데이트
    updateImages(contentType, isKorean);

    // 버튼 텍스트 업데이트
    updateButtonTexts(isKorean);
}

function updateImages(contentType, isKorean) {
    const rightImage1 = document.getElementById('right-image1');
    const rightImage3 = document.getElementById('right-image3');
    const rightImage4 = document.getElementById('right-image4');
    const multiAngleImage = document.getElementById('multi-angle-image');

    // 이미지 소스 설정 (언어별 이미지가 없다면 같은 이미지 사용)
    const imageSources = {
        'high-angle': {
            vertical: './src/assets/images/section3/High_ver.jpg',
            horizontal1: './src/assets/images/section3/High_hor.jpg',
            horizontal2: './src/assets/images/section3/High_hor2.jpg'
        },
        'middle-angle': {
            vertical: './src/assets/images/section3/Middle_ver.jpg',
            horizontal1: './src/assets/images/section3/Middle_hor.jpg',
            horizontal2: './src/assets/images/section3/Middle_hor2.jpg'
        },
        'low-angle': {
            vertical: './src/assets/images/section3/Low_ver.jpg',
            horizontal1: './src/assets/images/section3/Low_hor.jpg',
            horizontal2: './src/assets/images/section3/Low_hor2.jpg'
        },
        'multi-angle': {
            multiAngle: './src/assets/images/section3/MultiAngle_frame.jpg'
        }
    };

    const sources = imageSources[contentType];
    
    if (contentType === 'multi-angle') {
        multiAngleImage.src = sources.multiAngle;
    } else {
        rightImage1.src = sources.vertical;
        rightImage3.src = sources.horizontal1;
        rightImage4.src = sources.horizontal2;
    }
}

function updateButtonTexts(isKorean) {
    const buttons = document.querySelectorAll('.keyfeature1-button');
    buttons.forEach(button => {
        button.textContent = isKorean ? 
            button.getAttribute('data-text-ko') : 
            button.getAttribute('data-text-en');
    });
}

function setNormalLayout() {
    document.querySelector('.shooting-mode').style.display = 'block';
    document.querySelector('.text-row').style.display = 'flex';
    document.querySelectorAll('.mode-group').forEach(group => group.style.display = 'block');
    document.querySelector('.multi-angle-container').style.display = 'none';
    document.getElementById('right-image1').style.display = 'block';
    document.getElementById('right-image2').style.display = 'none';
    document.getElementById('right-image3').style.display = 'block';
    document.getElementById('right-image4').style.display = 'block';
}

function setMultiAngleLayout() {
    document.querySelector('.shooting-mode').style.display = 'flex';
    document.querySelector('.text-row').style.display = 'none';
    document.querySelectorAll('.mode-group').forEach(group => group.style.display = 'none');
    document.querySelector('.multi-angle-container').style.display = 'block';
    document.getElementById('right-image1').style.display = 'none';
    document.getElementById('right-image2').style.display = 'none';
    document.getElementById('right-image3').style.display = 'none';
    document.getElementById('right-image4').style.display = 'none';
}

// 언어 변경 함수 (languageToggle.js에서 호출)
function changeLanguage(lang) {
    currentLanguage = lang;
    const currentAngle = document.querySelector('.keyfeature1-button.active').getAttribute('onclick').match(/'(.+)'/)[1];
    updateContent(currentAngle);
}

// 페이지 로드 시 초기 설정
window.onload = function() {
    changeContent('multi-angle');
    const multiAngleButton = document.querySelector('.keyfeature1-button[onclick="changeContent(\'multi-angle\')"]');
    if (multiAngleButton) {
        multiAngleButton.classList.add('active');
    }
};