import LiquidEther from "../LiquidEther";
import { HeroSection, Content, Title, Subtitle } from "./styles";

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
        <Title>Luana Rodrigues</Title>
        <Subtitle>Design • Publicidade • Criatividade</Subtitle>
      </Content>
    </HeroSection>
  );
};

export default Hero;