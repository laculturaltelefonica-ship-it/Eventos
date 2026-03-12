// selector.js

document.addEventListener("DOMContentLoaded", () => {

  // 📦 Cargar presupuesto
  const datos = JSON.parse(localStorage.getItem("presupuesto"));
  if (!datos) {
    window.location.href = "index.html";
    return;
  }

  // 🧾 Info cliente
  const infoCliente = document.getElementById("infoCliente");
  if (infoCliente) {
    infoCliente.innerText =
      `Presupuesto para ${datos.nombre} · ${datos.personas} personas`;
  }

  // 🧱 Generar productos automáticamente desde la base de datos
  generarProductos();

  // Inicializar productos por categoría
  ["carnes","ensaladas","platos-calientes","entrantes","postres","bebidas","sushis"]
    .forEach(categoria => initProductos(categoria));

  // Activar visor de imágenes
  initVisorImagen();

  // Render inicial del resumen
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
   🧱 GENERAR PRODUCTOS (BD)
========================= */
function generarProductos() {

  if (typeof PRODUCTOS === "undefined") return;

  PRODUCTOS.forEach(p => {

    const seccion = document.querySelector(`#${p.categoria} .productos`);
    if (!seccion) return;

    const article = document.createElement("article");
    article.className = "item";
    article.dataset.nombre = p.nombre;
    article.dataset.precio = p.precio;

    article.innerHTML = `
      <div class="info-producto">

        <img src="${p.imagen}" alt="${p.nombre}" class="img-producto">

        <div class="texto">
          <h3>${p.nombre}</h3>
          ${p.descripcion ? `<p>${p.descripcion}</p>` : ""}
          <span class="precio">${p.precioTexto}</span>
        </div>

      </div>

      <div class="acciones">
        <button class="reset">x</button>
        <button class="menos"><</button>
        <span class="cantidad">0</span>
        <button class="mas">></button>
        <button class="multiplicar">+n</button>
      </div>
    `;

    seccion.appendChild(article);
  });
}

/* =========================
   🖼️ VISOR DE IMÁGENES
========================= */
function initVisorImagen() {
  const imagenes = document.querySelectorAll(".img-producto");
  const visor = document.getElementById("visorImagen");
  const imagenGrande = document.getElementById("imagenGrande");

  if (!visor || !imagenGrande) return;

  imagenes.forEach(img => {
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
   🍽️ INIT PRODUCTOS
========================= */
function initProductos(categoria) {
  const datos = JSON.parse(localStorage.getItem("presupuesto"));
  const personas = datos.personas || 1;

  document
    .querySelectorAll(`#${categoria} .item`)
    .forEach(item => {

      const nombre = item.dataset.nombre;
      const precioPersona = parseFloat(item.dataset.precio);

      const cantidadSpan = item.querySelector(".cantidad");
      const resetBtn = item.querySelector(".reset");
      const menosBtn = item.querySelector(".menos");
      const masBtn = item.querySelector(".mas");
      const multiplicarBtn = item.querySelector(".multiplicar");

      let cantidad = 0;

      // 🔄 Restaurar cantidad si ya estaba en carrito
      const existente = (datos.carrito || []).find(p => p.nombre === nombre);
      if (existente) {
        cantidad = existente.cantidad;
        cantidadSpan.innerText = cantidad;
      }

      function actualizarCarrito(nuevaCantidad) {
        if (!datos.carrito) datos.carrito = [];

        const index = datos.carrito.findIndex(p => p.nombre === nombre);

        if (nuevaCantidad === 0) {
          if (index > -1) datos.carrito.splice(index, 1);
        } else {
          const total = precioPersona * nuevaCantidad;

          if (index > -1) {
            datos.carrito[index].cantidad = nuevaCantidad;
            datos.carrito[index].total = total;
          } else {
            datos.carrito.push({
              categoria,
              nombre,
              precioPersona,
              personas,
              cantidad: nuevaCantidad,
              total
            });
          }
        }

        cantidad = nuevaCantidad;
        cantidadSpan.innerText = cantidad;

        localStorage.setItem("presupuesto", JSON.stringify(datos));
        renderResumen();
      }

      // 🎛️ Eventos de los botones
      resetBtn.onclick = () => actualizarCarrito(0);
      menosBtn.onclick = () => { if (cantidad > 0) actualizarCarrito(cantidad - 1); };
      masBtn.onclick = () => actualizarCarrito(cantidad + 1);
      multiplicarBtn.onclick = () => actualizarCarrito(cantidad + personas);
  });
}

/* =========================
   🧾 RENDER RESUMEN
========================= */
function renderResumen() {
  const datos = JSON.parse(localStorage.getItem("presupuesto"));
  const lista = document.getElementById("lista");
  const totalTxt = document.getElementById("total");

  if (!datos || !lista || !totalTxt) return;

  lista.innerHTML = "";
  let total = 0;

  // 🛒 Productos seleccionados
  (datos.carrito || []).forEach(item => {
    const subtotal = item.precioPersona * item.cantidad;

    const li = document.createElement("li");
    li.textContent =
      `${item.nombre} (${item.categoria}) – ` +
      `${item.precioPersona} € x ${item.cantidad} = ` +
      `${subtotal.toFixed(2)} €`;

    lista.appendChild(li);
    total += subtotal;
  });

  // ➕ Extras
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
   ➡️ CONTINUAR
========================= */
window.continuar = function () {
  window.location.href = "resumen.html";
};