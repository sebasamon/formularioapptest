const state = {
  lang: 'es',
  year: 2023,
  region: 'all',
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  quizResponses: [],
};

const dataStore = {
  regions: ['Norte', 'Central', 'Oriente', 'Suroccidente'],
  years: [2020, 2021, 2022, 2023],
  production: [
    { year: 2020, values: { Norte: 520, Central: 430, Oriente: 610, Suroccidente: 280 } },
    { year: 2021, values: { Norte: 545, Central: 455, Oriente: 640, Suroccidente: 310 } },
    { year: 2022, values: { Norte: 560, Central: 470, Oriente: 660, Suroccidente: 330 } },
    { year: 2023, values: { Norte: 575, Central: 490, Oriente: 685, Suroccidente: 350 } },
  ],
  area: [
    { year: 2020, values: { Norte: 170, Central: 150, Oriente: 210, Suroccidente: 120 } },
    { year: 2021, values: { Norte: 175, Central: 156, Oriente: 220, Suroccidente: 125 } },
    { year: 2022, values: { Norte: 182, Central: 162, Oriente: 228, Suroccidente: 132 } },
    { year: 2023, values: { Norte: 190, Central: 168, Oriente: 235, Suroccidente: 138 } },
  ],
  prices: [
    { year: 2020, national: 2780, regional: { Norte: 2820, Central: 2750, Oriente: 2840, Suroccidente: 2700 } },
    { year: 2021, national: 3100, regional: { Norte: 3140, Central: 3060, Oriente: 3160, Suroccidente: 3000 } },
    { year: 2022, national: 3350, regional: { Norte: 3400, Central: 3320, Oriente: 3380, Suroccidente: 3250 } },
    { year: 2023, national: 2990, regional: { Norte: 3030, Central: 2950, Oriente: 3010, Suroccidente: 2880 } },
  ],
  exports: [
    { year: 2020, destinations: { Europa: 42, America: 33, Asia: 25 } },
    { year: 2021, destinations: { Europa: 44, America: 32, Asia: 24 } },
    { year: 2022, destinations: { Europa: 40, America: 36, Asia: 24 } },
    { year: 2023, destinations: { Europa: 38, America: 37, Asia: 25 } },
  ],
  map: {
    Norte: {
      stats: {
        production: { es: '575 kt', en: '575 kt' },
        area: { es: '190 mil ha', en: '190 thousand ha' },
        yield: { es: '3.0 t/ha', en: '3.0 t/ha' },
        share: { es: '26% nacional', en: '26% national share' },
      },
      description: {
        es: 'Zona Caribe con logística portuaria estratégica y diversificación hacia biodiésel.',
        en: 'Caribbean zone with strategic port logistics and diversification toward biodiesel.',
      },
    },
    Central: {
      stats: {
        production: { es: '490 kt', en: '490 kt' },
        area: { es: '168 mil ha', en: '168 thousand ha' },
        yield: { es: '2.9 t/ha', en: '2.9 t/ha' },
        share: { es: '22% nacional', en: '22% national share' },
      },
      description: {
        es: 'Región pionera con integración industrial y alianzas de pequeños productores.',
        en: 'Pioneer region with industrial integration and smallholder partnerships.',
      },
    },
    Oriente: {
      stats: {
        production: { es: '685 kt', en: '685 kt' },
        area: { es: '235 mil ha', en: '235 thousand ha' },
        yield: { es: '3.2 t/ha', en: '3.2 t/ha' },
        share: { es: '31% nacional', en: '31% national share' },
      },
      description: {
        es: 'Mayor crecimiento en nuevas plantaciones y reconversión ganadera sostenible.',
        en: 'Fastest growth with new plantations and sustainable cattle-to-palm conversion.',
      },
    },
    Suroccidente: {
      stats: {
        production: { es: '350 kt', en: '350 kt' },
        area: { es: '138 mil ha', en: '138 thousand ha' },
        yield: { es: '2.5 t/ha', en: '2.5 t/ha' },
        share: { es: '21% nacional', en: '21% national share' },
      },
      description: {
        es: 'Paisajes biodiversos conectados a programas de conservación y valor agregado.',
        en: 'Biodiverse landscapes linked to conservation programs and value-add initiatives.',
      },
    },
  },
  insights: {
    2020: {
      all: {
        es: [
          'Oriente aportó más del 30% del aceite colombiano.',
          'Los precios nacionales comenzaron a recuperarse tras la caída de 2019.',
          'Europa concentró el 42% de las exportaciones.'
        ],
        en: [
          'Oriente supplied more than 30% of Colombian palm oil.',
          'National prices started to recover after the 2019 dip.',
          'Europe captured 42% of exports.'
        ],
      },
      Norte: {
        es: [
          'Norte consolidó 520 kt con acceso privilegiado a puertos.',
          'La región pagó una prima de 40 USD/t sobre el promedio nacional.'
        ],
        en: [
          'Norte delivered 520 kt with privileged port access.',
          'The region paid a 40 USD/t premium over the national average.'
        ],
      },
      Central: {
        es: [
          'Central mantuvo estabilidad productiva en 430 kt.',
          'Los encadenamientos industriales favorecieron contratos estables.'
        ],
        en: [
          'Central maintained production stability at 430 kt.',
          'Industrial linkages supported stable contracts.'
        ],
      },
      Oriente: {
        es: [
          'Oriente lideró con 610 kt tras nuevas plantaciones.',
          'Presentó la mayor prima de precios frente al nacional.'
        ],
        en: [
          'Oriente led with 610 kt thanks to new plantings.',
          'It showed the highest price premium versus national.'
        ],
      },
      Suroccidente: {
        es: [
          'Suroccidente sumó 280 kt con énfasis en sostenibilidad.',
          'Sus precios fueron 80 USD/t inferiores al promedio nacional.'
        ],
        en: [
          'Suroccidente reached 280 kt with a sustainability focus.',
          'Prices were 80 USD/t below the national average.'
        ],
      },
    },
    2021: {
      all: {
        es: [
          'La producción nacional superó los 1.9 millones de toneladas.',
          'Los precios se fortalecieron por la recuperación global.',
          'Europa siguió como principal destino.'
        ],
        en: [
          'National output surpassed 1.9 million tons.',
          'Prices strengthened amid global recovery.',
          'Europe remained the primary destination.'
        ],
      },
      Norte: {
        es: [
          'Norte creció a 545 kt gracias a mejoras agronómicas.',
          'Mantuvo una prima de 40 USD/t sobre el promedio.'
        ],
        en: [
          'Norte grew to 545 kt through agronomic upgrades.',
          'It held a 40 USD/t premium over the average.'
        ],
      },
      Central: {
        es: [
          'Central avanzó a 455 kt con renovación de cultivos.',
          'La región se benefició de inversiones en extracción.'
        ],
        en: [
          'Central advanced to 455 kt with crop renewal.',
          'The region benefited from extraction investments.'
        ],
      },
      Oriente: {
        es: [
          'Oriente alcanzó 640 kt, liderando la expansión nacional.',
          'Obtuvo la prima de precio más alta (+60 USD/t).' 
        ],
        en: [
          'Oriente hit 640 kt, leading national expansion.',
          'It captured the highest price premium (+60 USD/t).' 
        ],
      },
      Suroccidente: {
        es: [
          'Suroccidente llegó a 310 kt y reforzó programas de biodiversidad.',
          'La prima negativa se redujo a -100 USD/t.'
        ],
        en: [
          'Suroccidente climbed to 310 kt and reinforced biodiversity programs.',
          'The negative premium narrowed to -100 USD/t.'
        ],
      },
    },
    2022: {
      all: {
        es: [
          'Los precios alcanzaron máximos históricos de 3 350 USD/t.',
          'El área sembrada creció 5% impulsada por Oriente.',
          'America incrementó su participación exportadora.'
        ],
        en: [
          'Prices peaked at 3,350 USD/t.',
          'Planted area grew 5% powered by Oriente.',
          'America increased its export share.'
        ],
      },
      Norte: {
        es: [
          'Norte sumó 560 kt y mantuvo sus rendimientos en 3 t/ha.',
          'Registró una prima de 50 USD/t.'
        ],
        en: [
          'Norte produced 560 kt with yields near 3 t/ha.',
          'It recorded a 50 USD/t premium.'
        ],
      },
      Central: {
        es: [
          'Central llegó a 470 kt con mejoras en eficiencia energética.',
          'La prima de precio fue de -30 USD/t.'
        ],
        en: [
          'Central reached 470 kt with better energy efficiency.',
          'The price premium was -30 USD/t.'
        ],
      },
      Oriente: {
        es: [
          'Oriente aportó 660 kt y lideró nuevas certificaciones RSPO.',
          'Los precios se ubicaron 30 USD/t sobre el nacional.'
        ],
        en: [
          'Oriente contributed 660 kt and led new RSPO certifications.',
          'Prices were 30 USD/t above the national level.'
        ],
      },
      Suroccidente: {
        es: [
          'Suroccidente produjo 330 kt con alianzas comunitarias.',
          'La prima negativa se mantuvo en -100 USD/t.'
        ],
        en: [
          'Suroccidente produced 330 kt with community alliances.',
          'The negative premium stayed near -100 USD/t.'
        ],
      },
    },
    2023: {
      all: {
        es: [
          'Oriente aportó casi un tercio del aceite nacional.',
          'Los precios se moderaron a 2 990 USD/t.',
          'America igualó la cuota de Europa en exportaciones.'
        ],
        en: [
          'Oriente provided nearly one-third of national oil.',
          'Prices moderated to 2,990 USD/t.',
          'America matched Europe’s export share.'
        ],
      },
      Norte: {
        es: [
          'Norte cerró en 575 kt con fuerte demanda para biodiésel.',
          'La prima regional fue de +40 USD/t.'
        ],
        en: [
          'Norte closed at 575 kt with strong biodiesel demand.',
          'Regional premium reached +40 USD/t.'
        ],
      },
      Central: {
        es: [
          'Central logró 490 kt y consolidó alianzas logísticas.',
          'El precio se ubicó 40 USD/t por debajo del nacional.'
        ],
        en: [
          'Central achieved 490 kt and strengthened logistics alliances.',
          'Price sat 40 USD/t below the national level.'
        ],
      },
      Oriente: {
        es: [
          'Oriente alcanzó 685 kt tras nuevas plantaciones tecnificadas.',
          'Mantuvo un diferencial de +20 USD/t.'
        ],
        en: [
          'Oriente reached 685 kt through modern plantations.',
          'It kept a +20 USD/t differential.'
        ],
      },
      Suroccidente: {
        es: [
          'Suroccidente registró 350 kt con proyectos de conservación.',
          'El precio se mantuvo 110 USD/t por debajo del nacional.'
        ],
        en: [
          'Suroccidente recorded 350 kt with conservation projects.',
          'Price remained 110 USD/t under the national average.'
        ],
      },
    },
  },
  glossary: [
    {
      term: { es: 'Aceite crudo de palma (ACP)', en: 'Crude palm oil (CPO)' },
      definition: {
        es: 'Aceite obtenido tras la extracción y prensado de la fruta fresca de la palma.',
        en: 'Oil obtained after extracting and pressing fresh palm fruit bunches.',
      },
    },
    {
      term: { es: 'Racimo de fruta fresca (RFF)', en: 'Fresh fruit bunch (FFB)' },
      definition: {
        es: 'Conjunto de frutos donde se concentra el aceite; es la unidad de cosecha.',
        en: 'Cluster of fruits where oil is stored; the harvest unit in palm oil.',
      },
    },
    {
      term: { es: 'Certificación RSPO', en: 'RSPO certification' },
      definition: {
        es: 'Estándar internacional que promueve aceite de palma sostenible en lo ambiental y social.',
        en: 'International standard promoting environmentally and socially sustainable palm oil.',
      },
    },
    {
      term: { es: 'Palmiste', en: 'Palm kernel' },
      definition: {
        es: 'Semilla de la palma utilizada para extraer aceite de palmiste y torta proteica.',
        en: 'Palm seed used to produce palm kernel oil and protein-rich cake.',
      },
    },
    {
      term: { es: 'Trazabilidad', en: 'Traceability' },
      definition: {
        es: 'Capacidad de seguir el aceite desde la finca hasta el consumidor final.',
        en: 'Ability to follow oil from farm to end consumer.',
      },
    },
  ],
  quiz: [
    {
      question: {
        es: '¿Cuál región aporta la mayor producción de aceite en Colombia?',
        en: 'Which region provides the largest palm oil output in Colombia?',
      },
      options: [
        { value: 'Oriente', es: 'Oriente', en: 'Oriente', correct: true },
        { value: 'Norte', es: 'Norte', en: 'Norte', correct: false },
        { value: 'Suroccidente', es: 'Suroccidente', en: 'Southwest', correct: false },
      ],
    },
    {
      question: {
        es: '¿Qué producto se obtiene en la etapa de extracción?',
        en: 'What product results from the extraction stage?',
      },
      options: [
        { value: 'acp', es: 'Aceite crudo de palma y palmiste', en: 'Crude palm oil and palm kernel oil', correct: true },
        { value: 'harina', es: 'Harina de palmiste para alimento animal', en: 'Palm kernel meal for feed', correct: false },
        { value: 'biogas', es: 'Biogás para cogeneración', en: 'Biogas for cogeneration', correct: false },
      ],
    },
    {
      question: {
        es: '¿Cuál es una acción clave de sostenibilidad en Colombia?',
        en: 'Which is a key sustainability action in Colombia?',
      },
      options: [
        { value: 'rspo', es: 'Impulsar certificaciones como RSPO', en: 'Promoting certifications like RSPO', correct: true },
        { value: 'expansion', es: 'Expandirse en zonas de alta deforestación', en: 'Expanding in high-deforestation zones', correct: false },
        { value: 'importar', es: 'Importar todo el aceite para consumo', en: 'Importing all oil for consumption', correct: false },
      ],
    },
  ],
};

