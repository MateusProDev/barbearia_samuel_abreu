# 🗄️ Estrutura Completa do Banco de Dados Firestore
## Barbearia Samuel Abreu

---

## 📋 **COLEÇÕES E DOCUMENTOS**

### 🔐 **Coleção: `users`**
**Descrição:** Dados dos usuários administrativos

#### **Documento: `[UID_DO_USUARIO]` (gerado automaticamente)**
```json
{
  "email": "admin@barbeariasamuelabreu.com",
  "name": "Administrador",
  "role": "Administrador do Sistema",
  "isAdmin": true,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "lastLogin": "2024-07-24T10:00:00.000Z",
  "active": true
}
```

#### **Documento: `[UID_DO_SAMUEL]`**
```json
{
  "email": "samuel@barbeariasamuelabreu.com",
  "name": "Samuel Abreu",
  "role": "Proprietário & Barbeiro Master",
  "isAdmin": true,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "lastLogin": "2024-07-24T10:00:00.000Z",
  "active": true
}
```

#### **Documento: `[UID_DO_KAIO]`**
```json
{
  "email": "kaio@barbeariasamuelabreu.com",
  "name": "Kaio",
  "role": "Barbeiro Profissional",
  "isAdmin": true,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "lastLogin": "2024-07-24T10:00:00.000Z",
  "active": true
}
```

---

### 📄 **Coleção: `siteContent`**
**Descrição:** Conteúdo editável do site

#### **Documento: `main`**
```json
{
  "title": "Barbearia Samuel Abreu",
  "description": "11 anos renovando autoestimas com profissionais qualificados e produtos de qualidade. Venha viver essa experiência conosco.",
  "mission": "Oferecer a nossos clientes através de um ambiente agradável, um bom atendimento com um serviço de qualidade, a fim de proporcionar o aumento da autoestima, em uma experiência única e pessoal. Trabalhamos com profissionais qualificados e bons produtos para os cuidados da barba e cabelo, sempre priorizando a satisfação e bem-estar de nossos clientes.",
  "metaDescription": "Barbearia Samuel Abreu - 11 anos renovando autoestimas com profissionais qualificados. Cortes modernos, barba, pigmentação e muito mais em Fortaleza, CE.",
  "keywords": "barbearia, cortes de cabelo, barba, Fortaleza, Samuel Abreu, fade, degradê, barbeiro profissional",
  "updatedAt": "2024-07-24T10:00:00.000Z",
  "updatedBy": "admin@barbeariasamuelabreu.com"
}
```

#### **Documento: `schedule`**
```json
{
  "weekdayMorning": "08:00 às 12:00",
  "weekdayAfternoon": "14:00 às 18:50",
  "saturdayMorning": "08:00 às 12:00",
  "saturdayAfternoon": "14:00 às 17:30",
  "sunday": "Fechado",
  "specialDates": {
    "2024-12-25": "Fechado - Natal",
    "2024-01-01": "Fechado - Ano Novo"
  },
  "updatedAt": "2024-07-24T10:00:00.000Z",
  "updatedBy": "samuel@barbeariasamuelabreu.com"
}
```

#### **Documento: `contact`**
```json
{
  "address": "R. Marieta Barreira, 810",
  "neighborhood": "Sabiaguaba",
  "city": "Fortaleza - CE",
  "cep": "60830-000",
  "phone": "(85) 8505-3792",
  "whatsappLink": "https://wa.link/19u2v4",
  "whatsappNumber": "5585850537920",
  "instagram": "https://www.instagram.com/barbearia_samuel_abreu/",
  "facebook": "https://www.facebook.com/profile.php?id=100009466104944",
  "email": "contato@barbeariasamuelabreu.com",
  "googleMaps": "https://maps.google.com/?q=R.+Marieta+Barreira,+810,+Sabiaguaba,+Fortaleza",
  "updatedAt": "2024-07-24T10:00:00.000Z",
  "updatedBy": "admin@barbeariasamuelabreu.com"
}
```

---

### 💼 **Coleção: `services`**
**Descrição:** Serviços oferecidos pela barbearia

