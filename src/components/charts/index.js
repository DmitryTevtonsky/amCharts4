import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import './index.css';

import { createChart, createSeries } from './utils';
import CustomLegend from '../customLegend';

// am4core.useTheme(am4themes_animated);

const ChartV4 = ({ mainData: { data, additionalData } }) => {
  const [thisChart, setChart] = useState();

  useEffect(() => {
    const chart = createChart(`Series-all`, data);

    const discreteInstances = additionalData.fid.filter(
      ({ unit }) => unit === ''
    );

    const serialInstances = additionalData.fid.filter(
      ({ unit }) => unit !== ''
    );

    serialInstances.map(inst =>
      createSeries(chart, false, false, inst.title, inst.fid)
    );

    discreteInstances.map(inst =>
      createSeries(chart, true, false, inst.title, inst.fid)
    );
    chart.customLegend = document.getElementById('Chart-legend');
    setChart(chart);
    return () => chart.dispose();
  }, [data]);

  return (
    <div className="chartWithLegend">
      <div
        id="Series-all"
        style={{
          width: '80%',
          height: '95vh'
        }}
      />
      {thisChart && thisChart.series && thisChart.series.values && (
        <CustomLegend chart={thisChart} serieses={thisChart.series.values} />
      )}
    </div>
  );
};

export default ChartV4;
