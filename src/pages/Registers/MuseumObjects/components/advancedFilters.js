export default {
  search: {
    name: 'chIn',
    label: '',
    placeholder: 'Szukaj...',
  },
  filters: [
    {
      type: 'select',
      name: 'isActive',
      label: 'Aktywna:',
      options: [
        {
          label: 'Tak',
          value: true,
        },
        {
          label: 'Nie',
          value: false,
        },
      ],
    },
  ],
};
