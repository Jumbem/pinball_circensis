const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 3000

io.on('connection', (socket) => {
  console.log(`Usuário ${socket.id} conectado no servidor`, socket.id)

  socket.on("entrar-na-sala", (sala) => {
    socket.join(sala);
    console.log(`Usuário ${socket.id} entrou na sala ${sala}`);
  });

  socket.on('disconnect', (socket) => {
    console.log(`Usuário ${socket.id} desconectado do servidor`)
  })
})

app.use(express.static('cliente/'))
server.listen(port, () => {
  console.log('Servidor rodando!') //Mensagem que será executada no terminal se tudo der certo.
})