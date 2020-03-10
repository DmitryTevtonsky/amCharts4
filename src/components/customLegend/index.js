import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LegendItem from './legendItem';

import './index.css';
import { Typography } from 'antd';

const { Text } = Typography;
const initial = Array.from({ length: 3 }, (v, k) => k).map(k => {
  const custom = {
    id: `id-${k}`,
    content: `Series ${k}`
  };

  return custom;
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Series = () => (
  <Draggable draggableId="" index="">
    <div>kek</div>
  </Draggable>
);

const CustomLegend = ({ chart, serieses }) => {
  const [state, setState] = useState({ serieses: initial });

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const serieses = reorder(
      state.serieses,
      result.source.index,
      result.destination.index
    );

    setState({ serieses });
  };

  console.log('state', state);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="test1">
        {provided => (
          <SeriesList innerRed={provided.innerRef} {...provided.droppableProps}>
            {state.serieses.map((series, index) => (
              <Series key={series.id} series={series} index={index} />
            ))}
            {provided.placeholder}
          </SeriesList>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CustomLegend;
