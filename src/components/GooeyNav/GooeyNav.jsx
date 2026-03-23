import { useRef, useEffect, useState } from 'react';

const GOOEY_STYLES = `
  .gooey-nav-container {
    position: relative;
  }
  .gooey-nav-container nav {
    display: flex;
    position: relative;
    transform: translate3d(0, 0, 0.01px);
  }
  .gooey-nav-container nav ul {
    display: flex;
    gap: 2em;
    list-style: none;
    padding: 0 1em;
    margin: 0;
    position: relative;
    z-index: 3;
    color: white;
    text-shadow: 0 1px 1px hsl(205deg 30% 10% / 0.2);
  }
  .gooey-nav-container nav ul li {
    border-radius: 100vw;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 0.5px 1.5px transparent;
    color: white;
  }
  .gooey-nav-container nav ul li a {
    display: inline-block;
    padding: 0.6em 1em;
    color: inherit;
    text-decoration: none;
  }
  .gooey-nav-container nav ul li::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background: white;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
    z-index: -1;
  }
  .gooey-nav-container nav ul li.active {
    color: black;
    text-shadow: none;
  }
  .gooey-nav-container nav ul li.active::after {
    opacity: 1;
    transform: scale(1);
  }
  .gooey-nav-container .effect {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 1;
    pointer-events: none;
    display: grid;
    place-items: center;
    z-index: 1;
  }
  .gooey-nav-container .effect.text {
    color: white;
    transition: color 0.3s ease;
    z-index: 4;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
  }
  .gooey-nav-container .effect.text.active {
    color: black;
  }
  .gooey-nav-container .effect.filter {
    filter: blur(7px) contrast(100) blur(0);
    mix-blend-mode: lighten;
  }
  .gooey-nav-container .effect.filter::before {
    content: '';
    position: absolute;
    inset: -75px;
    z-index: -2;
    background: black;
  }
  .gooey-nav-container .effect.filter::after {
    content: '';
    position: absolute;
    inset: 0;
    background: white;
    transform: scale(0);
    opacity: 0;
    z-index: -1;
    border-radius: 100vw;
  }
  .gooey-nav-container .effect.active::after {
    animation: gooey-pill 0.3s ease both;
  }
  @keyframes gooey-pill {
    to { transform: scale(1); opacity: 1; }
  }
  .gooey-particle,
  .gooey-point {
    display: block;
    opacity: 0;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    transform-origin: center;
  }
  .gooey-particle {
    --time: 5s;
    position: absolute;
    top: calc(50% - 8px);
    left: calc(50% - 8px);
    animation: gooey-particle-anim calc(var(--time)) ease 1 -350ms;
  }
  .gooey-point {
    background: var(--color);
    opacity: 1;
    animation: gooey-point-anim calc(var(--time)) ease 1 -350ms;
  }
  @keyframes gooey-particle-anim {
    0% {
      transform: rotate(0deg) translate(var(--start-x), var(--start-y));
      opacity: 1;
      animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
    }
    70% {
      transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
      opacity: 1;
      animation-timing-function: ease;
    }
    85% {
      transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y));
      opacity: 1;
    }
    100% {
      transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
      opacity: 1;
    }
  }
  @keyframes gooey-point-anim {
    0%   { transform: scale(0); opacity: 0; animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
    25%  { transform: scale(calc(var(--scale) * 0.25)); }
    38%  { opacity: 1; }
    65%  { transform: scale(var(--scale)); opacity: 1; animation-timing-function: ease; }
    85%  { transform: scale(var(--scale)); opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
  }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  const style = document.createElement('style');
  style.textContent = GOOEY_STYLES;
  document.head.appendChild(style);
  stylesInjected = true;
}

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  colorMap = {
    1: '#ffffff',
    2: '#FF9FFC',
    3: '#B19EEF',
    4: '#7057dc',
  },
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  useEffect(() => {
    injectStyles();
  }, []);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');

        particle.classList.add('gooey-particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', colorMap[p.color] ?? 'white');
        particle.style.setProperty('--rotate', `${p.rotate}deg`);

        point.classList.add('gooey-point');
        particle.appendChild(point);
        element.appendChild(particle);

        requestAnimationFrame(() => {
          element.classList.add('active');
        });

        setTimeout(() => {
          try { element.removeChild(particle); } catch { /* ignorar */ }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  // Faz scroll suave até a section com o id correspondente ao href do item
  const scrollToSection = (href) => {
    if (!href || href === '#') return;
    const id = href.startsWith('#') ? href.slice(1) : href;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    const liEl = e.currentTarget;

    // Dispara o scroll independente de ser o item já ativo
    scrollToSection(items[index].href);

    if (activeIndex === index) return;

    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      filterRef.current.querySelectorAll('.gooey-particle').forEach((p) => {
        try { filterRef.current.removeChild(p); } catch { /* ignorar */ }
      });
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) handleClick({ currentTarget: liEl, preventDefault: () => {} }, index);
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
      if (currentActiveLi) updateEffectPosition(currentActiveLi);
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={(e) => handleClick(e, index)}
            >
              <a
                href={item.href}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default GooeyNav;