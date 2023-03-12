import React from 'react';
import Select from 'react-select';
import * as S from '../Constructor.css';

const options = [
  {
    value: null,
    label: 'Luźne',
  },
  {
    value: 'vertical',
    label: 'Pionowe',
  },
  {
    value: 'horizontal',
    label: 'Poziome',
  },
];

const CompactTypeSettings = ({ compactType, setSettings }) => {
  const handleChange = e => {
    setSettings(prev => ({
      ...prev,
      compactType: e,
    }));
  };

  return (
    <S.SingleSetting>
      <Select value={compactType} options={options} onChange={handleChange} />
    </S.SingleSetting>
  );
};

export default CompactTypeSettings;
