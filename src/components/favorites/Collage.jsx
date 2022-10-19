import React, { useEffect, useState } from 'react';

import ProjectImage from '../projectPage/ProjectImage';
import { Loading } from '../styles.js';

const Collage = ({ favorites, tileSize }) => {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (<>
    {loading && <Loading>LOADING...</Loading>}
    {!favorites.length && !loading && (
      <Loading style={{ color: '#e0e0e0', fontFamily: 'Helvetica' }}>
        No favorites added!
      </Loading>
    )}
    <div style={{ marginTop: '20px' }}>
      {favorites.map(project => (
        <ProjectImage 
          key={project._id}
          project={project}
          onLoad={() => setLoading(false)}
          style={{
            height: `${tileSize}px`,
            width: `${tileSize}px`,
            margin: '0 1px 0 1px'
          }}
        />
      ))}
    </div>
  </>);
};

export default Collage;
