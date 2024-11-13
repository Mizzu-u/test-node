const http = require("node:http"); // protocolo HTTP modulo nativo
const { findAvailablePort } = require("./10.free-port.js"); //hacemos uso del findAvailablePort del archibo free-port

const desiredPort = process.env.PORT ?? 3000; //busca el servior 3000 y si esta disponible lo usa

const server = http.createServer((req, res) => {
  console.log("request received");
  res.end("Hola mundo");
});

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port} `); //busca el port disponibles que se encuentra en 10.free-port.js
  });
});
