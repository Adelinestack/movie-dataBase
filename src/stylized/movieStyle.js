import styled from 'styled-components';

const MovieContent = styled.section`
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const MovieImg = styled.div`
  flex: 1 1 30%;
  padding-right: 20px;
`;

const MovieDetails = styled.div`
  flex: 1 1 60%;
`;

const Info = styled.span`
  font-weight: 600;
`;
export { MovieContent, MovieImg, MovieDetails, Info };
