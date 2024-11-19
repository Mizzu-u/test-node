import { randomUUID } from "node:crypto"; //*--> Se usa con randomUUID() para generar una id aleatoria
import { readJSON } from "../../utils.js";

const movies = readJSON("./movies.json");

export class MovieModel {
  //?--> Se paso a modo asincrono para a segurarnos que al crear nuevos modelos tengan el mismo contrato, es decir que si o si van a devolver una promesa

  //#Filtrado de Movies
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()));
    }

    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  }

  //#Create de Movies
  static async create({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input,
    };

    movies.push(newMovie);

    return newMovie;
  }

  //#Delete de Movies
  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  //#Update de Movies
  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input,
    };

    return movies[movieIndex];
  }
}
//! Siempre que usemos async-await debemos manejar los errores
