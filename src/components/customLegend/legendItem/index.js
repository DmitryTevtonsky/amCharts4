import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';

// import './index.css';

const LegendItem = ({ series, color }) => {
  const toggleSlice = series =>
    !series.isHidden ? series.hide() : series.show();

  return (
    <Button
      style={{ color, fontWeight: 'bold' }}
      type="link"
      onClick={() => toggleSlice(series)}
    >
      {series.name}
    </Button>
  );
};

export default LegendItem;
