const skills=document.querySelector('#skills');
const fade=document.querySelector('#fade');

function cardRotate(event) {
    const card = event.target.closest('[data-card]');
    if (card) {
        fade.classList.add('active');
        card.classList.add('active');
        document.body.classList.add('block');
    }

    const crossButton = event.target.closest('[data-cross-button]');
    if (crossButton) {
        fade.classList.remove('active');
        card.classList.remove('active');
        document.body.classList.remove('block');
    }
}

skills.addEventListener('click', (event) => cardRotate(event)) ;
