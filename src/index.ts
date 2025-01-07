import "reflect-metadata";
import { DataSource } from "typeorm";
import { Movie } from "./entity/Movie";
import { Genre } from "./entity/Genres";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "movieflix",
  synchronize: true,
  logging: true,
  entities: [Movie, Genre],
  subscribers: [],
  migrations: [],
});


AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    console.log("Conexão com o banco OK");
  })
  .catch((error) => console.log(error));
