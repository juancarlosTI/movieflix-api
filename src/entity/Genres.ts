import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { Movie } from "./Movie";


@Entity("genres")

export class Genre {
    @PrimaryGeneratedColumn()
      id!:number;

    @Column({length: 100})
      name!: string;

    @OneToMany(() => Movie, (movie) => movie.genre)
      movies!: Movie[];
}