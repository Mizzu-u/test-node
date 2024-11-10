const fs = require("node:fs"); //fs = File System

console.log("Leyendo el primer archivo...");
fs.readFile("./log.txt", "utf-8", (err, text) => {
  // <-- ejecutas este callback
  console.log("primer texto:", text);
});

console.log("--> Hacer cosas mientras lee el archivo...");

console.log("Leyendo el segundo archivo...");
fs.readFile("./log2.txt", "utf-8", (err, text) => {
  console.log("segundo texto:", text);
});

fs.appendFileSync("log.txt", "\nNueva línea de log..."); //? <-- Añade una nueva linea en el file

//? <-- Verificar si un archivo existe
if (fs.existsSync("archivo.txt")) {
  console.log("El archivo existe");
}

//#fs.mkdirSync('nueva-carpeta') //? <-- Crear un directorio

//?Lee contenido de un directorio
const archivos = fs.readdirSync(".");
console.log("Archivos en el directorio:", archivos);
