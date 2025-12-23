const presupuesto = JSON.parse(localStorage.getItem("presupuesto"));

if (!presupuesto) {
  window.location.href = "../index.html";
}

const personas = presupuesto.personas || 1;
document.getElementById("infoPersonas").innerText =
  `Seleccionando para ${personas} personas`;

// Inicializar eventos de los contadores
document.querySelectorAll(".item").forEach(item => {
  const nombre = item.dataset.nombre;
  const precioPersona = parseFloat(item.dataset.precio);
  const cantidadSpan = item.querySelector(".cantidad");

  const resetBtn = item.querySelector(".reset");
  const menosBtn = item.querySelector(".menos");
  const masBtn = item.querySelector(".mas");
  const multiplicarBtn = item.querySelector(".multiplicar");

  function actualizarCarrito(cantidad) {
    if (!presupuesto.carrito) presupuesto.carrito = [];

    const index = presupuesto.carrito.findIndex(p => p.nombre === nombre);
    if (cantidad === 0) {
      if (index > -1) presupuesto.carrito.splice(index, 1);
    } else {
      const total = precioPersona * cantidad;
      if (index > -1) {
        presupuesto.carrito[index].cantidad = cantidad;
        presupuesto.carrito[index].total = total;
      } else {
        presupuesto.carrito.push({
          categoria: "Postres",
          nombre,
          precioPersona,
          personas,
          cantidad,
          total
        });
      }
    }

    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
    cantidadSpan.innerText = cantidad;
  }

  let cantidad = 0;
  resetBtn.onclick = () => { cantidad = 0; actualizarCarrito(cantidad); };
  menosBtn.onclick = () => { if(cantidad>0) cantidad--; actualizarCarrito(cantidad); };
  masBtn.onclick = () => { cantidad++; actualizarCarrito(cantidad); };
  multiplicarBtn.onclick = () => { 
    cantidad += personas; // suma personas al contador
    actualizarCarrito(cantidad); 
  };
});
