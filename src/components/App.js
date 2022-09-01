// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import AddProjectForm from './AddProjectForm';
import ProjectList from './projectList/ProjectList';
import Message from './Message';
import ArtistList from './artistList/ArtistList';
import ArtistPage from './artistPage/ArtistPage';
import ProjectPage from './projectPage/ProjectPage';
import SearchBar from './searchBar/SearchBar';
import ArtistCheckbox from './searchBar/ArtistCheckbox';
import ErrorPage from './ErrorPage';

import { Header, Button } from './styles.js';
import { wrangleInput, validateInput } from '../helpers.js';

const App = () => {
  const [ projects, setProjects ] = useState([]);
  const [ filteredProjects, setFilteredProjects ] = useState([]);
  const [ projectsAdded, setProjectsAdded ] = useState(0);
  const [ successfulSubmit, setSuccessfulSubmit ] = useState(false);
  const [ displayMessage, setDisplayMessage ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ currentList, setCurrentList ] = useState('projects');
  const [ displayForm, setDisplayForm ] = useState(true);
  const [ displaySearch, setDisplaySearch ] = useState(true);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ includeArtists, setIncludeArtists ] = useState(true);
  const [ displayCheckbox, setDisplayCheckbox ] = useState(true);
  const [ pageNotFound, setPageNotFound ] = useState(false);
  const [ filter, setFilter ] = useState({});

  const { pathname: path } = useLocation();
  const notOnProjectPage = path.indexOf('/projects') !== 0;

  // determines what to render based on current URL
  useEffect(() => {
    setDisplayForm(notOnProjectPage);
    setDisplaySearch(path === '/' || path === '/artists');
    setDisplayCheckbox(path === '/');
    setPageNotFound(false);

    if (path === '/')
      setCurrentList('projects');
    else if (path === '/artists')
      setCurrentList('artists');
    else {
      setCurrentList('');
      if (
        path !== '/projects' &&
        path.indexOf('/projects') !== 0 &&
        path.indexOf('/artists') !== 0
      ) setPageNotFound(true);
    }
  }, [ path, notOnProjectPage ]);

  useEffect(() => {
    if (pageNotFound) {
      setDisplayMessage(false);
      setDisplayForm(false);
    }
  }, [ pageNotFound ]);

  const addProject = e => {
    e.preventDefault();
    setSuccessfulSubmit(false);

    const { title, artist, genre, releaseYear } = e.target;
    const dateAdded = new Date();
    const newProject = { title, artist, genre, releaseYear, dateAdded };
    wrangleInput(newProject);
    newProject.releaseYear = newProject.releaseYear || 0;

    const errMsg = validateInput(newProject);
    setErrorMessage(errMsg);
    if (errMsg) return;

    axios.post('/addProject', newProject)
      .then(({ data }) => {
        if (data === 'success') {
          setSuccessfulSubmit(true);
          setProjectsAdded(projectsAdded + 1);
        }
        data === 'duplicate input' && setErrorMessage('This project has already been entered!');
      })
      .catch(console.log);
  };

  const getProjectsForArtist = useCallback(artist => axios(`/artists/${artist}`), []);

  const getAllProjects = () => {
    axios('/projects')
      .then(({ data }) => {
        setProjects(data);
        setFilteredProjects(data);
      });
  };

  // updates list when a project is added or deleted
  useEffect(getAllProjects, [ projectsAdded, currentList ]);

  useEffect(() => {
    if (filter.type)
      setDisplayForm(false);
    else { // when a filter is cleared
      getAllProjects();
      setDisplayForm(true);
    }
  }, [ filter ]);

  // displays success/error message
  useEffect(() => {
    setDisplayMessage(projectsAdded || errorMessage);
    const timeout = setTimeout(() => {
      setDisplayMessage(false);
      setErrorMessage('');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [ projectsAdded, errorMessage ]);

  // applies genre/decade/year filters if needed
  useEffect(() => {
    if (!filter.type) return;

    const { type, value } = filter;
    let filtered;

    if (type === 'genre') {
      // to-do
    } else {
      const year = Number(value);
      if (type === 'decade')
        filtered = projects.filter(({ releaseYear }) => releaseYear >= year && releaseYear <= year + 9);
      else if (type === 'year')
        filtered = projects.filter(({ releaseYear }) => releaseYear === year);
    }
    setFilteredProjects(filtered);
  }, [ filter, projects ]);

  const navigate = useNavigate();

  return (<>
    <Header onClick={() => navigate('/')}>myTunez</Header>
    {displayMessage && notOnProjectPage && (
      <Message
        message={errorMessage}
        added={successfulSubmit}
        projectsAdded={projectsAdded}
      />
    )}
    {displayForm && <AddProjectForm addProject={addProject} />}
    {!pageNotFound && (<>
      <Link to="/">
        <Button $selected={currentList === 'projects'}>Projects</Button>
      </Link>
      <Link to="/artists">
        <Button $selected={currentList === 'artists'}>Artists</Button>
      </Link>
    </>)}
    <div style={{ display: 'flex' }}>
      {displaySearch && (
        <SearchBar
          list={currentList}
          searchQuery={searchQuery}
          handleChange={e => setSearchQuery(e.target.value)}
        />
      )}
      {displayCheckbox && <ArtistCheckbox {...{ includeArtists, setIncludeArtists }}/>}
    </div>
    <Routes>
      <Route
        path="/"
        element={<ProjectList {...{
          filteredProjects,
          searchQuery,
          setFilter,
          setDisplaySearch,
          includeArtists,
          setDisplayCheckbox,
          filterType: filter.type
        }}/>}
      />
      <Route
        path="/artists"
        element={<ArtistList {...{ filteredProjects, searchQuery }} />}
      />
      <Route
        path="/artists/:name"
        element={<ArtistPage {...{ filteredProjects, getProjectsForArtist, setPageNotFound }} />}
      />
      <Route
        path="/projects/:id"
        element={<ProjectPage {...{ getProjectsForArtist, setPageNotFound }} />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </>);
};

export default App;
