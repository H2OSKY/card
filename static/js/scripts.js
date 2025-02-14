
const messages = [
    "Eres el amor de mi vida ❤️",
    "Contigo todo es mejor 💑",
    "Me haces inmensamente feliz 😊",
    "Eres mi persona favorita 💖",
    "Te amo más cada día 💕",
    "Oing Oing 💝",
    "Cachetona bella 🤗",
    "Mi corazón late por ti 💓",
    "Eres mi sueño hecho realidad ✨",
    "No hay nadie como tú 🌟"
];

const envelope = document.querySelector('.envelope');
const letter = document.querySelector('.letter');
const letterContent = document.querySelector('.letter-content');
let isOpen = false;

envelope.addEventListener('click', () => {
    if (!isOpen) {
        envelope.classList.add('open');
        playAudio('./static/sound/card.mp3');
        setTimeout(() => {
            letter.classList.add('show');
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            letterContent.textContent = randomMessage;
            createHeartBurst();
        }, 300);
        isOpen = true;
    } else {
        letter.classList.remove('show');
        setTimeout(() => {
            envelope.classList.remove('open');
        }, 800);
        isOpen = false;
    }
});

function createHeart(x, y, angle) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    const animation = heart.animate([
        {
            transform: `rotate(45deg) scale(0)`,
            opacity: 0
        },
        {
            transform: `rotate(${45 + angle}deg) scale(1)`,
            opacity: 1,
            offset: 0.5
        },
        {
            transform: `rotate(${45 + angle}deg) scale(1.5) translate(${Math.cos(angle * Math.PI / 180) * 100}px, ${Math.sin(angle * Math.PI / 180) * 100}px)`,
            opacity: 0
        }
    ], {
        duration: 1500,
        easing: 'ease-out'
    });

    document.body.appendChild(heart);

    animation.onfinish = () => heart.remove();
}

function createHeartBurst() {
    const rect = envelope.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const angle = (i * 30) + Math.random() * 20;
        setTimeout(() => {
            createHeart(centerX, centerY, angle);
        }, i * 50);
    }
}

function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
}


document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        document.title = "¡Te extraño! 🥹";
    } else {
        document.title = "Bienvenida de nuevo! 🎉";
        setTimeout(() => {
            document.title = originalTitle;
        }, 2000);
    }
});


const originalTitle = document.title;
