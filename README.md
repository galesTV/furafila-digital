# FuraFila Digital - Desenvolvimento 🚀

Esta é a branch principal de trabalho diário da equipe. Aqui estão as últimas atualizações da integração do sistema (frontend, backend e banco de dados).

## 📌 Fluxo de Branches

Para manter a organização do código, utilizamos o seguinte fluxo:
1. **`develop`**: Branch onde integram o frontend e o backend.
2. **`feature/nome-da-funcionalidade`**: Branches criadas para novas implementações. Não é permitido subir código direto na `develop` sem passar pelo sistema de Pull Requests (PRs).

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (UX minimalista).
- **Backend**: Node.js (Express, Multer para imagens, CORS).
- **Banco de Dados**: MySQL.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para rodar a aplicação localmente.

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

### 3. Rodar o Backend
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

### 3.1 Pasta uploads
Crie manualmente uma pasta chamada `uploads` dentro da raiz de `backend`, ao lado de `src` e os outros arquivos.

### 4. Rodar o Frontend
Abra a estrutura de pastas do frontend e selecione o arquivo que deseja abrir.

Você pode usar a extensão Live Server no VS Code para abrir os arquivos HTML (como `adm cadastro.html`) no navegador.

## 👥 Contribuidores
- Cauê Anhê (Front-end)
- Gael Guzman (Líder do Projeto, Back-end/Integração)
- Gustavo Borges (Integração)
- Isabelly Mendes (Front-end)
- Nicolas Melo (Banco de Dados)
