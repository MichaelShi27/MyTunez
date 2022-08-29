import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Loading } from '../styles.js';

const YearData = ({ projects }) => {
  const [ loading, setLoading ] = useState(true);
  const [ decadeCounts, setDecadeCounts ] = useState({});

  const getCounts = () => {
    const yearCounts = {};
    const decadeCounts = {};
    for (const { releaseYear } of projects) {
      const decade = releaseYear - (releaseYear % 10);
      decadeCounts[decade] = 1 + (decadeCounts[decade] || 0);

      yearCounts[releaseYear] = 1 + (yearCounts[releaseYear] || 0);
    }
    setDecadeCounts(decadeCounts);
  };

  useEffect(() => setLoading(false), []);
  useEffect(getCounts, [ projects ]);

  const getPercentage = count => Math.round(count / projects.length * 100 * 100) / 100;

  return loading ? <LoadingText>LOADING...</LoadingText> : (
    <Wrapper>
      {Object.keys(decadeCounts).map(decade => {
        const count = decadeCounts[decade];
        const decadeStr = decade === '0' ? 'Unknown' : `${decade}s`;
        return (
          <TextWrapper key={decade}>
            {decadeStr}: {count} projects ({getPercentage(count)}%)
          </TextWrapper>
        );
      })}
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
`;

const TextWrapper = styled.div`
  padding: 10px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
`;

export default YearData;
