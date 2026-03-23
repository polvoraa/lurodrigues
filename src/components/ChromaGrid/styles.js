import styled from "styled-components";

export const Grid = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), 320px);
  justify-content: center;
  gap: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 1124px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 320px));
    gap: 0.5rem;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 320px;
    gap: 0.75rem;
    padding: 1rem;
  }
`;

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #333;
  background: var(--card-gradient);

  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(255, 255, 255, 0.3);

  &:hover {
    border-color: var(--card-border);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      var(--spotlight-color),
      transparent 70%
    );
    opacity: 0;
    transition: 0.5s;
    z-index: 2;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  padding: 10px;
  min-height: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

export const Info = styled.footer`
  flex-shrink: 0;
  padding: 0.75rem 1rem;
  color: #fff;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.25rem 0.75rem;

  .role,
  .handle {
    color: #aaa;
  }
`;

/*
  Overlay e Fade ficam dentro do Wrapper (position: relative),
  então inset: 0 os faz cobrir exatamente o mesmo espaço que o Grid.
  --x e --y são setados no Wrapper pelo gsap, então o radial-gradient
  acompanha o cursor corretamente sobre todos os cards.
*/
export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  backdrop-filter: grayscale(1) brightness(0.78);

  mask-image: radial-gradient(
    circle var(--r, 300px) at var(--x, 50%) var(--y, 50%),
    transparent 0%,
    white 100%
  );
`;

export const Fade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  backdrop-filter: grayscale(1) brightness(0.78);

  opacity: 1;
  transition: opacity 0.25s ease;
`;