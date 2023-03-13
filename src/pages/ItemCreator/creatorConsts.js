export const books = [
  {
    label: 'Księga wpływu',
    value: 0,
  },
  {
    label: 'Księgi inwentarzowe',
    value: 1,
  },
  {
    label: 'Księga depozytowa',
    value: 2,
  },
  {
    label: 'Ewidencja pomocnicza',
    value: 3,
  },
  {
    label: 'Księga braków',
    value: 4,
  },
];

export const bookmarks = [
  {
    label: 'Informacje podstawowe',
    value: 0,
  },
  {
    label: 'Sposób pozyskania',
    value: 1,
  },
  {
    label: 'Wizerunek obiektu',
    value: 2,
  },
  {
    label: 'Pochodzenie',
    value: 3,
  },
  {
    label: 'Przynależność',
    value: 4,
  },
  {
    label: 'Elementy przedmiotu',
    value: 16,
  },
  {
    label: 'Bibliografia',
    value: 5,
  },
  {
    label: 'Historia obiektu',
    value: 6,
  },
  {
    label: 'Zalecenia konserwatorskie',
    value: 7,
  },
  {
    label: 'Stan zachowania',
    value: 8,
  },
  {
    label: 'Gabaryt',
    value: 9,
  },
  {
    label: 'Charakterystyka',
    value: 10,
  },
  {
    label: 'Prawa autorskie',
    value: 11,
  },
  {
    label: 'Kod QR',
    value: 12,
  },
  {
    label: 'Załączniki',
    value: 13,
  },
  {
    label: 'Pliki multimedialne',
    value: 14,
  },
  {
    label: 'Opracowanie karty',
    value: 15,
  },
];

export const initialState = {
  id: '',
  name: {
    pl: '',
    en: '',
  },
  finalName: '',
  timeOfOrigin: '',
  estimatedTimeOfOrigin: '',
  location: {},
  comments: '',
  conservationRecommendations: [],
  description: {
    pl: '',
    en: '',
  },
  evidenceNumber: '',
  insuranceValue: 0,
  shortDescription: '',
  characteristics: '',
  supplementaryData: '',
  copyright: '',
  qrPath: '',
  entryDate: '',
  quantity: 0,
  classificationSystem: {},
  symbol: {
    nkmf: 'NCKF',
    shortcut: '',
    number: '',
    amount: '00',
  },
  preservationState: {
    id: 0,
    encodedImage: '',
    description: {
      pl: '',
      en: '',
    },
    conservations: [
      // {
      //   id: 0,
      //   description: {
      //     pl: '',
      //     en: '',
      //   },,
      //   encodedImage: '',
      //   from: '',
      //   to: '',
      // },
    ],
  },
  worker: {
    workerId: null,
    name: '',
    surname: '',
  },
  acquisitionMethod: {
    source: {
      pl: '',
      en: '',
    },
    documents: [
      // {
      //   id: 0,
      //   name: '',
      // },
    ],
    contact: '',
    acquisitionDate: '',
    valueOnAcquisition: 0,
    conditionOnPurchaseDate: {
      pl: '',
      en: '',
    },
  },
  origin: {
    city: {
      pl: '',
      en: '',
    },
    country: {
      pl: '',
      en: '',
    },
    region: {
      pl: '',
      en: '',
    },
    otherPlace: {
      pl: '',
      en: '',
    },
  },
  details: {
    itemType: 'SINGLE',
    itemPart: [],
    additionalItemCharacteristics: '',
    main: true,
  },
  mainImage: null,
  contact: {
    // id: 0,
    // name: '',
  },
  keywords: {
    pl: [],
    en: [],
  },
  bibliography: [],
  dimensions: [
    // {
    //   name: '',
    //   value: 0,
    //   unit: '',
    // },
  ],
  authors: [
    // {
    //   id: 0,
    //   name: '',
    //   additionalCharacteristics: '',
    //   isMain: true,
    // },
  ],
  history: [
    // {
    //   id: 0,
    //   date: '',
    //   event: '',
    // },
  ],
  images: [
    // {
    //   id: 0,
    //   encodedImage: '',
    //   path: '',
    //   isMain: true,
    // },
  ],
  material: [
    // {
    //   id: 0,
    //   materialTypes: '',
    //   additionalCharacteristics: '',
    // },
  ],
  technique: [
    // {
    //   id: 0,
    //   techniqueTypes: '',
    //   additionalCharacteristics: '',
    // },
  ],
  attachments: [
    // {
    //   id: 0,
    //   name: '',
    // },
  ],
  video: [],
  audio: [],
  closed: false,
  accepted: false,
  availableOnWeb: false,

  newAttachments: [],
  newImages: [],
};

export const booksContent = {
  0: [
    {
      label: 'Księga wpływów',
      name: 'in',
      type: 'select',
    },
    {
      label: 'Numer księgi wpływów',
      name: 'inNumber',
      type: 'text',
    },
    {
      label: 'Znak księgi wpływów',
      name: 'inSign',
      type: 'text',
    },
    {
      label: 'Data wpisu',
      name: 'date',
      type: 'date',
    },
  ],
  1: [
    {
      label: 'Księga inwentarzowa',
      name: 'inv',
      type: 'select',
    },
    {
      label: 'Księga Muzealiów',
      name: 'inv_m',
      type: 'select',
    },
    {
      label: 'Numer inwentarzowy',
      name: 'invNumber',
      type: 'text',
    },
    {
      label: 'Znak inwentarzowy',
      name: 'invSign',
      type: 'text',
    },
    {
      label: 'Data wpisu',
      name: 'date',
      type: 'date',
    },
  ],
  2: [
    {
      label: 'Księga depozytowa',
      name: 'inv',
      type: 'select',
    },
    {
      label: 'Numer depozytowy',
      name: 'invNumber',
      type: 'text',
    },
    {
      label: 'Znak depozytowy',
      name: 'invSign',
      type: 'text',
    },
    {
      label: 'Data wpisu',
      name: 'date',
      type: 'date',
    },
  ],
  3: [
    {
      label: 'Ewidencja pomocnicza',
      name: 'inv',
      type: 'select',
    },
    {
      label: 'Numer ewidencji pomocniczej',
      name: 'invNumber',
      type: 'text',
    },
    {
      label: 'Znak ewidencji pomocniczej',
      name: 'invSign',
      type: 'text',
    },
    {
      label: 'Data wpisu',
      name: 'date',
      type: 'date',
    },
  ],
  4: [
    {
      label: 'Księga braków',
      name: 'inv',
      type: 'select',
    },
    {
      label: 'Numer księgi braków',
      name: 'invNumber',
      type: 'text',
    },
    {
      label: 'Znak księgi braków',
      name: 'invSign',
      type: 'text',
    },
    {
      label: 'Data wpisu',
      name: 'date',
      type: 'date',
    },
  ],
};
