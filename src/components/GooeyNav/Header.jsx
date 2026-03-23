import GooeyNav from './GooeyNav.jsx';

const navItems = [
  { label: 'Home',      href: '#hero' },
  { label: 'Sobre',     href: '#sobre' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contato',   href: '#contato' },
];

export default function Header() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: '#111',
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <GooeyNav
        items={navItems}
        initialActiveIndex={0}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />
    </header>
  );
}