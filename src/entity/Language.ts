import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity("languages")

export class Language {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id!: number;

  @Column("varchar", { name: "name", nullable: true, length: 100 })
    name!: string | null;

  @OneToMany(() => Movie, (movie) => movie.genre)
    movies!: Movie[];
}
