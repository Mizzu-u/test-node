import os from "node:os"; //(Operating System)

// Obtener información básica del sistema
console.log("Información del sistema operativo:");
console.log("-------------------");

console.log("Nombre del sistema operativo", os.platform()); // windows, linux, darwin (mac)
console.log("Versión del sistema operativo", os.release());
console.log("Arquitectura", os.arch()); // x64, x86, arm
console.log("CPUs", os.cpus()); // Información del CPU

console.log("Memoria libre", os.freemem() / 1024 / 1024, "MB"); // Información de memoria
console.log("Memoria total", os.totalmem() / 1024 / 1024, "MB");
console.log("uptime", os.uptime() / 60 / 60);
