import logo from "./assets/vite.svg";
import Header from "./components/GooeyNav/Header";
import Hero from "./components/Hero";
import ChromaGrid from "./components/ChromaGrid";
import PortifolioSection from "./components/PortfolioSection/PortfolioSection";
import Lanyard from "./components/Lanyard/Lanyard";
import AboutSection from "./components/AboutSection/AboutSection";



import Photo1 from "./assets/photo1.png";
import Photo2 from "./assets/photo2.jpeg";
import Photo3 from "./assets/photo3.jpeg";



const items = [
  {
    image: Photo1,
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarah",
    borderColor: "#7057dc",
    gradient: "linear-gradient(145deg, #7057dc, #000)"
  },

  {
    image: Photo2,
    title: "Luana Rodrigues",
    subtitle: "Publicitária (a melhor)",
    handle: "@Four_Luna4",
    borderColor: "#7057dc",
    gradient: "linear-gradient(145deg, #7057dc, #000)"
  },

  {
    image: Photo3,
    title: "Outro Projeto",
    subtitle: "Design / Dev",
    handle: "@polvora",
    borderColor: "#7057dc",
    gradient: "linear-gradient(145deg, #7057dc, #000)"
  }
];

function App() {
  return (
    <>
      <Header />
      <Hero id="hero"/>

      {/* GRID de cards */}
      <div style={{ minHeight: "100vh", background: "#050505", padding: "4rem 2rem" }}>
        <ChromaGrid items={items} />
      </div>
      <AboutSection id="sobre"/>

      <PortifolioSection />

    </>
  );
}

export default App;