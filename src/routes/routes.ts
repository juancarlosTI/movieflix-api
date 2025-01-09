import { Router } from "express";
import { AppDataSource } from "../database";
import { Movie } from "../entity/Movie";
import { ILike } from "typeorm";

const router = Router();

// Routes


const movieRepository = AppDataSource.getRepository(Movie);

router.get("/", async (_, res) => {

  const movies = await movieRepository.find({
    relations: ["language_id", "genre"],
    order: {
      title: "ASC",
    }
  });
  res.json(movies);
});

router.get("/:genreName", async (req,res) => {
  const genreName = req.params.genreName;
  
  const filteredMovies = await movieRepository.find({
    relations:["language_id", "genre"],
    where: {
      genre:{name: ILike(genreName)}}
  });

  if (filteredMovies.length == 0){
    return res.status(404).json({message:"Genero inexistente"});
  }

  res.status(200).send(filteredMovies);
});

router.post("/", async (req, res) => {
  const { title, release_date, language_id, oscar_count, genre } = req.body;

  // A entidade do TypeORM não faz a verificação de tipo na entrada. Os dados, quando inseridos pelo metodo .save() utilizarão os 'tipos' como uma forma de garantir que os dados sejam inserido com o tipo pré-determinado.

  // Ao fazer uma requisição POST, independente dos tipos de dados inseridos, se possuirem a estrutura da entidade correta, será realizado a inserção ao banco de dados.

  // Ao inserir, as entidades garantiram as transformações necessárias para atender a estrutura de tipo. 
  // - Campo que requer tipo 'string', mesmo se preenchido com números, será salvo como uma STRING. 
  // - Campo que requer tipo 'number', mesmo se preenchido entre aspas, será salvo como um NUMBER.
  // - Campo que requer tipo 'date', é preenchido com strings e é formatado pela entidade para ser um tipo DATE.
  // Colocar um tipo diferente de entrada resulta em um erro nos campos: NUMBER e DATE. Ex: colocar 'caracteres' onde deve ser number.

  // A realização da verificação de tipo de entrada deve ser feita manualmente.


  // Verificação de registros duplicados
  const movieWithSameTitle = await movieRepository.find({
    where: {
      title: ILike(title)
    }
  });

  if (movieWithSameTitle.length > 0) {
    res.status(409).send({ message: "Já existe um filme com o título" });
    return;
  }

  try {
    await movieRepository.save({
      title: title,
      release_date: release_date,
      language_id: { id: language_id },
      oscar_count: oscar_count,
      genre: { id: genre }
    });
    res.status(201).json({ message: "Registrado!" });
  } catch (error) {
    res.status(500).send({ message: "Falha ao cadastrar o filme", error: error });
  }


});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);

  const movie = await movieRepository.findOne({
    where: {
      id: id
    }
  });
  
  if (!movie) {
    return res.status(409).json({ message: "ID inválido - Não existe no banco de dados" });
  }

  try {
    await movieRepository.update(id, req.body);
    res.status(200).json({ message: "Atualizado com sucesso", data: req.body });
  }
  catch (error) {
    res.status(500).json({ message: "Erro do servidor : ", error: error });
  }

});

router.delete("/:id", async (req,res) => {
  const id = Number(req.params.id);
  
  const movie = await movieRepository.findOne({
    where: {id}
  });
  
  if (!movie) {
    return res.status(404).json({ message: "ID inválido - Não existe no banco de dados" });
  }

  try {
    await movieRepository.delete(id);
    res.status(200).json({ message: "Deletado com sucesso"});
  }
  catch (error) {
    res.status(500).json({ message: "Erro do servidor : ", error: error });
  }

});
export default router;