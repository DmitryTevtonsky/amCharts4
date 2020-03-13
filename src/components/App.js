import React, { useState, useEffect } from 'react';
import ChartV4 from './charts';
import Settings from './settings';
import { fetchDataForCharts } from '../api/oldApi';

import './App.css';

function App() {
  const [mainData, setMainData] = useState({ data: [], additionalData: {} });
  const [dateInterval, setDateInterval] = useState({
    startDate: '2020-03-01 00:00:00',
    endDate: '2020-03-04 23:59:59'
  });
  const [tis, setTis] = useState(
    // '1002,1003,1004,11014001,11015001,11016004,11017004,11018004'
    '1002,1003,11016004,11017004'
  );

  useEffect(() => {
    console.log('dateInterval&tis', dateInterval, tis);
    if (Object.keys(dateInterval).length && tis.length) {
      fetchDataForCharts(dateInterval, tis)
        .then(res => {
          const { data, ...additionalData } = res.data;
          // console.log('additionalData', additionalData);
          // console.log('res.data', res.data);

          setMainData({ data, additionalData });
        })
        .catch(err => console.warn(err));
    }
  }, [dateInterval, tis]);

  const updateDateInterval = value => setDateInterval(value);

  const updateTisList = value => setTis(value);

  return (
    <div className="App">
      <Settings
        updateDateInterval={updateDateInterval}
        updateTisList={updateTisList}
        additionalData={mainData.additionalData}
      />
      {mainData.data.length > 0 && <ChartV4 mainData={mainData} />}
    </div>
  );
}

export default App;
