export const onDragEndHandler = (result, data) => {
  console.log('result', result);
  const { draggableId, destination, source, type } = result;
  console.log('destination', destination);
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
