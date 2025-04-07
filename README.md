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

- 🐶 Listagem paginada de cães
- ➕ Cadastro de novo animal
- 🔍 Visualização de detalhes
- ✏️ Edição dos dados
- 🗑️ Exclusão com confirmação
- 🎯 Feedback visual de ações

---

## 🗃️ Banco de Dados

Este projeto utiliza **MySQL** como banco de dados.  
O script para criação da tabela está incluso.

### Script necessário:
- `SQL/ExportDataAnimals.sql`

Você pode executar esse script diretamente no **MySQL Workbench**

## 🛠️ Como rodar o projeto localmente
1. Clone o repositório:
git clone https://github.com/seu-usuario/React-Dog-Crud-Web.git
cd React-Dog-Crud-Web

2. Configure the Database
Run the ExportDataAnimals.sql script on MySQL Workbench

3. Backend
cd backend
npm install

4. Modifique o arquivo db.js colocando seu na raiz do backend com o conteúdo, fornecendo suas informações pessoais do banco:
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=cachorros_react

5. Inicie o backend:
npm start
O backend ficará disponível em: http://localhost:8800

6. Incie o Frontend
cd frontend
cd reactproject
npm install
npm start
O frontend será iniciado em: http://localhost:5173

✅ Pronto!
Agora você pode acessar o sistema em
🔗 http://localhost:5173
e utilizar todas as funcionalidades do sistema 🐶
