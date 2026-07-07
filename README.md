# Sobre o projeto

API REST para gerenciamento de tarefas, permitindo criar, listar, concluir e excluir tarefas.

## Tecnologias utilizadas

* Node.js
* Express
* Prisma ORM


## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/task` | Criar uma tarefa |
| GET | `/task` | Listar todas as tarefas |
| PATCH | `/task/:id` | Marcar tarefa como concluída |
| DELETE | `/task/:id` | Excluir uma tarefa |

## Funcionalidades

### 1. Criar uma nova tarefa

Cria uma nova tarefa no banco de dados.

**Requisição:**

```http
POST /task
```

**Body:**

```json
{
  "titulo": "Estudar Prisma"
}
```

---

### 2. Listar todas as tarefas

Retorna todas as tarefas cadastradas.

**Requisição:**

```http
GET /task
```

---

### 3. Marcar uma tarefa como concluída

Atualiza o status de uma tarefa para concluída.

**Requisição:**

```http
PATCH /task/:id
```

É necessário informar o **ID** da tarefa na URL.

**Exemplo:**

```http
PATCH /task/3
```

---

### 4. Excluir uma tarefa

Remove uma tarefa do banco de dados.

**Requisição:**

```http
DELETE /task/:id
```

É necessário informar o **ID** da tarefa na URL.

**Exemplo:**

```http
DELETE /task/3
```

## Como executar

1. Faça o download ou clone este repositório.
2. Instale as dependências.
3. Crie um arquivo `.env` e configure as variáveis `PORT` e `DATABASE_URL`. Por padrão, o projeto utiliza PostgreSQL.
4. Execute as migrações do Prisma com `npx prisma migrate dev`.
5. Inicie o servidor.


## Autor

Erick Santos
