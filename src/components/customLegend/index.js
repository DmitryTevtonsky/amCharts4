import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LegendItem from './legendItem';

import './index.css';

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DraggableLegendItem = ({ quote, index }) => {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </div>
      )}
    </Draggable>
  );
};

const LegendItemsList = React.memo(function LegendItemsList({ quotes }) {
  return quotes.map((quote, index) => (
    <DraggableLegendItem quote={quote} index={index} key={quote.id} />
  ));
});

const CustomLegend = ({ chart, serieses }) => {
  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }
  console.log('state', state);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="mainDrappableLayout">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <LegendItemsList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

    /**
     * https://egghead.io/lessons/react-reorder-columns-with-react-beautiful-dnd
     * https://react-beautiful-dnd.netlify.com/?path=/story/single-vertical-list--with-combine-enabled
     * https://codesandbox.io/s/zqwz5n5p9x
     * https://codesandbox.io/s/ql08j35j3q
     */
  );
};

export default CustomLegend;
