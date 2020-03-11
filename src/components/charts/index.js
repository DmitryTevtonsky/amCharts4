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
  const [dataForGrouping, setDataForGrouping] = useState();

  useEffect(() => {
    console.log('dataForGrouping', dataForGrouping);
    const chart = createChart(`Series-all`, data);
    console.log('additionalData', additionalData);

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
  }, [data, dataForGrouping]);

  const updateChartForGrouping = dataForRegrouping => {
    if (Object.keys(dataForRegrouping).length) {
      console.log('updateChartForGrouping', dataForRegrouping);
    }
  };

  return (
    <div className="chartWithLegend">
      <div
        id="Series-all"
        style={{
          width: '70%',
          height: '95vh'
        }}
      />
      {thisChart && thisChart.series && (
        <CustomLegend
          chart={thisChart}
          trueFids={additionalData.fid}
          updateChartForGrouping={updateChartForGrouping}
        />
      )}
    </div>
  );
};

export default ChartV4;
