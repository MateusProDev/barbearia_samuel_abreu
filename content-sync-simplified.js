// 🔄 Sistema de Sincronização Simplificado
// Sincroniza apenas as coleções existentes: users, siteContent, contact

class SimplifiedContentSync {
    constructor() {
        this.initFirebase();
        this.setupListeners();
    }
    
    initFirebase() {
        // Configuração do Firebase (suas credenciais reais)
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
        console.log('🔄 Configurando listeners para sincronização...');
        
        // Listener para conteúdo principal
        this.db.collection('siteContent').doc('main')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    console.log('📝 Conteúdo principal atualizado');
                    this.updateMainContent(doc.data());
                }
            }, (error) => {
                console.error('Erro no listener de conteúdo principal:', error);
            });
        
        // Listener para horários
        this.db.collection('siteContent').doc('schedule')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    console.log('🕒 Horários atualizados');
                    this.updateSchedule(doc.data());
                }
            }, (error) => {
                console.error('Erro no listener de horários:', error);
            });
        
        // Listener para contato
        this.db.collection('siteContent').doc('contact')
            .onSnapshot((doc) => {
                if (doc.exists) {
                    console.log('📞 Contato atualizado');
                    this.updateContact(doc.data());
                }
            }, (error) => {
                console.error('Erro no listener de contato:', error);
            });
    }
    
    updateMainContent(data) {
        try {
            // Atualizar título da página
            if (data.title) {
                document.title = data.title;
                const titleElements = document.querySelectorAll('.hero h1, .site-title, h1');
                titleElements.forEach(el => {
                    if (el) el.textContent = data.title;
                });
            }
            
            // Atualizar descrição
            if (data.description) {
                const descElements = document.querySelectorAll('.hero p, .site-description, .description');
                descElements.forEach(el => {
                    if (el) el.textContent = data.description;
                });
            }
            
            // Atualizar missão
            if (data.mission) {
                const missionElements = document.querySelectorAll('.mission, .about-text, .mission-text');
                missionElements.forEach(el => {
                    if (el) el.textContent = data.mission;
                });
            }
            
            // Atualizar meta tags
            if (data.metaDescription) {
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = 'description';
                    document.head.appendChild(metaDesc);
                }
                metaDesc.content = data.metaDescription;
            }
            
            if (data.keywords) {
                let metaKeywords = document.querySelector('meta[name="keywords"]');
                if (!metaKeywords) {
                    metaKeywords = document.createElement('meta');
                    metaKeywords.name = 'keywords';
                    document.head.appendChild(metaKeywords);
                }
                metaKeywords.content = data.keywords;
            }
            
            console.log('✅ Conteúdo principal sincronizado');
        } catch (error) {
            console.error('Erro ao atualizar conteúdo principal:', error);
        }
    }
    
    updateSchedule(data) {
        try {
            const scheduleContainer = document.querySelector('.schedule, .horarios, .funcionamento');
            if (scheduleContainer) {
                scheduleContainer.innerHTML = `
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
            
            console.log('✅ Horários sincronizados');
        } catch (error) {
            console.error('Erro ao atualizar horários:', error);
        }
    }
    
    updateContact(data) {
        try {
            // Atualizar endereço
            if (data.address) {
                const addressElements = document.querySelectorAll('.address, .endereco, .contact-address');
                addressElements.forEach(el => {
                    if (el) el.textContent = data.address;
                });
            }
            
            // Atualizar telefone
            if (data.phone) {
                const phoneElements = document.querySelectorAll('.phone, .telefone, .contact-phone');
                phoneElements.forEach(el => {
                    if (el) el.textContent = data.phone;
                });
                
                // Atualizar links do WhatsApp
                const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
                const cleanPhone = data.phone.replace(/\D/g, ''); // Remove caracteres não numéricos
                whatsappLinks.forEach(link => {
                    link.href = `https://wa.me/55${cleanPhone}`;
                });
            }
            
            // Atualizar email
            if (data.email) {
                const emailElements = document.querySelectorAll('.email, .contact-email');
                emailElements.forEach(el => {
                    if (el) el.textContent = data.email;
                });
                
                // Atualizar links de email
                const emailLinks = document.querySelectorAll('a[href*="mailto"]');
                emailLinks.forEach(link => {
                    link.href = `mailto:${data.email}`;
                });
            }
            
            // Atualizar Instagram
            if (data.instagram) {
                const instaElements = document.querySelectorAll('.instagram, .contact-instagram');
                instaElements.forEach(el => {
                    if (el) el.textContent = data.instagram;
                });
                
                // Atualizar links do Instagram
                const instaLinks = document.querySelectorAll('a[href*="instagram"]');
                const cleanInsta = data.instagram.replace('@', '');
                instaLinks.forEach(link => {
                    link.href = `https://instagram.com/${cleanInsta}`;
                });
            }
            
            console.log('✅ Informações de contato sincronizadas');
        } catch (error) {
            console.error('Erro ao atualizar contato:', error);
        }
    }
    
    // Método para carregar dados iniciais
    async loadInitialData() {
        try {
            console.log('📥 Carregando dados iniciais...');
            
            // Carregar conteúdo principal
            const mainDoc = await this.db.collection('siteContent').doc('main').get();
            if (mainDoc.exists) {
                this.updateMainContent(mainDoc.data());
            }
            
            // Carregar horários
            const scheduleDoc = await this.db.collection('siteContent').doc('schedule').get();
            if (scheduleDoc.exists) {
                this.updateSchedule(scheduleDoc.data());
            }
            
            // Carregar contato
            const contactDoc = await this.db.collection('siteContent').doc('contact').get();
            if (contactDoc.exists) {
                this.updateContact(contactDoc.data());
            }
            
            console.log('✅ Dados iniciais carregados com sucesso');
        } catch (error) {
            console.error('❌ Erro ao carregar dados iniciais:', error);
            // Fallback para dados estáticos se houver erro
            this.loadFallbackData();
        }
    }
    
    loadFallbackData() {
        console.log('🔄 Carregando dados de fallback...');
        
        // Dados estáticos de fallback
        const fallbackData = {
            title: 'Barbearia Samuel Abreu',
            description: '11 anos renovando autoestimas com profissionais qualificados e produtos de qualidade.',
            mission: 'Oferecer a nossos clientes através de um ambiente agradável, um bom atendimento com um serviço de qualidade.',
            schedule: {
                weekdayMorning: '08:00 às 12:00',
                weekdayAfternoon: '14:00 às 18:00',
                saturdayMorning: '08:00 às 12:00',
                saturdayAfternoon: '14:00 às 18:00',
                sunday: '08:00 às 12:00'
            },
            contact: {
                address: 'Sabiaguaba, Fortaleza - CE',
                phone: '(85) 99999-9999',
                email: 'contato@barbeariasamuelabreu.com',
                instagram: '@barbeariasamuelabreu'
            }
        };
        
        this.updateMainContent(fallbackData);
        this.updateSchedule(fallbackData.schedule);
        this.updateContact(fallbackData.contact);
    }
}

// 🚀 Inicializar sincronização quando a página carregar
let contentSync;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Iniciando sincronização de conteúdo...');
    
    // Verificar se Firebase está disponível
    if (typeof firebase !== 'undefined') {
        contentSync = new SimplifiedContentSync();
        
        // Carregar dados iniciais após um pequeno delay
        setTimeout(() => {
            contentSync.loadInitialData();
        }, 1000);
    } else {
        console.warn('⚠️ Firebase não encontrado. Usando dados estáticos.');
        // Usar dados estáticos se Firebase não estiver disponível
        setTimeout(() => {
            const fallbackSync = new SimplifiedContentSync();
            fallbackSync.loadFallbackData();
        }, 500);
    }
});

// 🔄 Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimplifiedContentSync;
}
