# EventUp

O **EventUp** é uma plataforma de gestão colaborativa de eventos comunitários. O projeto permite que usuários criem, descubram e se inscrevam em eventos locais, promovendo o engajamento comunitário através de uma interface moderna e responsiva.

---

## Tecnologias Utilizadas

- Frontend: React (Vite)
- Roteamento: React Router (SPA)
- Estado global: Context API (Auth e UI)
- Backend as a Service: Appwrite (Authentication + Database)
- Estilização: CSS Modules

## Funcionalidades

- Autenticação: login, cadastro e gerenciamento de sessao
- Dashboard de eventos
- CRUD de eventos para organizadores
- Inscricao e cancelamento em eventos com persistencia
- Interface responsiva (mobile-first)

## Como Rodar o Projeto

1. Clone o repositorio

```bash
git clone https://github.com/zbrusco/eventup.git
cd eventup
```

2. Instale as dependências

```bash
npm install
```

3. Configure o Appwrite

No Appwrite, crie:

- 1 Database
- 3 Collections:
  - `events`
  - `registrations`
  - `users`

### Estrutura esperada

#### Collection `events`

- `name` (string)
- `description` (string)
- `price` (number)
- `imageUrl` (string)
- `status` (string)
- `hostId` (string)
- `date` (datetime — UTC, formato ISO 8601)

#### Collection `registrations`

- `eventId` (string)
- `userId` (string)

#### Collection `users`

- `name` (string)
- `avatar` (string)
- `documentId` igual ao `$id` da conta criada no Appwrite Auth

4. Crie o arquivo `.env` na raiz com os IDs do seu projeto Appwrite

```bash
VITE_APPWRITE_PROJECT_ID="seu_project_id"
VITE_APPWRITE_DATABASE_ID="seu_database_id"
VITE_APPWRITE_PROJECT_NAME="seu_project_name"
VITE_APPWRITE_ENDPOINT="https://seu-endpoint/v1"
VITE_APPWRITE_EVENTS_COLLECTION_ID="seu_events_collection_id"
VITE_APPWRITE_REGISTRATIONS_ID="seu_registrations_collection_id"
VITE_APPWRITE_USERS_ID="seu_users_collection_id"
```

5. Inicie o servidor

```bash
npm run dev
```
