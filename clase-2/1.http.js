const http = require("node:http"); // --> protocolo HTTP
const fs = require("node:fs");

const desiredPort = process.env.PORT ?? 1234; //?? operaddor coalencia nula se utiliza para manejar valores que pueden ser null o undifend, se usa en caso de que algun valor sea null toma la siguente respuesta

//Los callbacks son funciones asincronas que se ejecutan despues de que pasa algo
const processRequest = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (req.url === "/") {
    res.end("<h1>Mi página</h1>");
  } else if (req.url === "/gato.jpg") {
    fs.readFile("./gato.jpg", (err, data) => {
      if (err) {
        res.statusCode = 500; //cuidado
        res.end("<h1>500 Internal Server Error</h1>");
      } else {
        res.setHeader("Content-Type", "image/jpg");
        res.end(data); //un bufer en node.js es una clase global que se usa para trabajar datos binarios
      }
    });
  } else if (req.url === "/contacto") {
    res.end("<h1>Contacto</h1>");
  } else {
    res.statusCode = 404; // Not Found
    res.end("<h1>404</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`);
});