#### **Documento: `cabelo_barba`**
```json
{
  "name": "CABELO E BARBA",
  "description": "Corte completo com acabamento perfeito da barba, deixando você com visual impecável",
  "price": 35,
  "duration": 60,
  "category": "combo",
  "image": "img/cabelo e barba.jpeg",
  "active": true,
  "popular": true,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "updatedAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `corte_infantil`**
```json
{
  "name": "CORTE INFANTIL",
  "description": "Atendimento especializado para crianças com ambiente acolhedor e profissionais experientes",
  "price": 25,
  "duration": 45,
  "category": "infantil",
  "image": "img/Corte infantil.jpeg",
  "active": true,
  "popular": false,
  "ageRange": "3-12 anos",
  "createdAt": "2024-07-24T10:00:00.000Z",
  "updatedAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `pigmentacao`**
```json
{
  "name": "PIGMENTAÇÃO",
  "description": "Técnica avançada para cobertura de fios brancos e realce da cor natural",
  "price": 40,
  "duration": 90,
  "category": "coloracao",
  "image": "img/pigmentacao.jpeg",
  "active": true,
  "popular": false,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "updatedAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `sobrancelha`**
```json
{
  "name": "SOBRANCELHA",
  "description": "Design e modelagem de sobrancelhas para valorizar o olhar masculino",
  "price": 15,
  "duration": 30,
  "category": "design",
  "image": "img/sombracelha.jpeg",
  "active": true,
  "popular": false,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "updatedAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `corte_tesoura`**
```json
{
  "name": "CORTE NA TESOURA",
  "description": "Técnica clássica com acabamento refinado para um visual sofisticado",
  "price": 30,
  "duration": 50,
  "category": "classico",
  "image": "img/classico na tesoura.jpeg",
  "active": true,
  "popular": false,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "updatedAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `luzes`**
```json
{
  "name": "LUZES",
  "description": "Mechas e luzes para criar um visual moderno e diferenciado",
  "price": 80,
  "duration": 120,
  "category": "coloracao",
  "image": "img/luzes.jpeg",
  "active": true,
  "popular": false,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "updatedAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `platinado`**
```json
{
  "name": "PLATINADO",
  "description": "Coloração platinada para um visual arrojado e contemporâneo",
  "price": 100,
  "duration": 150,
  "category": "coloracao",
  "image": "img/platinado.jpeg",
  "active": true,
  "popular": false,
  "createdAt": "2024-07-24T10:00:00.000Z",
  "updatedAt": "2024-07-24T10:00:00.000Z"
}
```

---

### 🖼️ **Coleção: `gallery`**
**Descrição:** Galeria de trabalhos realizados

#### **Documento: `taper_fade`**
```json
{
  "name": "Taper Fade Americano",
  "description": "Estilo americano moderno com degradê apenas no início da parte de trás",
  "image": "img/Corte taper fade Americano.jpeg",
  "category": "fade",
  "active": true,
  "featured": true,
  "tags": ["fade", "americano", "moderno"],
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `mid_fade`**
```json
{
  "name": "Mid Fade",
  "description": "Sombreado gradual visível e marcado a partir da metade da cabeça",
  "image": "img/Mid fade.jpeg",
  "category": "fade",
  "active": true,
  "featured": true,
  "tags": ["fade", "medio", "gradual"],
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `high_fade`**
```json
{
  "name": "High Fade",
  "description": "Acabamentos versáteis: régua, freestyle, disfarçado, com listra e waves",
  "image": "img/High fadeDegradê alto.jpeg",
  "category": "fade",
  "active": true,
  "featured": true,
  "tags": ["fade", "alto", "versatil"],
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `social_classico`**
```json
{
  "name": "Social Clássico",
  "description": "Elegância atemporal com linhas limpas e contornos precisos",
  "image": "img/Social Clássico..jpeg",
  "category": "classico",
  "active": true,
  "featured": false,
  "tags": ["social", "classico", "elegante"],
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `corte_social`**
```json
{
  "name": "Corte Social",
  "description": "Modelo tradicional perfeito para todas as ocasiões",
  "image": "img/corte_social.jpeg",
  "category": "classico",
  "active": true,
  "featured": false,
  "tags": ["social", "tradicional", "formal"],
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `corte_infantil_gallery`**
```json
{
  "name": "Corte Infantil",
  "description": "Atenção especial para aumentar a autoestima dos pequenos",
  "image": "img/Corte infantil.jpeg",
  "category": "infantil",
  "active": true,
  "featured": false,
  "tags": ["infantil", "criancas", "cuidado"],
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

---

### 👥 **Coleção: `team`**
**Descrição:** Equipe de profissionais

#### **Documento: `samuel`**
```json
{
  "name": "Samuel Abreu",
  "role": "Proprietário e Barbeiro Master",
  "description": "11 anos de experiência renovando autoestimas",
  "experience": 11,
  "specialties": ["Fade", "Barba", "Cortes Clássicos", "Pigmentação"],
  "mainImage": "img/proprietario.jpeg",
  "images": [
    "img/proprietario.jpeg",
    "img/proprietario 2.jpeg",
    "img/samu.jpeg"
  ],
  "active": true,
  "featured": true,
  "instagram": "@samuel_barber",
  "bio": "Fundador da barbearia, especialista em técnicas modernas e clássicas. Apaixonado por transformar vidas através do cuidado pessoal.",
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

#### **Documento: `kaio`**
```json
{
  "name": "Kaio",
  "role": "Barbeiro Profissional",
  "description": "Especialista em cortes modernos e técnicas avançadas",
  "experience": 5,
  "specialties": ["Fade", "Degradê", "Cortes Modernos", "Design"],
  "mainImage": "img/kaioUm.jpeg",
  "images": [
    "img/kaioUm.jpeg",
    "img/kaioDois.jpeg"
  ],
  "active": true,
  "featured": true,
  "instagram": "@kaio_barber",
  "bio": "Barbeiro talentoso especializado em cortes modernos e técnicas de fade. Sempre atualizado com as últimas tendências.",
  "createdAt": "2024-07-24T10:00:00.000Z"
}
```

---

### ⚙️ **Coleção: `settings`**
**Descrição:** Configurações gerais do sistema

#### **Documento: `site`**
```json
{
  "name": "Barbearia Samuel Abreu",
  "slogan": "Profissionalismo e Estilo",
  "theme": "gold-dark",
  "primaryColor": "#d4af37",
  "secondaryColor": "#f1c40f",
  "logo": "img/logo_barber.png",
  "logoWhite": "img/logo_baber_branco.png",
  "favicon": "img/logo_barber.png",
  "analytics": "G-150XXE438D",
  "maintenance": false,
  "version": "2.0.0",
  "lastUpdate": "2024-07-24T10:00:00.000Z",
  "features": {
    "appointment": false,
    "ecommerce": false,
    "blog": false,
    "reviews": true
  }
}
```

#### **Documento: `social`**
```json
{
  "instagram": {
    "url": "https://www.instagram.com/barbearia_samuel_abreu/",
    "username": "@barbearia_samuel_abreu",
    "active": true
  },
  "facebook": {
    "url": "https://www.facebook.com/profile.php?id=100009466104944",
    "active": true
  },
  "whatsapp": {
    "number": "5585850537920",
    "link": "https://wa.link/19u2v4",
    "active": true
  },
  "youtube": {
    "url": "",
    "active": false
  },
  "tiktok": {
    "url": "",
    "active": false
  }
}
```

---

### 📊 **Coleção: `analytics`** (Futura)
**Descrição:** Dados de analytics e estatísticas

#### **Documento: `daily_[YYYY-MM-DD]`**
```json
{
  "date": "2024-07-24",
  "visits": 150,
  "uniqueVisitors": 120,
  "pageViews": 450,
  "averageTime": 180,
  "bounceRate": 0.35,
  "topPages": [
    {"page": "/", "views": 200},
    {"page": "/servicos", "views": 100},
    {"page": "/contatos", "views": 80}
  ],
  "devices": {
    "mobile": 60,
    "desktop": 30,
    "tablet": 10
  },
  "createdAt": "2024-07-24T23:59:59.000Z"
}
```

---

### 💬 **Coleção: `reviews`** (Futura)
**Descrição:** Avaliações e comentários dos clientes

#### **Documento: `[REVIEW_ID]`**
```json
{
  "clientName": "João Silva",
  "rating": 5,
  "comment": "Excelente atendimento! Samuel é um profissional incrível.",
  "service": "cabelo_barba",
  "barber": "samuel",
  "date": "2024-07-24T15:30:00.000Z",
  "approved": true,
  "featured": false,
  "response": "Obrigado João! Foi um prazer atendê-lo.",
  "responseDate": "2024-07-24T16:00:00.000Z"
}
```

---

## 🔒 **REGRAS DE SEGURANÇA FIRESTORE**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Conteúdo do site - leitura pública, escrita apenas admin
    match /siteContent/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Serviços - leitura pública, escrita apenas admin
    match /services/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Galeria - leitura pública, escrita apenas admin
    match /gallery/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Equipe - leitura pública, escrita apenas admin
    match /team/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Configurações - leitura pública, escrita apenas admin
    match /settings/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Usuários - acesso restrito
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Analytics - apenas admin
    match /analytics/{document} {
      allow read, write: if isAdmin();
    }
    
    // Reviews - leitura pública, escrita autenticada, aprovação admin
    match /reviews/{document} {
      allow read: if resource.data.approved == true;
      allow create: if request.auth != null;
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Função auxiliar para verificar admin
    function isAdmin() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

---

## 📝 **COMO CRIAR NO FIREBASE CONSOLE**

### **Passo 1: Acessar Firestore**
1. Vá para: https://console.firebase.google.com/project/barbeariasamuelabreu/firestore
2. Clique em "Criar banco de dados"
3. Escolha "Modo de produção"
4. Selecione região: `southamerica-east1`

### **Passo 2: Criar Coleções**
1. Clique em "Iniciar coleção"
2. Digite o nome: `siteContent`
3. Clique em "Próximo"
4. Crie o primeiro documento: `main`
5. Adicione os campos conforme mostrado acima

### **Passo 3: Repetir para todas as coleções**
- `users`
- `siteContent`
- `services`
- `gallery`
- `team`
- `settings`

### **Passo 4: Configurar Regras**
1. Vá na aba "Regras"
2. Cole o código de regras acima
3. Clique em "Publicar"

---

**🚀 Use o arquivo `firebase-setup-auto.html` para configurar automaticamente!**
