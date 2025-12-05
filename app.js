/* ==================================================
   app.js — Versión final corregida y mejorada
   - Render de destinos
   - Modal detalle con slider
   - Simulador (vuelos, hoteles, actividades)
   - Itinerario (agregar / eliminar / limpiar / guardar en localStorage)
   - Correcciones: limpieza real, botones llamativos, estrellas con símbolo
   ================================================== */

/* ---------------------------
   DATOS: destinos
--------------------------- */

const destinos = [
  {
    nombre: "Tokio",  pais: "Japón",    precio: 1500,
    imagenes: ["Imagenes/Tokio slide.webp"],  
  },

  {
    nombre: "París", pais: "Francia",  precio: 1780,
    imagenes: ["Imagenes/Paris.jpg"]
  },

  {
    nombre: "Londres", pais: "Reino Unido",  precio: 1900,
    imagenes: ["Imagenes/londres.jpg"]
  },
 
  {
    nombre: "Nueva York",  pais: "Estados Unidos",  precio: 2300,
    imagenes: ["Imagenes/NY.jpg"]
  },

  {
    nombre: "Seúl",  pais: "Corea del Sur",  precio: 1150,
    imagenes: ["Imagenes/Seul.jpg"]
  },

  {
    nombre: "Madrid",  pais: "España", precio: 1700,
    imagenes: ["Imagenes/madrid.jpg"]
  },

  {
    nombre: "Barcelona", pais: "España",  precio: 1500,
    imagenes: ["Imagenes/barcelona.jpg"]
  },

  { nombre: "Roma", pais: "Italia", precio: 1650,
    imagenes:["imagenes/roma.jpg"]
  },

  { nombre: "Dubai", pais: "Emiratos Árabes Unidos", precio: 1980,
    imagenes:["imagenes/dubai.jpg"]
  },

  { nombre: "Sídney", pais: "Australia", precio: 1700,
    imagenes:["Imagenes/sidney.jpg"]
  },

  { nombre: "Melbourne", pais: "Australia", precio: 1850,
    imagenes:["Imagenes/melbourne.jpg"] 
  },

  { nombre: "Toronto", pais: "Canadá", precio: 1250,
    imagenes:["Imagenes/toronto.jpg"] 
  },

  { nombre: "Vancouver", pais: "Canadá", precio: 1280,
    imagenes:["Imagenes/vancouver1.jpg"] 
  },

  { nombre: "Praga", pais: "República Checa", precio: 850,
    imagenes:["Imagenes/praga1.jpg"] 
  },

  { nombre: "Budapest", pais: "Hungría", precio: 1420,
    imagenes:["Imagenes/budapest1.jpg"] 
  },

  { nombre: "Ámsterdam", pais: "Países Bajos", precio: 1550,
    imagenes:["Imagenes/amsterdam1.jpg"] 
  },

  { nombre: "Berlín", pais: "Alemania", precio: 1400,
    imagenes:["Imagenes/berlin1.jpg"] 
  },

  { nombre: "Chicago", pais: "Estados Unidos", precio: 1200,
    imagenes:["Imagenes/chicago1.jpg"] 
  },

  { nombre: "Los Ángeles", pais: "Estados Unidos", precio: 1220,
    imagenes:["Imagenes/losangeles1.jpg"] 
  },

  { nombre: "San Francisco", pais: "Estados Unidos", precio: 1250,
    imagenes:["Imagenes/sf1.jpg"] 
  },

  { nombre: "Osaka", pais: "Japón", precio: 1200,
    imagenes:["Imagenes/osaka.jpg"]
  },

  { nombre: "Kyoto", pais: "Japón", precio: 1580,
    imagenes:["Imagenes/kyoto1.jpg"]
  },

  { nombre: "Hong Kong", pais: "China", precio: 1300,
    imagenes:["Imagenes/hk1.jpg"]
  },

  { nombre: "Singapur", pais: "Singapur", precio: 1250,
    imagenes:["Imagenes/singapur1.jpg"]
  },

  { nombre: "Bangkok", pais: "Tailandia", precio: 1000,
    imagenes:["Imagenes/bangkok1.jpg"] 
  },

  { nombre: "Phuket", pais: "Tailandia", precio: 980,
    imagenes:["Imagenes/phuket1.jpg"] 
  },

  { nombre: "Bali", pais: "Indonesia", precio: 950,
    imagenes:["Imagenes/bali1.jpg"] 
  },

];

