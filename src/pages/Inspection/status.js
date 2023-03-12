export const status = {
  WAITING: {
    value: 'WAITING',
    label: 'Oczekujący',
  },
  CONFIRMED: {
    value: 'CONFIRMED',
    label: 'Potwierdzony',
  },
  ABSENCE: {
    value: 'ABSENCE',
    label: 'Brak',
  },
  BORROWED: {
    value: 'BORROWED',
    label: 'Wypożyczony',
  },
  UNDETERMINED: {
    value: 'UNDETERMINED',
    label: 'Nieokreślony',
  },
};

export const inspStatus = {
  ACTIVE: {
    value: 'ACTIVE',
    label: 'Aktywne',
  },
  READY: {
    value: 'READY',
    label: 'Gotowe',
  },
  NEW: {
    value: 'NEW',
    label: 'Nowy',
  },
  FINISHED: {
    value: 'FINISHED',
    label: 'Zakończone',
  },
  CLOSED: {
    value: 'CLOSED',
    label: 'Zamknięte',
  },
};

export const defaultDimension = {
  height: { label: 'Wysokość', name: 'height' },
  width: { label: 'Szerokość', name: 'width' },
  depth: { label: 'Głębokość', name: 'depth' },
  diameter: { label: 'Średnica', name: 'diameter' },
  thickness: { label: 'Grubość', name: 'thickness' },
  circumference: { label: 'Obwód', name: 'circumference' },
  format: { label: 'Format', name: 'format' },
  weight: { label: 'Waga', name: 'weight' },
};
