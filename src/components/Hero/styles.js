import styled from "styled-components";

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #050505;
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #aaa;
`;