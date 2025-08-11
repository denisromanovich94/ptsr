// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and animated elements
document.querySelectorAll('.section, .about-item, .step, .stat-item, .help-item, .vision-item, .testimonial, .contact-item').forEach(el => {
    observer.observe(el);
});

// Button click handlers
document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        handleButtonAction(action);
    });
});

function handleButtonAction(action) {
    switch(action) {
        case 'donate':
            showModal('donate');
            break;
        case 'help':
            showModal('help');
            break;
        case 'join':
            showModal('join');
            break;
        case 'apply':
            showModal('apply');
            break;
        case 'volunteer':
            showModal('volunteer');
            break;
        case 'partner':
            showModal('partner');
            break;
        case 'donate-monthly':
            showModal('donate-monthly');
            break;
        default:
            console.log(`Action: ${action}`);
    }
}

function showModal(type) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        position: relative;
    `;
    
    // Modal content based on type
    const content = getModalContent(type);
    modal.innerHTML = content;
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });
    
    // Close handlers
    const closeModal = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

function getModalContent(type) {
    const contents = {
        'donate': `
            <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Поддержите наш проект</h2>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Ваша поддержка помогает нам предоставлять бесплатную психологическую помощь тем, кто в ней нуждается.</p>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>$25</strong> = 1 сеанс терапии</p>
                <p><strong>$2,000</strong> = 1 психолог на полную ставку в месяц</p>
            </div>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Свяжитесь с нами для получения реквизитов:</p>
            <p><strong>Email:</strong> bridge.t.calm@gmail.com</p>
            <p><strong>Telegram:</strong> @Buianovich</p>
        `,
        'help': `
            <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Нужна помощь?</h2>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Мы здесь, чтобы поддержать вас. Наши специалисты готовы предоставить профессиональную психологическую помощь.</p>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>Что мы предлагаем:</strong></p>
                <ul style="color: #4a5568; padding-left: 1.5rem;">
                    <li>Индивидуальные сеансы терапии</li>
                    <li>Групповую поддержку</li>
                    <li>Кризисное консультирование</li>
                    <li>Поддержку на русском языке</li>
                </ul>
            </div>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Свяжитесь с нами:</p>
            <p><strong>Email:</strong> bridge.t.calm@gmail.com</p>
            <p><strong>Telegram:</strong> @Buianovich</p>
        `,
        'join': `
            <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Присоединяйтесь к команде</h2>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Мы ищем лицензированных психологов для работы в нашей международной команде.</p>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>Требования:</strong></p>
                <ul style="color: #4a5568; padding-left: 1.5rem;">
                    <li>Лицензия на практику психологии</li>
                    <li>Свободное владение русским языком</li>
                    <li>Опыт работы с травмами</li>
                    <li>Возможность работать удаленно</li>
                </ul>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>Мы предлагаем:</strong></p>
                <ul style="color: #4a5568; padding-left: 1.5rem;">
                    <li>Гибкий график работы</li>
                    <li>Полную поддержку команды</li>
                    <li>Возможность помочь тысячам людей</li>
                    <li>Конкурентоспособную оплату</li>
                </ul>
            </div>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Для подачи заявки:</p>
            <p><strong>Email:</strong> bridge.t.calm@gmail.com</p>
            <p><strong>Telegram:</strong> @Buianovich</p>
        `,
        'apply': `
            <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Подать заявку психологом</h2>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Присоединяйтесь к нашей миссии помощи людям, страдающим от ПТСР.</p>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Отправьте нам:</p>
            <ul style="color: #4a5568; padding-left: 1.5rem; margin-bottom: 1.5rem;">
                <li>Резюме с опытом работы</li>
                <li>Копии лицензий и сертификатов</li>
                <li>Мотивационное письмо</li>
                <li>Контактную информацию</li>
            </ul>
            <p><strong>Email:</strong> bridge.t.calm@gmail.com</p>
            <p><strong>Telegram:</strong> @Buianovich</p>
        `,
        'volunteer': `
            <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Стать волонтером</h2>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Помогите нам в нашей важной миссии! Мы ищем волонтеров с различными навыками.</p>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>Как вы можете помочь:</strong></p>
                <ul style="color: #4a5568; padding-left: 1.5rem;">
                    <li>Техническая поддержка платформы</li>
                    <li>Помощь в организации мероприятий</li>
                    <li>Переводы и локализация</li>
                    <li>Маркетинг и продвижение</li>
                    <li>Административная поддержка</li>
                </ul>
            </div>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Свяжитесь с нами:</p>
            <p><strong>Email:</strong> bridge.t.calm@gmail.com</p>
            <p><strong>Telegram:</strong> @Buianovich</p>
        `,
        'partner': `
            <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Партнерство</h2>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Мы открыты для сотрудничества с организациями, разделяющими нашу миссию.</p>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>Типы партнерства:</strong></p>
                <ul style="color: #4a5568; padding-left: 1.5rem;">
                    <li>Образовательные учреждения</li>
                    <li>Медицинские организации</li>
                    <li>НКО и благотворительные фонды</li>
                    <li>Технологические компании</li>
                    <li>СМИ и информационные партнеры</li>
                </ul>
            </div>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Для обсуждения партнерства:</p>
            <p><strong>Email:</strong> bridge.t.calm@gmail.com</p>
            <p><strong>Telegram:</strong> @Buianovich</p>
        `,
        'donate-monthly': `
            <h2 style="color: #1e3a8a; margin-bottom: 1rem;">Регулярные пожертвования</h2>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Постоянная поддержка позволяет нам планировать работу и помогать большему количеству людей.</p>
            <div style="margin-bottom: 1.5rem;">
                <p><strong>Варианты ежемесячных пожертвований:</strong></p>
                <ul style="color: #4a5568; padding-left: 1.5rem;">
                    <li>$25/месяц - спонсорство одного сеанса</li>
                    <li>$100/месяц - поддержка 4 сеансов</li>
                    <li>$500/месяц - поддержка работы психолога</li>
                    <li>$2000/месяц - полная поддержка специалиста</li>
                </ul>
            </div>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Для настройки регулярных платежей:</p>
            <p><strong>Email:</strong> bridge.t.calm@gmail.com</p>
            <p><strong>Telegram:</strong> @Buianovich</p>
        `
    };
    
    return contents[type] || '<p>Информация временно недоступна</p>';
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroImage.style.transform = `translateY(${parallax}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Observe stat numbers and animate them when they come into view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                // This is a simple example - you could extract numbers and animate them
                console.log('Animating stat:', statNumber.textContent);
            }
        }
    });
});

document.querySelectorAll('.stat-item').forEach(item => {
    statObserver.observe(item);
});

// Loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Form submission handling (if you add forms later)
function handleFormSubmission(formData, type) {
    console.log(`Submitting ${type} form:`, formData);
    // Here you would typically send data to your backend
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Console greeting
console.log(`
🌟 Bridge to Calm - Helping those affected by war
💙 Every interaction matters
🤝 Join us in making a difference

Contact: bridge.t.calm@gmail.com
Telegram: @Buianovich
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        }, 0);
    });
}