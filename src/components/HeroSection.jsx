import { Suspense } from 'react';
import { TrendingUp, MapPin, ArrowRight, Bot, ChevronDown } from 'lucide-react';
import { MARKET_TICKER } from '../data/mandiData';
import Globe3D from './Globe3D';

export default function HeroSection() {
    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                /* NO paddingTop — navbar is transparent and merged */
            }}
        >
            {/* ── Full background image ── */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
            }}>
                <img
                    src="/hero_bg.png"
                    alt="Indian agricultural farmland"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
                {/* Multi-layer dark overlay for readability */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(4,16,10,0.92) 0%, rgba(5,42,20,0.82) 40%, rgba(4,16,10,0.65) 80%, rgba(0,0,0,0.55) 100%)',
                }} />
                {/* Bottom fade into next section */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(240,253,244,1) 100%)',
                }} />
            </div>

            {/* ── Ticker Tape ── */}
            <div style={{
                position: 'absolute', top: 72, left: 0, right: 0, zIndex: 10,
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(52,211,153,0.15)',
                padding: '7px 0',
            }}>
                <div className="ticker-inner">
                    {[...MARKET_TICKER, ...MARKET_TICKER].map((item, i) => (
                        <span key={i} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '0 28px', fontSize: '0.75rem', fontWeight: 600,
                            color: 'rgba(255,255,255,0.65)',
                            borderRight: '1px solid rgba(255,255,255,0.08)', whiteSpace: 'nowrap',
                        }}>
                            <span style={{ color: 'white', fontWeight: 700 }}>{item.crop}</span>
                            <span>{item.location}</span>
                            <span style={{ color: 'white', fontWeight: 700 }}>{item.price}</span>
                            <span style={{ color: item.up ? '#4ade80' : '#f87171', fontWeight: 700 }}>{item.change}</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Main content ── */}
            <div style={{
                flex: 1,
                width: '100%',
                padding: '0 5vw',
                display: 'grid',
                gridTemplateColumns: '52% 48%',
                gap: '0',
                alignItems: 'center',
                position: 'relative', zIndex: 5,
                paddingTop: '155px',
                paddingBottom: '100px',
                boxSizing: 'border-box',
            }} className="hero-main-grid">

                {/* ── LEFT: Text Content ── */}
                <div>
                    {/* Badge */}
                    <div className="animate-fade-in-up" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(52,211,153,0.12)',
                        border: '1px solid rgba(52,211,153,0.3)',
                        borderRadius: 'var(--radius-full)',
                        padding: '6px 16px',
                        fontSize: '0.75rem', fontWeight: 700,
                        color: 'var(--accent)',
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        marginBottom: '28px',
                    }}>
                        <TrendingUp size={13} />
                        AI-Powered Price Intelligence
                    </div>

                    {/* Headline */}
                    <h1 className="animate-fade-in-up delay-100" style={{
                        fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        color: 'white',
                        marginBottom: '24px',
                    }}>
                        Google Maps for
                        <span style={{ display: 'block' }}>
                            <span className="gradient-text">Crop Selling</span>
                        </span>
                        Decisions
                    </h1>

                    <p className="animate-fade-in-up delay-200" style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.75,
                        marginBottom: '40px',
                        maxWidth: '480px',
                    }}>
                        Stop guessing. MandiMind predicts mandi prices using ML, recommends the{' '}
                        <strong style={{ color: 'var(--accent)' }}>best mandi</strong> and{' '}
                        <strong style={{ color: 'var(--accent)' }}>optimal selling time</strong>
                        —so you maximize profit every harvest.
                    </p>

                    {/* CTAs */}
                    <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
                        <a href="#predictor" className="btn-primary" id="hero-cta-primary" style={{ fontSize: '0.95rem', padding: '14px 30px' }}>
                            <TrendingUp size={18} />
                            <span>Predict My Price</span>
                            <ArrowRight size={16} />
                        </a>
                        <a href="#how-it-works" id="hero-cta-secondary" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '13px 28px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 'var(--radius-full)',
                            color: 'white', textDecoration: 'none',
                            fontWeight: 600, fontSize: '0.95rem',
                            backdropFilter: 'blur(10px)',
                            transition: 'all var(--transition-base)',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                        >
                            How it Works
                        </a>
                    </div>

                    {/* Farmer avatars + Social proof */}
                    <div className="animate-fade-in-up delay-400" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex' }}>
                            {['/farmer_ramesh.png', '/farmer_sarita.png', '/farmer_harjeet.png'].map((src, i) => (
                                <img key={src} src={src} alt="farmer" style={{
                                    width: 44, height: 44, borderRadius: '50%',
                                    border: '2px solid rgba(52,211,153,0.5)',
                                    objectFit: 'cover',
                                    marginLeft: i === 0 ? 0 : -12,
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                                }} />
                            ))}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>2.4L+ farmers trust MandiMind</div>
                            <div style={{ display: 'flex', gap: '2px', marginTop: '3px', alignItems: 'center' }}>
                                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#fbbf24', fontSize: '0.85rem' }}>★</span>)}
                                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginLeft: '6px' }}>4.9 / 5 rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Mini stats */}
                    <div className="animate-fade-in-up delay-500" style={{ display: 'flex', gap: '32px' }}>
                        {[{ value: '78%', label: 'Accuracy' }, { value: '850+', label: 'Mandis' }, { value: '23%', label: 'Avg. Gain' }].map(s => (
                            <div key={s.label}>
                                <div style={{ fontSize: '1.7rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{s.value}</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: 3D Globe + Floating Cards ── */}
                <div style={{ position: 'relative', height: '560px', marginRight: '-3vw' }} className="hero-right">

                    {/* 3D Globe Canvas */}
                    <Suspense fallback={<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Loading 3D…</div>}>
                        <Globe3D />
                    </Suspense>

                    {/* Floating card — AI insight */}
                    <div className="animate-fade-in-left delay-300" style={{
                        position: 'absolute', bottom: 80, left: 0, zIndex: 10,
                        background: 'rgba(5,42,20,0.82)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(52,211,153,0.25)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '14px 18px',
                        minWidth: '220px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        animation: 'float 4s ease-in-out infinite',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Bot size={16} color="var(--accent)" />
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Recommendation</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                            🍅 <strong>Tomato</strong> — Wait 3 days<br />
                            Sell at <strong style={{ color: 'var(--accent)' }}>Bangalore APMC</strong><br />
                            <span style={{ color: '#4ade80', fontWeight: 700 }}>+₹250/quintal gain</span>
                        </div>
                    </div>

                    {/* Floating card — live price */}
                    <div className="animate-fade-in-right delay-400" style={{
                        position: 'absolute', top: 60, right: 0, zIndex: 10,
                        background: 'rgba(5,42,20,0.82)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(52,211,153,0.25)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '14px 18px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        animation: 'float 5s ease-in-out infinite 1s',
                    }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>LIVE PRICES</div>
                        {[
                            { crop: '🍅 Tomato', price: '₹2,200', up: true },
                            { crop: '🧅 Onion', price: '₹2,350', up: true },
                            { crop: '🥔 Potato', price: '₹900', up: false },
                        ].map(item => (
                            <div key={item.crop} style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>{item.crop}</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: item.up ? '#4ade80' : '#f87171' }}>{item.price}</span>
                            </div>
                        ))}
                    </div>

                    {/* Floating card — mandi count */}
                    <div style={{
                        position: 'absolute', top: '50%', right: 10, zIndex: 10,
                        background: 'linear-gradient(135deg, rgba(5,150,105,0.85), rgba(16,185,129,0.85))',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(52,211,153,0.35)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '12px 16px',
                        boxShadow: '0 0 30px rgba(5,150,105,0.35)',
                        animation: 'float 6s ease-in-out infinite 2s',
                        transform: 'translateY(-50%)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MapPin size={16} color="white" />
                            <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>853</div>
                                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Mandis Live</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <div style={{
                position: 'absolute', bottom: 140, left: '50%', transform: 'translateX(-50%)',
                zIndex: 10, textAlign: 'center',
                animation: 'float 2s ease-in-out infinite',
            }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</div>
                <ChevronDown size={20} color="rgba(255,255,255,0.3)" />
            </div>

            <style>{`
        @media (max-width: 900px) {
          .hero-main-grid { grid-template-columns: 1fr !important; padding: 120px 6vw 80px !important; gap: 0 !important; }
          .hero-right { height: 380px !important; margin-right: 0 !important; }
        }
        @media (max-width: 600px) {
          .hero-right { display: none !important; }
        }
      `}</style>
        </section>
    );
}
