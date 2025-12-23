// Animación de entrada
document.addEventListener("DOMContentLoaded", () => {
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

  // Mostrar info cliente
  const presupuesto = JSON.parse(localStorage.getItem("presupuesto"));
  if (!presupuesto) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("infoCliente").innerText =
    `Presupuesto para ${presupuesto.nombre} · ${presupuesto.personas} personas`;
});

// Guardar categoría y redirigir
window.irCategoria = function (categoria) {
  const presupuesto = JSON.parse(localStorage.getItem("presupuesto"));
  if (!presupuesto) return;

  presupuesto.categoriaActual = categoria;
  localStorage.setItem("presupuesto", JSON.stringify(presupuesto));

  window.location.href = `comidas/${categoria}.html`;
};
