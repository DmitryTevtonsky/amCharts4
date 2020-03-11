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
  const [dataForGrouping, setDataForGrouping] = useState({});

  useEffect(() => {
    const chart = createChart(`Series-all`, data);
    console.log('dataForGrouping', dataForGrouping);
    console.log('additionalData', additionalData.fid);

    if (dataForGrouping.data) {
      const groupedAxises = dataForGrouping.data.grouping
        .map(group =>
          group.map(instance =>
            additionalData.fid.find(fid => instance === fid.fid)
          )
        )
        .filter(elem => elem.length);
      console.log('groupedAxis', groupedAxises);
      groupedAxises.map(group => {
        if (group.length === 1) {
          const [singleAxis] = group;
          console.log(singleAxis, 'singleAxis');
          createSeries(
            chart,
            singleAxis.unit === '',
            false,
            singleAxis.title,
            singleAxis.fid
          );
        } else {
          const valueAxis = createValueAxis(chart);
          group.map(element => {
            console.log('element', element);

            createSeries(
              chart,
              element.unit === '',
              valueAxis,
              element.title,
              element.fid
            );
          });
        }
      });
    }

    // additionalData.fid.map(inst =>
    //   createSeries(chart, inst.unit === '', false, inst.title, inst.fid)
    // );

    // discreteInstances.map(inst =>
    //   createSeries(chart, true, false, inst.title, inst.fid)
    // );
    setChart(chart);
    return () => chart.dispose();
  }, [data, dataForGrouping]);

  const updateChartForGrouping = dataForRegrouping => {
    if (Object.keys(dataForRegrouping).length) {
      console.log('updateChartForGrouping', dataForRegrouping);
      setDataForGrouping(dataForRegrouping);
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
