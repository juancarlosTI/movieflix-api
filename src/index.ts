import "reflect-metadata";
import express from "express";
import Routes from "./routes/routes";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";


// Inicializar Express

const port = 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Rotas
app.use("/movies", Routes);

app.listen(port, () => {
  console.log(`Porta ${port} - http://localhost:3000`);
});