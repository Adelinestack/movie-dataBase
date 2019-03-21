import styled from 'styled-components';

const SearchbarContainer = styled.div`
  padding-top: 25px;
  text-align: center;
  position: relative;

  a {
    color: #fff;
    display: flex;
    padding: 20px;
  }
`;

const Searchbar = styled.input`
  width: 100%;
  padding: 20px 0 20px 40px;
  border: 1px solid #bdbdbd;
  color: #000;
  outline: none;
  position: relative;
`;

const SearchLogo = styled.i`
  position: absolute;
  z-index: 10;
  margin: 20px 0 0 10px;
`;

const SearchResults = styled.div`
  position: absolute;
  z-index: 20;
  width: 100%;
  text-align: left;
  background-color: #263238;
  color: #fff;
`;

const ImgResult = styled.img`
  width: 100px;
  margin-right: 20px;
  align-self: center;
`;

export { SearchbarContainer, Searchbar, SearchLogo, SearchResults, ImgResult };
