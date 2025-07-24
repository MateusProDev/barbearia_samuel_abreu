# 🔥 Configuração Firebase - Passo a Passo

## ⚠️ IMPORTANTE: Configure ANTES de usar o sistema

### 1️⃣ Configurar Regras do Firestore

1. **Acesse**: [Firebase Console](https://console.firebase.google.com/)
2. **Projeto**: barbeariasamuelabreu  
3. **Vá em**: Firestore Database → Regras
4. **Substitua** o conteúdo atual por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 👥 Coleção de usuários
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (resource.data.isAdmin == true || request.auth.uid == userId);
    }
    
    // 📝 Conteúdo do site (público para leitura)
    match /siteContent/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 📞 Informações de contato
    match /contact/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // ✂️ Serviços, galeria, equipe (futuro)
    match /services/{serviceId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /gallery/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /team/{memberId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

5. **Clique** em "Publicar"

---

### 2️⃣ Criar Usuário Administrador

#### Opção A: Firebase Console (Recomendado)

1. **Vá em**: Authentication → Users
2. **Clique**: "Add user"
3. **Preencha**:
   - **Email**: `admin@barbeariasamuelabreu.com`
   - **Password**: `suaSenhaSegura123!`
4. **Clique**: "Add user"

---

### 3️⃣ Criar Documento do Usuário no Firestore

1. **Vá em**: Firestore Database → Data
2. **Coleção**: `users`
3. **Adicionar documento** com ID igual ao UID do usuário criado
4. **Campos**:
   ```
   email: "admin@barbeariasamuelabreu.com" (string)
   name: "Administrador" (string)
   role: "Administrador do sistema" (string)
   isAdmin: true (boolean)
   active: true (boolean)
   createdAt: (timestamp atual)
   ```

---

### 4️⃣ Verificar se Documento de Contato Existe

Se não existir o documento `siteContent/contact`:

1. **Coleção**: `siteContent`
2. **Documento**: `contact`
3. **Campos**:
   ```
   address: "Sabiaguaba, Fortaleza - CE" (string)
   phone: "(85) 99999-9999" (string)
   email: "contato@barbeariasamuelabreu.com" (string)
   instagram: "@barbeariasamuelabreu" (string)
   ```

---

## 🚀 Como Usar o Sistema

### 1. **Login**
- Acesse: `firebase-login.html`
- Email: `admin@barbeariasamuelabreu.com`
- Senha: A que você definiu

### 2. **Dashboard**
- Será redirecionado para: `firebase-dashboard.html`
- ✅ **Conteúdo Principal**: Editar título, descrição, missão
- ✅ **Horários**: Editar funcionamento
- ✅ **Contato**: Editar informações de contato

---

## ✅ Checklist de Configuração

- [ ] Regras do Firestore configuradas
- [ ] Usuário admin criado no Authentication
- [ ] Documento do usuário criado no Firestore (coleção `users`)
- [ ] Documento de contato existe (coleção `siteContent`)
- [ ] Teste de login realizado
- [ ] Teste de edição de conteúdo realizado

---

## 🔧 Solução de Problemas

### ❌ "Missing or insufficient permissions"
- **Solução**: Verificar se as regras do Firestore foram aplicadas corretamente

### ❌ "User not found" no login
- **Solução**: Verificar se o usuário foi criado no Firebase Authentication

### ❌ "Usuário não é administrador"
- **Solução**: Verificar se o documento na coleção `users` tem `isAdmin: true`

---

## 📱 Arquivos do Sistema

- **Login**: `firebase-login.html` (apenas autenticação Firebase)
- **Dashboard**: `firebase-dashboard.html` (completo com Firebase Auth)
- **Regras**: `firestore-rules.txt` (para copiar no console)

---

**💡 Dica**: Siga este guia passo a passo para configuração completa!
