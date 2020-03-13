/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './index.css';
import {
  createChart,
  createValueAxis,
  createSeries,
  createDiscreteValueAxis
} from './utils';
import CustomLegend from '../customLegend';

const ChartV4 = ({ mainData: { data, additionalData } }) => {
  const [thisChart, setChart] = useState();
  const [dataForGrouping, setDataForGrouping] = useState({});

  useEffect(() => {
    const chart = createChart(`Series-all`, data);
    // console.log('dataForGrouping', dataForGrouping);
    // console.log('additionalData', additionalData.fid);

    if (dataForGrouping.data) {
      const groupedAxises = dataForGrouping.data.grouping
        .map(group =>
          group.map(instance =>
            additionalData.fid.find(fid => instance === fid.fid)
          )
        )
        .filter(elem => elem.length);
      console.log('groupedAxis', groupedAxises);
      groupedAxises.map((group, index) => {
        if (group && group.length === 1) {
          const [singleAxis] = group;
          createSeries(
            chart,
            singleAxis.unit === '',
            false,
            singleAxis.title,
            singleAxis.fid
          );
        } else {
          // общая ось значений для сгруппированных графиков
          console.log(`GROUP-${index}`, group);

          // const valueAxis = createValueAxis(chart); // главная ось значений
          // let discreteValueAxis;

          if (group.some(element => element.unit === '')) {
            console.log('!!!!!!!!!есть дискрет!!!!!!!!!');
            // const discreteValueAxis = createDiscreteValueAxis(chart);
            const valueAxis = createValueAxis(chart); // главная ось значений

            group.map(element => {
              return element.unit === ''
                ? createSeries(
                    chart,
                    element.unit === '',
                    valueAxis,
                    element.title,
                    element.fid
                  )
                : createSeries(
                    chart,
                    element.unit === '',
                    valueAxis,
                    element.title,
                    element.fid
                  );
            });
          } else {
            const valueAxis = createValueAxis(chart); // главная ось значений
            group.map(element => {
              // TODO: нужна доп.логика по осям для корректной работы
              return createSeries(
                chart,
                element.unit === '',
                valueAxis,
                element.title,
                element.fid
              );
            });
          }
        }
      });
    }

    setChart(chart);
    return () => chart.dispose();
  }, [data, dataForGrouping]);

  const updateChartForGrouping = dataForRegrouping => {
    if (Object.keys(dataForRegrouping).length) {
      // console.log('updateChartForGrouping', dataForRegrouping);
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
