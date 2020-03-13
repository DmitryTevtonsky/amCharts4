import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

const interfaceColors = new am4core.InterfaceColorSet();

const createChart = (div, data) => {
  const chart = am4core.create(div, am4charts.XYChart);
  chart.data = data;
  chart.leftAxesContainer.layout = 'vertical';
  chart.rightAxesContainer.layout = 'horizontal';

  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 100;
  dateAxis.renderer.ticks.template.length = 8;
  dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
  dateAxis.renderer.ticks.template.disabled = false;
  dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
  dateAxis.groupData = true; // Optimization

  chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH-mm-ss';
  chart.dateFormatter.dateFormat = 'yyyy-MM-dd'; // format to display

  const scrollbarX = new am4charts.XYChartScrollbar();
  // scrollbarX.series.push(series);
  chart.scrollbarX = scrollbarX;

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.behavior = 'zoomX';
  chart.cursor.xAxis = dateAxis;

  // chart.legend = new am4charts.Legend();
  // chart.legend.position = 'right';
  // chart.legend.maxWidth = undefined;
  // chart.legend.scrollable = true;

  chart.exporting.menu = new am4core.ExportMenu();

  return chart;
};

const createValueAxis = chart => {
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  valueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor(
    'alternativeBackground'
  );
  valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;

  valueAxis.marginTop = 10;
  valueAxis.marginBottom = 10;
  valueAxis.zIndex = 1;

  return valueAxis;
};

const createDiscreteValueAxis = chart => {
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.line.strokeOpacity = 1;
  valueAxis.renderer.line.strokeWidth = 2;
  valueAxis.renderer.line.stroke = '#aee';
  valueAxis.renderer.labels.template.fill = '#aee';
  valueAxis.renderer.opposite = true;

  return valueAxis;
};

const createSeriesInstance = (chart, isStepped, field, seriesName) => {
  const seriesInstance = !isStepped
    ? chart.series.push(new am4charts.LineSeries())
    : chart.series.push(new am4charts.StepLineSeries());
  seriesInstance.dataFields.valueY = field;
  seriesInstance.dataFields.dateX = 'date';
  seriesInstance.dataItems.template.locations.dateX = 0;
  seriesInstance.name = seriesName;
  seriesInstance.tooltipText = '{valueY}'; // "{name}: [bold]{valueY}[/]";
  seriesInstance.tooltip.background.fillOpacity = 0.5;
  seriesInstance.legendSettings.itemValueText = '{valueY}';
  seriesInstance.strokeWidth = 1.5;
  return seriesInstance;
};

const createSeries = (
  chart,
  isStepped = false,
  valueAxis = false,
  seriesName,
  field
) => {
  let newValueAxis;
  if (!valueAxis) {
    // Create new ValueAxis for single series
    newValueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    newValueAxis.renderer.gridContainer.background.fill = interfaceColors.getFor(
      'alternativeBackground'
    );
    newValueAxis.renderer.gridContainer.background.fillOpacity = 0.05;

    newValueAxis.marginTop = 8;
    newValueAxis.marginBottom = 8;
    newValueAxis.zIndex = 1;

    if (isStepped) {
      newValueAxis.min = 0;
      newValueAxis.max = 1;
      newValueAxis.strictMinMax = true;
      newValueAxis.height = 25; // Strict height for stepLine serieses
    }
  }

  const series = createSeriesInstance(chart, isStepped, field, seriesName);
  console.log(series);
  if (!valueAxis) {
    series.yAxis = newValueAxis;
  } else {
    series.yAxis = valueAxis;
  }

  return series;
};

export { createChart, createSeries, createValueAxis, createDiscreteValueAxis };
