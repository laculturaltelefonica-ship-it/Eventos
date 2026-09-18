const PRODUCTOS = [
  // ENTRANTES
  {
    categoria: "entrantes",
    nombre: "Canapé Tosta",
    descripcion: "Canapé de Salmón / Anchoa / Pollo",
    precio: 1,
    precioTexto: "1,00 €",
    imagen: "images/Canape_tosta.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Canapé Volavanes",
    descripcion: "Canapé de Salmón / Anchoa / Pollo",
    precio: 1.25,
    precioTexto: "1,25 €",
    imagen: "images/Canape_volavanes.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Canapé Tartaleta",
    descripcion: "Canapé de Salmón / Anchoa / Pollo",
    precio: 2.5,
    precioTexto: "2,50 €",
    imagen: "images/Canape_tartaleta.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Canapé Quiché",
    descripcion: "Canapé de Salmón / Anchoa / Pollo",
    precio: 2.5,
    precioTexto: "2,50 €",
    imagen: "images/canape_quiche.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Aguacate Malagueño",
    descripcion: "Medio aguacate relleno de marisco",
    precio: 2.5,
    precioTexto: "2,50 € / (mitad)",
    imagen: "images/aguacate.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Jamón Ibérico",
    descripcion: "Plato 100 gr",
    precio: 10,
    precioTexto: "10,00 € / Plato 100 gr",
    imagen: "images/jamon.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Lomo Ibérico",
    descripcion: "Plato 100 gr",
    precio: 4,
    precioTexto: "4,00 € / Plato 100 gr",
    imagen: "images/lomo.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Chorizo Ibérico",
    descripcion: "Plato 100 gr",
    precio: 4,
    precioTexto: "4,00 € / Plato 100 gr",
    imagen: "images/lomo.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Queso Semicurado",
    descripcion: "Plato 100-150 gr",
    precio: 5,
    precioTexto: "5,00 € / Plato de 100-150 gr",
    imagen: "images/queso.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Hojaldre Dog",
    descripcion: "Perrito Caliente en masa de Hojaldre 15 cm",
    precio: 2,
    precioTexto: "2,00 €",
    imagen: "images/perritos.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Mini Wraps Salmón",
    descripcion: "Mini tortita rellena de Salmón y crema",
    precio: 2,
    precioTexto: "2,00 €",
    imagen: "images/wraps.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Saladitos",
    descripcion: "Bocaditos salados de hojaldre relleno",
    precio: 1,
    precioTexto: "1,00 €",
    imagen: "images/saladitos.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Empanadillas",
    descripcion: "Empanadilla tradicional de atún y tomate",
    precio: 1.5,
    precioTexto: "1,50 €",
    imagen: "images/empanadillas.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Croquetas",
    descripcion: "Croquetas de Pollo / Croquetas de Jamón",
    precio: 1,
    precioTexto: "1,00 €",
    imagen: "images/croqueta.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Croquetas Premium",
    descripcion: "Croquetas de Rabo de Toro / Croquetas de Merluza y Gambas al Pil-Pil",
    precio: 1.5,
    precioTexto: "1,50 €",
    imagen: "images/croqueta.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Miniburguer",
    descripcion: "Mini Hamburguesas con bacon y queso",
    precio: 2,
    precioTexto: "2,00 €",
    imagen: "images/miniburguer.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Minibrioches",
    descripcion: "Pan brioche relleno de queso crema / Salmón / Aguacate",
    precio: 2,
    precioTexto: "2,00 €",
    imagen: "images/minibrioches.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Pinchitos",
    descripcion: "Pinchitos de Pollo o Cerdo",
    precio: 1.5,
    precioTexto: "1,50 €",
    imagen: "images/pinchitos.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Ensaladilla Rusa",
    descripcion: "Ensaladilla con patata, mayonesa, atún, huevo cocido, bocas de mar, aceitunas, zanahoria.",
    precio: 1.5,
    precioTexto: "1,50 € / vaso",
    imagen: "images/ensaladilla.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Tortilla de Patatas",
    descripcion: "Tortilla de patatas con o sin cebolla.",
    precio: 15,
    precioTexto: "15,00 €",
    imagen: "images/tortilla_patata.jpeg"
  },
  {
    categoria: "entrantes",
    nombre: "Huevo Relleno",
    descripcion: "Medio huevo cocido relleno con yema, atún y tomate frito, tapado con mayonesa y pimiento morrón.",
    precio: 2.5,
    precioTexto: "2,50 € (2 mitades)",
    imagen: "images/huevorelleno.jpeg"
  },

  // ENSALADAS
  {
    categoria: "ensaladas",
    nombre: "Ensalada Clásica",
    descripcion: "Ensalada de lechuga con tomate, cebolla, zanahoria, remolacha y atún aliñada con aceite, vinagre y sal.",
    precio: 1.5,
    precioTexto: "1,50 € / persona",
    imagen: "images/ensalada_clasica.jpeg"
  },
  {
    categoria: "ensaladas",
    nombre: "Ensalada César",
    descripcion: "Lechuga, pollo a la plancha, picatostes, queso parmesano y salsa César.",
    precio: 1.9,
    precioTexto: "1,90 € / persona",
    imagen: "images/ensalada_cesar.jpeg"
  },
  {
    categoria: "ensaladas",
    nombre: "Ensalada de Aguacate",
    descripcion: "Aguacate con tomate aliñada",
    precio: 1.9,
    precioTexto: "1,90 € / persona",
    imagen: "images/ensalada_aguacate.jpeg"
  },
  {
    categoria: "ensaladas",
    nombre: "Ensalada Mediterránea",
    descripcion: "Tomate, pepino, pimiento, cebolla roja, aceitunas y queso feta con aliño de aceite de oliva.",
    precio: 1.5,
    precioTexto: "1,50 € / persona",
    imagen: "images/ensalada-mediterranea.jpeg"
  },
  {
    categoria: "ensaladas",
    nombre: "Ensalada de Quinoa",
    descripcion: "Quinoa, espinaca, aguacate, tomate cherry y semillas con vinagreta cítrica.",
    precio: 1.9,
    precioTexto: "1,90 € / persona",
    imagen: "images/ensalada-quinoa.jpeg"
  },
  {
    categoria: "ensaladas",
    nombre: "Ensalada Tropical",
    descripcion: "Lechuga, mango, piña, aguacate, nueces y aliño de miel y limón.",
    precio: 1.5,
    precioTexto: "1,50 € / persona",
    imagen: "images/ensalada-tropical.jpeg"
  },

  // PLATOS CALIENTES
  {
    categoria: "platos-calientes",
    nombre: "Paella de carne",
    descripcion: "Paella con pollo y magro para 20-200 personas.",
    precio: 12.5,
    precioTexto: "12,50 € / persona",
    imagen: "images/paella.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Paella de marisco",
    descripcion: "Gambas, mejillones, calamares y almejas para 20-200 personas.",
    precio: 15,
    precioTexto: "15,00 € / persona",
    imagen: "images/Paella_marisco.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Paella mixta",
    descripcion: "Pollo, gambas, mejillones, calamares y almejas.",
    precio: 17.5,
    precioTexto: "17,50 € / persona",
    imagen: "images/Paella_marisco.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Arroz amarillo con carne y setas",
    descripcion: "Pollo, magro y revuelto de setas para 20-200 personas.",
    precio: 14,
    precioTexto: "14,00 € / persona",
    imagen: "images/paella.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Migas",
    descripcion: "Migas con carne, pimiento y huevo para 20-200 personas.",
    precio: 17.5,
    precioTexto: "17,50 € / persona",
    imagen: "images/migas.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Sopa Castellana",
    descripcion: "Sopa castellana tradicional para 20-200 personas.",
    precio: 10,
    precioTexto: "10,00 € / persona",
    imagen: "images/sopa-castellana.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Crema de Calabaza",
    descripcion: "Con picatostes, leche de coco y coco rallado para 20-200 personas.",
    precio: 10,
    precioTexto: "10,00 € / persona",
    imagen: "images/crema_calabaza.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Puchero",
    descripcion: "Caldo malagueño con garbanzos, pollo, ternera y cerdo para 20-200 personas.",
    precio: 10,
    precioTexto: "10,00 € / persona",
    imagen: "images/puchero.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Cazuela de fideos",
    descripcion: "Fideos, gambas y almejas.",
    precio: 15,
    precioTexto: "15,00 € / persona",
    imagen: "images/cazuela-fideos.jpeg"
  },
  {
    categoria: "platos-calientes",
    nombre: "Cazuela de patatas",
    descripcion: "Patatas y carne de cerdo.",
    precio: 14,
    precioTexto: "14,00 € / persona",
    imagen: "images/cazuela-patatas.jpeg"
  },

  // VENEZOLANO
  {
    categoria: "venezolano",
    nombre: "Arepa",
    descripcion: "Arepa tradicional con rellenos a elegir.",
    precio: 5,
    precioTexto: "5,00 €",
    imagen: "images/arepa.jpeg"
  },

  // ASIÁTICO
  {
    categoria: "asiatico",
    nombre: "Maki",
    descripcion: "",
    precio: 1.25,
    precioTexto: "1,25 €",
    imagen: "images/maki.jpeg"
  },
  {
    categoria: "asiatico",
    nombre: "Uramaki",
    descripcion: "",
    precio: 1.25,
    precioTexto: "1,25 €",
    imagen: "images/maki.jpeg"
  },
  {
    categoria: "asiatico",
    nombre: "Niguiri",
    descripcion: "",
    precio: 2,
    precioTexto: "2,00 €",
    imagen: "images/maki.jpeg"
  },
  {
    categoria: "asiatico",
    nombre: "Gyoza",
    descripcion: "",
    precio: 2,
    precioTexto: "2,00 €",
    imagen: "images/maki.jpeg"
  },

  // POSTRES
  {
    categoria: "postres",
    nombre: "Flan",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / persona",
    imagen: "images/flan.jpeg"
  },
  {
    categoria: "postres",
    nombre: "Natillas",
    descripcion: "",
    precio: 1.9,
    precioTexto: "1,90 € / persona",
    imagen: "images/natillas.jpeg"
  },
  {
    categoria: "postres",
    nombre: "Fruta",
    descripcion: "",
    precio: 2.5,
    precioTexto: "2,50 € / persona",
    imagen: "images/fruta.jpeg"
  },
  {
    categoria: "postres",
    nombre: "Tarta de Chocolate",
    descripcion: "",
    precio: 3,
    precioTexto: "3,00 € / persona",
    imagen: "images/tarta-chocolate.jpeg"
  },
  {
    categoria: "postres",
    nombre: "Cheesecake",
    descripcion: "",
    precio: 3.5,
    precioTexto: "3,50 € / persona",
    imagen: "images/cheesecake.jpeg"
  },

  // CARNES
  {
    categoria: "carnes",
    nombre: "Solomillo de ternera",
    descripcion: "Tierna pieza de ternera preparada a la plancha, acompañada de salsa de champiñones o reducción de vino tinto.",
    precio: 18.5,
    precioTexto: "18,50 € / persona",
    imagen: "images/solomillo-ternera.jpeg"
  },
  {
    categoria: "carnes",
    nombre: "Entrecot a la brasa",
    descripcion: "Entrecot de vacuno cocinado a la brasa, con sal en escamas y guarnición de patatas asadas.",
    precio: 16.9,
    precioTexto: "16,90 € / persona",
    imagen: "images/entrecot-brasa.jpeg"
  },
  {
    categoria: "carnes",
    nombre: "Pollo al horno especiado",
    descripcion: "Pollo asado lentamente con hierbas aromáticas y especias, jugoso y lleno de sabor.",
    precio: 12.5,
    precioTexto: "12,50 € / persona",
    imagen: "images/pollo-horno.jpeg"
  },
  {
    categoria: "carnes",
    nombre: "Carrillada ibérica",
    descripcion: "Carrilladas de cerdo ibérico guisadas a fuego lento en su propia salsa, extremadamente melosas.",
    precio: 15.9,
    precioTexto: "15,90 € / persona",
    imagen: "images/carrillada-iberica.jpeg"
  },
  {
    categoria: "carnes",
    nombre: "Costillas BBQ",
    descripcion: "Costillas de cerdo marinadas y horneadas, terminadas con salsa barbacoa casera.",
    precio: 14.5,
    precioTexto: "14,50 € / persona",
    imagen: "images/costillas-bbq.jpeg"
  },

  // BEBIDAS
  {
    categoria: "bebidas",
    nombre: "Cocacola 330ml",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/Coca-cola.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Fanta 330ml",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/fanta.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Tónica 330ml",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/tonica.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Cerveza Cruzcampo 330ml",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/Cruzcampo.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Cerveza Estrella Galicia 330ml",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/estrella_galicia.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Cerveza San Miguel 330ml",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/san_miguel.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "FuzeTea 330ml",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/fuzetea.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Acuarius Limón",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/acuarius.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Acuarius Naranja",
    descripcion: "",
    precio: 1.5,
    precioTexto: "1,50 € / unidad",
    imagen: "images/acuarius_naranja.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Monster 500ml",
    descripcion: "",
    precio: 2,
    precioTexto: "2,00 € / unidad",
    imagen: "images/monster.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Red Bull",
    descripcion: "",
    precio: 2.5,
    precioTexto: "2,50 € / unidad",
    imagen: "images/redbull.jpeg"
  },
  {
    categoria: "bebidas",
    nombre: "Vino Protos",
    descripcion: "",
    precio: 17.5,
    precioTexto: "17,50 € / botella",
    imagen: "images/vino_protos.jpeg"
  }
];