const regionTranslations = {
  Norte: { es: 'Norte', en: 'North' },
  Central: { es: 'Central', en: 'Central' },
  Oriente: { es: 'Oriente', en: 'East' },
  Suroccidente: { es: 'Suroccidente', en: 'Southwest' },
};

const translations = {
  es: {
    subtitle: 'Formación interactiva sobre palma de aceite',
    navOverview: '¿Qué es?',
    navData: 'Datos',
    navMap: 'Regiones',
    navQuiz: 'Quiz',
    navGlossary: 'Glosario',
    overviewTitle: '¿Qué es la palma de aceite?',
    introHeading: 'Origen y usos',
    introParagraph1: 'La palma de aceite (<em>Elaeis guineensis</em>) es un cultivo tropical que produce el aceite vegetal más versátil del mundo. En Colombia se utiliza para alimentos, cosméticos, biocombustibles y productos industriales.',
    introParagraph2: 'El país es el cuarto productor mundial y el primero en América Latina. Su cadena de valor involucra a productores, extractoras, refinerías, fabricantes y exportadores.',
    learningHeading: 'Ruta de aprendizaje',
    learningStep1: '<strong>Introducción:</strong> conceptos básicos y cifras clave.',
    learningStep2: '<strong>Cadena de suministro:</strong> desde el cultivo hasta el consumidor.',
    learningStep3: '<strong>Sostenibilidad:</strong> retos ambientales y sociales.',
    learningStep4: '<strong>Explora:</strong> analiza datos y mapa interactivo.',
    learningStep5: '<strong>Evalúate:</strong> responde el quiz para consolidar aprendizajes.',
    supplyTitle: 'Cadena de suministro',
    supply1Title: 'Producción primaria',
    supply1Text: 'Pequeños y grandes productores cosechan racimos de fruta fresca (RFF) durante todo el año.',
    supply2Title: 'Extracción',
    supply2Text: 'Las extractoras separan el aceite crudo de palma (ACP) y el aceite de palmiste para refinación.',
    supply3Title: 'Refinación y mercado',
    supply3Text: 'El aceite se refina para alimentos, oleoquímicos y biodiésel, abasteciendo mercado interno y exportaciones.',
    sustainabilityTitle: 'Sostenibilidad',
    sustainabilityPillarsTitle: 'Pilares',
    pillar1: '<strong>Ambiental:</strong> conservación de biodiversidad, uso eficiente del agua y reducción de emisiones.',
    pillar2: '<strong>Social:</strong> condiciones laborales justas, inclusión de pequeños productores, seguridad alimentaria.',
    pillar3: '<strong>Económico:</strong> productividad, diversificación de ingresos y resiliencia ante precios.',
    sustainabilityActionsTitle: 'Acciones clave',
    sustainabilityParagraph1: 'Colombia impulsa certificaciones como RSPO y el sello nacional, promueve investigación en agricultura climáticamente inteligente y monitorea la deforestación.',
    sustainabilityParagraph2: 'El diálogo con comunidades y transparencia en la trazabilidad refuerzan la reputación internacional del aceite colombiano.',
    dataTitle: 'Explora los datos',
    labelYear: 'Año:',
    labelRegion: 'Región palmera:',
    insightsTitle: 'Ideas clave',
    mapTitle: 'Mapa interactivo',
    mapRegionTitle: 'Selecciona una región',
    mapRegionDescription: 'Haz clic o usa el teclado sobre una región para ver cifras destacadas.',
    quizTitle: 'Quiz rápido',
    quizNext: 'Siguiente',
    quizProgress: (current, total) => `Pregunta ${current} de ${total}`,
    quizResult: (score, total) => `Tu puntaje: ${score} de ${total}. ¡Sigue aprendiendo!`,
    glossaryTitle: 'Glosario',
    footerBack: 'Volver al inicio',
    footerText: '© 2024 Learn Palm Oil – Colombia. Datos demostrativos para aprendizaje.',
    regionAll: 'Todas las regiones',
    langToggleLabel: 'Cambiar a inglés',
  },
  en: {
    subtitle: 'Interactive training about palm oil',
    navOverview: 'Overview',
    navData: 'Data',
    navMap: 'Regions',
    navQuiz: 'Quiz',
    navGlossary: 'Glossary',
    overviewTitle: 'What is palm oil?',
    introHeading: 'Origin & uses',
    introParagraph1: 'Oil palm (<em>Elaeis guineensis</em>) is a tropical crop that produces the world’s most versatile vegetable oil. In Colombia it is used for food, cosmetics, biofuels and industrial products.',
    introParagraph2: 'The country is the fourth-largest producer worldwide and the leader in Latin America. Its value chain involves growers, mills, refineries, manufacturers and exporters.',
    learningHeading: 'Learning path',
    learningStep1: '<strong>Introduction:</strong> core concepts and key figures.',
    learningStep2: '<strong>Supply chain:</strong> from crop to consumer.',
    learningStep3: '<strong>Sustainability:</strong> environmental and social challenges.',
    learningStep4: '<strong>Explore:</strong> analyze data and the interactive map.',
    learningStep5: '<strong>Check:</strong> take the quiz to reinforce learning.',
    supplyTitle: 'Supply chain',
    supply1Title: 'Primary production',
    supply1Text: 'Smallholders and estates harvest fresh fruit bunches (FFB) year-round.',
    supply2Title: 'Extraction',
    supply2Text: 'Mills separate crude palm oil (CPO) and palm kernel oil for refining.',
    supply3Title: 'Refining & market',
    supply3Text: 'Oil is refined for foods, oleochemicals and biodiesel serving domestic and export markets.',
    sustainabilityTitle: 'Sustainability',
    sustainabilityPillarsTitle: 'Pillars',
    pillar1: '<strong>Environmental:</strong> biodiversity conservation, efficient water use and lower emissions.',
    pillar2: '<strong>Social:</strong> fair labor, inclusion of smallholders, food security.',
    pillar3: '<strong>Economic:</strong> productivity, income diversification and price resilience.',
    sustainabilityActionsTitle: 'Key actions',
    sustainabilityParagraph1: 'Colombia promotes certifications like RSPO and the national seal, supports climate-smart research and monitors deforestation.',
    sustainabilityParagraph2: 'Engagement with communities and traceability transparency strengthen Colombia’s reputation abroad.',
    dataTitle: 'Explore the data',
    labelYear: 'Year:',
    labelRegion: 'Palm region:',
    insightsTitle: 'Key takeaways',
    mapTitle: 'Interactive map',
    mapRegionTitle: 'Select a region',
    mapRegionDescription: 'Click or use the keyboard on a region to see highlighted metrics.',
    quizTitle: 'Quick quiz',
    quizNext: 'Next',
    quizProgress: (current, total) => `Question ${current} of ${total}`,
    quizResult: (score, total) => `Your score: ${score} of ${total}. Keep exploring!`,
    glossaryTitle: 'Glossary',
    footerBack: 'Back to top',
    footerText: '© 2024 Learn Palm Oil – Colombia. Demo data for learning purposes.',
    regionAll: 'All regions',
    langToggleLabel: 'Switch to Spanish',
  },
};

