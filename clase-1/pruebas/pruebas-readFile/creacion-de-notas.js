const fs = require("fs"); // fs = File System (Sistema de Archivos)
const path = require("path"); // Para manejar rutas de archivos

// Aquí va todo el código de la clase
class GestorNotas {
  //el costructor es el que crea el archivo
  constructor() {
    this.dir = "notas"; //crea la ruta de "notas"
    //con !fs.existsSync verifica si la ruta existe y si no existe la crea con mkdirSync
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
  }

  crearNota(titulo, contenido) {
    const ruta = path.join(this.dir, `${titulo}.txt`); //? <--  lee el contenido del directorio 'notas'
    fs.writeFileSync(ruta, contenido); //nos deja crear tanto el titulo como el contenido de la nota
    console.log("Nota creada:", titulo);
  }

  leerNota(titulo) {
    const ruta = path.join(this.dir, `${titulo}.txt`); //? <--  lee el contenido del directorio 'notas'
    try {
      const contenido = fs.readFileSync(ruta, "utf-8"); //?<-- lee el contenido del archivo con el formato utf-8
      console.log(`Nota: ${titulo}\n${contenido}`); //` Son backticks (comillas invertidas` es como la funcion f en python
    } catch (error) {
      console.log("No se encontró la nota");
    }
  }

  listarNotas() {
    const notas = fs.readdirSync(this.dir); //Lee todos los archivos del directorio 'notas'
    console.log("Notas disponibles:");
    //el forEach nos permite recorrer cada elemento de una array
    notas.forEach((nota) => {
      console.log("- " + nota.replace(".txt", "")); //replace(".txt", "") quita la extensión .txt de cada nombre de archivo
    });
  }

  eliminarNota(titulo) {
    const ruta = path.join(this.dir, `${titulo}.txt`); //lee el contenido del directorio 'notas' y busca el titulo
    try {
      fs.unlinkSync(ruta); //elimina el archivo en esa ruta
      console.log("Nota eliminada:", titulo);
    } catch (error) {
      console.log("No se pudo eliminar la nota");
    }
  }
}

//uso del gestor
const gestor = new GestorNotas();

//gestor.crearNota("recordatorio4", "devidPuta");
gestor.listarNotas();
console.log(`----------------------------------------\n`);
gestor.leerNota("recordatorio");
console.log(`----------------------------------------\n`);
gestor.leerNota("recordatorio2");
console.log(`----------------------------------------\n`);
gestor.leerNota("recordatorio3");
console.log(`----------------------------------------\n`);
gestor.leerNota("recordatorio4");
//gestor.eliminarNota("recordatorio4");
