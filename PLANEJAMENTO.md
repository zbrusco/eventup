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

### HU1 - Visualização e Filtro (API Externa)

**Como** um usuário, **eu quero** visualizar a lista de eventos e filtrar por local, **para que** eu possa encontrar atividades do meu interesse.

- **C.A.:** Consumo de API em tempo real; Filtro dinâmico sem reload; Layout responsivo.

### HU2 - Gerenciamento Mobile (Gestos)

**Como** um organizador, **eu quero** gerenciar meus eventos de forma rápida no celular, **para que** eu possa manter minha lista organizada.

- **C.A.:** Interface touch-friendly; Gesto de _swipe_ para a esquerda para revelar o botão de exclusão; Animação fluida.

## 5. Arquitetura e Tecnologias

- **Framework:** ReactJS com Vite.
- **Navegação:** React Router (SPA).
- **Estado Global:** Context API (utilizado para estado de UI e autenticação).
- **Backend:** Appwrite (Auth e Database).
- **Estilização:** CSS Modules e foco em acessibilidade.

## 6. Cronograma de Sprints

1.  **Sprint 1:** Fundação, Router e Integração com Appwrite Auth.
2.  **Sprint 2:** CRUD de Eventos, Dashboard e Refatoração de Domínio.
3.  **Sprint 3:** Lógica de Inscrição e Detalhes do Evento.
4.  **Sprint 4:** Implementação de Gestos Mobile (Swipe), Admin Panel e Polimento.
