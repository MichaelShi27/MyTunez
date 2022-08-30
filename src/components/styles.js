import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.div`
  color: blue;
  margin: 15px;
  font-size: 25px;
  font-family: Verdana, Helvetica, sans-serif;
  cursor: pointer;
`;

export const Button = styled.button`
  margin: 15px;
  font-size: 18px;
  background-color: ${({ $selected }) => $selected && '#cccccc'};
`;

export const StyledLink = styled(Link)`
  color: #001592;
  textDecoration: none;
  &:hover { color: purple };
`;

export const Loading = styled.div`
  margin: 100px 270px;
  color: blue;
  font-size: 30px;
`;

export const colors = {
  rock: 'rgba(255, 255, 49, 1)',
  'hip-hop': 'rgba(71, 250, 86, 1)',
  pop: 'rgba(255, 158, 242, 1)',
  electronic: 'rgba(0, 255, 255, 1)',
  other: 'rgba(255, 151, 0, 1)'
};
