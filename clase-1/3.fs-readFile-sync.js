const fs = require("node:fs");

console.log("Leyendo el primer archivo...");
const text = fs.readFileSync("./log.txt", "utf-8");
console.log("primer texto:", text);

console.log("--> Hacer cosas mientras lee el archivo...");

console.log("Leyendo el segundo archivo...");
const secondText = fs.readFileSync("./log2.txt", "utf-8");
console.log("segundo texto:", secondText);
