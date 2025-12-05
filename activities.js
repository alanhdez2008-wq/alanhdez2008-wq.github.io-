const actividades = [
  {
    nombre: "Fotografía Profesional",
    descripcion: "Aprende técnicas avanzadas de fotografía en exteriores.",
    imagenes: ["img/foto1.jpg", "img/foto2.jpg", "img/foto3.jpg"],
    duracion: "3 horas",
    incluye: ["Instructor profesional", "Guía de encuadre", "Práctica en campo"]
  },
  {
    nombre: "Senderismo",
    descripcion: "Explora rutas naturales y disfruta de paisajes espectaculares.",
    imagenes: ["img/senderismo.jpg", "img/senderismo2.jpg"],
    duracion: "4-6 horas",
    incluye: ["Guía certificado", "Equipo básico", "Botella de agua"]
  },
  {
    nombre: "Ciclismo de Montaña",
    descripcion: "Recorre senderos extremos diseñados para adrenalina pura.",
    imagenes: ["img/bike1.jpg", "img/bike2.jpg"],
    duracion: "5 horas",
    incluye: ["Bicicleta profesional", "Casco y protecciones", "Guía experto"]
  },
  {
    nombre: "Gastronomía Local",
    descripcion: "Descubre recetas y sabores auténticos con chefs locales.",
    imagenes: ["img/food1.jpg", "img/food2.jpg"],
    duracion: "2 horas",
    incluye: ["Clase de cocina", "Ingredientes incluidos", "Degustación final"]
  },
  {
    nombre: "Kayak en Lago",
    descripcion: "Navega a través de aguas tranquilas rodeado de naturaleza.",
    imagenes: ["img/kayak1.jpg", "img/kayak2.jpg"],
    duracion: "2-3 horas",
    incluye: ["Kayak individual", "Chaleco salvavidas", "Instructor"]
  },
  {
    nombre: "Buceo",
    descripcion: "Sumérgete y explora la vida marina como nunca antes.",
    imagenes: ["img/buceo1.jpg", "img/buceo2.jpg"],
    duracion: "3 horas",
    incluye: ["Equipo completo", "Instructor PADI", "Fotografías subacuáticas"]
  },
  {
    nombre: "Escalada en Roca",
    descripcion: "Pon a prueba tus habilidades en rutas desafiantes.",
    imagenes: ["img/rock1.jpg"],
    duracion: "5 horas",
    incluye: ["Equipo profesional", "Instructor experto", "Seguridad incluida"]
  },
  {
    nombre: "Renta de Yate",
    descripcion: "Relájate y disfruta un recorrido panorámico.",
    imagenes: ["img/yatch1.jpg"],
    duracion: "1-2 horas",
    incluye: ["Chaleco salvavidas", "Cápitan", "Bebidas", "y", "Tour guiado"]
  },
  {
    nombre: "Tirolesa",
    descripcion: "Vive la adrenalina volando entre paisajes increíbles.",
    imagenes: ["img/zip1.jpg"],
    duracion: "1 hora",
    incluye: ["Equipo de seguridad", "Supervisión total", "Fotos del recorrido"]
  },
  {
    nombre: "Yoga al Amanecer",
    descripcion: "Conecta contigo mismo en una sesión relajante al aire libre.",
    imagenes: ["img/yoga1.jpg"],
    duracion: "1 hora",
    incluye: ["Instructor certificado", "Tapete de yoga", "Infusión saludable"]
  }
];


// ========================
// RENDER GRID
// ========================
const grid = document.getElementById("activitiesGrid");

actividades.forEach((act) => {
  const card = document.createElement("div");
  card.className = "activity-card";
  card.innerHTML = `
    <div class="activity-img" style="background-image:url('${act.imagenes[0]}')"></div>
    <div class="activity-body">
      <h3>${act.nombre}</h3>
      <p>${act.descripcion}</p>
    </div>
  `;
  card.addEventListener("click", () => openActivity(act.nombre));
  grid.appendChild(card);
});


// ========================
// MODAL
// ========================
const modal = document.getElementById("actModal");
const closeModal = document.getElementById("closeActModal");
const slides = document.getElementById("actSlides");

let currentIndex = 0;
let currentImages = [];

// Open
function openActivity(nombre) {
  const act = actividades.find(a => a.nombre === nombre);
  if (!act) return;

  document.getElementById("actTitle").textContent = act.nombre;
  document.getElementById("actDesc").textContent = act.descripcion;
  document.getElementById("actDuration").textContent = act.duracion;

  // Render includes
  const inc = document.getElementById("actIncludes");
  inc.innerHTML = "";
  act.incluye.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    inc.appendChild(li);
  });

  // Slider
  currentImages = act.imagenes;
  renderSlides();

  modal.classList.remove("hidden");
}

function renderSlides() {
  slides.innerHTML = "";
  currentImages.forEach(img => {
    const div = document.createElement("div");
    div.style.backgroundImage = `url('${img}')`;
    slides.appendChild(div);
  });
}

// Close
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Nav
document.getElementById("actPrev").addEventListener("click", () => {
  currentImages.push(currentImages.shift());
  renderSlides();
});

document.getElementById("actNext").addEventListener("click", () => {
  currentImages.unshift(currentImages.pop());
  renderSlides();
});
