# 🐾 React-Dog-Crud-Web

Sistema completo para cadastro, listagem, visualização, edição e exclusão de cães.  
Projeto full stack desenvolvido com React, Node.js e MySQL.

---

## 🖥️ Tecnologias

### Frontend:
- React + Vite
- React Router DOM
- Axios
- CSS puro

### Backend:
- Node.js
- Express
- MySQL
- Cors
- Dotenv

---

## 🚀 Funcionalidades

- 📝 Listagem paginada de cães
- ➕ Cadastro de novo animal
- 🔍 Visualização de detalhes do animal
- ✏️ Edição dos dados
- 🗑️ Exclusão com confirmação
- 🎯 Feedback visual de ações

---

## 🗃️ Banco de Dados
Este projeto utiliza **MySQL** como banco de dados.

### 📄 Scripts disponíveis:

- `SQL/DumpAnimals.sql` – Arquivo de exportação do banco de dados 
- `SQL/Create&InsertAnimals.sql` – Criação da base de dados e tabela `cachorros` e Inserção de dados exemplo (população da tabela)

Você pode executar os scripts no **MySQL Workbench** 

--- 

## 🛠️ Como rodar o projeto localmente
### 1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/React-Dog-Crud-Web.git
cd seu repositorio
```

### 2. Configure the Database
Rode o script do ExportDataAnimals.sql ou Create&InsertAnimals SQL/ExportDataAnimals.sql no MySQL Workbench

### 3. Backend

```bash
cd backend
npm install
```

#### Em db.js na raiz do backend com o conteúdo, forneça suas informações pessoais do banco:
DB_HOST=localhost<br>
DB_USER=seu_usuario<br>
DB_PASSWORD=sua_senha<br>
DB_NAME=cachorros_react<br>

#### Inicie o backend:

```bash
npm start
```

> O backend ficará disponível em: **http://localhost:8800**

---
### 4. Frontend

```bash
cd frontend
cd reactproject
npm install
npm start
```

> O frontend será iniciado em: **http://localhost:5173**

---
### 5. 🏁 Pronto!
Agora você pode acessar o sistema em
🔗 http://localhost:5173
e utilizar todas as funcionalidades do sistema 🐶
