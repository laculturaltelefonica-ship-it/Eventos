// selector.js

let datos = null;

document.addEventListener("DOMContentLoaded", () => {

  // 📦 Cargar presupuesto guardado
  datos = JSON.parse(localStorage.getItem("presupuesto")) || {};
  if (!datos || !datos.nombre) {
    // Si no hay datos básicos de cliente, se asigna una estructura por defecto
    if (!datos) datos = {};
  }

  // 🧾 Info cliente
  const infoCliente = document.getElementById("infoCliente");
  if (infoCliente && datos.nombre) {
    infoCliente.innerText = `Presupuesto para ${datos.nombre}`;
  }

  // 🧱 Generar productos automáticamente si existe el array PRODUCTOS (de productos.js)
  if (typeof PRODUCTOS !== "undefined" && Array.isArray(PRODUCTOS)) {
    generarProductos();
  }

  // Inicializar eventos de productos por cada categoría existente
  document.querySelectorAll(".seccion").forEach(seccion => {
    initProductos(seccion.id);
  });

  // Activar visor modal de imágenes ampliadas
  initVisorImagen();

  // Render inicial del presupuesto en la barra lateral
  renderResumen();
});

/* =========================
   🧭 SCROLL A SECCIÓN
========================= */
window.irSeccion = function (id) {
  const seccion = document.getElementById(id);
  if (!seccion) return;

  seccion.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

/* =========================
   🧱 GENERAR PRODUCTOS (DESDE PRODUCTOS.JS)
========================= */
function generarProductos() {
  if (typeof PRODUCTOS === "undefined") return;

  PRODUCTOS.forEach(p => {
    const seccionPadre = document.getElementById(p.categoria);
    if (!seccionPadre) return;

    // Buscar si existe un contenedor .productos o insertar directamente en la sección
    let contenedor = seccionPadre.querySelector(".productos") || seccionPadre;

    // Evitar duplicar el producto si ya existe en el HTML
    const existente = contenedor.querySelector(`[data-nombre="${p.nombre}"]`);
    if (existente) return;

    const article = document.createElement("article");
    article.className = "item";
    article.dataset.nombre = p.nombre;
    article.dataset.precio = p.precio;

    // Se utiliza p.imagen para que cargue la ruta correcta de la foto
    article.innerHTML = `
      <div class="info-producto">
        <img src="${p.imagen}" alt="${p.nombre}" class="img-producto">
        <div class="texto">
          <h3>${p.nombre}</h3>
          ${p.descripcion ? `<p>${p.descripcion}</p>` : ""}
          <span class="precio">${p.precioTexto || p.precio + " €"}</span>
        </div>
      </div>

      <div class="acciones">
        <button class="reset">x</button>
        <button class="menos">&lt;</button>
        <span class="cantidad">0</span>
        <button class="mas">&gt;</button>
        <button class="multiplicar">+10</button>
      </div>
    `;

    contenedor.appendChild(article);
  });
}

/* =========================
   🖼️ VISOR DE IMÁGENES (AGRANDAR AL PULSAR)
========================= */
function initVisorImagen() {
  const imagenes = document.querySelectorAll(".img-producto");
  const visor = document.getElementById("visorImagen");
  const imagenGrande = document.getElementById("imagenGrande");

  if (!visor || !imagenGrande) return;

  imagenes.forEach(img => {
    // Clonar evento para evitar duplicidad si el DOM cambia
    img.addEventListener("click", () => {
      imagenGrande.src = img.src;
      visor.style.display = "flex";
    });
  });

  visor.addEventListener("click", () => {
    visor.style.display = "none";
  });
}

/* =========================
   🍽️ LÓGICA Y BOTONES DE PRODUCTOS
========================= */
function initProductos(categoria) {
  document.querySelectorAll(`#${categoria} .item`).forEach(item => {
    const nombre = item.dataset.nombre;
    const precioPersona = parseFloat(item.dataset.precio);

    const cantidadSpan = item.querySelector(".cantidad");
    const resetBtn = item.querySelector(".reset");
    const menosBtn = item.querySelector(".menos");
    const masBtn = item.querySelector(".mas");
    const multiplicarBtn = item.querySelector(".multiplicar");

    let cantidad = 0;

    // Restaurar cantidad actual si ya estaba guardada en el carrito
    const existente = (datos.carrito || []).find(p => p.nombre === nombre);
    if (existente) {
      cantidad = existente.cantidad;
      if (cantidadSpan) cantidadSpan.innerText = cantidad;
    }

    function actualizarCarrito(nuevaCantidad) {
      if (!datos.carrito) datos.carrito = [];

      const index = datos.carrito.findIndex(p => p.nombre === nombre);

      if (nuevaCantidad <= 0) {
        if (index > -1) datos.carrito.splice(index, 1);
        nuevaCantidad = 0;
      } else {
        const total = precioPersona * nuevaCantidad;
        // Solucionado error de referencia: datos.personas o valor por defecto
        const numPersonas = datos.personas || 1;

        if (index > -1) {
          datos.carrito[index].cantidad = nuevaCantidad;
          datos.carrito[index].total = total;
        } else {
          datos.carrito.push({
            categoria,
            nombre,
            precioPersona,
            personas: numPersonas,
            cantidad: nuevaCantidad,
            total
          });
        }
      }

      cantidad = nuevaCantidad;
      if (cantidadSpan) cantidadSpan.innerText = cantidad;

      localStorage.setItem("presupuesto", JSON.stringify(datos));
      renderResumen();
    }

    // Eventos de los botones (+, -, x, +10)
    if (resetBtn) resetBtn.onclick = () => actualizarCarrito(0);
    if (menosBtn) menosBtn.onclick = () => { if (cantidad > 0) actualizarCarrito(cantidad - 1); };
    if (masBtn) masBtn.onclick = () => actualizarCarrito(cantidad + 1);
    if (multiplicarBtn) multiplicarBtn.onclick = () => actualizarCarrito(cantidad + 10);
  });
}

/* =========================
   🧾 RENDERIZAR RESUMEN LATERAL
========================= */
function renderResumen() {
  const lista = document.getElementById("lista");
  const totalTxt = document.getElementById("total");

  if (!datos || !lista || !totalTxt) return;

  lista.innerHTML = "";
  let total = 0;

  // 🛒 Productos seleccionados
  (datos.carrito || []).forEach(item => {
    const subtotal = item.precioPersona * item.cantidad;
    const li = document.createElement("li");
    li.textContent = `${item.nombre} – ${item.precioPersona} € x ${item.cantidad} = ${subtotal.toFixed(2)} €`;
    lista.appendChild(li);
    total += subtotal;
  });

  // ➕ Extras acumulados
  for (let extra in datos.extras || {}) {
    const precio = datos.extras[extra];
    const li = document.createElement("li");
    li.textContent = `${extra} – ${precio.toFixed(2)} €`;
    lista.appendChild(li);
    total += precio;
  }

  // 💰 Total
  datos.total = total;
  totalTxt.innerText = `Total: ${total.toFixed(2)} €`;

  localStorage.setItem("presupuesto", JSON.stringify(datos));
}

/* =========================
   ➡️ CONTINUAR AL RESUMEN
========================= */
window.continuar = function () {
  window.location.href = "resumen.html";
};