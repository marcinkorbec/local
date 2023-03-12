const years = [];
for (let i = 1; i < 20; i += 1) {
  const year = 2020 + i;
  years.push({
    value: year,
    label: year,
  });
}

export default {
  filters: [
    {
      type: 'select',
      name: 'year',
      label: 'Rok:',
      options: years,
    },
    {
      type: 'select',
      name: 'month',
      label: 'Miesiąc:',
      options: [
        {
          value: 1,
          label: 'Styczeń',
        },
        {
          value: 2,
          label: 'Luty',
        },
        {
          value: 3,
          label: 'Marzec',
        },
        {
          value: 4,
          label: 'Kwiecień',
        },
        {
          value: 5,
          label: 'Maj',
        },
        {
          value: 6,
          label: 'Czerwiec',
        },
        {
          value: 7,
          label: 'Lipiec',
        },
        {
          value: 8,
          label: 'Sierpień',
        },
        {
          value: 9,
          label: 'Wrzesień',
        },
        {
          value: 10,
          label: 'Październik',
        },
        {
          value: 11,
          label: 'Listopad',
        },
        {
          value: 12,
          label: 'Grudzień',
        },
      ],
    },
    {
      type: 'select',
      name: 'status',
      label: 'Status:',
      options: [
        {
          value: 'ACTIVE',
          label: 'Aktywne',
        },
        {
          value: 'READY',
          label: 'Gotowe',
        },
        {
          value: 'NEW',
          label: 'Nowy',
        },
        {
          value: 'FINISHED',
          label: 'Zakończone',
        },
        {
          value: 'CLOSED',
          label: 'Zamknięte',
        },
      ],
    },
  ],
};
