const express = require('express')
const app = express()
const port = 3000

app.use(express.static('cliente/'))
app.listen(port, () => {
  console.log('Servidor rodando!') //Mensagem que será executada no terminal se tudo der certo.
})