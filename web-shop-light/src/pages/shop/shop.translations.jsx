const sortLabels = [
    {
      value: '',
      label: {
        sl: 'Brez sortiranja',
        en: 'No sorting',
      },
      icon: null
    },
    {
      value: 'alphabetical-asc',
      label: {
        sl: 'Ime (A-Z)',
        en: 'Name (A-Z)',
      },
      icon: 'fa fa-sort-alpha-down'
    },
    {
      value: 'alphabetical-desc',
      label: {
        sl: 'Ime (Z-A)',
        en: 'Name (Z-A)',
      },
      icon: 'fa fa-sort-alpha-up'
    },
    {
      value: 'price-asc',
      label: {
        sl: 'Cena (najnižja najprej)',
        en: 'Price (lowest first)',
      },
      icon: 'fa fa-sort-amount-down'
    },
    {
      value: 'price-desc',
      label: {
        sl: 'Cena (najvišja najprej)',
        en: 'Price (highest first)',
      },
      icon: 'fa fa-sort-amount-up'
    },
    {
      value: 'rating-asc',
      label: {
        sl: 'Ocena (najnižja najprej)',
        en: 'Rating (lowest first)',
      },
      icon: 'fa fa-sort-numeric-down'
    },
    {
      value: 'rating-desc',
      label: {
        sl: 'Ocena (najvišja najprej)',
        en: 'Rating (highest first)',
      },
      icon: 'fa fa-sort-numeric-up'
    },
  ];

  export default sortLabels;
  