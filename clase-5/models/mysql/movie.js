import mysql from "mysql2/promise"; //*--> Importamos mysql2

const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "moviesdb",
}; //?--> Configuramos la conexion con la db
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString); //?--> Creamos la conexion con la db

export class MovieModel {
  static async getAll({ genre }) {
    console.log("getAll");

    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      // get genre ids from database table using genre names
      const [genres] = await connection.query("SELECT id, name FROM genre WHERE LOWER(name) = ?;", [lowerCaseGenre]); //?--> El ? lo que hace es una interpolacion, lo que pasa aqui es que mysql detecta el ? y lo cambia por el valor siguiente que en este caso es [lowerCaseGenre]

      // no genre found
      if (genres.length === 0) return [];

      // get the id from the first genre result
      const [{ id }] = genres;

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      return [];
    }

    const [movies] = await connection.query("SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;");

    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    //! todo: crear la conexión de genre

    // crypto.randomUUID()
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult; //?--> Podemos hacer que el mismo mysql genere el UUID sin necesidad de usar el crypto.randomUUID()

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      );
    } catch (e) {
      //! puede enviarle información sensible
      throw new Error("Error creating movie");
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {
    //! ejercicio fácil: crear el delete
  }

  static async update({ id, input }) {
    //! ejercicio fácil: crear el update
  }
}
