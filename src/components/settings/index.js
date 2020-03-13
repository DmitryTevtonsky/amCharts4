import React from 'react';
import './index.css';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

import { DatePicker, Input, Typography } from 'antd';
import moment from 'moment';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const Settings = ({ updateDateInterval, updateTisList, additionalData }) => {
  const { counts_output } = additionalData;
  const onOk = ([startMomentDate, endMomentDate]) => {
    const startDate = moment(startMomentDate).format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(endMomentDate).format('YYYY-MM-DD HH:mm:ss');

    updateDateInterval({ startDate, endDate });
  };

  const onChangeTis = e => {
    e.persist();
    updateTisList(e.target.value);
  };

  return (
    <div className="settings">
      <Input
        style={{ width: '500px' }}
        defaultValue="1002,1003,11016004,11017004"
        onPressEnter={onChangeTis}
      />
      <RangePicker
        autoFocus
        ranges={{
          previousMonth: [
            moment()
              .subtract(1, 'months')
              .startOf('month'),
            moment()
              .subtract(1, 'months')
              .endOf('month')
          ],
          currentMonth: [moment().startOf('month'), moment().endOf('day')],
          lastSevenDays: [
            moment()
              .subtract(7, 'days')
              .startOf('day'),
            moment().endOf('day')
          ],
          today: [moment().startOf('day'), moment().endOf('day')]
        }}
        allowClear={false}
        size="large"
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        defaultValue={[moment().startOf('day'), moment().endOf('day')]}
        bordered={false}
        onChange={onOk}
      />
      <Text strong>Количество точек: {counts_output}</Text>
    </div>
  );
};

export default Settings;
