import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ProjectImage from '../projectPage/ProjectImage';
import { Loading } from '../styles.js';

const Collage = ({ favorites, tileSize, removeFavorite }) => {
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
      {favorites.map((project, idx) => {
        const { _id: id } = project;
        return (
          <Wrapper key={id} $size={tileSize}>
            {id === hoveredId && (
              <DeleteButton 
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  removeFavorite(id);
                  const nextEl = favorites[idx + 1];
                  setHoveredId(nextEl ? nextEl._id : null);
                }}
              >
                &#xd7;
              </DeleteButton>
            )}
            <ImageWrapper 
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              $deleteHovered={id === hoveredId}
            >
              <ProjectImage 
                project={project}
                onLoad={() => setLoading(false)}
                onClick={() => navigate(`/projects/${id}`)}
                style={{
                  height: `${tileSize}px`,
                  width: `${tileSize}px`
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
  position: relative;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  filter: ${({ $deleteHovered }) => $deleteHovered && 'brightness(30%)'};
  &:hover {
    filter: brightness(70%)
  }
`;

const DeleteButton = styled.div`
  height: 12px;
  width: 12px;
  background-color: red;
  position: absolute;
  z-index: 1;
  text-align: center;
  vertical-align: middle;
  font-family: Verdana;
  font-size: 9px;
  color: white;
  &:hover {
    border: 1px solid white;
  }
`;

export default Collage;
