# Testes Automatizados - SauceDemo (Cypress)

Projeto de automação E2E da aplicação SauceDemo utilizando Cypress e JavaScript.

O objetivo do projeto é validar os principais fluxos da aplicação, incluindo autenticação, listagem de produtos, carrinho, checkout e logout.

---

## Tecnologias utilizadas

- JavaScript
- Node.js
- Cypress
- Page Object Model (POM)
- Custom Commands

---

## Estrutura do projeto

```bash
cypress/
│
├── e2e/                         # Casos de testes automatizados
│   ├── carrinho.cy.js
│   ├── checkout.cy.js
│   ├── login.cy.js
│   ├── logout.cy.js
│   ├── overview.cy.js
│   ├── prodDetalhe.cy.js
│   └── prodList.cy.js
│
├── fixtures/                    # Massa de dados utilizada nos testes
│
├── pages/                       # Page Objects e mapeamento de páginas
│
├── screenshots/                 # Evidências capturadas automaticamente em falhas dos testes
│   └── prodList.cy.js/
│       └── Produtos - Listagem - Deve manter filtro após navegação
│
├── support/                     # Commands customizados e configurações globais
│   ├── commands.js
│   └── e2e.js
│
├── videos/                      # Vídeos gerados durante a execução dos testes
│
├── cypress.config.js            # Configurações do Cypress
├── package.json                 # Dependências e scripts do projeto
└── package-lock.json            # Controle de versões das dependências
```

---

## Executando a aplicação

### Instalar dependências

```bash
npm install
```

### Executar Cypress em modo gráfico

```bash
npx cypress open
```

### Executar testes em modo headless

```bash
npx cypress run
```

---

## Cenários automatizados

### Login

Validação dos fluxos de autenticação da aplicação.

#### Cenários cobertos

- Login com sucesso
- Login com usuário inválido
- Login com senha inválida
- Login com campos vazios
- Login com usuário bloqueado

---

### Lista de Produtos

Validação da listagem de produtos e funcionamento dos filtros.

#### Cenários cobertos

- Exibição correta das informações do produto
- Ordenação por nome
- Ordenação por preço
- Reset do filtro para padrão
- Persistência do filtro após navegação

---

### Detalhe do Produto

Validação da página de detalhe do produto.

#### Cenários cobertos

- Exibição correta de nome, descrição e preço
- Adição e remoção de item pelo detalhe do produto
- Persistência do estado do produto ao retornar para listagem

---

### Carrinho de Compras

Validação das funcionalidades do carrinho.

#### Cenários cobertos

- Carrinho inicia vazio
- Alternância correta entre botões Add e Remove
- Adição de item ao carrinho
- Adição de múltiplos itens
- Exibição correta dos itens no carrinho
- Remoção de item pela listagem
- Remoção de item pela página do carrinho
- Persistência do carrinho após reload
- Navegação utilizando Continue Shopping

---

### Checkout - Your Information

Validação do formulário de checkout.

#### Cenários cobertos

- Envio do formulário com sucesso
- Validação de campo obrigatório First Name
- Validação de campo obrigatório Last Name
- Validação de campo obrigatório Zip/Postal Code
- Persistência do carrinho ao cancelar checkout

---

### Checkout - Overview

Validação do resumo da compra.

#### Cenários cobertos

- Validação de subtotal, taxa e total
- Validação de múltiplos produtos no overview

---

### Logout

Validação de encerramento de sessão e segurança de navegação.

#### Cenários cobertos

- Logout pela página de produtos
- Logout dentro do carrinho
- Logout no checkout Your Information
- Logout no checkout Overview
- Logout após finalizar compra
- Bloqueio de acesso utilizando botão voltar do navegador
- Bloqueio de acesso à área interna após logout

---

## Observação

O cenário de limpeza do carrinho após o logout não foi automatizado, pois a regra de negócio da aplicação não deixa claro se o carrinho deve ou não ser persistido após o encerramento da sessão.

---

## Melhorias futuras

- Implementação de testes de API
- Geração de relatórios automatizados
- Integração contínua (CI/CD)

