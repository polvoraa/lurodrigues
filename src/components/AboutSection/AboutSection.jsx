import styled from 'styled-components';
import Lanyard from '../Lanyard/Lanyard';
import BlurText from '../BlurText/BlurText';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

// ── Layout ────────────────────────────────────────────────────────────────────

const Section = styled.section`
  width: 100%;
  min-height: 100vh;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Lado esquerdo — crachá 3D */
const LanyardSide = styled.div`
  flex: 1;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 60vh;
  }
`;

/* Lado direito — texto */
const TextSide = styled.div`
  flex: 1;
  padding: 4rem 5rem 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 3rem;
    align-items: center;
    text-align: center;
  }
`;

const TagLine = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #7c5cfc;
`;

// ── Componente ────────────────────────────────────────────────────────────────

const AboutSection = () => {
  return (
    <Section id="sobre">

      {/* ── Crachá 3D ── */}
      <LanyardSide>
        <Lanyard
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          fov={20}
          transparent
        />
      </LanyardSide>

      {/* ── Texto ── */}
      <TextSide>
        <TagLine>Sobre mim</TagLine>

        <BlurText
          text="Design que conta histórias."
          delay={120}
          animateBy="words"
          direction="top"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.2,
            margin: 0,
          }}
        />

        <ScrollReveal
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={4}
          wordAnimationEnd="bottom 70%"
        >
          Sou designer e publicitária apaixonada por criar experiências visuais que
          conectam marcas às pessoas. Cada projeto começa com uma escuta cuidadosa
          e termina com algo que você não consegue parar de olhar.
        </ScrollReveal>
      </TextSide>

    </Section>
  );
};

export default AboutSection;