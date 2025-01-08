import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Genre } from "./Genre";
import { Language } from "./Language";

@Entity("filmes") // Nome da tabela no banco de dados - Se não existir, o TYPEORM cria uma nova tabela.

export class Movie {
    @PrimaryGeneratedColumn()
      id!: number;

    @Column("varchar",{nullable:true})
      title!: string;

    @Column({nullable:true,  type: "date" })
      release_date!: Date;

    @ManyToOne(() => Language, (language)=> language.movies)
    @JoinColumn({name:"language_id"})
      language_id!: Language;

    @Column({nullable:true, type:"int"})
      oscar_count!: number;

    @ManyToOne(() => Genre, (genre) => genre.movies)
    @JoinColumn({name:"genre_id"})
      genre!: Genre;
}