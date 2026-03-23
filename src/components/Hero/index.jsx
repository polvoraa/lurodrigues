import LiquidEther from "../LiquidEther";
import { HeroSection, Content, Title, Subtitle } from "./styles";
import BlurText from '../BlurText/BlurText';

const Hero = () => {
  return (
    <HeroSection>
      {/* 🔥 Background */}
      <div style={{ position: "absolute", inset: 0 }}>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>

      {/* 🧠 Conteúdo */}
      <Content>
        <BlurText
          text="Luana Rodrigues"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-4xl font-bold"
          style={{ fontSize: '4rem', fontWeight: 700, color: '#fff' }}
        />
        <Subtitle>Design • Publicidade • Criatividade</Subtitle>
      </Content>
    </HeroSection>
  );
};

export default Hero;