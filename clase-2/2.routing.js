const http = require("node:http"); // --> protocolo HTTP

// commonJS -> modulos clásicos de node
const dittoJSON = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJSON)); //se tranforma en un string para no llamar directamente al JSON
        default:
          res.statusCode = 404; //--> Not Found
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          return res.end("<h1>404</h1>");
      }

    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";

          // escuchar el evento data
          req.on("data", (chunk) => {
            body += chunk.toString();
          }); //aqui lo que sucede es que los datos que llegan al momento de ser enviados estan de manera binaria y lo que hacemos es convertirlo a un valor String con --> toString()

          req.on("end", () => {
            const data = JSON.parse(body);
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });

            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });

          break;
        }

        default:
          res.statusCode = 404; //--> Not Found
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          return res.end("404 Not Found");
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log("server listening on port http://localhost:1234");
});
