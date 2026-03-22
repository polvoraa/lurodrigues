import logo from "./assets/vite.svg";
import Hero from "./components/Hero";
import ChromaGrid from "./components/ChromaGrid";
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
      <Hero />

      {/* GRID de cards */}
      <div style={{ minHeight: "100vh", background: "#050505", padding: "4rem 2rem" }}>
        <ChromaGrid items={items} />
      </div>
    </>
  );
}

export default App;