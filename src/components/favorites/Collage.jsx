import React, { useState } from 'react';

import ProjectImage from '../projectPage/ProjectImage';
import { Loading } from '../styles.js';

const Collage = ({ favorites }) => {
  const [ loading, setLoading ] = useState(true);

  return (<>
    {!favorites.length && (
      <Loading style={{ color: '#e0e0e0', fontFamily: 'Helvetica' }}>
        No favorites added!
      </Loading>
    )}
    {favorites.length > 0 && loading && <Loading>LOADING...</Loading>}
    <div style={{ marginTop: '20px' }}>
      {favorites.map(project => (
        <ProjectImage 
          key={project.id}
          project={project}
          onLoad={() => setLoading(false)}
          style={{
            width: '62px',
            height: '62px',
            margin: '0 1px 0 1px'
          }}
        />
      ))}
    </div>
  </>);
};

export default Collage;
