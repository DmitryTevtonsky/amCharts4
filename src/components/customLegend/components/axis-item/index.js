/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography } from 'antd';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SeriesItem from '../series-item';

import './index.css';

const { Text } = Typography;

const AxisItem = ({ axis, serieses, index }) => {
  // const toggleSlice = series =>
  //   !series.isHidden ? series.hide() : series.show();

  return (
    <Draggable draggableId={axis.id} index={index}>
      {provided => (
        <div
          className="axis-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* <Text
            strong
            className="axis-item-title"
            {...provided.dragHandleProps}
          >
            {axis.title}
          </Text> */}
          <Droppable droppableId={axis.id} type="series">
            {providedDroppable => (
              <div
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
                className="series-items-list"
              >
                {serieses.map((series, indexS) => (
                  <SeriesItem key={series.id} series={series} index={indexS} />
                ))}
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default AxisItem;
