import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Genre } from "./Genres";
import { Languages } from "./Languages";

@Entity("filmes") // Nome da tabela no banco de dados - Se não existir, o TYPEORM cria uma nova tabela.

export class Movie {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column({nullable:true})
      title!: string;

    @Column({nullable:true,  type: "date" })
      release_date!: Date;

    @ManyToOne(() => Languages, (languages)=> languages.movies)
    @JoinColumn({name:"language_id"})
      language_id!: Languages;
    

    @Column({nullable:true, type:"int"})
      oscar_count!: number;

    @ManyToOne(() => Genre, (genres) => genres.movies)
    @JoinColumn({name:"genre_id"})
      genre!: Genre;
}