const chartInstances = {};

document.addEventListener('DOMContentLoaded', () => {
  populateSelectors();
  buildGlossary();
  setupQuiz();
  setupMapInteractions();
  initCharts();
  bindEvents();
  updateLanguage();
  updateCharts();
  updateInsights();
  updateMapDetails(null);
});

function populateSelectors() {
  const yearSelect = document.getElementById('year-select');
  const regionSelect = document.getElementById('region-select');
  yearSelect.innerHTML = '';
  dataStore.years.forEach((year) => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    if (year === state.year) option.selected = true;
    yearSelect.appendChild(option);
  });
  regionSelect.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'all';
  regionSelect.appendChild(allOption);
  dataStore.regions.forEach((region) => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });
  regionSelect.value = state.region;
}

function buildGlossary() {
  const glossary = document.getElementById('glossary-list');
  glossary.innerHTML = '';
  dataStore.glossary.forEach((entry) => {
    const dt = document.createElement('dt');
    dt.dataset.i18nTerm = JSON.stringify(entry.term);
    const dd = document.createElement('dd');
    dd.dataset.i18nDefinition = JSON.stringify(entry.definition);
    glossary.appendChild(dt);
    glossary.appendChild(dd);
  });
}

function setupQuiz() {
  state.quizIndex = 0;
  state.quizScore = 0;
  state.quizAnswered = false;
  state.quizResponses = new Array(dataStore.quiz.length).fill(null);
  renderQuizQuestion();
}

