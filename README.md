# 🛋️ E-commerce Decor API (Headless Backend)

Uma API RESTful robusta desenvolvida para suportar um e-commerce headless no nicho de decoração e reformas (focado em quartos e cozinhas). Este projeto atua como o motor back-end da aplicação, gerenciando autenticação de usuários, catálogo de produtos e, futuramente, controle de pedidos.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as melhores práticas e ferramentas modernas do ecossistema Node.js:
* **Node.js & Express:** Fundação da API RESTful.
* **TypeScript:** Tipagem estática rigorosa para maior segurança e previsibilidade do código.
* **PostgreSQL:** Banco de dados relacional poderoso e escalável.
* **Prisma ORM (v7):** Gerenciamento do banco de dados utilizando o adaptador nativo `pg` para máxima performance.
* **JWT & Bcryptjs:** Autenticação stateless segura e criptografia de senhas.

## 🏗️ Arquitetura e Padrões

A aplicação segue o padrão de **Service Layer Pattern** (Camada de Serviços), isolando as responsabilidades:
* **Controllers:** Lidam exclusivamente com as requisições HTTP (req, res).
* **Services:** Contêm toda a regra de negócio e chamadas ao banco de dados.
* **Middlewares:** Interceptadores de requisições para validação de segurança (ex: validação de token JWT).

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js instalado (v24.14)
* PostgreSQL instalado e rodando localmente (ou via Docker)

### Passo a Passo

1. **Clone o repositório:**
```bash
git clone https://github.com/PauloMonteiro98/Decor.git
cd Decor-backend
```
2. **Instale as dependências:**

```Bash
npm install
```
3. **Configure as Variáveis de Ambiente:**
Crie um arquivo .env na raiz do projeto e configure suas credenciais (você pode gerar um JWT_SECRET seguro usando o Node):

* DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/ecommerce_decor?schema=public"
* JWT_SECRET="sua_chave_secreta_gerada_aqui"

4. **Execute as Migrations do Banco de Dados:**
Isso criará as tabelas necessárias no seu PostgreSQL local.

```Bash
npx prisma migrate dev
```
5. **Inicie o servidor de desenvolvimento:**

```Bash
npm run dev
```
* A API estará disponível em http://localhost:3333.

## 📍Endpoints da API

Autenticação (/api/auth)
* **POST** /register: Cria um novo usuário (Requer: name, email, password).

* **POST** /login: Autentica o usuário e retorna o token JWT.

* **GET** /me: Retorna o perfil do usuário logado (Requer Token Bearer).

* **Produtos** (/api/products) - Em desenvolvimento
* **GET** /: Lista todos os produtos (Rota Pública).

* **POST** /: Cadastra um novo produto (Requer Token Bearer).
