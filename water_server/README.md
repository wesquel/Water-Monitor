## Documentação da API

### Endpoint de autenticação

---

*Realiza a autenticação do usuário e retorna um token.*

```
  POST /api/auth/signin
```

| Parâmetro  | Tipo     | Localização | Descrição        | Obrigatório |
|:-----------|:---------|:------------|:-----------------|:------------|
| `username` | `string` | `body`      | Nome de usuário. | Sim         |
| `password` | `string` | `body`      | Senha.           | Sim         |

*Atualiza o token para o usuário autenticado e retorna um token.*

```
  POST /api/auth/refresh/{username}
```

| Parâmetro       | Tipo     | Localização | Descrição        | Obrigatório |
|:----------------|:---------|:------------|:-----------------|:------------|
| `username`      | `string` | `path`      | Nome de usuário. | Sim         |
| `Authorization` | `string` | `header`    | Refresh token.   | Sim         |

### Endpoint de usuário (gerenciamento de usuários)

---

*Realiza a criação de um usuário e o retorna.*

```
  POST /api/user/signup
```

| Parâmetro  | Tipo     | Localização | Descrição        | Obrigatório |
|:-----------|:---------|:------------|:-----------------|:------------|
| `username` | `string` | `body`      | Nome de usuário. | Sim         |
| `password` | `string` | `body`      | Senha.           | Sim         |
| `fullName` | `string` | `body`      | Nome completo.   | Sim         |

*Realiza a atualização de um usuário e o retorna.*

```
  PUT /api/user
```

| Parâmetro  | Tipo     | Localização | Descrição        | Obrigatório |
|:-----------|:---------|:------------|:-----------------|:------------|
| `username` | `string` | `body`      | Nome de usuário. | Sim         |
| `fullName` | `string` | `body`      | Nome completo.   | Sim         |

*Realiza uma busca pelo username exato.*

```
  GET /api/user/{username}
```

| Parâmetro  | Tipo     | Localização | Descrição        | Obrigatório |
|:-----------|:---------|:------------|:-----------------|:------------|
| `username` | `string` | `path`      | Nome de usuário. | Sim         |

*Realiza uma busca paginada de todos os usuários.*

```
  GET /api/user
```
| Parâmetro   | Tipo      | Localização | Descrição                                           | Padrão | Obrigatório |
|:------------|:----------|:------------|:----------------------------------------------------|:-------|:------------|
| `page`      | `integer` | `query`     | Número da página.                                   | 0      | Não         |
| `size`      | `integer` | `query`     | Quantidade de elementos em cada página.             | 12     | Não         |
| `direction` | `string`  | `query`     | Ordem crescente (**asc**) ou decrescente (**desc**) | asc    | Não         |
