import React from 'react';
import * as S from '../Constructor.css';

const PaddingSettings = ({ paddings, setSettings }) => {
  const handleChange = (dir, value) => {
    setSettings(prev => ({
      ...prev,
      padding: { ...prev.padding, [dir]: value > 0 ? value : 0 },
    }));
  };

  return (
    <S.SingleSetting>
      <h3>Góra:</h3>{' '}
      <input
        type='number'
        value={paddings.top}
        onChange={e => handleChange('top', e.target.value)}
      />
      <h3>Dół:</h3>{' '}
      <input
        type='number'
        value={paddings.bottom}
        onChange={e => handleChange('bottom', e.target.value)}
      />
      <h3>Lewo:</h3>{' '}
      <input
        type='number'
        value={paddings.left}
        onChange={e => handleChange('left', e.target.value)}
      />
      <h3>Prawo:</h3>{' '}
      <input
        type='number'
        value={paddings.right}
        onChange={e => handleChange('right', e.target.value)}
      />
    </S.SingleSetting>
  );
};

export default PaddingSettings;
