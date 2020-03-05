import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

import './index.css';

const LegendItem = ({ series, color }) => {
  const toggleSlice = series =>
    !series.isHidden ? series.hide() : series.show();

  return (
    <div style={{ borderBottom: '1px dashed gray' }}>
      <Button
        style={{ color, fontWeight: 'bold' }}
        type="link"
        onClick={() => toggleSlice(series)}
      >
        {series.name}
      </Button>
    </div>
  );
};

export default LegendItem;
