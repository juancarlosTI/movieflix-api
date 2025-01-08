import "reflect-metadata";
import express from "express";
import Routes from "./routes/routes";


// Inicializar Express

const port = 3000;
const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use("/movies", Routes);

app.listen(port, () => {
  console.log(`Porta ${port} - http://localhost:3000`);
});