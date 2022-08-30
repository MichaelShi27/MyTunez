import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Loading } from '../styles.js';

import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DecadeData = ({ projects }) => {
  const [ loading, setLoading ] = useState(true);
  const [ decadeCounts, setDecadeCounts ] = useState({});

  const getCounts = () => {
    const decadeCounts = {};
    for (const { releaseYear } of projects) {
      const decade = releaseYear - (releaseYear % 10);
      decadeCounts[decade] = 1 + (decadeCounts[decade] || 0);
    }
    setDecadeCounts(decadeCounts);
  };

  useEffect(() => setLoading(false), []);
  useEffect(getCounts, [ projects ]);

  const getPercentage = count => Math.round(count / projects.length * 100 * 100) / 100;

  const getDecadeStr = decade => decade === '0' ? 'Unknown' : `${decade}s`;
  const decades = Object.keys(decadeCounts).sort((a, b) => Number(a) - Number(b));

  const chartData = {
    labels: decades.map(decade => getDecadeStr(decade)),
    datasets: [{
      label: '# of projects',
      data: decades.map(decade => decadeCounts[decade]),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }]
  };

  return loading ? <LoadingText>LOADING...</LoadingText> : (<>
    <Wrapper>
      <Bar data={chartData}/>
      {Object.keys(decadeCounts).map(decade => (
        <TextWrapper key={decade}>
          {getDecadeStr(decade)}: {getPercentage( decadeCounts[decade] )}%
        </TextWrapper>
      ))}
    </Wrapper>
    <div style={{ height: '20px '}} />
  </>);
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
  height: 400px;
  width: 800px;
`;

const TextWrapper = styled.div`
  margin: 1px;
  padding: 10px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
  color: rgba(0, 0, 0, 0.6);
`;

export default DecadeData;
