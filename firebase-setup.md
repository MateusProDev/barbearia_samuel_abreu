# 🔥 Configuração do Firebase para Barbearia Samuel Abreu

## 📋 Passo a Passo para Configurar o Firebase

### 1️⃣ **Criar Projeto no Firebase**
1. Acesse: https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Nome do projeto: `barbearia-samuel-abreu`
4. Ative o Google Analytics (opcional)
5. Aguarde a criação do projeto

### 2️⃣ **Configurar Authentication**
1. No painel do Firebase, vá em **Authentication**
2. Clique em **Começar**
3. Na aba **Sign-in method**, ative:
   - **Email/senha** ✅
4. Na aba **Users**, adicione os usuários:
   - `admin@barbearia-samuel-abreu.com` / `barbearia2024`
   - `samuel@barbearia-samuel-abreu.com` / `samuel123`
   - `kaio@barbearia-samuel-abreu.com` / `kaio123`

### 3️⃣ **Configurar Firestore Database**
1. No painel, vá em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Modo de produção**
4. Selecione a região (preferencialmente `southamerica-east1`)

### 4️⃣ **Regras de Segurança do Firestore**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública do conteúdo do site
    match /siteContent/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
                   exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Dados dos usuários admin
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5️⃣ **Configurar o Web App**
1. No painel, vá em **Configurações do projeto** (ícone de engrenagem)
2. Na aba **Geral**, role até **Seus apps**
3. Clique no ícone **Web** (`</>`)
4. Nome do app: `Barbearia Samuel Abreu Admin`
5. Marque **Firebase Hosting** (opcional)
6. Copie a configuração JavaScript

### 6️⃣ **Atualizar Configuração nos Arquivos**
Substitua a configuração em `login.html` e `admin-dashboard.html`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCTcvqfii2TE08vqolCgqv0jI9VWTfarOA",
  authDomain: "barbeariasamuelabreu.firebaseapp.com",
  projectId: "barbeariasamuelabreu",
  storageBucket: "barbeariasamuelabreu.firebasestorage.app",
  messagingSenderId: "690733163957",
  appId: "1:690733163957:web:c3f77d1219a81eeeb6e5fc"
};
```

### 7️⃣ **Estrutura Inicial do Firestore**

#### Coleção: `siteContent`

**Documento: `main`**
```json
{
  "title": "Barbearia Samuel Abreu",
  "description": "11 anos renovando autoestimas com profissionais qualificados e produtos de qualidade. Venha viver essa experiência conosco.",
  "mission": "Oferecer a nossos clientes através de um ambiente agradável, um bom atendimento com um serviço de qualidade, a fim de proporcionar o aumento da autoestima, em uma experiência única e pessoal.",
  "metaDescription": "Barbearia Samuel Abreu - 11 anos renovando autoestimas com profissionais qualificados. Cortes modernos, barba, pigmentação e muito mais.",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Documento: `schedule`**
```json
{
  "weekdayMorning": "08:00 às 12:00",
  "weekdayAfternoon": "14:00 às 18:50",
  "saturdayMorning": "08:00 às 12:00",
  "saturdayAfternoon": "14:00 às 17:30",
  "sunday": "Fechado",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Documento: `contact`**
```json
{
  "address": "R. Marieta Barreira, 810",
  "neighborhood": "Sabiaguaba",
  "city": "Fortaleza - CE",
  "whatsappLink": "https://wa.link/19u2v4",
  "instagram": "https://www.instagram.com/barbearia_samuel_abreu/",
  "facebook": "https://www.facebook.com/profile.php?id=100009466104944",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Coleção: `users`

**Documento: `[UID_DO_ADMIN]`**
```json
{
  "email": "admin@barbearia-samuel-abreu.com",
  "name": "Administrador",
  "role": "Administrador do Sistema",
  "isAdmin": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### 8️⃣ **Testar a Integração**
1. Salve todos os arquivos
2. Abra `login.html` no navegador
3. Teste o login com as credenciais configuradas
4. Verifique se o dashboard carrega
5. Teste a edição de conteúdo

### 9️⃣ **Funcionalidades Implementadas**

#### ✅ **Sistema de Login**
- Autenticação via Firebase Auth
- Fallback para autenticação local
- Sessão persistente
- Redirecionamento automático

#### ✅ **Dashboard Administrativo**
- Edição de conteúdo do site
- Gerenciamento de horários
- Atualização de informações de contato
- Interface moderna e responsiva

#### ✅ **Firestore Integration**
- Salvamento automático no banco
- Carregamento de dados existentes
- Sincronização em tempo real
- Notificações de sucesso/erro

### 🔒 **Segurança**
- Regras do Firestore protegem dados sensíveis
- Apenas usuários autenticados e admin podem editar
- Leitura pública apenas para conteúdo do site
- Validação tanto no frontend quanto no backend

### 🚀 **Próximos Passos**
1. Configurar Firebase Hosting (opcional)
2. Implementar sincronização automática do site
3. Adicionar backup automático dos dados
4. Criar sistema de logs de atividade

---

**⚠️ Importante**: Mantenha suas chaves do Firebase seguras e nunca as compartilhe publicamente!
