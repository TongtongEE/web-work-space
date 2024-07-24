function changeContent(contentType) {
    const leftTitle = document.getElementById('left-title');
    const leftImage = document.getElementById('left-image');
    const rightTitle = document.getElementById('right-title');
    const rightDescription = document.getElementById('right-description');
    const rightImage1 = document.getElementById('right-image1');
    const rightImage2 = document.getElementById('right-image2');
    const rightImage3 = document.getElementById('right-image3');
    const rightImage4 = document.getElementById('right-image4');

    if (contentType === 'high-angle') {
        leftTitle.innerHTML = '로봇 무빙';
        leftImage.src = 'path/to/high-angle-left.jpg';
        leftImage.alt = 'High Angle 좌측 이미지';
        rightTitle.innerHTML = 'High Angle';
        rightDescription.innerHTML = '최대 3m 높이에서 유행하는 항공샷, 정수리샷 등 촬영할 수 있어요.';
        rightImage1.src = 'path/to/high-angle1.jpg';
        rightImage1.alt = '가로 촬영 모드 이미지 1';
        rightImage2.src = 'path/to/high-angle2.jpg';
        rightImage2.alt = '가로 촬영 모드 이미지 2';
        rightImage3.src = 'path/to/high-angle3.jpg';
        rightImage3.alt = '세로 촬영 모드 이미지 1';
        rightImage4.src = 'path/to/high-angle4.jpg';
        rightImage4.alt = '세로 촬영 모드 이미지 2';
    } else if (contentType === 'middle-angle') {
        leftTitle.innerHTML = '로봇 무빙';
        leftImage.src = 'path/to/middle-angle-left.jpg';
        leftImage.alt = 'Middle Angle 좌측 이미지';
        rightTitle.innerHTML = 'Middle Angle';
        rightDescription.innerHTML = '일반적인 네컷사진, 증명사진 등 촬영할 수 있어요.';
        rightImage1.src = 'path/to/middle-angle1.jpg';
        rightImage1.alt = '가로 촬영 모드 이미지 1';
        rightImage2.src = 'path/to/middle-angle2.jpg';
        rightImage2.alt = '가로 촬영 모드 이미지 2';
        rightImage3.src = 'path/to/middle-angle3.jpg';
        rightImage3.alt = '세로 촬영 모드 이미지 1';
        rightImage4.src = 'path/to/middle-angle4.jpg';
        rightImage4.alt = '세로 촬영 모드 이미지 2';
    } else if (contentType === 'low-angle') {
        leftTitle.innerHTML = '로봇 무빙';
        leftImage.src = 'path/to/low-angle-left.jpg';
        leftImage.alt = 'Low Angle 좌측 이미지';
        rightTitle.innerHTML = 'Low Angle';
        rightDescription.innerHTML = '로우 앵글샷, 롱다리샷 등을 촬영할 수 있어요.';
        rightImage1.src = 'path/to/low-angle1.jpg';
        rightImage1.alt = '가로 촬영 모드 이미지 1';
        rightImage2.src = 'path/to/low-angle2.jpg';
        rightImage2.alt = '가로 촬영 모드 이미지 2';
        rightImage3.src = 'path/to/low-angle3.jpg';
        rightImage3.alt = '세로 촬영 모드 이미지 1';
        rightImage4.src = 'path/to/low-angle4.jpg';
        rightImage4.alt = '세로 촬영 모드 이미지 2';
    } else if (contentType === 'multi-angle') {
        leftTitle.innerHTML = '로봇 무빙';
        leftImage.src = 'path/to/multi-angle-left.jpg';
        leftImage.alt = 'Multi Angle 좌측 이미지';
        rightTitle.innerHTML = 'Multi Angle';
        rightDescription.innerHTML = '하이, 일반, 로우 앵글을 하나의 포토 프레임에 인쇄할 수 있어요.';
        rightImage1.src = 'path/to/multi-angle1.jpg';
        rightImage1.alt = '가로 촬영 모드 이미지 1';
        rightImage2.src = 'path/to/multi-angle2.jpg';
        rightImage2.alt = '가로 촬영 모드 이미지 2';
        rightImage3.src = 'path/to/multi-angle3.jpg';
        rightImage3.alt = '세로 촬영 모드 이미지 1';
        rightImage4.src = 'path/to/multi-angle4.jpg';
        rightImage4.alt = '세로 촬영 모드 이미지 2';
    }
}
