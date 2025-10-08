document.querySelectorAll('.avaliacao').forEach(avaliacao => {
        const likeBtn = avaliacao.querySelector('.like');
        const dislikeBtn = avaliacao.querySelector('.dislike');
        const likeCount = avaliacao.querySelector('.like-count');
        const dislikeCount = avaliacao.querySelector('.dislike-count');

        let liked = false;
        let disliked = false;

        likeBtn.addEventListener('click', () => {
            if (!liked) {
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
                likeBtn.style.color = 'white';
                liked = true;

                if (disliked) {
                    dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
                    dislikeBtn.style.color = 'rgb(240, 32, 118)';
                    disliked = false;
                }
            } else {
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
                likeBtn.style.color = 'rgb(240, 32, 118)';
                liked = false;
            }
        });

        dislikeBtn.addEventListener('click', () => {
            if (!disliked) {
                dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
                dislikeBtn.style.color = 'white';
                disliked = true;

                if (liked) {
                    likeCount.textContent = parseInt(likeCount.textContent) - 1;
                    likeBtn.style.color = 'rgb(240, 32, 118)';
                    liked = false;
                }
            } else {
                dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
                dislikeBtn.style.color = 'rgb(240, 32, 118)';
                disliked = false;
            }
        });
    });