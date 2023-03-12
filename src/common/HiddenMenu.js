import React from 'react';

const HiddenMenu = ({ text = 'Menu' }) => (
  <span style={{ display: 'none' }}>{text}</span>
);

export default HiddenMenu;
