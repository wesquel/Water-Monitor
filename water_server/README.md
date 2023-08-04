
## Documentação da API

### Endpoint de usuário
#### Gerenciamento de usuários
*Realiza a atualização de um usuário e o retorna.*

```http
  PUT /user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `userName` | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**. |
| `fullname` | `string` | **Obrigatório**. |

*Realiza a criação de um usuário e o retorna.*

```http
  POST /user/signup
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `userName` | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**. |
| `fullname` | `string` | **Obrigatório**. |


