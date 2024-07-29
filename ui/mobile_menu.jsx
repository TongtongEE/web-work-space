document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const overlay = document.getElementById('overlay');

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

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeMenu();
        }
    });
});