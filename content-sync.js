// 🔄 Sistema de Sincronização de Conteúdo
// Este script sincroniza o conteúdo do Firestore com o site em tempo real

class ContentSync {
    constructor() {
        this.initFirebase();
        this.setupListeners();
    }
    
    initFirebase() {
        // Configuração do Firebase (credenciais reais)
        const firebaseConfig = {
            apiKey: "AIzaSyCTcvqfii2TE08vqolCgqv0jI9VWTfarOA",
            authDomain: "barbeariasamuelabreu.firebaseapp.com",
            projectId: "barbeariasamuelabreu",
            storageBucket: "barbeariasamuelabreu.firebasestorage.app",
            messagingSenderId: "690733163957",
            appId: "1:690733163957:web:c3f77d1219a81eeeb6e5fc"
        };
        
        // Inicializar apenas se não estiver já inicializado
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        this.db = firebase.firestore();
    }
    
    setupListeners() {
        // Listener para mudanças no conteúdo principal
        this.db.collection('siteContent').doc('main')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    this.updateMainContent(doc.data());
                }
            });
        
        // Listener para mudanças nos horários
        this.db.collection('siteContent').doc('schedule')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    this.updateSchedule(doc.data());
                }
            });
        
        // Listener para mudanças no contato
        this.db.collection('siteContent').doc('contact')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    this.updateContact(doc.data());
                }
            });
    }
    
    updateMainContent(data) {
        try {
            // Atualizar título principal
            if (data.title) {
                const titleElements = document.querySelectorAll('h1, .hero h1, title');
                titleElements.forEach(el => {
                    if (el.tagName === 'TITLE') {
                        el.textContent = `${data.title} - Profissionalismo e Estilo`;
                    } else {
                        el.textContent = data.title;
                    }
                });
            }
            
            // Atualizar descrição
            if (data.description) {
                const descElements = document.querySelectorAll('.hero p, .hero-content p');
                descElements.forEach(el => {
                    el.textContent = data.description;
                });
            }
            
            // Atualizar missão
            if (data.mission) {
                const missionElements = document.querySelectorAll('#sobre .about-text p:first-child');
                missionElements.forEach(el => {
                    el.textContent = data.mission;
                });
            }
            
            // Atualizar meta description
            if (data.metaDescription) {
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) {
                    metaDesc.setAttribute('content', data.metaDescription);
                }
            }
            
            console.log('✅ Conteúdo principal atualizado:', data);
        } catch (error) {
            console.error('❌ Erro ao atualizar conteúdo principal:', error);
        }
    }
    
    updateSchedule(data) {
        try {
            const scheduleTable = document.querySelector('.modern-horario-table tbody');
            if (scheduleTable && data.weekdayMorning) {
                scheduleTable.innerHTML = `
                    <tr>
                        <td>Segunda à Sexta</td>
                        <td>${data.weekdayMorning}<br>${data.weekdayAfternoon || ''}</td>
                    </tr>
                    <tr>
                        <td>Sábado</td>
                        <td>${data.saturdayMorning || ''}<br>${data.saturdayAfternoon || ''}</td>
                    </tr>
                    <tr>
                        <td>Domingo</td>
                        <td>${data.sunday || 'Fechado'}</td>
                    </tr>
                `;
            }
            
            console.log('✅ Horários atualizados:', data);
        } catch (error) {
            console.error('❌ Erro ao atualizar horários:', error);
        }
    }
    
    updateContact(data) {
        try {
            // Atualizar endereço no footer
            if (data.address || data.neighborhood || data.city) {
                const addressElements = document.querySelectorAll('.footer-section p');
                addressElements.forEach(el => {
                    if (el.textContent.includes('📍')) {
                        el.innerHTML = `📍 ${data.address || ''}<br>${data.neighborhood || ''}, ${data.city || ''}`;
                    }
                });
            }
            
            // Atualizar link do WhatsApp
            if (data.whatsappLink) {
                const whatsappLinks = document.querySelectorAll('a[href*="wa.link"], a[href*="whatsapp"]');
                whatsappLinks.forEach(link => {
                    link.setAttribute('href', data.whatsappLink);
                });
            }
            
            // Atualizar redes sociais
            if (data.instagram) {
                // Selecionar apenas links do Instagram da barbearia (não links pessoais)
                const instaLinks = document.querySelectorAll('a[href*="instagram"]:not([href*="mateusprodev"])');
                instaLinks.forEach(link => {
                    link.setAttribute('href', data.instagram);
                });
            }
            
            if (data.facebook) {
                const facebookLinks = document.querySelectorAll('a[href*="facebook"]');
                facebookLinks.forEach(link => {
                    link.setAttribute('href', data.facebook);
                });
            }
            
            console.log('✅ Informações de contato atualizadas:', data);
        } catch (error) {
            console.error('❌ Erro ao atualizar contato:', error);
        }
    }
    
    // Método para carregar conteúdo inicial
    async loadInitialContent() {
        try {
            const [mainDoc, scheduleDoc, contactDoc] = await Promise.all([
                this.db.collection('siteContent').doc('main').get(),
                this.db.collection('siteContent').doc('schedule').get(),
                this.db.collection('siteContent').doc('contact').get()
            ]);
            
            if (mainDoc.exists) this.updateMainContent(mainDoc.data());
            if (scheduleDoc.exists) this.updateSchedule(scheduleDoc.data());
            if (contactDoc.exists) this.updateContact(contactDoc.data());
            
            console.log('🚀 Conteúdo inicial carregado com sucesso!');
        } catch (error) {
            console.warn('⚠️ Erro ao carregar conteúdo inicial (usando valores padrão):', error);
            // O site continuará funcionando com os valores estáticos
        }
    }
}

// Função para inicializar a sincronização apenas se o Firebase estiver disponível
function initContentSync() {
    if (typeof firebase !== 'undefined' && firebase.apps) {
        try {
            const contentSync = new ContentSync();
            
            // Carregar conteúdo inicial após o DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    contentSync.loadInitialContent();
                });
            } else {
                contentSync.loadInitialContent();
            }
            
            // Adicionar indicador visual de sincronização ativa
            const syncIndicator = document.createElement('div');
            syncIndicator.innerHTML = '🔄 Sincronização ativa';
            syncIndicator.style.cssText = `
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: rgba(212, 175, 55, 0.9);
                color: #000;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 12px;
                font-weight: 600;
                z-index: 1000;
                display: none;
            `;
            document.body.appendChild(syncIndicator);
            
            // Mostrar indicador por 3 segundos
            setTimeout(() => {
                syncIndicator.style.display = 'block';
                setTimeout(() => {
                    syncIndicator.style.display = 'none';
                }, 3000);
            }, 1000);
            
        } catch (error) {
            console.warn('⚠️ Erro ao inicializar sincronização:', error);
        }
    } else {
        console.log('ℹ️ Firebase não disponível - usando conteúdo estático');
    }
}

// Auto-inicializar se o script for carregado
initContentSync();
