import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProjectImage from '../projectPage/ProjectImage';
import { Loading } from '../styles.js';

const Collage = ({ favorites, tileSize }) => {
  const [ loading, setLoading ] = useState(true);
  const [ hoveredId, setHoveredId ] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const navigate = useNavigate();

  return (<>
    {loading && <Loading>LOADING...</Loading>}
    {!favorites.length && !loading && (
      <Loading style={{ color: '#e0e0e0', fontFamily: 'Helvetica' }}>
        No favorites added!
      </Loading>
    )}
    <div style={{ marginTop: '20px' }}>
      {favorites.map(project => (
        <ImageWrapper $size={tileSize}>
          <ProjectImage 
            key={project._id}
            project={project}
            onLoad={() => setLoading(false)}
            onClick={() => navigate(`/projects/${project._id}`)}
            // onMouseEnter={() => setHoveredId(project._id)}
            // onMouseLeave={() => setHoveredId(null)}
            style={{
              height: `${tileSize}px`,
              width: `${tileSize}px`,
            }}
          />
        </ImageWrapper>
      ))}
    </div>
  </>);
};

const ImageWrapper = styled.div`
  // height: ${({ $size }) => `${$size}px`};
  // width: ${({ $size }) => `${$size}px`};
  margin: 0 1px 0 1px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    filter: brightness(50%)
  }
`;

export default Collage;
