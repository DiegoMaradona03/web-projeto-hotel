 const quartos = document.querySelectorAll('.quarto:not(.indisponivel)');
    const modalBg = document.getElementById('modal-bg');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalStars = document.getElementById('modal-stars');
    const closeBtn = document.querySelector('.close');

    quartos.forEach(quarto => {
        quarto.addEventListener('click', () => {
            const imgSrc = quarto.querySelector('img').src;
            const title = quarto.querySelector('h2').innerText;
            const desc = quarto.querySelector('p').innerText;

            modalImg.src = imgSrc;
            modalTitle.innerText = title;
            modalDesc.innerText = desc;

            const rating = Math.floor(Math.random() * 3) + 3;
            modalStars.innerText = '⭐'.repeat(rating);

            modalBg.classList.remove('hidden');
        });
    });

    closeBtn.addEventListener('click', () => {
        modalBg.classList.add('hidden');
    });

    modalBg.addEventListener('click', (e) => {
        if (e.target === modalBg) {
            modalBg.classList.add('hidden');
        }
    });