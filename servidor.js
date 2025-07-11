import express from "express";
const app = express();
const PORT = 3000;

app.use(express.static("./cliente/"));
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}!`));
