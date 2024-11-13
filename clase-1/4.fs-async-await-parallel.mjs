// Esto sólo en los módulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from "node:fs/promises";

Promise.all([readFile("./log.txt", "utf-8"), readFile("./log2.txt", "utf-8")]).then(([text, secondText]) => {
  console.log("primer texto:", text);
  console.log("segundo texto:", secondText);
});

//en pocas palabras el pararelo es donde se hace dos procesos al mismo tiempo independientemente del orden
