/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './index.css';

const SeriesItem = ({ series, index }) => {
  return (
    <Draggable draggableId={series.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="series-item"
        >
          {series.name}
        </div>
      )}
    </Draggable>
  );
};

export default SeriesItem;
