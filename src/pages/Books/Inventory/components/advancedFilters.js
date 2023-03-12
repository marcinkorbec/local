export default ({ classifications }) => ({
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
    {
      type: 'select',
      name: 'classificationSystem',
      label: 'System klasyfikacji:',
      options: classifications,
    },
  ],
});
