import styled from 'styled-components';

const CastContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
  margin-top: 20px;
`;

const CastBlock = styled.div`
  width: 31.5%;
  margin: 0 10px 20px 0;
`;

const CastPhoto = styled.img`
  width: 100%;
  height: auto;
`;

export { CastContainer, CastBlock, CastPhoto };
