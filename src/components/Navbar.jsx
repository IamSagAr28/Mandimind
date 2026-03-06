import { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, Leaf } from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', href: '#hero' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Price Predictor', href: '#predictor' },
    { label: 'Market Pulse', href: '#market-pulse' },
    { label: 'Impact', href: '#impact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            id="navbar"
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 100,
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                background: scrolled
                    ? 'rgba(7, 24, 17, 0.92)'
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(24px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(52,211,153,0.12)' : 'none',
            }}
        >
            <div style={{
                maxWidth: '1200px', margin: '0 auto', padding: '0 28px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                height: '72px',
            }}>
                {/* Logo */}
                <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{
                        width: 40, height: 40,
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        borderRadius: '11px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(5,150,105,0.4)',
                    }}>
                        <Leaf size={20} color="white" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'white', letterSpacing: '-0.025em' }}>
                        Mandi<span style={{ color: 'var(--accent)' }}>Mind</span>
                    </span>
                </a>

                {/* Desktop links */}
                <ul style={{ display: 'flex', listStyle: 'none', gap: '2px', alignItems: 'center' }} className="nav-desktop">
                    {NAV_LINKS.map(link => (
                        <li key={link.label}>
                            <a href={link.href} className="nav-link" style={{
                                padding: '8px 16px',
                                color: 'rgba(255,255,255,0.8)',
                                textDecoration: 'none',
                                fontSize: '0.88rem',
                                fontWeight: 500,
                                borderRadius: 'var(--radius-full)',
                                transition: 'all var(--transition-fast)',
                                display: 'block',
                            }}
                                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.color = 'white'; }}
                                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'rgba(255,255,255,0.8)'; }}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <a href="#predictor" className="btn-primary nav-desktop" id="nav-cta" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>
                        <TrendingUp size={15} />
                        <span>Check Prices</span>
                    </a>
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setOpen(!open)}
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            padding: '8px',
                            color: 'white',
                            display: 'none',
                        }}
                        className="nav-mobile-btn"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div style={{
                    background: 'rgba(7,24,17,0.97)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(52,211,153,0.1)',
                    padding: '16px 24px 24px',
                }}>
                    {NAV_LINKS.map(link => (
                        <a key={link.label} href={link.href} onClick={() => setOpen(false)} style={{
                            display: 'block', padding: '13px 16px',
                            color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                            fontSize: '1rem', fontWeight: 500,
                            borderRadius: 'var(--radius-md)', marginBottom: '4px',
                        }}>
                            {link.label}
                        </a>
                    ))}
                    <a href="#predictor" className="btn-primary" style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}>
                        <TrendingUp size={16} /><span>Check Prices</span>
                    </a>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn { display: none !important; }
        }
      `}</style>
        </nav>
    );
}
