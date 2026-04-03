# Planejamento de Projeto: EventUp (TP2)

## 1. Definição do Projeto

A plataforma **EventUp** é uma aplicação web (SPA) voltada para a gestão colaborativa de eventos comunitários. O projeto foi estruturado para atender aos cenários predefinidos da disciplina, focando em operações de CRUD completo, múltiplos perfis de acesso e consumo de API de backend.

## 2. Escopo e Funcionalidades

- **Autenticação e Autorização:** Gerenciamento de sessões via Appwrite, distinguindo perfis de Organizadores (Host) e Participantes.
- **Módulo de Eventos (CRUD):** \* Criação e edição de eventos (título, descrição, data, local, preço).
  - Dashboard de listagem com filtros dinâmicos.
  - Exclusão de registros com confirmação.
- **Módulo de Inscrições:** Persistência de dados relacionais entre usuários e eventos (Tabela de Registrations).
- **Interface Mobile-First:** Design responsivo e interações baseadas em gestos (Swipe-to-action).

## 3. Gestão Ágil

Aplicação do framework Scrum adaptado para desenvolvimento individual:

- **Backlog:** Histórias de Usuário priorizadas por valor de negócio.
- **Sprints:** Ciclos semanais com entregas funcionais (Incrementos).
- **Kanban:** Controle de fluxo de tarefas (To Do, Doing, Done).

## 4. Histórias de Usuário (HUs)

### HU1 - Visualização e Filtro (Concluído)

**Como** um usuário, **eu quero** visualizar a lista de eventos e filtrar por local, **para que** eu possa encontrar atividades do meu interesse.

- **C.A. (Requisitos Funcionais):** Listagem de eventos recuperados do banco de dados (Appwrite); Filtro de pesquisa pelo status/tipo do evento; Funcionalidade sem page-reload.
- **C.A. (Requisitos Não Funcionais):** Layout responsivo (mobile e desktop); Alta performance na filtragem e renderização dos cartões; Tempos de carregamento otimizados de imagens.

### HU2 - Registro de Usuário com Avatar Dinâmico (Concluído)

**Como** um novo usuário, **eu quero** poder criar uma conta gerando um ícone automaticamente através de API REST, **para que** meu perfil possua uma identidade visual rápida logo que ingresso no sistema.

- **C.A. (Requisitos Funcionais):** Tela de registro segregada e com validação de form; Fetch de ícone da API pública com tratamento da resposta e uso da URL gerada.
- **C.A. (Requisitos Não Funcionais):** Segurança e separação de rotas (`/register` vs `/login`); Integração fluída sem bloquear a thread principal.

### HU3 - Criação e Deleção de Eventos (Concluído)

**Como** um organizador (Host), **eu quero** poder criar novos eventos definindo seus detalhes e deletar os existentes, **para que** eu tenha controle do meu portfólio na plataforma.

- **C.A. (Requisitos Funcionais):** Formulário de criação restrito aos organizadores (rota privada); Exclusão em cascata (apagando o evento e suas inscrições vinculadas).
- **C.A. (Requisitos Não Funcionais):** Retorno de status de _loading_ ("Creating Event..."); Proteção via contexto de autenticação; UX limpa e organizada no formulário.

## 5. Backlog de Próximas Atividades (Atualizado: MVP Entregue)

Com as entregas mais recentes fundamentadas no React Router, Contexto de Autenticação e integrações diretas com o Appwrite, os requisitos principais do projeto foram preenchidos de prontidão.

**Entregas Concluídas (MVP Finalizado):**

- Tela de login e registro de usuários completas com consumo de API.
- Readequação do domínio da aplicação e implementação de navegação SPA com abas seguras.
- Módulo de eventos operante (CRUD - Criação e Deleção em cascata).
- Lógica de participação dinâmica em eventos.
- Estilização responsiva e polimento mobile-first finalizados.

## 6. Arquitetura e Tecnologias

- **Framework:** ReactJS com Vite.
- **Navegação:** React Router (SPA).
- **Estado Global:** Context API (utilizado para estado de UI e autenticação).
- **Backend:** Appwrite (Auth e Database).
- **Estilização:** CSS Modules e foco em acessibilidade.

## 7. Cronograma de Sprints

1.  **Sprint 1:** Fundação da aplicação em React, Setup da Arquitetura de Roteamento e Contexto de Autenticação.
2.  **Sprint 2:** Refatoração de escopo (Domínio para Eventos) e construção de Componentes base e ligações com API.
3.  **Sprint 3:** Desdobramento Funcional Completo (Login, Registro, Deleção, Participação e Criação de Eventos).
4.  **Sprint 4:** Finalização de pendências da Sprint 3 para implementação completa do CRUD.
5.  **Sprint 5:** Revisão Geral das C.As e Histórias de Usuário, docs e ajustes finais de Estilização mobile, Polimento de Layout e implementação de testes.
