const net = require("node:net"); //net: conexiones con el protocolo tcp

function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer(); //se creea el servidor
    //desiredPort es el puerto que queremos

    server.listen(desiredPort, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        findAvailablePort(0).then((port) => resolve(port));
      } else {
        reject(err); //es la manera manual de una promesa resuelta o rechazada respectivamente
      }
    });
  });
}

//node maneja eventos normalmente

module.exports = { findAvailablePort };
