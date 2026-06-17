let scrollPosition;

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    function openMenu() {
        scrollPosition = window.pageYOffset;
        overlay.style.display = 'block';
        closeIcon.style.display = 'block';
        body.classList.add('menu-open');
        body.style.top = `-${scrollPosition}px`;
    }

    function closeMenu() {
        overlay.style.display = 'none';
        closeIcon.style.display = 'none';
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }

    menuIcon.addEventListener('click', openMenu);
    closeIcon.addEventListener('click', closeMenu);

    // 모바일 메뉴 내 페이지 내(#) 링크: 메뉴를 닫은 뒤 해당 섹션으로 부드럽게 이동
    overlay.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            closeMenu(); // 고정(position:fixed)된 body 해제 후 스크롤 위치 정상화
            requestAnimationFrame(function() {
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeMenu();
        }
    });
});