function setupMapInteractions() {
  const regions = document.querySelectorAll('#colombia-map .region');
  regions.forEach((regionGroup) => {
    const region = regionGroup.dataset.region;
    regionGroup.addEventListener('click', (event) => {
      if (event.target.closest('path')) {
        selectRegion(region);
      }
    });
    const path = regionGroup.querySelector('path');
    if (path) {
      path.setAttribute('role', 'button');
      path.setAttribute('aria-pressed', 'false');
      path.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectRegion(region);
        }
      });
    }
  });
}

function initCharts() {
  const productionCtx = document.getElementById('chart-production');
  const areaCtx = document.getElementById('chart-area');
  const pricesCtx = document.getElementById('chart-prices');
  const exportsCtx = document.getElementById('chart-exports');

  chartInstances.production = new Chart(productionCtx, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Producción (kt)', data: [], backgroundColor: [] }] },
    options: baseBarOptions('Producción (kt)'),
  });

  chartInstances.area = new Chart(areaCtx, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Área (mil ha)', data: [], backgroundColor: [] }] },
    options: baseBarOptions('Área (mil ha)'),
  });

  chartInstances.prices = new Chart(pricesCtx, {
    type: 'line',
    data: { labels: [], datasets: [] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: { display: true, text: 'USD por tonelada' },
          ticks: { callback: (value) => `$${value}` },
        },
      },
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  });

  chartInstances.exports = new Chart(exportsCtx, {
    type: 'doughnut',
    data: { labels: [], datasets: [{ data: [], backgroundColor: ['#2c7a4b', '#63b67a', '#ffd166'] }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  });
}

function baseBarOptions(label) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: false },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: label },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.formattedValue}`,
        },
      },
    },
  };
}

function bindEvents() {
  document.getElementById('year-select').addEventListener('change', (event) => {
    state.year = Number(event.target.value);
    updateCharts();
    updateInsights();
    if (state.region !== 'all') updateMapDetails(state.region);
  });

  document.getElementById('region-select').addEventListener('change', (event) => {
    selectRegion(event.target.value === 'all' ? null : event.target.value, false);
    updateCharts();
    updateInsights();
  });

  document.getElementById('lang-toggle').addEventListener('click', () => {
    state.lang = state.lang === 'es' ? 'en' : 'es';
    updateLanguage();
    updateCharts();
    updateInsights();
    updateMapDetails(state.region === 'all' ? null : state.region);
    renderQuizQuestion();
  });

  document.getElementById('next-question').addEventListener('click', () => {
    if (!state.quizAnswered) return;
    state.quizIndex += 1;
    state.quizAnswered = false;
    if (state.quizIndex >= dataStore.quiz.length) {
      finishQuiz();
    } else {
      renderQuizQuestion();
    }
  });
}

function updateLanguage() {
  const current = translations[state.lang];
  document.documentElement.lang = state.lang;
  const textBindings = [
    ['app-subtitle', 'subtitle'],
    ['nav-overview', 'navOverview'],
    ['nav-data', 'navData'],
    ['nav-map', 'navMap'],
    ['nav-quiz', 'navQuiz'],
    ['nav-glossary', 'navGlossary'],
    ['overview-title', 'overviewTitle'],
    ['intro-heading', 'introHeading'],
    ['learning-heading', 'learningHeading'],
    ['supply-title', 'supplyTitle'],
    ['supply-1-title', 'supply1Title'],
    ['supply-2-title', 'supply2Title'],
    ['supply-3-title', 'supply3Title'],
    ['sustainability-title', 'sustainabilityTitle'],
    ['sustainability-pillars-title', 'sustainabilityPillarsTitle'],
    ['sustainability-actions-title', 'sustainabilityActionsTitle'],
    ['data-title', 'dataTitle'],
    ['label-year', 'labelYear'],
    ['label-region', 'labelRegion'],
    ['insights-title', 'insightsTitle'],
    ['map-title', 'mapTitle'],
    ['map-region-title', 'mapRegionTitle'],
    ['map-region-description', 'mapRegionDescription'],
    ['quiz-title', 'quizTitle'],
    ['glossary-title', 'glossaryTitle'],
    ['footer-text', 'footerText'],
    ['footer-back', 'footerBack'],
  ];
  textBindings.forEach(([elementId, key]) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = typeof current[key] === 'function' ? current[key]() : current[key];
  });

  const htmlBindings = [
    ['intro-paragraph-1', 'introParagraph1'],
    ['intro-paragraph-2', 'introParagraph2'],
    ['learning-step-1', 'learningStep1'],
    ['learning-step-2', 'learningStep2'],
    ['learning-step-3', 'learningStep3'],
    ['learning-step-4', 'learningStep4'],
    ['learning-step-5', 'learningStep5'],
    ['supply-1-text', 'supply1Text'],
    ['supply-2-text', 'supply2Text'],
    ['supply-3-text', 'supply3Text'],
    ['pillar-1', 'pillar1'],
    ['pillar-2', 'pillar2'],
    ['pillar-3', 'pillar3'],
    ['sustainability-paragraph-1', 'sustainabilityParagraph1'],
    ['sustainability-paragraph-2', 'sustainabilityParagraph2'],
  ];
  htmlBindings.forEach(([elementId, key]) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = current[key];
  });

  const regionSelect = document.getElementById('region-select');
  Array.from(regionSelect.options).forEach((option) => {
    if (option.value === 'all') {
      option.textContent = current.regionAll;
    } else {
      option.textContent = translateRegion(option.value);
    }
  });
  document.querySelectorAll('#colombia-map .region path').forEach((path) => {
    const region = path.parentElement ? path.parentElement.dataset.region : null;
    if (region) {
      const label = translateRegion(region);
      path.setAttribute('aria-label', label);
      path.setAttribute('title', label);
    }
  });

  const glossary = document.getElementById('glossary-list');
  glossary.querySelectorAll('dt').forEach((dt) => {
    const terms = JSON.parse(dt.dataset.i18nTerm);
    dt.textContent = terms[state.lang];
  });
  glossary.querySelectorAll('dd').forEach((dd) => {
    const definitions = JSON.parse(dd.dataset.i18nDefinition);
    dd.textContent = definitions[state.lang];
  });

  const langToggle = document.getElementById('lang-toggle');
  langToggle.textContent = state.lang === 'es' ? 'EN' : 'ES';
  langToggle.setAttribute('aria-label', translations[state.lang].langToggleLabel);
  langToggle.title = translations[state.lang].langToggleLabel;
}

function selectRegion(region, fromMap = true) {
  const newRegion = region || 'all';
  state.region = newRegion === 'all' ? 'all' : newRegion;
  const regionSelect = document.getElementById('region-select');
  if (regionSelect.value !== state.region) {
    regionSelect.value = state.region;
  }
  document.querySelectorAll('#colombia-map .region').forEach((group) => {
    group.classList.toggle('active', group.dataset.region === state.region);
  });
  document.querySelectorAll('#colombia-map .region path').forEach((path) => {
    const parentRegion = path.parentElement ? path.parentElement.dataset.region : null;
    const pressed = state.region !== 'all' && parentRegion === state.region;
    path.setAttribute('aria-pressed', pressed ? 'true' : 'false');
  });
  updateMapDetails(region || null);
  if (fromMap) {
    updateCharts();
    updateInsights();
  }
}

function updateCharts() {
  const productionData = dataStore.production.find((item) => item.year === state.year);
  const areaData = dataStore.area.find((item) => item.year === state.year);
  const regionKeys = dataStore.regions;
  const labels = regionKeys.map((region) => translateRegion(region));
  const highlightColor = '#2c7a4b';
  const baseColor = 'rgba(99, 182, 122, 0.4)';
  chartInstances.production.data.labels = labels;
  chartInstances.production.data.datasets[0].label = state.lang === 'es' ? 'Producción (kt)' : 'Output (kt)';
  chartInstances.production.data.datasets[0].data = regionKeys.map((region) => productionData.values[region]);
  chartInstances.production.data.datasets[0].backgroundColor = regionKeys.map((region) => (state.region === 'all' || state.region === region ? highlightColor : baseColor));
  chartInstances.production.options.scales.y.title.text = state.lang === 'es' ? 'Producción (kt)' : 'Output (kt)';
  chartInstances.production.update();

  chartInstances.area.data.labels = labels;
  chartInstances.area.data.datasets[0].label = state.lang === 'es' ? 'Área (mil ha)' : 'Area (thousand ha)';
  chartInstances.area.data.datasets[0].data = regionKeys.map((region) => areaData.values[region]);
  chartInstances.area.data.datasets[0].backgroundColor = regionKeys.map((region) => (state.region === 'all' || state.region === region ? '#63b67a' : 'rgba(99, 182, 122, 0.35)'));
  chartInstances.area.options.scales.y.title.text = state.lang === 'es' ? 'Área (mil ha)' : 'Area (thousand ha)';
  chartInstances.area.update();

  chartInstances.prices.data.labels = dataStore.years;
  chartInstances.prices.data.datasets = [
    {
      label: state.lang === 'es' ? 'Precio nacional' : 'National price',
      data: dataStore.prices.map((item) => item.national),
      borderColor: '#2c7a4b',
      backgroundColor: 'rgba(44, 122, 75, 0.2)',
      tension: 0.3,
    },
  ];
  if (state.region !== 'all') {
    chartInstances.prices.data.datasets.push({
      label: translateRegion(state.region),
      data: dataStore.prices.map((item) => item.regional[state.region]),
      borderColor: '#ffd166',
      backgroundColor: 'rgba(255, 209, 102, 0.25)',
      borderDash: [5, 3],
      tension: 0.3,
    });
  }
  chartInstances.prices.options.scales.y.title.text = state.lang === 'es' ? 'USD por tonelada' : 'USD per ton';
  chartInstances.prices.update();

  const exportData = dataStore.exports.find((item) => item.year === state.year);
  const exportLabels = Object.keys(exportData.destinations).map((destination) => translateDestination(destination));
  chartInstances.exports.data.labels = exportLabels;
  chartInstances.exports.data.datasets[0].data = Object.values(exportData.destinations);
  chartInstances.exports.update();
}

function translateDestination(destination) {
  const map = {
    Europa: { es: 'Europa', en: 'Europe' },
    America: { es: 'América', en: 'Americas' },
    Asia: { es: 'Asia', en: 'Asia' },
  };
  return map[destination][state.lang];
}

function translateRegion(region) {
  return regionTranslations[region][state.lang];
}

function updateInsights() {
  const regionKey = state.region === 'all' ? 'all' : state.region;
  const insightData = dataStore.insights[state.year][regionKey];
  const insightsList = document.getElementById('insights-list');
  insightsList.innerHTML = '';
  const items = insightData[state.lang];
  items.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    insightsList.appendChild(li);
  });
}

function updateMapDetails(region) {
  const titleElement = document.getElementById('map-region-title');
  const descriptionElement = document.getElementById('map-region-description');
  const statsList = document.getElementById('map-region-stats');
  statsList.innerHTML = '';
  if (!region) {
    titleElement.textContent = translations[state.lang].mapRegionTitle;
    descriptionElement.textContent = translations[state.lang].mapRegionDescription;
    return;
  }
  const info = dataStore.map[region];
  titleElement.textContent = translateRegion(region);
  descriptionElement.textContent = info.description[state.lang];
  const statsKeys = {
    production: state.lang === 'es' ? 'Producción 2023' : '2023 output',
    area: state.lang === 'es' ? 'Área sembrada' : 'Planted area',
    yield: state.lang === 'es' ? 'Rendimiento promedio' : 'Average yield',
    share: state.lang === 'es' ? 'Participación nacional' : 'National share',
  };
  Object.entries(info.stats).forEach(([key, value]) => {
    const li = document.createElement('li');
    li.textContent = `${statsKeys[key]}: ${value[state.lang]}`;
    statsList.appendChild(li);
  });
}

function renderQuizQuestion() {
  const questionContainer = document.getElementById('quiz-question');
  const optionsContainer = document.getElementById('quiz-options');
  const nextButton = document.getElementById('next-question');
  const progress = document.getElementById('quiz-progress');
  const total = dataStore.quiz.length;
  if (state.quizIndex >= total) {
    finishQuiz();
    return;
  }
  const question = dataStore.quiz[state.quizIndex];
  questionContainer.textContent = question.question[state.lang];
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.type = 'button';
    button.textContent = option[state.lang];
    button.setAttribute('data-correct', option.correct);
    button.setAttribute('data-index', index);
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('role', 'listitem');
    button.addEventListener('click', () => handleQuizAnswer(button, option.correct));
    optionsContainer.appendChild(button);
  });
  const savedResponse = state.quizResponses[state.quizIndex];
  if (savedResponse) {
    state.quizAnswered = true;
    nextButton.disabled = false;
    Array.from(optionsContainer.children).forEach((optionButton, idx) => {
      const isCorrect = optionButton.dataset.correct === 'true';
      if (isCorrect) optionButton.classList.add('correct');
      if (!isCorrect && idx === savedResponse.selectedIndex && !savedResponse.correct) {
        optionButton.classList.add('incorrect');
      }
      optionButton.disabled = true;
      optionButton.setAttribute('aria-pressed', idx === savedResponse.selectedIndex ? 'true' : 'false');
    });
  } else {
    state.quizAnswered = false;
    nextButton.disabled = true;
  }
  progress.textContent = translations[state.lang].quizProgress(state.quizIndex + 1, total);
  nextButton.textContent = translations[state.lang].quizNext;
  questionContainer.focus();
}

function handleQuizAnswer(button, isCorrect) {
  if (state.quizAnswered) return;
  state.quizAnswered = true;
  state.quizResponses[state.quizIndex] = {
    selectedIndex: Number(button.dataset.index),
    correct: isCorrect,
  };
  if (isCorrect) {
    button.classList.add('correct');
    state.quizScore += 1;
  } else {
    button.classList.add('incorrect');
  }
  Array.from(document.querySelectorAll('#quiz-options .quiz-option')).forEach((optionButton) => {
    optionButton.disabled = true;
    optionButton.setAttribute('aria-pressed', optionButton === button ? 'true' : 'false');
    if (optionButton !== button && optionButton.dataset.correct === 'true') {
      optionButton.classList.add('correct');
    }
  });
  document.getElementById('next-question').disabled = false;
}

function finishQuiz() {
  const questionContainer = document.getElementById('quiz-question');
  const optionsContainer = document.getElementById('quiz-options');
  const nextButton = document.getElementById('next-question');
  const progress = document.getElementById('quiz-progress');
  questionContainer.textContent = translations[state.lang].quizResult(state.quizScore, dataStore.quiz.length);
  optionsContainer.innerHTML = '';
  nextButton.disabled = true;
  nextButton.textContent = translations[state.lang].quizNext;
  progress.textContent = '';
}
