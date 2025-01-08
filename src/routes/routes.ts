import { Router } from "express";
import { AppDataSource } from "../database";
import { Movie } from "../entity/Movie";

const router = Router();

// Routes

router.get("/", async (req,res) => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movies = await movieRepository.find({
    relations:["language_id","genre"],
  });
  res.json(movies);
});

export default router;