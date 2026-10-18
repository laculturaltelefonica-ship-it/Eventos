
/* =========================================================
   CATERING GIL & ROMÁN — selector.js
   Compatible con selector.html y resumen.html
   - No genera productos: están definidos en selector.html.
   - Guarda la selección en localStorage bajo "presupuesto".
   - Los servicios con precio a consultar no se suman al total.
   ========================================================= */

(() => {
  "use strict";

  const STORAGE_KEY = "presupuesto";
  const PRODUCT_SELECTOR = ".item[data-nombre][data-precio]";

  const euros = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR"
  });

  const normalizar = (texto) =>
    String(texto ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const numero = (valor, defecto = 0) => {
    const resultado = Number(valor);
    return Number.isFinite(resultado) ? resultado : defecto;
  };

  function leerPresupuesto() {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);

      if (!guardado) return {};

      const dato = JSON.parse(guardado);

      return dato && typeof dato === "object" && !Array.isArray(dato)
        ? dato
        : {};
    } catch (error) {
      console.warn("No se pudo leer el presupuesto guardado.", error);
      return {};
    }
  }

  let presupuesto = leerPresupuesto();

  if (!Array.isArray(presupuesto.carrito)) {
    presupuesto.carrito = [];
  }

  if (!presupuesto.extras || typeof presupuesto.extras !== "object") {
    presupuesto.extras = {};
  }

  const productos = Array.from(
    document.querySelectorAll(PRODUCT_SELECTOR)
  );

  const elementos = {
    infoCliente: document.getElementById("infoCliente"),
    contador: document.getElementById("contadorCarrito"),
    totalBarra: document.getElementById("totalBarra"),
    total: document.getElementById("total"),
    textoResumen: document.getElementById("textoResumen"),
    lista: document.getElementById("lista"),
    mensajeVacio: document.getElementById("mensajeCarritoVacio"),
    detalles: document.getElementById("detallesPresupuesto"),
    presupuesto: document.getElementById("presupuesto"),
    visor: document.getElementById("visorImagen"),
    imagenGrande: document.getElementById("imagenGrande"),
    cerrarVisor: document.getElementById("cerrarVisor")
  };

  /* =========================================================
     GUARDAR DATOS
     ========================================================= */

  function guardarPresupuesto() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(presupuesto)
      );
    } catch (error) {
      console.error("No se pudo guardar el presupuesto.", error);

      alert(
        "No se ha podido guardar la selección en este navegador. " +
        "Comprueba que el almacenamiento esté permitido."
      );
    }
  }

  /* =========================================================
     INFORMACIÓN DE LOS PRODUCTOS
     ========================================================= */

  function datosProducto(elemento) {
    const cantidadElemento = elemento.querySelector(".cantidad");

    const cantidad = Math.max(
      0,
      Math.floor(numero(cantidadElemento?.textContent))
    );

    const precio = Math.max(
      0,
      numero(elemento.dataset.precio)
    );

    const consulta = elemento.dataset.consulta === "true";

    const nombre =
      elemento.dataset.nombre ||
      elemento.querySelector("h3")?.textContent.trim() ||
      "Producto";

    const categoria =
      elemento.dataset.categoria ||
      elemento.closest(".seccion")?.id ||
      "";

    return {
      elemento,
      nombre,
      categoria,
      precioPersona: precio,
      cantidad,
      total: consulta ? 0 : precio * cantidad,
      consulta
    };
  }

  function leerCantidad(elemento) {
    return Math.max(
      0,
      Math.floor(
        numero(elemento.querySelector(".cantidad")?.textContent)
      )
    );
  }

  function escribirCantidad(elemento, cantidad) {
    const segura = Math.max(
      0,
      Math.floor(numero(cantidad))
    );

    const visorCantidad = elemento.querySelector(".cantidad");

    if (visorCantidad) {
      visorCantidad.textContent = String(segura);
    }

    const botonMenos = elemento.querySelector(".menos");
    const botonReset = elemento.querySelector(".reset");

    if (botonMenos) {
      botonMenos.disabled = segura === 0;
    }

    if (botonReset) {
      botonReset.disabled = segura === 0;
    }

    elemento.setAttribute("data-cantidad", String(segura));

    actualizarPresupuesto();
  }

  /* =========================================================
     RECUPERAR LA SELECCIÓN GUARDADA
     ========================================================= */

  function cantidadesGuardadas() {
    const mapa = new Map();

    presupuesto.carrito.forEach((producto) => {
      if (!producto || !producto.nombre) return;

      const nombre = normalizar(producto.nombre);

      const cantidad = Math.max(
        0,
        Math.floor(numero(producto.cantidad))
      );

      if (cantidad > 0) {
        mapa.set(
          nombre,
          (mapa.get(nombre) || 0) + cantidad
        );
      }
    });

    return mapa;
  }

  function escribirCantidadSinActualizar(elemento, cantidad) {
    const segura = Math.max(
      0,
      Math.floor(numero(cantidad))
    );

    const visorCantidad = elemento.querySelector(".cantidad");

    if (visorCantidad) {
      visorCantidad.textContent = String(segura);
    }

    const botonMenos = elemento.querySelector(".menos");
    const botonReset = elemento.querySelector(".reset");

    if (botonMenos) {
      botonMenos.disabled = segura === 0;
    }

    if (botonReset) {
      botonReset.disabled = segura === 0;
    }

    elemento.setAttribute("data-cantidad", String(segura));
  }

  function restaurarCantidades() {
    const guardadas = cantidadesGuardadas();

    productos.forEach((elemento) => {
      const nombre = normalizar(elemento.dataset.nombre);

      escribirCantidadSinActualizar(
        elemento,
        guardadas.get(nombre) || 0
      );
    });

    actualizarPresupuesto();
  }

  /* =========================================================
     CONSTRUIR EL CARRITO
     ========================================================= */

  function construirCarrito() {
    return productos
      .map((elemento) => datosProducto(elemento))
      .filter((producto) => producto.cantidad > 0)
      .map(({ elemento, ...producto }) => ({
        categoria: producto.categoria,
        nombre: producto.nombre,
        precioPersona: producto.precioPersona,
        cantidad: producto.cantidad,
        total: producto.total,
        ...(producto.consulta ? { consulta: true } : {})
      }));
  }

  function totalCalculado(carrito = construirCarrito()) {
    return carrito.reduce((suma, producto) => {
      if (
        producto.consulta ||
        numero(producto.precioPersona) === 0
      ) {
        return suma;
      }

      const importe = numero(
        producto.total,
        numero(producto.precioPersona) *
        numero(producto.cantidad)
      );

      return suma + importe;
    }, 0);
  }

  function cantidadLineas(carrito = construirCarrito()) {
    return carrito.reduce(
      (suma, producto) => suma + numero(producto.cantidad),
      0
    );
  }

  function guardarYActualizar(carrito) {
    presupuesto.carrito = carrito;
    presupuesto.total = totalCalculado(carrito);
    presupuesto.totalEstimado = presupuesto.total;
    presupuesto.ultimaActualizacion = new Date().toISOString();

    guardarPresupuesto();
  }

  /* =========================================================
     ACTUALIZAR EL PRESUPUESTO
     ========================================================= */

  function actualizarPresupuesto() {
    const carrito = construirCarrito();

    const total = totalCalculado(carrito);
    const unidades = cantidadLineas(carrito);

    const serviciosConsulta = carrito.filter(
      (producto) =>
        producto.consulta ||
        numero(producto.precioPersona) === 0
    ).length;

    presupuesto.carrito = carrito;
    presupuesto.total = total;
    presupuesto.totalEstimado = total;

    guardarPresupuesto();

    if (elementos.total) {
      elementos.total.textContent =
        `Total: ${euros.format(total)}`;
    }

    if (elementos.totalBarra) {
      elementos.totalBarra.textContent =
        euros.format(total);
    }

    if (elementos.contador) {
      elementos.contador.textContent = String(unidades);

      elementos.contador.setAttribute(
        "aria-label",
        `${unidades} unidades seleccionadas`
      );
    }

    if (elementos.textoResumen) {
      if (!carrito.length) {
        elementos.textoResumen.textContent =
          "Todavía no has añadido productos";
      } else {
        const textoServicios = serviciosConsulta
          ? ` · ${serviciosConsulta} ${
              serviciosConsulta === 1
                ? "servicio"
                : "servicios"
            } a consultar`
          : "";

        elementos.textoResumen.textContent =
          `${carrito.length} ${
            carrito.length === 1
              ? "tipo seleccionado"
              : "tipos seleccionados"
          }${textoServicios}`;
      }
    }

    if (elementos.lista) {
      renderizarLista(carrito);
    }

    if (elementos.mensajeVacio) {
      elementos.mensajeVacio.hidden = carrito.length > 0;

      elementos.mensajeVacio.textContent = carrito.length
        ? ""
        : "Tu selección aparecerá aquí.";
    }
  }

  /* =========================================================
     MOSTRAR PRODUCTOS SELECCIONADOS
     ========================================================= */

  function renderizarLista(carrito) {
    elementos.lista.replaceChildren();

    carrito.forEach((producto) => {
      const li = document.createElement("li");

      if (
        producto.consulta ||
        numero(producto.precioPersona) === 0
      ) {
        li.classList.add("linea-consulta");
      }

      const columnaNombre = document.createElement("div");
      columnaNombre.className = "nombre-linea";

      const enlaceProducto = document.createElement("button");

      enlaceProducto.type = "button";
      enlaceProducto.textContent = producto.nombre;

      enlaceProducto.setAttribute(
        "aria-label",
        `Volver a ${producto.nombre} para cambiar la cantidad`
      );

      enlaceProducto.addEventListener("click", () => {
        irAProducto(producto.nombre);
      });

      columnaNombre.appendChild(enlaceProducto);

      const detalle = document.createElement("span");

      detalle.className = "detalle-cantidad";
      detalle.textContent =
        `${producto.cantidad} ${
          producto.cantidad === 1 ? "unidad" : "unidades"
        }`;

      columnaNombre.appendChild(detalle);

      const importe = document.createElement("span");
      importe.className = "importe-linea";

      if (
        producto.consulta ||
        numero(producto.precioPersona) === 0
      ) {
        importe.textContent = "Precio a consultar";
      } else {
        importe.textContent = euros.format(
          numero(
            producto.total,
            numero(producto.precioPersona) *
            numero(producto.cantidad)
          )
        );
      }

      li.append(columnaNombre, importe);
      elementos.lista.appendChild(li);
    });
  }

  /* =========================================================
     VOLVER A LA FICHA DE UN PRODUCTO
     ========================================================= */

  function irAProducto(nombre) {
    const objetivo = productos.find((elemento) =>
      normalizar(elemento.dataset.nombre) === normalizar(nombre)
    );

    if (!objetivo) {
      alert(
        `No se ha encontrado la ficha de «${nombre}». ` +
        "Prueba a buscarlo en la carta."
      );

      return;
    }

    if (
      elementos.detalles &&
      window.matchMedia("(max-width: 760px)").matches
    ) {
      elementos.detalles.open = false;
    }

    objetivo.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    objetivo.classList.add("producto-enfocado");

    window.setTimeout(() => {
      objetivo.classList.remove("producto-enfocado");
    }, 1800);
  }

  /* =========================================================
     INFORMACIÓN DEL CLIENTE
     ========================================================= */

  function actualizarInfoCliente() {
    if (!elementos.infoCliente) return;

    const nombre =
      presupuesto.nombre ||
      presupuesto.cliente?.nombre ||
      presupuesto.datosCliente?.nombre ||
      "";

    if (nombre) {
      elementos.infoCliente.textContent =
        `Presupuesto para ${nombre}. ` +
        "Añade o modifica los productos y servicios que necesites. " +
        "Tu selección se guarda automáticamente.";
    }
  }

  /* =========================================================
     VISOR DE IMÁGENES
     ========================================================= */

  function abrirVisor(imagen) {
    if (
      !elementos.visor ||
      !elementos.imagenGrande ||
      !imagen?.src
    ) {
      return;
    }

    elementos.imagenGrande.src =
      imagen.currentSrc || imagen.src;

    elementos.imagenGrande.alt =
      imagen.alt || "Imagen ampliada del producto";

    elementos.visor.hidden = false;

    elementos.visor.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    elementos.cerrarVisor?.focus();
  }

  function cerrarVisor() {
    if (!elementos.visor) return;

    elementos.visor.hidden = true;

    elementos.visor.setAttribute("aria-hidden", "true");

    if (elementos.imagenGrande) {
      elementos.imagenGrande.removeAttribute("src");
    }

    document.body.style.overflow = "";
  }

  /* =========================================================
     BOTONES DE CADA PRODUCTO
     ========================================================= */

  function conectarProductos() {
    productos.forEach((elemento) => {
      const botonMas = elemento.querySelector(".mas");
      const botonMenos = elemento.querySelector(".menos");
      const botonReset = elemento.querySelector(".reset");
      const botonMultiplicar =
        elemento.querySelector(".multiplicar");

      const imagen = elemento.querySelector(".img-producto");

      botonMas?.addEventListener("click", () => {
        escribirCantidad(
          elemento,
          leerCantidad(elemento) + 1
        );
      });

      botonMenos?.addEventListener("click", () => {
        escribirCantidad(
          elemento,
          leerCantidad(elemento) - 1
        );
      });

      botonReset?.addEventListener("click", () => {
        escribirCantidad(elemento, 0);
      });

      // +10 suma diez unidades a la cantidad existente.
      botonMultiplicar?.addEventListener("click", () => {
        escribirCantidad(
          elemento,
          leerCantidad(elemento) + 10
        );
      });

      if (imagen) {
        imagen.tabIndex = 0;

        imagen.setAttribute("role", "button");

        imagen.setAttribute(
          "aria-label",
          `Ampliar imagen de ${elemento.dataset.nombre}`
        );

        imagen.addEventListener("click", () => {
          abrirVisor(imagen);
        });

        imagen.addEventListener("keydown", (evento) => {
          if (
            evento.key === "Enter" ||
            evento.key === " "
          ) {
            evento.preventDefault();
            abrirVisor(imagen);
          }
        });
      }
    });
  }

  /* =========================================================
     NAVEGACIÓN Y CIERRE DEL VISOR
     ========================================================= */

  function conectarNavegacion() {
    document
      .querySelectorAll('a[href="#presupuesto"]')
      .forEach((enlace) => {
        enlace.addEventListener("click", () => {
          if (elementos.detalles) {
            elementos.detalles.open = true;
          }
        });
      });

    document
      .querySelectorAll(
        'a[href="#catalogo"], a.seguir-eligiendo'
      )
      .forEach((enlace) => {
        enlace.addEventListener("click", () => {
          if (
            elementos.detalles &&
            window.matchMedia("(max-width: 760px)").matches
          ) {
            elementos.detalles.open = false;
          }
        });
      });

    if (elementos.cerrarVisor) {
      elementos.cerrarVisor.addEventListener(
        "click",
        cerrarVisor
      );
    }

    if (elementos.visor) {
      elementos.visor.addEventListener("click", (evento) => {
        if (evento.target === elementos.visor) {
          cerrarVisor();
        }
      });
    }

    document.addEventListener("keydown", (evento) => {
      if (
        evento.key === "Escape" &&
        elementos.visor &&
        !elementos.visor.hidden
      ) {
        cerrarVisor();
      }
    });

    // En ordenador, el presupuesto aparece desplegado.
    if (
      elementos.detalles &&
      window.matchMedia("(min-width: 761px)").matches
    ) {
      elementos.detalles.open = true;
    }
  }

  /* =========================================================
     CONTINUAR AL RESUMEN
     ========================================================= */

  window.continuar = function continuar() {
    const carrito = construirCarrito();

    if (!carrito.length) {
      alert(
        "Todavía no has seleccionado ningún producto o servicio. " +
        "Añade al menos uno antes de continuar."
      );

      return;
    }

    guardarYActualizar(carrito);

    // Conserva los datos existentes dentro de "presupuesto".
    // resumen.html debe leer la selección desde localStorage.
    window.location.href = "resumen.html";
  };

  /* =========================================================
     INICIAR LA PÁGINA
     ========================================================= */

  conectarProductos();
  conectarNavegacion();
  restaurarCantidades();
  actualizarInfoCliente();

})();
