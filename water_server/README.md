
## Documentação da API

### Endpoint de usuário
#### Gerenciamento de usuários
*Realiza a atualização de um usuário e o retorna.*

```
  PUT /user
```

| Parâmetro  | Tipo       | Descrição                           |
|:-----------| :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**. |
| `fullname` | `string` | **Obrigatório**. |

*Realiza a criação de um usuário e o retorna.*

```
  POST /user/signup
```

| Parâmetro  | Tipo       | Descrição                                   |
|:-----------| :--------- | :------------------------------------------ |
| `username` | `string` | **Obrigatório**. |
| `password` | `string` | **Obrigatório**. |
| `fullname` | `string` | **Obrigatório**. |


