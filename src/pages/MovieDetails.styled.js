import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
`;
export const FullWidthStripe = styled.div`
  width: 100%;
  height: 1px;
  background-color: lightgray;
  margin-bottom: 20px;
  margin-top: 12px;
`;
export const DescrWrap = styled.div`
  padding-top: 40px;
  margin-left: 25px;
`;

export const GenresWrap = styled.div`
  display: flex;
  gap: 10px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const Overview = styled.h2`
  margin-bottom: 20px;
`;

export const Text = styled.p`
  margin-bottom: 20px;
`;

export const Genres = styled.h3`
  margin-bottom: 20px;
`;

export const InfoWrap = styled.div`
  margin-left: 20px;
`;

export const StyledBackLink = styled(Link)`
  display: block;
  color: black;
  margin-top: 10px;
  width: 65px;
  border: 1px solid black;
  border-radius: 2px;
  padding: 2px;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
`;
