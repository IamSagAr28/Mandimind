import { MARKET_TICKER } from '../data/mandiData';
import { TrendingUp, TrendingDown, BarChart2, Activity } from 'lucide-react';

const CROPS_DETAIL = [
    { name: 'Tomato', emoji: '🍅', region: 'South India', price: 2200, prev: 2035, trend: [1800, 1900, 2000, 1950, 2080, 2150, 2200], hot: true },
    { name: 'Onion', emoji: '🧅', region: 'Maharashtra', price: 2350, prev: 2080, trend: [1900, 2000, 2100, 2200, 2280, 2300, 2350], hot: true },
    { name: 'Potato', emoji: '🥔', region: 'North India', price: 900, prev: 930, trend: [1000, 970, 960, 940, 920, 910, 900], hot: false },
    { name: 'Rice', emoji: '🌾', region: 'Punjab', price: 2100, prev: 2050, trend: [1950, 1980, 2010, 2050, 2070, 2090, 2100], hot: false },
    { name: 'Wheat', emoji: '🌾', region: 'Haryana', price: 1870, prev: 1835, trend: [1750, 1780, 1800, 1820, 1840, 1855, 1870], hot: false },
    { name: 'Cotton', emoji: '🌿', region: 'Telangana', price: 5800, prev: 5550, trend: [5200, 5300, 5450, 5550, 5650, 5720, 5800], hot: true },
];

function SparkLine({ data, up }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const H = 30, W = 80;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * H * 0.85 - H * 0.05}`).join(' ');
    return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 80, height: 30 }}>
            <polyline points={pts} fill="none" stroke={up ? '#16a34a' : '#dc2626'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function MarketPulse() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    return (
        <section
            id="market-pulse"
            style={{
                padding: '100px 24px',
                background: '#0F2A1D',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Dark ambient blobs */}
            <div className="blob" style={{ width: 500, height: 500, background: 'rgba(5,150,105,0.12)', top: -150, right: -100 }} />
            <div className="blob" style={{ width: 350, height: 350, background: 'rgba(52,211,153,0.06)', bottom: -100, left: -50, animationDelay: '3s' }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '52px' }}>
                    <div>
                        <div className="section-label animate-fade-in-up" style={{ marginBottom: '12px', background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(52,211,153,0.25)', color: '#34D399' }}>
                            <Activity size={14} />
                            Live Market Pulse
                        </div>
                        <h2
                            className="animate-fade-in-up delay-100"
                            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}
                        >
                            Real-Time Mandi
                            <span style={{ display: 'block' }}>
                                <span className="gradient-text">Price Dashboard</span>
                            </span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
                            Updated at {timeStr} · Data from Agmarknet & eNAM
                        </p>
                    </div>
                    <div style={{
                        display: 'flex', gap: '12px', flexWrap: 'wrap',
                    }}>
                        {[
                            { label: 'Total Crops Tracked', value: '48' },
                            { label: 'Mandis Live', value: '853' },
                        ].map(s => (
                            <div key={s.label} style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 'var(--radius-md)',
                                padding: '12px 20px',
                                textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{s.value}</div>
                                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mandi market image banner */}
                <div className="animate-scale-in" style={{
                    borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                    height: '220px', position: 'relative', marginBottom: '40px',
                    boxShadow: '0 0 40px rgba(5,150,105,0.2)',
                }}>
                    <img src="/mandi_market.png" alt="Live Mandi Market" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,42,20,0.85) 0%, rgba(5,42,20,0.4) 50%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '36px' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>🏪 Live Mandi Feed</div>
                            <div style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>853 mandis tracked<br /><span className="gradient-text">across India</span></div>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '8px' }}>Agmarknet · eNAM · State APMC boards</p>
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                            <img src="/fresh_produce.png" alt="Fresh produce" style={{ width: 120, height: 120, borderRadius: 'var(--radius-lg)', objectFit: 'cover', border: '2px solid rgba(52,211,153,0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.4)' }} />
                        </div>
                    </div>
                </div>

                {/* Crop Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                    {CROPS_DETAIL.map((crop, i) => {
                        const up = crop.price > crop.prev;
                        const pct = (((crop.price - crop.prev) / crop.prev) * 100).toFixed(1);
                        return (
                            <div
                                key={crop.name}
                                className="card-hover animate-fade-in-up"
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '20px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(52,211,153,0.2)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            >
                                {crop.hot && (
                                    <div style={{
                                        position: 'absolute', top: 14, right: 14,
                                        background: 'rgba(239,68,68,0.15)',
                                        border: '1px solid rgba(239,68,68,0.3)',
                                        borderRadius: 'var(--radius-full)',
                                        padding: '2px 8px',
                                        fontSize: '0.65rem',
                                        fontWeight: 700,
                                        color: '#fca5a5',
                                    }}>🔥 HOT</div>
                                )}

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>{crop.emoji}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'white' }}>{crop.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{crop.region}</div>
                                        </div>
                                    </div>
                                    <SparkLine data={crop.trend} up={up} />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white' }}>
                                            ₹{crop.price.toLocaleString('en-IN')}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>per quintal</div>
                                    </div>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                        background: up ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)',
                                        border: `1px solid ${up ? 'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.3)'}`,
                                        borderRadius: 'var(--radius-full)',
                                        padding: '4px 10px',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                        color: up ? '#4ade80' : '#f87171',
                                    }}>
                                        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {up ? '+' : ''}{pct}%
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Ticker - alternative view */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        borderRight: '1px solid rgba(255,255,255,0.1)',
                        paddingRight: '16px',
                        flexShrink: 0,
                    }}>
                        <BarChart2 size={16} color="var(--accent)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>More</span>
                    </div>
                    <div style={{ overflow: 'hidden', flex: 1 }}>
                        <div className="ticker-inner">
                            {[...MARKET_TICKER, ...MARKET_TICKER].map((item, i) => (
                                <span key={i} style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '0 24px',
                                    fontSize: '0.8rem',
                                    color: 'rgba(255,255,255,0.5)',
                                    borderRight: '1px solid rgba(255,255,255,0.08)',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>{item.crop}</span>
                                    <span>{item.location}</span>
                                    <span style={{ fontWeight: 700, color: 'white' }}>{item.price}</span>
                                    <span style={{ color: item.up ? '#4ade80' : '#f87171', fontWeight: 700 }}>{item.change}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
