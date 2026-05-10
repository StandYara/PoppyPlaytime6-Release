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

// ====================
// МОДАЛЬНОЕ ОКНО ТОП-10
// ====================

// Данные спидранеров
const allTimeData = [
    { rank: 1, name: 'SpeedDemon', time: '12:34', avatar: 'assets/avatar1.png' },
    { rank: 2, name: 'Nightmare', time: '15:21', avatar: 'assets/avatar2.png' },
    { rank: 3, name: 'GhostRunner', time: '18:07', avatar: 'assets/avatar3.png' },
    { rank: 4, name: 'ShadowFox', time: '19:45', avatar: '' },
    { rank: 5, name: 'TurboCat', time: '21:12', avatar: '' },
    { rank: 6, name: 'PhantomX', time: '22:30', avatar: '' },
    { rank: 7, name: 'DarkWolf', time: '24:08', avatar: '' },
    { rank: 8, name: 'StormRider', time: '25:55', avatar: '' },
    { rank: 9, name: 'BlazeFire', time: '27:40', avatar: '' },
    { rank: 10, name: 'IceQueen', time: '29:18', avatar: '' },
];

const monthlyData = [
    { rank: 1, name: 'TurboCat', time: '14:20', avatar: '' },
    { rank: 2, name: 'SpeedDemon', time: '15:10', avatar: 'assets/avatar1.png' },
    { rank: 3, name: 'ShadowFox', time: '17:33', avatar: '' },
    { rank: 4, name: 'Nightmare', time: '18:45', avatar: 'assets/avatar2.png' },
    { rank: 5, name: 'BlazeFire', time: '20:10', avatar: '' },
    { rank: 6, name: 'StormRider', time: '21:55', avatar: '' },
    { rank: 7, name: 'PhantomX', time: '23:22', avatar: '' },
    { rank: 8, name: 'GhostRunner', time: '24:50', avatar: 'assets/avatar3.png' },
    { rank: 9, name: 'IceQueen', time: '26:15', avatar: '' },
    { rank: 10, name: 'DarkWolf', time: '28:00', avatar: '' },
];

function getRankClass(rank) {
    if (rank === 1) return 'top1';
    if (rank === 2) return 'top2';
    if (rank === 3) return 'top3';
    return '';
}

function getDefaultAvatar() {
    return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%23fff" font-size="40">👤</text></svg>');
}

function renderLeaderboard(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(r => `
        <div class="leaderboard-row">
            <span class="rank ${getRankClass(r.rank)}">#${r.rank}</span>
            <img src="${r.avatar || getDefaultAvatar()}" alt="${r.name}" class="small-avatar" onerror="this.src='${getDefaultAvatar()}'">
            <span class="row-name">${r.name}</span>
            <span class="row-time">${r.time}</span>
        </div>
    `).join('');
}

function initLeaderboard() {
    renderLeaderboard(allTimeData, 'leaderboardAllTime');
    renderLeaderboard(monthlyData, 'leaderboardMonthly');

    const modal = document.getElementById('leaderboardModal');
    const viewAllBtn = document.getElementById('viewAllBtn');
    const closeBtn = document.getElementById('closeModal');
    const tabs = document.querySelectorAll('.tab-btn');

    if (!modal || !viewAllBtn || !closeBtn) return;

    viewAllBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            const targetTab = document.getElementById(`tab-${tab.dataset.tab}`);
            if (targetTab) targetTab.classList.add('active');
        });
    });
}

// ====================
// РАЗДЕЛ ОБНОВЛЕНИЙ (Реакции + Просмотры)
// ====================

function initUpdates() {
    // Загрузка сохранённых данных
    const savedReactions = JSON.parse(localStorage.getItem('pp6_post_reactions') || '{}');
    const savedViews = JSON.parse(localStorage.getItem('pp6_post_views') || '{}');

    // Инициализация просмотров
    document.querySelectorAll('.views-count').forEach(el => {
        const postId = el.dataset.post;
        if (!savedViews[postId]) {
            savedViews[postId] = Math.floor(Math.random() * 150) + 10;
        }
        // Увеличиваем просмотр при загрузке
        savedViews[postId] = (savedViews[postId] || 0) + 1;
        el.textContent = savedViews[postId];
    });
    localStorage.setItem('pp6_post_views', JSON.stringify(savedViews));

    // Восстановление реакций
    document.querySelectorAll('.reaction-btn').forEach(btn => {
        const postId = btn.dataset.post;
        const reaction = btn.dataset.reaction;
        const countSpan = btn.querySelector('.reaction-count');

        // Устанавливаем начальное значение
        if (!savedReactions[postId]) savedReactions[postId] = {};
        if (!savedReactions[postId][reaction]) {
            savedReactions[postId][reaction] = { count: Math.floor(Math.random() * 30) + 1, active: false };
        }
        countSpan.textContent = savedReactions[postId][reaction].count;

        if (savedReactions[postId][reaction].active) {
            btn.classList.add('active');
        }

        // Обработчик клика
        btn.addEventListener('click', () => {
            const currentCount = savedReactions[postId][reaction].count;
            const isActive = savedReactions[postId][reaction].active;

            if (isActive) {
                // Убрать реакцию
                savedReactions[postId][reaction].count = Math.max(0, currentCount - 1);
                savedReactions[postId][reaction].active = false;
                btn.classList.remove('active');
            } else {
                // Добавить реакцию
                savedReactions[postId][reaction].count = currentCount + 1;
                savedReactions[postId][reaction].active = true;
                btn.classList.add('active');
                // Анимация
                btn.style.animation = 'none';
                btn.offsetHeight;
                btn.style.animation = 'popReaction 0.4s ease';
            }

            countSpan.textContent = savedReactions[postId][reaction].count;
            localStorage.setItem('pp6_post_reactions', JSON.stringify(savedReactions));
        });
    });

    localStorage.setItem('pp6_post_reactions', JSON.stringify(savedReactions));
}

// Инициализация всего
function init() {
    createParticles();
    startCountdown();
    animateOnScroll();
    parallaxEffect();
    handleNavbarScroll();
    initLeaderboard();
    initUpdates();

    console.log('Poppy Playtime 6 - Сайт запущен! 🎮');
    console.log('Релиз: 15 мая 2026 года');
    console.log('Осталось дней: ' + Math.ceil((new Date('2026-05-15T15:00:00+03:00') - new Date()) / (1000 * 60 * 60 * 24)));
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