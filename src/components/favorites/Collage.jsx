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
      {favorites.map(project => {
        const { _id: id } = project;
        return (
          <Wrapper key={id} $size={tileSize}>
            {/* {id === hoveredId && <DeleteButton />} */}
            <ImageWrapper 
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <ProjectImage 
                project={project}
                onLoad={() => setLoading(false)}
                onClick={() => navigate(`/projects/${id}`)}
                style={{
                  height: `${tileSize}px`,
                  width: `${tileSize}px`,
                }}
              />
            </ImageWrapper>
          </Wrapper>
        );
      })}
    </div>
  </>);
};

const Wrapper = styled.div`
  height: ${({ $size }) => `${$size}px`};
  width: ${({ $size }) => `${$size}px`};
  display: inline-block;
  margin: 0 1px 0 1px;

`;

const ImageWrapper = styled.div`
  cursor: pointer;
  &:hover {
    filter: brightness(50%)
  }
`;

// const DeleteButton = styled.div`
//   height: 10px;
//   width: 10px;
//   background-color: red;
// `;

export default Collage;
