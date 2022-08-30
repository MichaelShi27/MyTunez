import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Loading, colors } from '../../styles.js';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const GenreData = ({ projects }) => {
  const [ loading, setLoading ] = useState(true);
  const [ genreCounts, setGenreCounts ] = useState({});

  const getCounts = () => {
    const counts = { rock: 0, 'hip-hop': 0, electronic: 0, pop: 0, other: 0 };
    for (const { genre } of projects)
      counts[genre]++;
    setGenreCounts(counts);
  };

  useEffect(() => setLoading(false), []);
  useEffect(getCounts, [ projects ]);

  const getPercentage = count => Math.round(count / projects.length * 100 * 100) / 100;

  const genres = [ 'rock', 'hip-hop', 'electronic', 'pop', 'other' ];
  const chartData = {
    labels: genres.map(genre => (
      ` ${ genre[0].toUpperCase() }${genre.slice(1)} (${ getPercentage(genreCounts[genre]) }%) `
    )),
    datasets: [{
      data: genres.map(genre => genreCounts[genre]),
      backgroundColor: genres.map(genre => colors[genre]),
      borderColor: genres.map(genre => colors[genre]),
      borderWidth: 1,
    }]
  };

  return loading ? <LoadingText>LOADING...</LoadingText> : (
    <Wrapper>
      <Pie data={chartData} />
    </Wrapper>
  );
};

const LoadingText = styled(Loading)`
  margin: 20px 320px;
  font-size: 15px;
`;

const Wrapper = styled.div`
  margin: 0 0 15px 18px;
  padding: 15px;
  background-color: #eeeeee;
  display: inline-block;
  width: 340px;
  height: 340px;
`;

export default GenreData;
