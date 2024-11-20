import { createApp } from "./app.js";

import { MovieModel } from "./models/mysql/movie.js";

createApp({ movieModel: MovieModel }); //?--> Esto nos permite manejar diferentes servidores sin necesidad de modificar el app.js

//* En pocas palabras estamos inyectando el modelo desde lo mas profundo así nos permite tener diferentes modelos para trabajar con el que se necesite en el momento
