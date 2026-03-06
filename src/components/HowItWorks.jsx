import { Database, Brain, Zap, Smartphone, ArrowDown } from 'lucide-react';

const STEPS = [
    {
        id: '01',
        icon: <Database size={28} />,
        title: 'Data Collection',
        subtitle: 'Real-time Market Feeds',
        desc: 'We aggregate live mandi prices from Agmarknet & eNAM, weather data, transport costs, seasonal demand cycles, and export market signals.',
        tags: ['Agmarknet API', 'eNAM', 'Weather API', 'IMD'],
        color: '#3b82f6',
        bg: '#dbeafe',
        img: '/mandi_market.png',
    },
    {
        id: '02',
        icon: <Brain size={28} />,
        title: 'ML Processing',
        subtitle: 'ARIMA + LSTM Models',
        desc: 'Our ensemble ML pipeline runs ARIMA for trend detection, LSTM for deep time-series forecasting, and regression for net profit prediction per mandi.',
        tags: ['ARIMA', 'LSTM', 'Prophet', 'XGBoost'],
        color: '#8b5cf6',
        bg: '#ede9fe',
        img: '/ai_dashboard.png',
    },
    {
        id: '03',
        icon: <Zap size={28} />,
        title: 'Decision Engine',
        subtitle: 'Smart Recommendations',
        desc: 'The decision layer weighs predicted prices, transport costs, perishability window, and risk factors to generate a single, actionable recommendation.',
        tags: ['Price Forecast', 'Transport Delta', 'Risk Score'],
        color: 'var(--primary)',
        bg: 'var(--muted)',
        img: '/farmland_aerial.png',
    },
    {
        id: '04',
        icon: <Smartphone size={28} />,
        title: 'Farmer Interface',
        subtitle: 'Web + WhatsApp + SMS',
        desc: 'Insights are delivered instantly via mobile web, WhatsApp alerts, and SMS in Kannada, Hindi, Marathi & more—zero smartphone dependency required.',
        tags: ['WhatsApp Alerts', 'SMS', 'Kannada / Hindi', 'Offline Mode'],
        color: '#059669',
        bg: '#dcfce7',
        img: '/hero_farmer.png',
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" style={{ padding: '100px 24px', background: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
                backgroundSize: '32px 32px',
            }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                    <div className="section-label animate-fade-in-up" style={{ marginBottom: '16px', display: 'inline-flex' }}>
                        How MandiMind Works
                    </div>
                    <h2 className="animate-fade-in-up delay-100" style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--foreground)',
                        letterSpacing: '-0.02em', marginBottom: '16px',
                    }}>
                        From Raw Data to
                        <span className="gradient-text"> Perfect Decision</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>
                        A four-stage AI pipeline that transforms noisy market signals into clear profit-maximizing advice for every farmer.
                    </p>
                </div>

                {/* Steps Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {STEPS.map((step, i) => (
                        <div key={step.id}>
                            <div
                                className="step-row card-hover animate-fade-in-up"
                                style={{
                                    animationDelay: `${i * 0.15}s`,
                                    display: 'grid',
                                    gridTemplateColumns: i % 2 === 0 ? '1fr 72px 1fr' : '1fr 72px 1fr',
                                    gap: '24px',
                                    alignItems: 'center',
                                }}
                            >
                                {i % 2 === 0 ? (
                                    <>
                                        <StepCard step={step} align="right" />
                                        <StepDot id={step.id} color={step.color} />
                                        <StepImage step={step} />
                                    </>
                                ) : (
                                    <>
                                        <StepImage step={step} />
                                        <StepDot id={step.id} color={step.color} />
                                        <StepCard step={step} align="left" />
                                    </>
                                )}
                            </div>
                            {i < STEPS.length - 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
                                    <ArrowDown size={20} color="var(--border-strong)" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .step-row { grid-template-columns: 1fr !important; }
          .step-img-col { display: none; }
        }
      `}</style>
        </section>
    );
}

function StepDot({ id, color }) {
    return (
        <div style={{
            width: 56, height: 56, flexShrink: 0, margin: '0 auto',
            background: `linear-gradient(135deg, ${color}, ${color}88)`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 800, color: 'white',
            boxShadow: `0 0 20px ${color}44`,
            border: '4px solid white',
            outline: `2px solid ${color}33`,
        }}>
            {id}
        </div>
    );
}

function StepImage({ step }) {
    return (
        <div className="step-img-col" style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            height: '200px',
            position: 'relative',
            boxShadow: 'var(--shadow-md)',
        }}>
            <img
                src={step.img}
                alt={step.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${step.color}33, transparent)`,
            }} />
            <div style={{
                position: 'absolute', top: 12, left: 12,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                borderRadius: 'var(--radius-sm)', padding: '6px 12px',
                color: 'white', fontSize: '0.75rem', fontWeight: 600,
            }}>
                {step.subtitle}
            </div>
        </div>
    );
}

function StepCard({ step, align }) {
    return (
        <div style={{
            background: step.bg,
            borderRadius: 'var(--radius-lg)',
            padding: '24px 28px',
            textAlign: align,
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'all var(--transition-base)',
        }}>
            <div style={{
                display: 'inline-flex', alignItems: 'center',
                justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
                gap: '10px', marginBottom: '12px',
            }}>
                <div style={{ color: step.color }}>{step.icon}</div>
                <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: step.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{step.subtitle}</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--foreground)' }}>{step.title}</div>
                </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '14px' }}>{step.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
                {step.tags.map(tag => (
                    <span key={tag} style={{
                        padding: '4px 10px',
                        background: 'rgba(255,255,255,0.7)',
                        border: `1px solid ${step.color}33`,
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.72rem', fontWeight: 600, color: step.color,
                    }}>{tag}</span>
                ))}
            </div>
        </div>
    );
}
