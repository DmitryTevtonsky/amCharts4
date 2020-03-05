import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useDrag } from 'react-dnd';
import LegendItem from './legendItem';

import './index.css';

const CustomLegend = ({ chart }) => {
  const createLegendItem = (series, color, value) => {
    console.log('series', series, color, value);
    return <LegendItem key={series.uid} series={series} color={color} />;
  };

  return (
    <div className="customLegend">
      {chart &&
        chart.series &&
        chart.series.values.map((series, i) => {
          const color = chart.colors.getIndex(i);
          const { value } = series;
          return createLegendItem(series, color, value);
        })}
    </div>
  );
};

export default CustomLegend;
