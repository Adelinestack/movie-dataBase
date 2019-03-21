import styled from 'styled-components';

const HeaderLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const Circle = styled.i`
  font-size: 25px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #000;
  border: none;
  color: #fff;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export { HeaderLink, Circle, Button };
