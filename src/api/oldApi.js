import axios from 'axios';

axios.create({
  baseURL: 'http://demo.sedmax.ru'
});

const fetchDataForCharts = ({ startDate, endDate }, tis) =>
  axios.get(`/select/timongo/data/${startDate}/${endDate}/${tis}`);

const fetchListOfParameters = () =>
  axios.get(`/sedmax/web/widgets/drag/parameters`);

export { fetchDataForCharts, fetchListOfParameters };
