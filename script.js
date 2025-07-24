// ========================================
// BARBEARIA SAMUEL ABREU - SCRIPT MODERNO
// ========================================

class BarberShop {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.setupSmoothScroll();
        this.setupHeaderScroll();
        this.setupFormHandler();
        this.setupWelcomeAnimation();
        this.setupCarousel();
    }

    // Menu Mobile
    setupMobileMenu() {
        const menuToggle = document.querySelector('.barbearia');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Fechar menu ao clicar em um link
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    // Animações de Scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar elementos com fade-in
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));

        // Observar cards de serviços para animação escalonada
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            setTimeout(() => {
                observer.observe(card);
            }, index * 100);
        });

        // Observar itens da galeria
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 150);
        });
    }

    // Scroll Suave para Âncoras
    setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Header com efeito no scroll
    setupHeaderScroll() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Esconder/mostrar header baseado na direção do scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // Manipulador de Formulário
    setupFormHandler() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Loading state
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (response.ok) {
                        this.showNotification('Mensagem enviada com sucesso!', 'success');
                        form.reset();
                    } else {
                        throw new Error('Erro no envio');
                    }
                } catch (error) {
                    this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        });
    }

    // Carrossel Moderno
    setupCarousel() {
        const track = document.getElementById('carouselTrack');
        const slides = document.querySelectorAll('.carousel-slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');
        
        if (!track || slides.length === 0) return;
        
        let currentSlide = 0;
        let isAutoPlaying = true;
        let autoPlayInterval;
        
        // Função para ir para um slide específico
        const goToSlide = (slideIndex, direction = 'next') => {
            if (slideIndex < 0) slideIndex = slides.length - 1;
            if (slideIndex >= slides.length) slideIndex = 0;
            
            currentSlide = slideIndex;
            
            // Atualizar posição do track
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Atualizar indicadores
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Adicionar animação
            slides.forEach((slide, index) => {
                slide.classList.remove('slide-in-left', 'slide-in-right');
                if (index === currentSlide) {
                    slide.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
                }
            });
            
            // Analytics tracking
            if (typeof BarberShop !== 'undefined') {
                BarberShop.trackClick('carousel_slide_view', `slide_${currentSlide + 1}`);
            }
        };
        
        // Próximo slide
        const nextSlide = () => {
            goToSlide(currentSlide + 1, 'next');
        };
        
        // Slide anterior
        const prevSlide = () => {
            goToSlide(currentSlide - 1, 'prev');
        };
        
        // Auto-play
        const startAutoPlay = () => {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                if (isAutoPlaying) {
                    nextSlide();
                }
            }, 5000);
        };
        
        const stopAutoPlay = () => {
            isAutoPlaying = false;
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };
        
        const resumeAutoPlay = () => {
            isAutoPlaying = true;
            startAutoPlay();
        };
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 8000);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 8000);
            });
        }
        
        // Indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const direction = index > currentSlide ? 'next' : 'prev';
                goToSlide(index, direction);
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 8000);
            });
        });
        
        // Controle por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 8000);
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 8000);
            }
        });
        
        // Touch/Swipe support
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Verificar se é um swipe horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 8000);
            }
        });
        
        // Pausar auto-play quando o mouse está sobre o carrossel
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', resumeAutoPlay);
        }
        
        // Pausar auto-play quando a aba não está ativa
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                resumeAutoPlay();
            }
        });
        
        // Iniciar auto-play
        startAutoPlay();
        
        // Mostrar primeiro slide
        goToSlide(0);
    }

    // Sistema de Notificações
    showNotification(message, type = 'info') {
        // Remove notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Adicionar estilos inline
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#25D366' : type === 'error' ? '#ff4444' : '#333'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Fechar notificação
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Animação de Boas-vindas
    setupWelcomeAnimation() {
        const hero = document.querySelector('.hero');
        if (hero) {
            setTimeout(() => {
                hero.classList.add('loaded');
            }, 100);
        }
    }

    // Função para compartilhamento WhatsApp
    static shareLocation() {
        const text = encodeURIComponent('Confira a localização da Barbearia Samuel Abreu: https://goo.gl/maps/63dDmPkUGqpym9S97');
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    // Função para analytics de cliques
    static trackClick(action, label = '') {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'engagement',
                'event_label': `${action}_${label}`,
                'value': 1
            });
        }
    }
}

// ========================================
// UTILITÁRIOS
// ========================================

// Função para lazy loading de imagens
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Função para performance
function optimizePerformance() {
    // Preload de recursos críticos
    const criticalResources = [
        'img/logo_baber_branco.png',
        'img/logo_barber.png',
        'img/barbearia.jpeg'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar classe principal
    new BarberShop();
    
    // Configurar utilitários
    setupLazyLoading();
    optimizePerformance();
    
    // Adicionar estilos dinâmicos para animações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .hero.loaded .hero-content {
            animation: fadeInUp 1s ease-out;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
        }
        
        header.scrolled {
            background: rgba(15, 15, 15, 0.98);
            backdrop-filter: blur(20px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// ========================================
// EXPOSIÇÃO GLOBAL
// ========================================

// Expor funções para uso em HTML
window.BarberShop = BarberShop;

