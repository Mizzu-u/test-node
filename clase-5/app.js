import express, { json } from "express"; // require -> commonJS
import { createMovieRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";
import "dotenv/config";

// después
export const createApp = ({ movieModel }) => {
  const app = express();
  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");

  app.use("/movies", createMovieRouter({ movieModel })); //?--> Se crea createMovieRouter y se usa el modelo de movieModel y así el modelo solo lo sabemos desde el punto de entrada

  const PORT = process.env.PORT ?? 3000;

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
  });
};
