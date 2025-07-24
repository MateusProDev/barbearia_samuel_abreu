// 🔧 Script para criar documento de contato se não existir

async function createContactDocumentIfNeeded() {
    try {
        // Configuração do Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCTcvqfii2TE08vqolCgqv0jI9VWTfarOA",
            authDomain: "barbeariasamuelabreu.firebaseapp.com",
            projectId: "barbeariasamuelabreu",
            storageBucket: "barbeariasamuelabreu.firebasestorage.app",
            messagingSenderId: "690733163957",
            appId: "1:690733163957:web:c3f77d1219a81eeeb6e5fc"
        };

        // Inicializar Firebase se não estiver inicializado
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        const db = firebase.firestore();

        // Verificar se o documento de contato existe
        const contactDoc = await db.collection('siteContent').doc('contact').get();
        
        if (!contactDoc.exists) {
            console.log('📞 Documento de contato não encontrado. Criando...');
            
            // Criar documento de contato com dados padrão
            await db.collection('siteContent').doc('contact').set({
                address: "Sabiaguaba, Fortaleza - CE",
                phone: "(85) 99999-9999",
                email: "contato@barbeariasamuelabreu.com",
                instagram: "@barbeariasamuelabreu",
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedBy: "sistema"
            });
            
            console.log('✅ Documento de contato criado com sucesso!');
        } else {
            console.log('✅ Documento de contato já existe');
        }

    } catch (error) {
        console.error('❌ Erro ao verificar/criar documento de contato:', error);
    }
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que o Firebase está carregado
    setTimeout(createContactDocumentIfNeeded, 2000);
});
