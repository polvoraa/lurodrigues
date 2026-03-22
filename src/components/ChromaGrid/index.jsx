import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Grid, Card, ImageWrapper, Info, Overlay, Fade } from "./styles";

const ChromaGrid = ({
  items,
  radius = 300,
  columns = 3,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out"
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current(pos.current.x);
        setY.current(pos.current.y);
      }
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25 });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut
    });
  };

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <Grid
      ref={rootRef}
      style={{
        "--r": `${radius}px`,
        "--cols": columns
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((c, i) => (
        <Card
          key={i}
          onMouseMove={handleCardMove}
          style={{
            "--card-border": c.borderColor,
            "--card-gradient": c.gradient
          }}
        >
          <ImageWrapper>
            <img src={c.image} alt={c.title} />
          </ImageWrapper>

          <Info>
            <h3>{c.title}</h3>
            <span className="handle">{c.handle}</span>
            <p className="role">{c.subtitle}</p>
          </Info>
        </Card>
      ))}

      <Overlay />
      <Fade ref={fadeRef} />
    </Grid>
  );
};

export default ChromaGrid;