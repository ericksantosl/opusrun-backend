# Sobre o projeto

API REST para gerenciamento de tarefas, permitindo criar, listar, concluir e excluir tarefas.

## Tecnologias utilizadas

* Node.js
* Express
* Prisma ORM

## Funcionalidades

* Criar uma nova tarefa.
* Listar todas as tarefas cadastradas.
* Marcar uma tarefa como concluída.
* Excluir uma tarefa.

## Como executar

1. Faça o download ou clone este repositório.
2. Instale as dependências.
3. Crie um arquivo `.env` e configure as variáveis `PORT` e `DATABASE_URL`. Por padrão, o projeto utiliza PostgreSQL.
4. Execute as migrações do Prisma com `npx prisma migrate dev`.
5. Inicie o servidor.

## Autor

Erick Santos
