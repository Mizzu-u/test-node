// Esto sólo en los módulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from "node:fs/promises";

console.log("Leyendo el primer archivo...");
const text = await readFile("./log.txt", "utf-8"); //lee el archivo
console.log("primer texto:", text);
console.log("--> Hacer cosas mientras lee el archivo...");

console.log("Leyendo el segundo archivo...");
const secondText = await readFile("./log2.txt", "utf-8");
console.log("segundo texto:", secondText);
