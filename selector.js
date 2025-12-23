document.addEventListener("DOMContentLoaded", () => {
  // Animación
  const categorias = document.querySelectorAll(".categoria");
  categorias.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 120);
  });

  // Cargar presupuesto
  const datos = JSON.parse(localStorage.getItem("presupuesto"));
  if (!datos) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("infoCliente").innerText =
    `Presupuesto para ${datos.nombre} · ${datos.personas} personas`;

  renderResumen();
});

// 🔁 Redirección a categoría
window.irCategoria = function (categoria) {
  const datos = JSON.parse(localStorage.getItem("presupuesto"));
  datos.categoriaActual = categoria;
  localStorage.setItem("presupuesto", JSON.stringify(datos));

  window.location.href = `comidas/${categoria}.html`;
};

// 🧾 Render del resumen (CLAVE)
function renderResumen() {
  const datos = JSON.parse(localStorage.getItem("presupuesto"));
  const lista = document.getElementById("lista");
  const totalTxt = document.getElementById("total");

  if (!lista || !totalTxt) return;

  lista.innerHTML = "";
  let total = 0;

  // Productos seleccionados
  (datos.carrito || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent =
      `${item.nombre} (${item.categoria}) – ${item.precioPersona} € x ${item.personas}`;
    lista.appendChild(li);
    total += item.total;
  });

  // Extras (si ya los tienes)
  for (let e in datos.extras || {}) {
    const li = document.createElement("li");
    li.textContent = `${e} – ${datos.extras[e]} €`;
    lista.appendChild(li);
    total += datos.extras[e];
  }

  datos.total = total;
  totalTxt.innerText = `Total: ${total.toFixed(2)} €`;

  localStorage.setItem("presupuesto", JSON.stringify(datos));
}

// ➡️ Continuar
window.continuar = function () {
  window.location.href = "resumen.html";
};
