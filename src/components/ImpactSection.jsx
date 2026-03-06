import { STATS } from '../data/mandiData';
import { Star, Quote, Users, TrendingUp, MapPin, Target } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: 'Ramesh Kumar',
        location: 'Tumkur, Karnataka',
        crop: 'Tomato Farmer',
        quote: 'MandiMind told me to wait 3 days before selling. I earned ₹250 extra per quintal — that\'s ₹12,500 more from one truck load!',
        gain: '+₹12,500',
        img: '/farmer_ramesh.png',
    },
    {
        name: 'Sarita Devi',
        location: 'Nashik, Maharashtra',
        crop: 'Onion Farmer',
        quote: 'The app suggested Pune mandi instead of local. After transport cost, I still gained ₹180 more per quintal. Very useful!',
        gain: '+₹9,000',
        img: '/farmer_sarita.png',
    },
    {
        name: 'Harjeet Singh',
        location: 'Amritsar, Punjab',
        crop: 'Rice Farmer',
        quote: 'I used to depend on the arhtiya for price. Now MandiMind gives me real predictions. I feel more confident in decisions.',
        gain: '+₹6,200',
        img: '/farmer_harjeet.png',
    },
];

const IMPACT_ITEMS = [
    { icon: <Users size={28} />, title: 'Bridging Information Gap', desc: 'Farmers no longer depend on middlemen for price information. MandiMind puts real market intelligence directly in the hands of producers.', color: '#3b82f6' },
    { icon: <TrendingUp size={28} />, title: 'Higher Farm Income', desc: 'On average, farmers using MandiMind earn 23% more per harvest by choosing the right selling time and mandi.', color: '#059669' },
    { icon: <MapPin size={28} />, title: 'Reducing Travel Waste', desc: 'By predicting prices before travel, we help farmers avoid costly trips to mandis offering lower prices than expected.', color: '#8b5cf6' },
    { icon: <Target size={28} />, title: 'Scalable Rural Impact', desc: 'With SMS & WhatsApp delivery, even farmers without smartphones can access AI-driven market intelligence.', color: '#f59e0b' },
];

export default function ImpactSection() {
    return (
        <section id="impact" style={{ padding: '100px 24px', background: 'white', position: 'relative', overflow: 'hidden' }}>
            <div className="blob" style={{ width: 400, height: 400, background: 'rgba(5,150,105,0.06)', top: -100, right: -100 }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                    <div className="section-label animate-fade-in-up" style={{ display: 'inline-flex', marginBottom: '16px' }}>Real-World Impact</div>
                    <h2 className="animate-fade-in-up delay-100" style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--foreground)',
                        letterSpacing: '-0.02em', marginBottom: '12px',
                    }}>
                        Transforming
                        <span className="gradient-text"> Farmer Livelihoods</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                        Reducing the information asymmetry that costs Indian farmers thousands of crores annually.
                    </p>
                </div>

                {/* Aerial farmland full-width banner */}
                <div className="animate-scale-in" style={{
                    borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                    height: '260px', position: 'relative', marginBottom: '60px',
                    boxShadow: 'var(--shadow-lg)',
                }}>
                    <img src="/farmland_aerial.png" alt="Indian farmland aerial view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,42,20,0.75) 0%, rgba(5,42,20,0.3) 60%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '40px' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Scale of Impact</div>
                            <div style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '12px' }}>
                                Serving farmers across<br /><span className="gradient-text">18 Indian states</span>
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', maxWidth: '360px' }}>
                                From Punjab wheat fields to Karnataka tomato farms — MandiMind speaks your language and knows your mandi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '72px' }} className="stats-grid">
                    {STATS.map((s, i) => (
                        <div key={s.label} className="card-hover animate-fade-in-up" style={{
                            animationDelay: `${i * 0.1}s`, textAlign: 'center', padding: '32px 20px',
                            background: 'linear-gradient(135deg, var(--muted), white)',
                            borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
                        }}>
                            <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '8px' }}>
                                <span className="gradient-text">{s.value}{s.suffix}</span>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Impact Items */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '80px' }} className="impact-grid">
                    {IMPACT_ITEMS.map((item, i) => (
                        <div key={item.title} className="card-hover animate-fade-in-up" style={{
                            animationDelay: `${i * 0.12}s`, padding: '28px',
                            borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
                            background: 'white', display: 'flex', gap: '16px', alignItems: 'flex-start',
                        }}>
                            <div style={{
                                width: 52, height: 52, flexShrink: 0, background: `${item.color}14`,
                                borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', color: item.color,
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--foreground)', marginBottom: '8px' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
                        What Farmers Are Saying
                    </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="testimonials-grid">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={t.name} className="card-hover animate-fade-in-up glass" style={{ animationDelay: `${i * 0.15}s`, padding: '0', overflow: 'hidden', position: 'relative' }}>
                            {/* Farmer photo banner */}
                            <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,42,20,0.85) 0%, transparent 60%)' }} />
                                <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'white' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>{t.location} · {t.crop}</div>
                                    </div>
                                    <div style={{
                                        background: '#dcfce7', color: '#15803d',
                                        borderRadius: 'var(--radius-full)', padding: '4px 10px',
                                        fontSize: '0.8rem', fontWeight: 800,
                                    }}>{t.gain}</div>
                                </div>
                            </div>

                            {/* Quote body */}
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={13} color="#f59e0b" fill="#f59e0b" />)}
                                </div>
                                <Quote size={24} color="var(--border-strong)" style={{ opacity: 0.4, marginBottom: '6px' }} />
                                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>
                                    "{t.quote}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .impact-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
