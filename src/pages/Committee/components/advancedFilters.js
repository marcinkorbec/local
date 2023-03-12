export default {
  search: {
    name: 'chIn',
    label: '',
    placeholder: 'Szukaj...',
  },
  filters: [
    {
      type: 'date',
      name: 'create',
      label: 'Stworzono:',
    },
    {
      type: 'select',
      name: 'type',
      label: 'Typ:',
      options: [
        {
          label: 'Złożony',
          value: 'COMPLEX',
        },
        {
          label: 'Pojedynczy',
          value: 'SINGLE',
        },
      ],
    },
  ],
};
