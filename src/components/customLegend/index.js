import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AxisItem from './components/axis-item';

import './index.css';

const CustomLegend = ({ chart, trueFids, updateChartForGrouping }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (Object.keys(data).length) {
      // const grouping = Object.keys(data.axises).map(
      //   axis => data.axises[axis].seriesesIds
      // );

      const grouping = data.axisesOrder.map(
        axis => data.axises[axis].seriesesIds
      );
      console.log(grouping);

      updateChartForGrouping({ data: { ...data, grouping } });
    }
  }, [data]);

  useEffect(() => {
    const reformatedSerieses = {};
    const axises = {};
    const chartSerieses = chart.series.values;

    trueFids.map((series, index) => {
      const [singleItem] = chartSerieses.filter(
        chartSeries => chartSeries.name === series.title
      );
      const seriesItem = {
        id: `${series.fid}`,
        name: series.title,
        series: singleItem
      };
      const axisItem = {
        id: `axis-${index}`,
        title: `Ось-${index}`,
        seriesesIds: [seriesItem.id]
      };
      axises[`axis-${index}`] = axisItem;
      reformatedSerieses[`${series.fid}`] = seriesItem;
    });

    const grouping = Object.keys(axises).map(axis => axises[axis].seriesesIds);
    setData({
      serieses: reformatedSerieses,
      axises,
      axisesOrder: Object.keys(axises),
      grouping
    });
  }, [trueFids]);

  const onDragEnd = result => {
    // console.log('result', result);
    const { draggableId, destination, source, type } = result;
    if (!destination) return; // TODO: creating new axis

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'axis') {
      // to reorder axises
      const newAxisesOrder = Array.from(data.axisesOrder);
      newAxisesOrder.splice(source.index, 1);
      newAxisesOrder.splice(destination.index, 0, draggableId);

      const newData = { ...data, axisesOrder: newAxisesOrder };
      setData(newData);
      return;
    }

    const start = data.axises[source.droppableId];
    const finish = data.axises[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.seriesesIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, seriesesIds: newTaskIds };

      setData({
        ...data,
        axises: {
          ...data.axises,
          [newColumn.id]: newColumn
        }
      });
    } else {
      const startSeriesesIds = Array.from(start.seriesesIds);
      startSeriesesIds.splice(source.index, 1);
      const newStartColumn = { ...start, seriesesIds: startSeriesesIds };

      const finishSeriesesIds = Array.from(finish.seriesesIds);
      finishSeriesesIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = { ...finish, seriesesIds: finishSeriesesIds };

      setData({
        ...data,
        axises: {
          ...data.axises,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn
        }
      });
    }
    // TODO: filter for empty(without serieses) axis
  };

  return (
    <div className="customLegend">
      {Object.keys(data).length && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-axises" direction="vertical" type="axis">
            {provided => (
              <div
                className="container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data.axisesOrder.map((axisId, index) => {
                  const axis = data.axises[axisId];
                  const serieses = axis.seriesesIds.map(
                    seriesId => data.serieses[seriesId]
                  );
                  return (
                    <AxisItem
                      key={axisId}
                      axis={axis}
                      serieses={serieses}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default CustomLegend;
