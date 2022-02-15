import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GenreData = ({ projects, successfulSubmit }) => {
  const [ genreCounts, setGenreCounts ] = useState({});
  const getCounts = () => {
    const counts = { rock: 0, 'hip-hop': 0, electronic: 0, pop: 0, other: 0 };
    for (const { genre } of projects)
      counts[genre]++;
    setGenreCounts(counts);
  };
  useEffect(getCounts, [ successfulSubmit, projects ]);
  const { rock, electronic, pop, other } = genreCounts;
  const hipHop = genreCounts['hip-hop'];
  const getPercentage = count => Math.round(count / projects.length * 100 * 100) / 100;
  return (
    <Wrapper>
      <TextWrapper>Rock: {rock} projects ({getPercentage(rock)} %)</TextWrapper>
      <TextWrapper>Hip-hop: {hipHop} projects ({getPercentage(hipHop)} %)</TextWrapper>
      <TextWrapper>Electronic: {electronic} projects ({getPercentage(electronic)} %)</TextWrapper>
      <TextWrapper>Pop: {pop} projects ({getPercentage(pop)} %)</TextWrapper>
      <TextWrapper>Other: {other} projects ({getPercentage(other)} %)</TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 0 15px 18px;
  background-color: #f2f2f2;
  display: inline-block;
`;

const TextWrapper = styled.div`
  padding: 10px 20px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
`;

export default GenreData;