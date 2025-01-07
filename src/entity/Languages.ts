import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity("languages")

export class Languages {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id!: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
    name!: string | null;

  @OneToMany(() => Movie, (movie) => movie.genre)
    movies!: Movie[];
}
