import styled from 'styled-components';
import Masonry from '../Mansory/Mansory';

// ── Substitua pelos seus projetos reais ──────────────────────────────────────
const portfolioItems = [
  {
    id: '1',
    img: 'https://picsum.photos/id/1015/600/900',
    url: 'https://example.com/projeto-1',
    height: 400,
  },
  {
    id: '2',
    img: 'https://picsum.photos/id/1011/600/750',
    url: 'https://example.com/projeto-2',
    height: 300,
  },
  {
    id: '3',
    img: 'https://picsum.photos/id/1020/600/800',
    url: 'https://example.com/projeto-3',
    height: 500,
  },
  {
    id: '4',
    img: 'https://picsum.photos/id/1035/600/700',
    url: 'https://example.com/projeto-4',
    height: 350,
  },
  {
    id: '5',
    img: 'https://picsum.photos/id/1043/600/850',
    url: 'https://example.com/projeto-5',
    height: 450,
  },
  {
    id: '6',
    img: 'https://picsum.photos/id/1060/600/760',
    url: 'https://example.com/projeto-6',
    height: 280,
  },
];

// ── Styled components ────────────────────────────────────────────────────────
const Section = styled.section`
  width: 100%;
  background: #0a0a0a;
  padding: 5rem 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin: 0;
`;

/*
  O MasonryWrapper precisa de altura fixa ou mínima para o layout
  funcionar — o Masonry usa position: absolute internamente.
  Ajuste o minHeight conforme a quantidade de itens do seu portfólio.
*/
const MasonryWrapper = styled.div`
  width: 100%;
  min-height: 1200px;
`;

// ── Componente ───────────────────────────────────────────────────────────────
const PortfolioSection = () => {
  return (
    <Section id="portfolio">
      <SectionHeader>
        <SectionTitle>Portfólio</SectionTitle>
        <SectionSubtitle>Alguns dos meus trabalhos</SectionSubtitle>
      </SectionHeader>

      <MasonryWrapper>
        <Masonry
          items={portfolioItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
        />
      </MasonryWrapper>
    </Section>
  );
};

export default PortfolioSection;