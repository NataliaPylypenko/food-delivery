window.addEventListener('DOMContentLoaded', () => {

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        // clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    // close modal
    // 1) by clicking outside modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });
    // 2) by clicking Escape
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // open modal
    // 1) by clicking on any button Contact us
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // 2) after a while
    // const modalTimerId = setTimeout(openModal, 3000);

    // 3) when scrolling
    // if the user has scrolled to the end
    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

})