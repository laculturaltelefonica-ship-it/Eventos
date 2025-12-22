import { db } from "./firebase.js";
import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let datos = JSON.parse(localStorage.getItem("presupuesto"));

const info = document.getElementById("infoCliente");
const lista = document.getElementById("lista");
const totalTxt = document.getElementById("total");

info.innerText = `${datos.nombre} · ${datos.personas} personas`;

function guardar() {
  localStorage.setItem("presupuesto", JSON.stringify(datos));

  const clienteRef = doc(db, "clientes", datos.telefono);
  updateDoc(clienteRef, {
    ultimoPresupuesto: datos
  });
}

window.addItem = function(nombre, precio) {
  datos.carrito.push({ nombre, precio });
  render();
};

window.toggleExtra = function(nombre, precio) {
  if (datos.extras[nombre]) {
    delete datos.extras[nombre];
  } else {
    datos.extras[nombre] = precio;
  }
  render();
};

function render() {
  lista.innerHTML = "";
  let total = 0;

  datos.carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} – ${item.precio} € / persona`;
    lista.appendChild(li);
    total += item.precio * datos.personas;
  });

  for (let e in datos.extras) {
    const li = document.createElement("li");
    li.textContent = `${e} – ${datos.extras[e]} €`;
    lista.appendChild(li);
    total += datos.extras[e] * (e === "Vajilla" ? datos.personas : 1);
  }

  datos.total = total;
  totalTxt.innerText = `Total: ${total} €`;

  guardar();
}

window.continuar = function() {
  window.location.href = "resumen.html";
};

render();
