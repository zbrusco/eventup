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

- **C.A. (Requisitos Funcionais):** Listagem de eventos recuperados do banco de dados (Appwrite); Filtro de pesquisa pelo local do evento; Funcionalidade sem page-reload.
- **C.A. (Requisitos Não Funcionais):** Layout responsivo (mobile e desktop); Alta performance na filtragem e renderização dos cartões; Tempos de carregamento de imagens ou dados externos em no máximo 2 segundos.

### HU2 - Gerenciamento Mobile (Gestos)

**Como** um organizador, **eu quero** gerenciar meus eventos de forma rápida no celular, **para que** eu possa manter minha lista organizada.

- **C.A. (Requisitos Funcionais):** Interface touch-friendly; Gesto de _swipe_ para a esquerda para revelar o botão de exclusão; Botão de excluir aciona deleção definitiva no sistema.
- **C.A. (Requisitos Não Funcionais):** Animação deve ser fluida (60fps); Compatibilidade multi-browser em dispositivos mobile; Resposta visual e feedback táctil à ação (menos de 200ms de atraso).

### HU3 - Registro de Usuário com Avatar Dinâmico

**Como** um novo usuário, **eu quero** poder criar uma conta gerando um ícone automaticamente através de API REST, **para que** meu perfil possua uma identidade visual rápida logo que ingresso no sistema.

- **C.A. (Requisitos Funcionais):** Tela de registro com validaçao de form; Fetch de ícone da API pública com tratamento da resposta e uso de URL do icone.
- **C.A. (Requisitos Não Funcionais):** Segurança: senhas não transmitidas em plain text; Integração não deve bloquear uso geral da tela (chamadas assíncronas).
-

## 5. Backlog de Próximas Atividades (Priorizado)

O Backlog das próximas atividades baseia-se num fluxo de valor ágil, definindo a ordem pelas dependências e impacto no usuário final.

1.  **Prioridade Alta: Tela de registro de usuário**
    - Necessária pois sem criação de contas, ninguém inicia o fluxo da aplicação. A conta e armazenamento de avatar dependem dessa etapa.
2.  **Prioridade Média-Alta: Deleção de eventos no `api.js` (Finalizado)**
    - Implementar a função CRUD real para complementar o módulo de eventos, permitindo ao dono do evento gerenciar sua estabilidade.
3.  **Prioridade Média: Sistema de navegação**
    - Já está parcialmente implementado/funcionando com React Router, porém deve ser revisado caso haja novas páginas e conferir rotas privadas.
4.  **Prioridade Baixa/Contínua: Testes com React Testing Library**
    - Importante para garantir a qualidade, mas usualmente entra como critério `Done` iterativo ao longo das sprints ou na fase de estabilização estrutural.

## 6. Arquitetura e Tecnologias

- **Framework:** ReactJS com Vite.
- **Navegação:** React Router (SPA).
- **Estado Global:** Context API (utilizado para estado de UI e autenticação).
- **Backend:** Appwrite (Auth e Database).
- **Estilização:** CSS Modules e foco em acessibilidade.

## 7. Cronograma de Sprints

1.  **Sprint 1:** Fundação, Router e Integração com Appwrite Auth.
2.  **Sprint 2:** CRUD de Eventos, Dashboard e Refatoração de Domínio.
3.  **Sprint 3:** Lógica de Inscrição e Detalhes do Evento.
4.  **Sprint 4:** Implementação de Gestos Mobile (Swipe), Admin Panel e Polimento.
