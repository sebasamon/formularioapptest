const state = {
  lang: 'es',
  year: 2023,
  region: 'all',
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  quizResponses: [],
  gameStageIndex: 0,
  gameScore: 0,
  gameStageCompleted: false,
  gameSelectedOption: null,
  gameFeedbackType: null,
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
  game: [
    {
      id: 'nursery',
      title: {
        es: 'Etapa 1 · Vivero y establecimiento',
        en: 'Stage 1 · Nursery & planting',
      },
      description: {
        es: 'Te encuentras en el Meta planificando nuevas siembras. ¿Qué decisión asegura un lote vigoroso?',
        en: 'You are in Meta planning new plantings. Which decision secures a vigorous field?',
      },
      fact: {
        es: 'En 2023 el Oriente concentró cerca del 65% de las nuevas siembras, apoyado por viveros certificados que cuidan la genética adaptada al trópico colombiano.',
        en: 'In 2023 the Eastern region hosted about 65% of new plantings, backed by certified nurseries that preserve genetics adapted to Colombia’s tropics.',
      },
      options: [
        {
          id: 'certified',
          correct: true,
          text: {
            es: 'Seleccionar plántulas certificadas en suelos bien drenados tras analizar pH y nutrición.',
            en: 'Select certified seedlings on well-drained soils after checking pH and nutrition.',
          },
          feedback: {
            es: '¡Correcto! Los viveros certificados entregan híbridos resistentes y reducen pérdidas tempranas.',
            en: 'Correct! Certified nurseries deliver resilient hybrids and reduce early losses.',
          },
        },
        {
          id: 'flooded',
          correct: false,
          text: {
            es: 'Trasplantar semillas sin análisis previo en zonas con encharcamientos frecuentes.',
            en: 'Transplant seeds without prior analysis in frequently waterlogged plots.',
          },
          feedback: {
            es: 'El exceso de agua favorece enfermedades y limita el desarrollo radicular.',
            en: 'Excess water favors diseases and limits root development.',
          },
        },
        {
          id: 'imported',
          correct: false,
          text: {
            es: 'Usar semillas importadas sin soporte técnico ni trazabilidad.',
            en: 'Use imported seeds without technical support or traceability.',
          },
          feedback: {
            es: 'Sin trazabilidad no se asegura adaptación ni respaldo fitosanitario.',
            en: 'Without traceability you cannot ensure adaptation or phytosanitary support.',
          },
        },
      ],
    },
    {
      id: 'harvest',
      title: {
        es: 'Etapa 2 · Manejo de cosecha',
        en: 'Stage 2 · Harvest management',
      },
      description: {
        es: 'Los racimos maduran en el Norte. ¿Qué práctica mantiene altos rendimientos?',
        en: 'Bunches are ripening in the North. Which practice sustains high yields?',
      },
      fact: {
        es: 'Los núcleos colombianos promediaron 3,0 t/ha de aceite en 2023; Oriente alcanzó 3,2 t/ha gracias a cosechas oportunas.',
        en: 'Colombian clusters averaged 3.0 t/ha of oil in 2023, while Oriente reached 3.2 t/ha thanks to timely harvests.',
      },
      options: [
        {
          id: 'timely',
          correct: true,
          text: {
            es: 'Programar cortes con 5-6 frutos sueltos y enviar la fruta al molino en menos de 24 horas.',
            en: 'Harvest with 5–6 loose fruits and send bunches to the mill in under 24 hours.',
          },
          feedback: {
            es: 'Exacto: así se conserva el contenido de aceite y se mejora el rendimiento industrial.',
            en: 'Exactly: this preserves oil content and boosts industrial yield.',
          },
        },
        {
          id: 'delay',
          correct: false,
          text: {
            es: 'Aplazar la cosecha hasta que caiga gran parte del racimo para optimizar mano de obra.',
            en: 'Delay the harvest until most of the bunch falls to optimize labor.',
          },
          feedback: {
            es: 'El fruto sobremaduro reduce el rendimiento de extracción y aumenta pérdidas.',
            en: 'Overripe fruit lowers extraction rates and increases losses.',
          },
        },
        {
          id: 'immature',
          correct: false,
          text: {
            es: 'Cortar racimos inmaduros para tener más volumen inmediato.',
            en: 'Cut unripe bunches to gain immediate volume.',
          },
          feedback: {
            es: 'Los racimos verdes contienen menos aceite y afectan la calidad del ACP.',
            en: 'Green bunches hold less oil and harm CPO quality.',
          },
        },
      ],
    },
    {
      id: 'milling',
      title: {
        es: 'Etapa 3 · Extracción eficiente',
        en: 'Stage 3 · Efficient milling',
      },
      description: {
        es: 'En la extractora de Santander necesitas mejorar la eficiencia industrial. ¿Qué haces?',
        en: 'At the Santander mill you need to improve industrial efficiency. What do you do?',
      },
      fact: {
        es: 'Las extractoras colombianas alcanzan rendimientos industriales cercanos al 22% cuando reciben fruta fresca y mantienen un plan preventivo.',
        en: 'Colombian mills reach industrial yields close to 22% when they receive fresh fruit and follow preventive plans.',
      },
      options: [
        {
          id: 'fresh',
          correct: true,
          text: {
            es: 'Coordinar logística para recibir fruta fresca y ejecutar mantenimiento preventivo con monitoreo del OER.',
            en: 'Coordinate logistics for fresh fruit and run preventive maintenance while tracking oil extraction rate (OER).',
          },
          feedback: {
            es: '¡Bien! La fruta fresca y equipos calibrados sostienen OER altos y menos desperdicio.',
            en: 'Great! Fresh fruit and calibrated equipment sustain high OER with less waste.',
          },
        },
        {
          id: 'sun',
          correct: false,
          text: {
            es: 'Dejar los racimos al sol y procesarlos al final de la semana para ahorrar energía.',
            en: 'Leave bunches under the sun and process them at week’s end to save energy.',
          },
          feedback: {
            es: 'El retraso acelera la hidrólisis del aceite y genera ácidos grasos libres.',
            en: 'Delays trigger oil hydrolysis and raise free fatty acids.',
          },
        },
        {
          id: 'skip',
          correct: false,
          text: {
            es: 'Omitir limpieza y calibración de prensas para mantener la producción continua.',
            en: 'Skip cleaning and calibration of presses to keep production continuous.',
          },
          feedback: {
            es: 'Sin mantenimiento se pierde eficiencia y aumentan las paradas no programadas.',
            en: 'Without maintenance efficiency drops and unplanned shutdowns grow.',
          },
        },
      ],
    },
    {
      id: 'market',
      title: {
        es: 'Etapa 4 · Mercado responsable',
        en: 'Stage 4 · Responsible markets',
      },
      description: {
        es: 'Buscas abrir nuevos mercados en 2023. ¿Cuál estrategia potencia la palma colombiana?',
        en: 'You aim to open new markets in 2023. Which strategy strengthens Colombian palm oil?',
      },
      fact: {
        es: 'En 2023 América alcanzó 37% de las exportaciones, acercándose a Europa (38%) gracias a trazabilidad y certificaciones como RSPO y el sello colombiano de palma sostenible.',
        en: 'In 2023 America captured 37% of exports, close to Europe’s 38%, thanks to traceability and certifications such as RSPO and Colombia’s sustainable palm seal.',
      },
      options: [
        {
          id: 'traceability',
          correct: true,
          text: {
            es: 'Implementar trazabilidad digital y certificaciones RSPO y sello colombiano para compradores exigentes.',
            en: 'Deploy digital traceability plus RSPO and the Colombian sustainable palm seal for demanding buyers.',
          },
          feedback: {
            es: 'Así respondes a mercados que exigen sostenibilidad y mantienes primas en exportación.',
            en: 'That answers markets demanding sustainability and keeps export premiums.',
          },
        },
        {
          id: 'singlebuyer',
          correct: false,
          text: {
            es: 'Concentrar ventas en un solo cliente sin reportes ambientales.',
            en: 'Concentrate sales on a single buyer with no environmental reporting.',
          },
          feedback: {
            es: 'Depender de un cliente reduce resiliencia y puede cerrar mercados regulados.',
            en: 'Relying on one buyer lowers resilience and can close regulated markets.',
          },
        },
        {
          id: 'cut',
          correct: false,
          text: {
            es: 'Reducir costos eliminando auditorías y los acuerdos con comunidades.',
            en: 'Cut costs by removing audits and community agreements.',
          },
          feedback: {
            es: 'Las auditorías y el diálogo social son claves para la licencia social y la reputación.',
            en: 'Audits and social dialogue are key for social license and reputation.',
          },
        },
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
    navGame: 'Juego',
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
    gameTitle: 'Expedición palmera',
    gameIntro: 'Elige las mejores decisiones para fortalecer la palma colombiana.',
    gameNext: 'Siguiente etapa',
    gameFinish: 'Ver resumen',
    gameRestart: 'Reiniciar',
    gameProgress: (current, total) => `Etapa ${current} de ${total}`,
    gameScore: (score, total) => `Logros: ${score}/${total}`,
    gameSummaryTitle: 'Resumen de tu expedición',
    gameSummaryBody: (score, total) => `Cerraste la misión con ${score} de ${total} decisiones correctas. ¡Tu gestión impulsa la palma sostenible en Colombia!`,
    gameCompleted: 'Misión completada',
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
    navGame: 'Game',
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
    gameTitle: 'Palm expedition',
    gameIntro: 'Choose the best decisions to strengthen Colombia’s palm value chain.',
    gameNext: 'Next stage',
    gameFinish: 'View summary',
    gameRestart: 'Restart',
    gameProgress: (current, total) => `Stage ${current} of ${total}`,
    gameScore: (score, total) => `Achievements: ${score}/${total}`,
    gameSummaryTitle: 'Your expedition recap',
    gameSummaryBody: (score, total) => `You completed ${score} of ${total} key decisions. Your management boosts Colombia’s sustainable palm oil!`,
    gameCompleted: 'Mission accomplished',
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
  setupGame();
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

function setupGame() {
  const optionsContainer = document.getElementById('game-options');
  const nextButton = document.getElementById('game-next');
  const restartButton = document.getElementById('game-restart');
  if (!optionsContainer || !nextButton || !restartButton) return;

  state.gameStageIndex = 0;
  state.gameScore = 0;
  state.gameStageCompleted = false;
  state.gameSelectedOption = null;
  state.gameFeedbackType = null;

  optionsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-option-id]');
    if (!button || button.disabled) return;
    handleGameOption(button.dataset.optionId);
  });

  nextButton.addEventListener('click', () => {
    if (!state.gameStageCompleted) return;
    const totalStages = dataStore.game.length;
    if (state.gameStageIndex < totalStages - 1) {
      state.gameStageIndex += 1;
      state.gameStageCompleted = false;
      state.gameSelectedOption = null;
      state.gameFeedbackType = null;
      renderGameStage();
    } else if (state.gameStageIndex === totalStages - 1) {
      state.gameStageIndex += 1;
      renderGameStage();
    }
  });

  restartButton.addEventListener('click', () => {
    resetGame();
  });

  renderGameStage();
}

function handleGameOption(optionId) {
  const stage = dataStore.game[state.gameStageIndex];
  if (!stage) return;
  const option = stage.options.find((item) => item.id === optionId);
  if (!option) return;

  state.gameSelectedOption = optionId;
  state.gameFeedbackType = option.correct ? 'correct' : 'incorrect';

  if (option.correct && !state.gameStageCompleted) {
    state.gameStageCompleted = true;
    state.gameScore += 1;
  } else if (!option.correct) {
    state.gameStageCompleted = false;
  }

  renderGameStage();
}

function resetGame() {
  state.gameStageIndex = 0;
  state.gameScore = 0;
  state.gameStageCompleted = false;
  state.gameSelectedOption = null;
  state.gameFeedbackType = null;
  renderGameStage();
}

function renderGameStage() {
  const stageTitle = document.getElementById('game-stage-title');
  const stageDescription = document.getElementById('game-stage-description');
  const factElement = document.getElementById('game-stage-fact');
  const optionsContainer = document.getElementById('game-options');
  const feedbackElement = document.getElementById('game-feedback');
  const nextButton = document.getElementById('game-next');
  const restartButton = document.getElementById('game-restart');
  const progressBar = document.getElementById('game-progress-bar');
  const progressText = document.getElementById('game-progress-text');
  const scoreText = document.getElementById('game-score-text');
  if (!stageTitle || !stageDescription || !optionsContainer || !feedbackElement || !nextButton || !restartButton || !progressBar || !progressText || !scoreText || !factElement) {
    return;
  }

  const totalStages = dataStore.game.length;
  const currentTranslations = translations[state.lang];
  scoreText.textContent = currentTranslations.gameScore(state.gameScore, totalStages);
  restartButton.textContent = currentTranslations.gameRestart;

  if (state.gameStageIndex >= totalStages) {
    progressBar.style.width = '100%';
    progressText.textContent = currentTranslations.gameCompleted;
    nextButton.textContent = currentTranslations.gameFinish;
    nextButton.classList.add('hidden');
    nextButton.disabled = true;
    factElement.hidden = true;
    factElement.textContent = '';
    stageTitle.textContent = currentTranslations.gameSummaryTitle;
    stageDescription.textContent = currentTranslations.gameSummaryBody(state.gameScore, totalStages);
    optionsContainer.innerHTML = '';
    const summaryList = document.createElement('ul');
    summaryList.className = 'game-summary-list';
    dataStore.game.forEach((stageItem) => {
      const listItem = document.createElement('li');
      listItem.textContent = stageItem.fact[state.lang];
      summaryList.appendChild(listItem);
    });
    optionsContainer.appendChild(summaryList);
    feedbackElement.textContent = '';
    feedbackElement.className = 'game-feedback';
    return;
  }

  nextButton.classList.remove('hidden');
  restartButton.disabled = false;

  const stage = dataStore.game[state.gameStageIndex];
  stageTitle.textContent = stage.title[state.lang];
  stageDescription.textContent = stage.description[state.lang];

  if (state.gameStageCompleted) {
    factElement.hidden = false;
    factElement.textContent = stage.fact[state.lang];
  } else {
    factElement.hidden = true;
    factElement.textContent = '';
  }

  const solvedOffset = state.gameStageCompleted ? 1 : 0;
  const progressRatio = Math.min((state.gameStageIndex + solvedOffset) / totalStages, 1);
  progressBar.style.width = `${progressRatio * 100}%`;
  progressText.textContent = currentTranslations.gameProgress(state.gameStageIndex + 1, totalStages);

  nextButton.textContent = state.gameStageIndex === totalStages - 1 ? currentTranslations.gameFinish : currentTranslations.gameNext;
  nextButton.disabled = !state.gameStageCompleted;

  optionsContainer.innerHTML = '';
  stage.options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'game-option';
    button.dataset.optionId = option.id;
    button.textContent = option.text[state.lang];
    if (state.gameStageCompleted) {
      button.disabled = true;
      if (option.correct) {
        button.classList.add('correct');
      }
    } else if (state.gameSelectedOption === option.id && state.gameFeedbackType === 'incorrect') {
      button.classList.add('incorrect');
    }
    optionsContainer.appendChild(button);
  });

  if (state.gameSelectedOption) {
    const selectedOption = stage.options.find((opt) => opt.id === state.gameSelectedOption);
    if (selectedOption) {
      feedbackElement.textContent = selectedOption.feedback[state.lang];
      feedbackElement.className = `game-feedback ${selectedOption.correct ? 'success' : 'error'}`;
    } else {
      feedbackElement.textContent = '';
      feedbackElement.className = 'game-feedback';
    }
  } else {
    feedbackElement.textContent = '';
    feedbackElement.className = 'game-feedback';
  }
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
    ['nav-game', 'navGame'],
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
    ['game-title', 'gameTitle'],
    ['game-intro', 'gameIntro'],
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

  renderGameStage();
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
