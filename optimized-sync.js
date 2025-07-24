// 🚀 Sistema de Sincronização Otimizado
// Resolve problemas de performance e permissões

class OptimizedContentSync {
    constructor() {
        this.initFirebase();
        this.isOnline = navigator.onLine;
        this.retryAttempts = 0;
        this.maxRetries = 3;
        this.setupOfflineHandling();
        this.setupListeners();
    }
    
    initFirebase() {
        const firebaseConfig = {
            apiKey: "AIzaSyCTcvqfii2TE08vqolCgqv0jI9VWTfarOA",
            authDomain: "barbeariasamuelabreu.firebaseapp.com",
            projectId: "barbeariasamuelabreu",
            storageBucket: "barbeariasamuelabreu.firebasestorage.app",
            messagingSenderId: "690733163957",
            appId: "1:690733163957:web:c3f77d1219a81eeeb6e5fc"
        };
        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        this.db = firebase.firestore();
        
        // Configurações de performance
        this.db.settings({
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });
        
        // Habilitar persistência offline
        this.db.enablePersistence({ synchronizeTabs: true })
            .catch((err) => {
                console.warn('⚠️ Persistência offline não disponível:', err.code);
            });
    }
    
    setupOfflineHandling() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.retryAttempts = 0;
            console.log('🌐 Conexão restaurada');
            this.retryListeners();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📴 Modo offline - usando cache');
            this.loadFallbackData();
        });
    }
    
    setupListeners() {
        if (!this.isOnline) {
            this.loadFallbackData();
            return;
        }
        
        console.log('🔄 Configurando listeners otimizados...');
        
        // Usar debounce para evitar múltiplas chamadas
        this.setupDebouncedListener('siteContent', 'main', (data) => {
            this.updateMainContent(data);
        });
        
        this.setupDebouncedListener('siteContent', 'schedule', (data) => {
            this.updateSchedule(data);
        });
        
        this.setupDebouncedListener('siteContent', 'contact', (data) => {
            this.updateContact(data);
        });
    }
    
    setupDebouncedListener(collection, document, callback) {
        let timeoutId;
        
        this.db.collection(collection).doc(document)
            .onSnapshot(
                (doc) => {
                    if (doc.exists) {
                        // Debounce para evitar atualizações excessivas
                        clearTimeout(timeoutId);
                        timeoutId = setTimeout(() => {
                            callback(doc.data());
                        }, 300);
                    }
                },
                (error) => {
                    console.error(`❌ Erro no listener ${collection}/${document}:`, error.code);
                    
                    if (error.code === 'permission-denied') {
                        console.warn('🔐 Acesso negado - verificar regras do Firestore');
                        this.handlePermissionError(collection, document);
                    } else if (error.code === 'unavailable') {
                        console.warn('📡 Serviço indisponível - tentando reconectar...');
                        this.retryConnection();
                    }
                    
                    // Usar dados de fallback
                    this.loadFallbackData();
                }
            );
    }
    
    handlePermissionError(collection, document) {
        console.warn(`🚨 Erro de permissão em ${collection}/${document}`);
        console.log('💡 Soluções:');
        console.log('1. Verificar se as regras do Firestore estão configuradas');
        console.log('2. Fazer login no sistema administrativo');
        console.log('3. Verificar se o usuário tem permissões adequadas');
        
        // Mostrar notificação amigável
        this.showUserNotification('Sistema funcionando em modo offline. Algumas funcionalidades podem estar limitadas.');
    }
    
    retryConnection() {
        if (this.retryAttempts < this.maxRetries) {
            this.retryAttempts++;
            console.log(`🔄 Tentativa de reconexão ${this.retryAttempts}/${this.maxRetries}`);
            
            setTimeout(() => {
                this.setupListeners();
            }, 2000 * this.retryAttempts); // Backoff exponencial
        } else {
            console.warn('❌ Máximo de tentativas excedido. Modo offline permanente.');
            this.loadFallbackData();
        }
    }
    
    retryListeners() {
        if (this.isOnline && this.retryAttempts > 0) {
            console.log('🔄 Reconectando listeners...');
            this.setupListeners();
        }
    }
    
    // Métodos de atualização otimizados
    updateMainContent(data) {
        this.performUpdate(() => {
            if (data.title) {
                document.title = data.title;
                this.safeUpdateElements('.hero h1, .site-title, h1', data.title);
            }
            
            if (data.description) {
                this.safeUpdateElements('.hero p, .site-description, .description', data.description);
            }
            
            if (data.mission) {
                this.safeUpdateElements('.mission, .about-text, .mission-text', data.mission);
            }
            
            this.updateMetaTags(data);
            console.log('✅ Conteúdo principal atualizado');
        });
    }
    
    updateSchedule(data) {
        this.performUpdate(() => {
            const scheduleContainer = document.querySelector('.schedule, .horarios, .funcionamento');
            if (scheduleContainer) {
                scheduleContainer.innerHTML = this.generateScheduleHTML(data);
            }
            console.log('✅ Horários atualizados');
        });
    }
    
    updateContact(data) {
        this.performUpdate(() => {
            if (data.address) {
                this.safeUpdateElements('.address, .endereco, .contact-address', data.address);
            }
            
            if (data.phone) {
                this.safeUpdateElements('.phone, .telefone, .contact-phone', data.phone);
                this.updatePhoneLinks(data.phone);
            }
            
            if (data.email) {
                this.safeUpdateElements('.email, .contact-email', data.email);
                this.updateEmailLinks(data.email);
            }
            
            if (data.instagram) {
                this.safeUpdateElements('.instagram, .contact-instagram', data.instagram);
                this.updateInstagramLinks(data.instagram);
            }
            
            console.log('✅ Contato atualizado');
        });
    }
    
    // Utilitários otimizados
    performUpdate(updateFunction) {
        // Usar requestAnimationFrame para melhor performance
        requestAnimationFrame(() => {
            try {
                updateFunction();
            } catch (error) {
                console.error('❌ Erro durante atualização:', error);
            }
        });
    }
    
    safeUpdateElements(selector, text) {
        try {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el && el.textContent !== text) {
                    el.textContent = text;
                }
            });
        } catch (error) {
            console.warn(`⚠️ Erro ao atualizar elementos ${selector}:`, error);
        }
    }
    
    updateMetaTags(data) {
        if (data.metaDescription) {
            this.updateOrCreateMetaTag('description', data.metaDescription);
        }
        
        if (data.keywords) {
            this.updateOrCreateMetaTag('keywords', data.keywords);
        }
    }
    
    updateOrCreateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }
    
    updatePhoneLinks(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.href = `https://wa.me/55${cleanPhone}`;
        });
    }
    
    updateEmailLinks(email) {
        const emailLinks = document.querySelectorAll('a[href*="mailto"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${email}`;
        });
    }
    
    updateInstagramLinks(instagram) {
        const cleanInsta = instagram.replace('@', '');
        const instaLinks = document.querySelectorAll('a[href*="instagram"]');
        instaLinks.forEach(link => {
            link.href = `https://instagram.com/${cleanInsta}`;
        });
    }
    
    generateScheduleHTML(data) {
        return `
            <h3>⏰ Horários de Funcionamento</h3>
            <div class="schedule-grid">
                <div class="schedule-item">
                    <strong>Segunda a Sexta</strong>
                    <p>Manhã: ${data.weekdayMorning || 'Fechado'}</p>
                    <p>Tarde: ${data.weekdayAfternoon || 'Fechado'}</p>
                </div>
                <div class="schedule-item">
                    <strong>Sábado</strong>
                    <p>Manhã: ${data.saturdayMorning || 'Fechado'}</p>
                    <p>Tarde: ${data.saturdayAfternoon || 'Fechado'}</p>
                </div>
                <div class="schedule-item">
                    <strong>Domingo</strong>
                    <p>${data.sunday || 'Fechado'}</p>
                </div>
            </div>
        `;
    }
    
    loadFallbackData() {
        console.log('🔄 Carregando dados de fallback...');
        
        const fallbackData = {
            title: 'Barbearia Samuel Abreu',
            description: '11 anos renovando autoestimas com profissionais qualificados e produtos de qualidade.',
            mission: 'Oferecer a nossos clientes através de um ambiente agradável, um bom atendimento com um serviço de qualidade.',
            metaDescription: 'Barbearia Samuel Abreu - 11 anos renovando autoestimas em Fortaleza, CE.',
            keywords: 'barbearia, cortes de cabelo, barba, Fortaleza, Samuel Abreu'
        };
        
        const fallbackSchedule = {
            weekdayMorning: '08:00 às 12:00',
            weekdayAfternoon: '14:00 às 18:00',
            saturdayMorning: '08:00 às 12:00',
            saturdayAfternoon: '14:00 às 18:00',
            sunday: '08:00 às 12:00'
        };
        
        const fallbackContact = {
            address: 'Sabiaguaba, Fortaleza - CE',
            phone: '(85) 99999-9999',
            email: 'contato@barbeariasamuelabreu.com',
            instagram: '@barbeariasamuelabreu'
        };
        
        this.updateMainContent(fallbackData);
        this.updateSchedule(fallbackSchedule);
        this.updateContact(fallbackContact);
        
        console.log('✅ Dados de fallback carregados');
    }
    
    showUserNotification(message) {
        // Criar notificação discreta
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 9999;
            max-width: 300px;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
    
    // Método para carregar dados iniciais com retry
    async loadInitialData() {
        if (!this.isOnline) {
            this.loadFallbackData();
            return;
        }
        
        try {
            console.log('📥 Carregando dados iniciais...');
            
            const promises = [
                this.db.collection('siteContent').doc('main').get(),
                this.db.collection('siteContent').doc('schedule').get(),
                this.db.collection('siteContent').doc('contact').get()
            ];
            
            const [mainDoc, scheduleDoc, contactDoc] = await Promise.allSettled(promises);
            
            if (mainDoc.status === 'fulfilled' && mainDoc.value.exists) {
                this.updateMainContent(mainDoc.value.data());
            }
            
            if (scheduleDoc.status === 'fulfilled' && scheduleDoc.value.exists) {
                this.updateSchedule(scheduleDoc.value.data());
            }
            
            if (contactDoc.status === 'fulfilled' && contactDoc.value.exists) {
                this.updateContact(contactDoc.value.data());
            }
            
            console.log('✅ Dados iniciais carregados');
        } catch (error) {
            console.warn('⚠️ Erro ao carregar dados iniciais:', error.code);
            this.loadFallbackData();
        }
    }
}

// 🚀 Inicialização otimizada
let contentSync;

// Usar intersection observer para carregamento lazy
const initContentSync = () => {
    if (typeof firebase !== 'undefined') {
        contentSync = new OptimizedContentSync();
        
        // Carregar dados após o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => contentSync.loadInitialData(), 500);
            });
        } else {
            setTimeout(() => contentSync.loadInitialData(), 500);
        }
    } else {
        console.warn('⚠️ Firebase não encontrado');
        
        // Fallback se Firebase não carregar
        setTimeout(() => {
            const fallbackSync = new OptimizedContentSync();
            fallbackSync.loadFallbackData();
        }, 1000);
    }
};

// Inicializar quando scripts estiverem prontos
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContentSync);
} else {
    initContentSync();
}

// Exportar para uso global
window.OptimizedContentSync = OptimizedContentSync;