/* ---------------------------
   RENDER DESTINOS
--------------------------- */
function renderDestinos(lista = destinos) {
  const grid = document.getElementById("destinosGrid");
  if (!grid) return;
  grid.innerHTML = "";

  lista.forEach(dest => {
    const card = document.createElement("div");
    card.classList.add("destino-card");
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${dest.imagenes[0]}')"></div>
      <div class="card-body">
        <h3 class="card-title">${dest.nombre}</h3>
        <p class="card-meta">${dest.pais}</p>
        <div class="card-foot">
          <div class="muted">Desde USD ${dest.precio}</div>
          <div>
            <button class="btn-outline btn-ver" data-destino="${dest.nombre}">Ver más</button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderDestinos();

/* ---------------------------
   BUSCADOR
--------------------------- */
const searchInput = document.getElementById("searchDestinos");
const searchMsg = document.getElementById("searchMsg");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    const resultados = destinos.filter(d =>
      d.nombre.toLowerCase().includes(q) || (d.pais && d.pais.toLowerCase().includes(q))
    );
    if (resultados.length === 0) {
      searchMsg?.classList.remove("hidden");
      renderDestinos(destinos.slice(0, 6));
    } else {
      searchMsg?.classList.add("hidden");
      renderDestinos(resultados);
    }
  });
}

/* ---------------------------
   SLIDER SIMPLE (LEGACY)
--------------------------- */
const sliderModal = document.getElementById("sliderModal");
const sliderImages = document.getElementById("sliderImages");
const closeSlider = document.getElementById("closeSlider");
let currentSlide = 0;
let currentImages = [];

if (sliderModal && sliderImages) {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-slider")) {
      abrirSlider(e.target.dataset.destino);
    }
  });

  function abrirSlider(nombre) {
    const destino = destinos.find(d => d.nombre === nombre);
    if (!destino) return;
    currentImages = destino.imagenes;
    sliderImages.innerHTML = "";
    currentImages.forEach((Imagenes, i) => {
      const el = document.createElement("Imagenes");
      el.src = Imagenes;
      el.classList.add("slide");
      if (i === 0) el.classList.add("active");
      sliderImages.appendChild(el);
    });
    currentSlide = 0;
    sliderModal.classList.remove("hidden");
  }

  closeSlider?.addEventListener("click", () => sliderModal.classList.add("hidden"));
  document.getElementById("nextSlide")?.addEventListener("click", () => cambiarSlide(1));
  document.getElementById("prevSlide")?.addEventListener("click", () => cambiarSlide(-1));

  function cambiarSlide(dir) {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + dir + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }
}

/* ---------------------------
   ITINERARIO SIMPLE
--------------------------- */
const origenInput = document.getElementById("origenInput");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso");
const outItinerario = document.getElementById("itinerarioResultados");
[origenInput, fechaSalida, fechaRegreso].forEach(el => el?.addEventListener("input", generarItinerario));
function generarItinerario() {
  if (!origenInput?.value || !fechaSalida?.value || !fechaRegreso?.value) {
    if (outItinerario) outItinerario.innerHTML = "";
    return;
  }
  outItinerario.innerHTML = `
    <h3>Tu itinerario desde ${origenInput.value}</h3>
    <p><strong>Salida:</strong> ${fechaSalida.value}</p>
    <p><strong>Regreso:</strong> ${fechaRegreso.value}</p>

    <div class="itinerario-caja">
      <h4>Vuelos recomendados</h4>
      <ul>
        <li>${origenInput.value} → París — $850 USD</li>
        <li>${origenInput.value} → Tokio — $1150 USD</li>
        <li>${origenInput.value} → Nueva York — $780 USD</li>
      </ul>
    </div>
  `;
}

