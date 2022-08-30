import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Loading } from '../../styles.js';

import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const YearData = ({ projects }) => {
  const [ loading, setLoading ] = useState(true);
  const [ yearCounts, setYearCounts ] = useState({});

  const getCounts = () => {
    const counts = {};
    for (const { releaseYear } of projects)
      counts[releaseYear] = 1 + (counts[releaseYear] || 0);
    setYearCounts(counts);
  };

  useEffect(() => setLoading(false), []);
  useEffect(getCounts, [ projects ]);

  const years = Object.keys(yearCounts).sort((a, b) => Number(a) - Number(b));

  const chartData = {
    labels: years.map(year => year === '0' ? 'Unknown' : year),
    datasets: [{
      label: '# of projects',
      data: years.map(year => yearCounts[year]),
      backgroundColor: 'rgba(110, 212, 255, 0.7)',
    }]
  };

  return loading ? <LoadingText>LOADING...</LoadingText> : (
    <Wrapper>
      <Bar data={chartData}/>
    </Wrapper>
  );
};

const LoadingText = styled(Loading)`
  margin: 20px 320px;
  font-size: 15px;
`;

const Wrapper = styled.div`
  margin: 0 0 15px 18px;
  background-color: #f2f2f2;
  display: inline-block;
  padding: 0 10px 0 10px;
  height: 500px;
  width: 1000px;
`;

export default YearData;
