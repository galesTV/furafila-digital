# FuraFila Digital 🥪 🥤

O **FuraFila Digital** é um sistema full-stack de gestão para cantinas escolares, projetado para otimizar o tempo de espera em filas, agilizar a entrega de pedidos e oferecer um controle financeiro prático para os alunos através de uma carteira digital.

## 🚀 Status do Projeto: Em Produção (Render)

A branch **`main`** contém a versão estável, homologada e integrada da aplicação, conectada diretamente à esteira de Deploy Contínuo no **Render**.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (UX minimalista).
- **Backend**: Node.js (Express, Multer para imagens, CORS).
- **Banco de Dados**: MySQL.

## 💻 Como Rodar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/)
- [MySQL Server](https://dev.mysql.com/downloads/)

---

### 1. Clonar o repositório

```bash
git clone https://github.com/galesTV/furafila-digital.git
```

### 2. Configurar o Banco de Dados
Acesse o MySQL e crie o banco de dados do projeto usando o arquivo `schema.sql`, encontrado na pasta `database`

### 3. Configurar as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto backend com as seguintes credenciais:

```
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=furafila_digital
```

### 4. Executar o Servidor Backend
Entre na pasta do backend

```bash
cd backend
npm install
```

Inicie o servidor:
```bash
npm start
```

O servidor rodará por padrão na porta http://localhost:3000.

### 4.1 Pasta `uploads`
*Caso não encontre a pasta `uploads` dentro da raiz de `backend`, ao lado de `src`, crie-a manualmente*

### 5. Executar o Frontend
Abra a estrutura de pastas do frontend e selecione o arquivo que deseja abrir.

Você pode usar a extensão Live Server no VS Code para abrir os arquivos HTML (como `adm cadastro.html`) no navegador.

## 👥 Equipe de Desenvolvimento
- Gael Guzman (Líder do Projeto, Back-end & Integração)
- Cauê Anhê (Front-end)
- Gustavo Borges (Integração)
- Isabelly Mendes (Front-end)
- Nicolas Melo (Banco de Dados)
