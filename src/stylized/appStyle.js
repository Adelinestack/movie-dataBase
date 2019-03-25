import styled from 'styled-components';

const Main = styled.main`
  position: relative;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const PagesContainer = styled.div`
  position: absolute;

  &.page-enter,
  &.page-appear {
    transform: translateX(100vw);
  }

  &.page-enter-active,
  &.page-appear-active {
    transform: translateX(0vw);
    transition: all 400ms ease;
  }

  &.page-exit {
    transform: translateX(0vw);
  }

  &.page-exit-active {
    transform: translateX(-100vw);
    transition: all 400ms ease;
  }
`;

export { Container, PagesContainer, Main };
