//?async Le dice a js "esta función va a tener que esperar cosas" de manera asincrona
async function procesarPedido(pedido) {
  try {
    //tomamos el pedido
    let pedidoTomado = await tomarPedido(pedido); //? await Es como decir "espera a que esto termine"
    console.log(pedidoTomado);

    //preparamos el café
    let cafePreparado = await prepararCafe(pedido);
    console.log(cafePreparado);

    //entregamos el pedido
    let pedidoEntregado = await entregarPedido(pedido);
    console.log(pedidoEntregado);
  } catch (error) {
    console.log("Error:", error);
  }
}

function tomarPedido(pedido) {
  return new Promise((resolve) => {
    //setTimeout simula que toma 2 segundos tomar el pedido
    setTimeout(() => {
      resolve(`Pedido tomado: ${pedido}`); //resolve nos permite retornar el valor pero con funciones asincronas, no como el return que te regrasa el valor instantaneo
    }, 2000);
  });
}

function prepararCafe(pedido) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Café preparado: ${pedido}`);
    }, 3000);
  });
}

function entregarPedido(pedido) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Pedido entregado: ${pedido}`);
    }, 1000);
  });
}

procesarPedido("Café Americano"); // Llamar a la función
