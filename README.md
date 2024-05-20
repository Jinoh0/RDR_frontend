# Dashboard de Funcionários

Este é um projeto de um dashboard administrativo simples desenvolvido para gerenciar uma lista de funcionários, incluindo operações de criação, leitura, atualização e exclusão de registros de funcionários.

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais:

### Frontend

- **Next.js**: Framework React para renderização do lado do servidor.
- **Chakra UI**: Biblioteca de componentes para estilização e construção de interfaces de usuário.
- **TypeScript**: Linguagem de programação para adição de tipagem estática ao JavaScript.
- **Axios**: Cliente HTTP para realizar requisições à API backend.

### Backend

- **Node.js**: Ambiente de execução JavaScript do lado do servidor.
- **Express.js**: Framework web para construção de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: ODM (Object Data Modeling) para modelagem de dados MongoDB.
- **TypeScript**: Utilizado para adição de tipagem estática ao JavaScript.

## Funcionalidades

- **Página Inicial do Dashboard**:
  - Exibe uma tabela de funcionários com colunas para nome, cargo, departamento e ações (editar/excluir).
  - Inclui um botão para adicionar um novo funcionário.
  - Implementa funcionalidade de ordenação e busca na lista de funcionários.

- **Página de Adicionar Funcionário**:
  - Apresenta um formulário para adicionar um novo funcionário com campos para nome, cargo, departamento e data de admissão.
  - Realiza validação dos campos do formulário antes de enviar.

- **Página de Editar Funcionário**:
  - Oferece um formulário para editar os detalhes de um funcionário existente.
  - Preenche o formulário com os detalhes atuais do funcionário.
  - Realiza validação dos campos do formulário antes de enviar.

- **API do Backend**:
  - Implementa endpoints RESTful para operações CRUD:
    - `GET /api/employees` - Recupera todos os funcionários.
    - `GET /api/employees/:id` - Recupera um único funcionário pelo ID.
    - `POST /api/employees` - Cria um novo funcionário.
    - `PUT /api/employees/:id` - Atualiza um funcionário pelo ID.
    - `DELETE /api/employees/:id` - Exclui um funcionário pelo ID.

## Executando o Projeto

### Backend

1. Clone este repositório e navegue para a pasta backend:
   git clone <repository-url>
   cd employee-backend

2. Instale as dependências:
   npm install

3. Configure o arquivo .env com sua string de conexão do MongoDB:
    MONGO_URI=mongodb://localhost:27017/test
    PORT=5000

4. Inicie o servidor:
    npm run start

### Frontend

1. Clone este repositório e navegue para a pasta frontend:
   git clone <repository-url>

2. Navegue para a pasta frontend:
   cd employee-frontend

3. Instale as dependências:
   npm install

4. Inicie a aplicação Next.js:
    npm run dev

5. acesse a aplicação em:
    http://localhost:3000
