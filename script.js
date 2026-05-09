// Частицы на фоне
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 10 + 15 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';

        container.appendChild(particle);
    }
}

// Таймер обратного отсчета
function startCountdown() {
    const targetDate = new Date('2026-05-15T15:00:00+03:00');
    const countdownElement = document.getElementById('countdown');
    const releaseButton = document.getElementById('releaseDownloadBtn');

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            countdownElement.innerHTML = 'Скачать';
            releaseButton.classList.remove('disabled');
            releaseButton.disabled = false;
            releaseButton.innerHTML = '<i class="fas fa-download"></i> Скачать';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Обработчик для Beta кнопки
document.getElementById('betaDownloadBtn').addEventListener('click', function(e) {
    e.preventDefault();

    // Анимация нажатия
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);

    // Открываем Гугл Диск в новой вкладке
    window.open('https://drive.google.com/uc?export=download&id=1QtW6YA87tpGCN_SJIbT4TSkyWFOWzLUd', '_blank');
});

// Обработчик для Release кнопки
document.getElementById('releaseDownloadBtn').addEventListener('click', function(e) {
    const now = new Date();
    const targetDate = new Date('2026-05-15T15:00:00+03:00');

    if (now >= targetDate && !this.classList.contains('disabled')) {
        // Анимация нажатия
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Открываем Гугл Диск в новой вкладке
        window.open('https://drive.google.com/uc?export=download&id=124KhXFwUKZcrcl2amGusdMlp1yNrCdam', '_blank');
    }
});

// Плавный скролл для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.info-card, .feature, .download-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Эффект параллакса для hero секции
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Изменение навбара при скролле
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.backdropFilter = 'blur(30px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Инициализация всего
function init() {
    createParticles();
    startCountdown();
    animateOnScroll();
    parallaxEffect();
    handleNavbarScroll();

    console.log('Poppy Playtime 6 - Сайт запущен! 🎮');
    console.log('Релиз: 9 мая 2026 года 17:16');
    console.log('Осталось дней: ' + Math.ceil((new Date('2026-05-09T17:16:00+03:00') - new Date()) / (1000 * 60 * 60 * 24)));
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', init);

// Добавляем эффект при наведении на карточки
document.querySelectorAll('.download-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2) / 20}deg) rotateY(${-(x - rect.width/2) / 20}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});