/* ---------------------------
   HOTSPOTS MAPA
--------------------------- */
const hotspots = [
  { x: 72, y: 30, nombre: "Tokio" },
  { x: 48, y: 22, nombre: "París" },
  { x: 10, y: 34, nombre: "Nueva York" }
];
function renderHotspots() {
  const mapa = document.querySelector(".mapa-contenido");
  if (!mapa) return;
  hotspots.forEach(h => {
    const dot = document.createElement("button");
    dot.classList.add("hotspot");
    dot.style.left = h.x + "%";
    dot.style.top = h.y + "%";
    dot.setAttribute("data-title", h.nombre);
    dot.addEventListener("click", () => openDestino(h.nombre));
    mapa.appendChild(dot);
  });
}
renderHotspots();

/* ==================================================
   DETALLE DESTINO MODAL (MÓDULO)
================================================== */
(function DestinoDetalleModule() {
  const destModal = document.getElementById("destModal");
  if (!destModal) return;
  const destModalBg = document.getElementById("destModalBg");
  const closeDestModal = document.getElementById("closeDestModal");

  const destSlides = document.getElementById("destSlides");
  const destPrev = document.getElementById("destPrev");
  const destNext = document.getElementById("destNext");
  const destTitle = document.getElementById("destTitle");
  const destSubtitle = document.getElementById("destSubtitle");

  const destStart = document.getElementById("destStart");
  const destEnd = document.getElementById("destEnd");
  const travelStyle = document.getElementById("travelStyle");
  const budgetRange = document.getElementById("budgetRange");
  const budgetVal = document.getElementById("budgetVal");
  const simulateBtn = document.getElementById("simulateBtn");
  const simResults = document.getElementById("simResults");

  const itineraryList = document.getElementById("itineraryList");
  const itineraryTotalEl = document.getElementById("itineraryTotal");
  const minWarning = document.getElementById("minWarning");
  // soporte para id "clearItinerary" o "clearItineraryBtn"
  const clearItineraryBtn = document.getElementById("clearItinerary") || document.getElementById("clearItineraryBtn");

  let currentDestino = null;
  let slideIndex = 0;
  let itinerary = [];

  // Exponer función para debug / links externos
  window.openDestino = openDestino;

  // Delegación: abrir modal al clicar "Ver más"
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-ver");
    if (!btn) return;
    openDestino(btn.dataset.destino);
  });

  function openDestino(nombre) {
    const dest = destinos.find(d => d.nombre === nombre);
    if (!dest) return alert("Destino no encontrado: " + nombre);
    currentDestino = dest;
    slideIndex = 0;
    itinerary = [];
    populateModal(dest);
    loadSavedItinerary(dest.nombre); // carga guardado (si existe)
    showModal();
    abrirSlider (nombre); // abrir slider legacy también
  }

  function showModal() {
    destModal.classList.remove("hidden");
    destModal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    destModal.classList.add("hidden");
    destModal.setAttribute("aria-hidden", "true");
  }

  closeDestModal?.addEventListener("click", closeModal);
  destModalBg?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  function populateModal(dest) {
    // título y subtítulo
    destTitle.textContent = `${dest.nombre}${dest.pais ? ", " + dest.pais : ""}`;
    destSubtitle.textContent = `Precio base: USD ${dest.precio}`;

    // slider de imágenes
    destSlides.innerHTML = "";
    const Imageness = Array.isArray(dest.imagenes) && dest.imagenes.length ? dest.imagenes : ["Imagenes/default1.jpg"];
    Imageness.forEach(src => {
      const s = document.createElement("div");
      s.className = "dest-slide";
      s.style.backgroundImage = `url('${src}')`;
      destSlides.appendChild(s);
    });
    updateSlidePosition();

    // fechas por defecto
    const today = new Date().toISOString().slice(0,10);
    destStart.value = today;
    const plus = new Date(); plus.setDate(plus.getDate() + 5);
    destEnd.value = plus.toISOString().slice(0,10);

    // presupuesto: mínimo según precio base
    const minBudget = Math.max(50, Math.round((dest.precio || 200) * 0.5));
    budgetRange.min = minBudget;
    budgetRange.max = Math.max(minBudget + 100, 10000);
    budgetRange.value = Math.max(minBudget, dest.precio || minBudget);
    budgetVal.textContent = budgetRange.value;
    minWarning && (minWarning.style.display = "none");

    // reset resultados
    simResults && (simResults.innerHTML = "");
    renderItinerary();
  }

  // slider behaviour
  function updateSlidePosition(){
    const slides = destSlides.querySelectorAll(".dest-slide");
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slideIndex) * 100}%)`);
  }
  destPrev?.addEventListener("click", ()=> {
    const slides = destSlides.querySelectorAll(".dest-slide");
    if (!slides.length) return;
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  });
  destNext?.addEventListener("click", ()=> {
    const slides = destSlides.querySelectorAll(".dest-slide");
    if (!slides.length) return;
    slideIndex = (slideIndex + 1) % slides.length;
    updateSlidePosition();
  });

  // budget UI
  budgetRange?.addEventListener("input", (e) => {
    if (budgetVal) budgetVal.textContent = e.target.value;
    checkMinBudget();
  });
  function checkMinBudget(){
    if (!budgetRange || !minWarning) return;
    const min = parseInt(budgetRange.min,10);
    const val = parseInt(budgetRange.value,10);
    if (val < min) { minWarning.style.display = "block"; minWarning.textContent = `El presupuesto mínimo recomendado para este destino es USD ${min}`; }
    else { minWarning.style.display = "none"; }
  }

  // estilo de viaje (botones)
  travelStyle?.addEventListener("click", (e) => {
    const b = e.target.closest(".style-btn");
    if (!b) return;
    travelStyle.querySelectorAll(".style-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
  });
  function getActiveStyle(){
    const btn = travelStyle?.querySelector(".style-btn.active");
    return btn ? btn.dataset.style : "traditional";
  }

  /* ---------------------------
     SIMULADOR
     - Usa heurísticas simples pero coherentes
     - Genera vuelos, hoteles (con estrellas), actividades
  --------------------------- */
  simulateBtn?.addEventListener("click", () => {
    if (!currentDestino) return;
    simResults.innerHTML = "";
    const style = getActiveStyle();
    const budget = Number(budgetRange?.value || currentDestino.precio || 1000);
    const start = destStart?.value || null;
    const end = destEnd?.value || null;
    const nights = calculateNights(start, end);

    const flights = generateFlights(currentDestino, style, budget, nights);
    const hotels = generateHotels(currentDestino, style, budget, nights);
    const activities = generateActivities(currentDestino, style, budget);

    // Render groups
    if (flights.length) {
      const fGroup = document.createElement("div");
      fGroup.innerHTML = `<h4>Vuelos</h4>`;
      flights.forEach(f => {
        const card = makeSimCard(`${f.airline}`, `${f.route} — USD ${f.price}`, () => addToItinerary({type:'Vuelo', title:`${f.airline} ${f.route}`, price:f.price}));
        fGroup.appendChild(card);
      });
      simResults.appendChild(fGroup);
    }

    if (hotels.length) {
      const hGroup = document.createElement("div");
      hGroup.innerHTML = `<h4>Hoteles (precio por noche)</h4>`;
      hotels.forEach(h => {
        // mostramos estrellas como símbolos repetidos
        const stars = "★".repeat(h.stars);
        const subtitle = `${stars} — USD ${h.price}`;
        const card = makeSimCard(h.name, subtitle, () => addToItinerary({type:'Hotel', title:`${h.name} (${nights} noches)`, price: h.price * nights}));
        hGroup.appendChild(card);
      });
      simResults.appendChild(hGroup);
    }

    if (activities.length) {
      const aGroup = document.createElement("div");
      aGroup.innerHTML = `<h4>Actividades</h4>`;
      activities.forEach(a => {
        const card = makeSimCard(a.name, `USD ${a.price}`, () => addToItinerary({type:'Actividad', title:a.name, price:a.price}));
        aGroup.appendChild(card);
      });
      simResults.appendChild(aGroup);
    }
  });

  function calculateNights(start, end){
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.max(1, Math.round((e - s) / (1000*60*60*24)));
    return diff;
  }

  function generateFlights(dest, style, budget, nights){
    if (!dest) return [];
    const base = dest.precio || 500;
    const airlines = ["SkyAir","AeroNext","GlobalWings","FlyPro"];
    const results = [];
    for (let i=0;i<3;i++){
      const airline = airlines[i % airlines.length];
      // price influenced by base, style, nights and randomness
      const styleAdj = (style === 'adventure') ? 1.15 : (style === 'traditional' ? 0.95 : 1.0);
      const dateAdj = 1 + Math.random()*0.25; // fechas pueden subir un poco
      const price = Math.max(50, Math.round(base * (0.35 + Math.random()*0.9) * styleAdj * dateAdj));
      if (price <= Math.max(100, budget * 2)) results.push({airline, route:`Origen → ${dest.nombre}`, price});
    }
    return results.sort((a,b)=>a.price-b.price);
  }

  function generateHotels(dest, style, budget, nights){
    if (!dest) return [];
    const hotels = [];
    // stars mapping by style
    const starSets = (style === 'traditional') ? [3,4] : (style === 'adventure' ? [2,3] : [4,5]);
    const names = ["City Comfort","Grand Stay","Hostel Spot","Boutique Luxe","Eco Retreat"];
    for (let i=0;i<4;i++){
      const stars = starSets[i % starSets.length];
      const name = `${names[i % names.length]}`;
      const price = Math.max(20, Math.round((dest.precio || 150) * (0.15 + Math.random()*0.7) * (stars/3)));
      hotels.push({name, price, stars});
    }
    return hotels.sort((a,b) => a.price - b.price);
  }

  function generateActivities(dest, style, budget){
    const pool = {
      traditional: ["Museos y tour histórico", "Cena tradicional", "Paseo cultural"],
      adventure: ["Trekking guiado", "Tour en kayak", "Escalada / aventura"],
      sightseeing: ["City tour panorámico", "Crucero corto", "Tour en bicicleta"]
    };
    const list = pool[ getActiveStyle() ] || pool.traditional;
    return list.map((name) => ({name, price: Math.round(15 + Math.random()*120)}));
  }

  // crear card de simulación (botón "Agregar" ovalado y verde en línea para que sea visible sin cambios CSS)
  function makeSimCard(title, subtitle, addHandler){
    const el = document.createElement("div");
    el.className = "sim-card";
    el.innerHTML = `
      <div class="sim-left"><strong>${title}</strong><div class="muted">${subtitle}</div></div>
      <div class="sim-right"></div>
    `;
    const btn = document.createElement("button");
    btn.className = "btn-add";
    // estilo inline para asegurar que se vea como quieres (ovalado + verde pastel). Puedes mover esto a CSS luego.
    btn.style.border = "none";
    btn.style.padding = "8px 14px";
    btn.style.borderRadius = "999px";
    btn.style.background = "linear-gradient(90deg,#8fd09a,#6fbf73)";
    btn.style.color = "#053216";
    btn.style.fontWeight = "800";
    btn.style.cursor = "pointer";
    btn.textContent = "Agregar";
    btn.addEventListener("click", addHandler);
    el.querySelector(".sim-right").appendChild(btn);
    return el;
  }

  /* ---------------------------
     ITINERARIO: agregar / render / eliminar / limpiar
  --------------------------- */
  function addToItinerary(item){
    itinerary.push(item);
    renderItinerary();
    // Guardar si hay destino válido
    if (currentDestino && currentDestino.nombre) saveItinerary(currentDestino.nombre);
  }

  function renderItinerary(){
    if (!itineraryList || !itineraryTotalEl) return;
    itineraryList.innerHTML = "";
    let total = 0;
    itinerary.forEach((it, idx) => {
      const el = document.createElement("div");
      el.className = "itinerary-item";
      el.innerHTML = `<div>${it.type} — ${it.title}</div><div>USD ${it.price} <button data-i="${idx}" class="remove-item" style="margin-left:8px">✕</button></div>`;
      itineraryList.appendChild(el);
      total += Number(it.price);
    });
    itineraryTotalEl.textContent = total.toFixed(2);
    showDailyBreakdown(total);

    // attach remove handlers (rebind each render)
    itineraryList.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        if (!isNaN(i)) itinerary.splice(i, 1);
        renderItinerary();
        if (currentDestino && currentDestino.nombre) saveItinerary(currentDestino.nombre);
      });
    });
  }

  function showDailyBreakdown(total){
    const existing = document.getElementById("dailyBreakdown");
    let container = existing;
    if (!container) {
      container = document.createElement("div");
      container.id = "dailyBreakdown";
      container.style.marginTop = "8px";
      container.style.fontSize = "14px";
      container.style.color = "var(--muted)";
      if (itineraryList) itineraryList.parentElement.appendChild(container);
    }
    const nights = calculateNights(destStart?.value, destEnd?.value);
    const perDay = nights > 0 ? (total / nights) : total;
    container.innerHTML = `Desglose: <strong>${nights}</strong> noches — Promedio por noche: <strong>USD ${perDay.toFixed(2)}</strong>`;
  }

  // Clear itinerary (vacía array + borra guardado local)
  clearItineraryBtn?.addEventListener("click", () => {
    itinerary = [];
    renderItinerary();
    if (currentDestino && currentDestino.nombre) {
      try { localStorage.removeItem(`itinerary_${currentDestino.nombre}`); } catch(e){/*ignore*/ }
    }
  });

  /* ---------------------------
     GUARDAR / CARGAR itinerario usando localStorage (por destino)
  --------------------------- */
  function saveItinerary(destName){
    if (!destName) return;
    try {
      localStorage.setItem(`itinerary_${destName}`, JSON.stringify({itinerary, savedAt: Date.now()}));
    } catch(e){ console.warn("No se pudo guardar itinerary:", e); }
  }

  function loadSavedItinerary(destName){
    if (!destName) return;
    try {
      const raw = localStorage.getItem(`itinerary_${destName}`);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.itinerary)) {
        itinerary = parsed.itinerary.slice(); // clonar
        renderItinerary();
      }
    } catch(e){ console.warn("Error leyendo itinerary:", e); }
  }

})(); // fin DestinoDetalleModule

/* ---------------------------
   LOGIN / REGISTER (si existen en tu HTML)
--------------------------- */
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const capsule = document.querySelector(".capsule");
const goLogin = document.getElementById("go-login");
const goRegister = document.getElementById("go-register");

goLogin?.addEventListener("click", () => {
  capsule?.classList.remove("move-right");
  capsule?.classList.add("move-left");
  if (loginForm) loginForm.style.display = "flex";
  if (registerForm) registerForm.style.display = "none";
});
goRegister?.addEventListener("click", () => {
  capsule?.classList.remove("move-left");
  capsule?.classList.add("move-right");
  if (loginForm) loginForm.style.display = "none";
  if (registerForm) registerForm.style.display = "flex";
});
loginForm?.addEventListener("submit", (e)=>{ e.preventDefault(); window.location.href = "index.html"; });
registerForm?.addEventListener("submit", (e)=>{ e.preventDefault(); window.location.href = "index.html"; });

/* ---------------------------
   UTILIDADES
--------------------------- */
function extraFilters({ maxPrice, country, style } = {}) {
  let results = destinos.slice();
  if (typeof maxPrice === "number") results = results.filter(d => d.precio <= maxPrice);
  if (country) results = results.filter(d => (d.pais || "").toLowerCase().includes(country.toLowerCase()));
  renderDestinos(results);
  return results;
}

window.app = {
  destinos,
  renderDestinos,
  extraFilters
};
