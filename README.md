# EventUp 🚀

O **EventUp** é uma plataforma de gestão colaborativa de eventos comunitários. O projeto permite que usuários criem, descubram e se inscrevam em eventos locais, promovendo o engajamento comunitário através de uma interface moderna e responsiva.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React (Vite)
- **Roteamento:** React Router (SPA)
- **Estado Global:** Context API (Auth e UI)
- **Backend as a Service:** Appwrite (Autenticação e Database)
- **Estilização:** CSS Modules

---

## ✨ Funcionalidades

- **Autenticação:** Login, Cadastro e Gerenciamento de sessão.
- **Dashboard de Eventos:** Listagem dinâmica com filtros por localidade.
- **CRUD Completo:** Criação, edição e exclusão de eventos pelos organizadores.
- **Inscrições:** Sistema de "Participar/Sair" de eventos com persistência de dados.
- **Mobile-First:** Interface adaptada para gestos e telas touch.

---

## 👥 Perfis para Teste (Avaliação)

Para fins de correção e validação dos múltiplos perfis de acesso, foram criadas as seguintes contas de teste:

| Perfil        | E-mail         | Senha    |
| :------------ | :------------- | :------- |
| **Usuario 1** | user1@user.com | 12345678 |
| **Usuario 2** | user2@user.com | 12345678 |
| **Usuario 3** | user3@user.com | 12345678 |

---

## 🚀 Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone [https://github.com/seu-usuario/eventup.git](https://github.com/seu-usuario/eventup.git)
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente em um arquivo .env (IDs do Appwrite.

Exemplo:

```bash
VITE_APPWRITE_PROJECT_ID = "seu_id_do_projeto"
VITE_APPWRITE_DATABASE_ID = "seu_id_do_banco"
VITE_APPWRITE_PROJECT_NAME = "nome_do_projeto"
VITE_APPWRITE_ENDPOINT = "endpoint_appwrite"
VITE_APPWRITE_EVENTS_COLLECTION_ID = "id_da_colecao_eventos"
VITE_APPWRITE_REGISTRATIONS_ID = "id_da_colecao_inscricoes"
VITE_APPWRITE_USERS_ID = "id_da_colecao_usuarios"
```

4. Inicie o servidor.

   ```bash
   npm run dev
   ```
