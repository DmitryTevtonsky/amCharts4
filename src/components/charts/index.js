import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import './index.css';
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { createChart, createValueAxis, createSeries } from './utils';
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
    setChart(chart);
    return () => chart.dispose();

    // TODO: change datasets without rerender of chart
  }, [data]);

  return (
    <div className="chartWithLegend">
      <div
        id="Series-all"
        style={{
          width: '100%',
          height: '95vh'
        }}
      />
      {/* <CustomLegend chart={thisChart}></CustomLegend> */}
    </div>
  );
};

export default ChartV4;
