## Documentação da API

### Endpoint de autenticação

---

*Realiza a autenticação do usuário e retorna um token.*

```
  POST /auth/signin
```

| Parâmetro  | Tipo            | Descrição                              |
|:-----------|:----------------|:---------------------------------------|
| `username` | `string (body)` | **Obrigatório**. Nome de usuário.      |
| `password` | `string (body)` | **Obrigatório**. Senha.                |

*Atualiza o token para o usuário autenticado e retorna um token.*

```
  POST /auth/refresh/{username}
```

| Parâmetro       | Tipo              | Descrição                         |
|:----------------|:------------------|:----------------------------------|
| `username`      | `string (path)`   | **Obrigatório**. Nome de usuário. |
| `Authorization` | `string (header)` | **Obrigatório**. Refresh token.   |

### Endpoint de usuário (gerenciamento de usuários)

---

*Realiza a criação de um usuário e o retorna.*

```
  POST /user/signup
```

| Parâmetro  | Tipo            | Descrição                         |
|:-----------|:----------------|:----------------------------------|
| `username` | `string (body)` | **Obrigatório**. Nome de usuário. |
| `password` | `string (body)` | **Obrigatório**. Senha.           |
| `fullName` | `string (body)` | **Obrigatório**. Nome completo.   |

*Realiza a atualização de um usuário e o retorna.*

```
  PUT /user
```

| Parâmetro  | Tipo            | Descrição                         |
|:-----------|:----------------|:----------------------------------|
| `username` | `string (body)` | **Obrigatório**. Nome de usuário. |
| `fullName` | `string (body)` | **Obrigatório**. Nome completo.   |

*Realiza uma busca pelo username exato.*

```
  GET /user/{username}
```

| Parâmetro  | Tipo            | Descrição                         |
|:-----------|:----------------|:----------------------------------|
| `username` | `string (path)` | **Obrigatório**. Nome de usuário. |

*Realiza uma busca paginada de todos os usuários.*

```
  GET /user
```

| Parâmetro   | Tipo              | Descrição                                                          | Padrão |
|:------------|:------------------|:-------------------------------------------------------------------|:-------|
| `page`      | `integer (query)` | **Opcional**. O número da página.                                  | 0      |     
| `size`      | `integer (query)` | **Opcional**. O tamanho de cada página.                            | 12     |
| `direction` | `string (query)`  | **Opcional**. Ordem crescente (**asc**) ou decrescente (**desc**). | asc    |
