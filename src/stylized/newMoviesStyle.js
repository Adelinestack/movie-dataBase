import styled from 'styled-components';

const NewMovieContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const MovieImg = styled.img`
  width: 100%;
  height: auto;
`;

const MovieDatas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  text-align: center;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  background-color: #263238;
  color: #1de9b6;
  opacity: 0;
  visibility: hidden;
`;

const MovieBlock = styled.div`
  margin-bottom: 30px;
  position: relative;

  &:hover ${MovieDatas} {
    opacity: 1;
    visibility: visible;
  }
`;

export { NewMovieContainer, MovieBlock, MovieImg, MovieDatas };
