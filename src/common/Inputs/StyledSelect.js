import React from 'react';
import Select from 'react-select';
import theme from 'styles/theme';

const StyledSelect = ({ color, ...rest }) => (
  <Select
    {...rest}
    placeholder={rest?.placeholder || '...'}
    theme={t => ({
      ...t,
      colors: {
        ...t.colors,
        neutral20: color || theme.primaryDark,
      },
    })}
  />
);

export default StyledSelect;
