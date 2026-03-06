import { useState } from 'react';
import { Phone, Bell, CheckCircle, Send, Loader, MessageSquare, Zap } from 'lucide-react';
import { CROPS, STATES } from '../data/mandiData';

const BACKEND = 'http://localhost:3001';

export default function SMSAlerts() {
    const [form, setForm] = useState({ name: '', phone: '', crop: '', state: '' });
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
    const [msg, setMsg] = useState('');

    // Demo SMS (hackathon live demo)
    const [demoPhone, setDemoPhone] = useState('');
    const [demoCrop, setDemoCrop] = useState('tomato');
    const [demoStatus, setDemoStatus] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch(`${BACKEND}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setMsg(data.message);
                setForm({ name: '', phone: '', crop: '', state: '' });
            } else {
                setStatus('error');
                setMsg(data.message);
            }
        } catch {
            setStatus('error');
            setMsg('Could not connect to server. Make sure the backend is running.');
        }
    };

    const handleDemo = async () => {
        if (!demoPhone) return;
        setDemoStatus('loading');
        try {
            const res = await fetch(`${BACKEND}/api/send-single`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: demoPhone, crop: demoCrop, name: 'Demo Farmer', state: 'Karnataka' }),
            });
            const data = await res.json();
            setDemoStatus(data.success ? 'success' : 'error');
        } catch {
            setDemoStatus('error');
        }
        setTimeout(() => setDemoStatus(null), 5000);
    };

    return (
        <section
            id="sms-alerts"
            style={{
                padding: '100px 24px',
                background: 'linear-gradient(180deg, #f0fdf4 0%, white 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Blobs */}
            <div className="blob" style={{ width: 450, height: 450, background: 'rgba(5,150,105,0.07)', top: -100, right: -80 }} />
            <div className="blob" style={{ width: 300, height: 300, background: 'rgba(52,211,153,0.06)', bottom: -60, left: -60, animationDelay: '3s' }} />

            <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative' }}>

                {/* ── Header ── */}
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="section-label animate-fade-in-up" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                        <MessageSquare size={14} />
                        SMS Price Alerts
                    </div>
                    <h2 className="animate-fade-in-up delay-100" style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
                        color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: '12px',
                    }}>
                        Get Alerts on
                        <span className="gradient-text"> Any Phone</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
                        No internet? No problem. Receive daily crop price predictions via SMS — even on a basic keypad phone.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px', alignItems: 'start' }} className="sms-grid">

                    {/* ── LEFT: Registration Form ── */}
                    <div className="glass animate-fade-in-left" style={{ padding: '36px', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                            <div style={{
                                width: 44, height: 44,
                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(5,150,105,0.35)',
                            }}>
                                <Bell size={20} color="white" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--foreground)' }}>Register for Daily Alerts</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>SMS delivered every morning at 7 AM</div>
                            </div>
                        </div>

                        <form onSubmit={handleRegister}>
                            {/* Name */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Your Name</label>
                                <input
                                    id="sms-name"
                                    type="text"
                                    placeholder="e.g. Ramesh Kumar"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                            </div>

                            {/* Phone */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Mobile Number</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{
                                        position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                        fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)',
                                    }}>+91</span>
                                    <input
                                        id="sms-phone"
                                        type="tel"
                                        placeholder="9876543210"
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        required
                                        maxLength={10}
                                        style={{ ...inputStyle, paddingLeft: '46px' }}
                                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                            </div>

                            {/* Crop + State */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                                <div>
                                    <label style={labelStyle}>Your Crop</label>
                                    <select
                                        id="sms-crop"
                                        value={form.crop}
                                        onChange={e => setForm({ ...form, crop: e.target.value })}
                                        required
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                    >
                                        <option value="">Select crop</option>
                                        {CROPS.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>State</label>
                                    <select
                                        id="sms-state"
                                        value={form.state}
                                        onChange={e => setForm({ ...form, state: e.target.value })}
                                        required
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                    >
                                        <option value="">Select state</option>
                                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Status message */}
                            {status === 'success' && (
                                <div style={{
                                    display: 'flex', gap: '10px', alignItems: 'flex-start',
                                    background: '#dcfce7', border: '1px solid #86efac',
                                    borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: '16px',
                                }}>
                                    <CheckCircle size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '1px' }} />
                                    <p style={{ fontSize: '0.85rem', color: '#15803d', lineHeight: 1.5 }}>{msg}</p>
                                </div>
                            )}
                            {status === 'error' && (
                                <div style={{
                                    background: '#fee2e2', border: '1px solid #fca5a5',
                                    borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: '16px',
                                }}>
                                    <p style={{ fontSize: '0.85rem', color: '#b91c1c' }}>{msg}</p>
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                id="sms-register-btn"
                                type="submit"
                                className="btn-primary"
                                disabled={status === 'loading'}
                                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.95rem', opacity: status === 'loading' ? 0.7 : 1 }}
                            >
                                {status === 'loading'
                                    ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /><span>Registering…</span></>
                                    : <><Bell size={18} /><span>Register for Free SMS Alerts</span></>
                                }
                            </button>
                        </form>

                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                            Powered by Twilio · No spam · Reply STOP to unsubscribe anytime
                        </p>
                    </div>

                    {/* ── RIGHT: How it works + Demo ── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* How it works */}
                        <div className="animate-fade-in-right" style={{
                            background: '#0F2A1D', borderRadius: 'var(--radius-xl)',
                            padding: '28px', boxShadow: 'var(--shadow-lg)',
                        }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                                📱 Sample SMS You'll Receive
                            </div>
                            <div style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(52,211,153,0.15)',
                                borderRadius: 'var(--radius-md)',
                                padding: '16px',
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.85)',
                                lineHeight: 2,
                                whiteSpace: 'pre-line',
                            }}>
                                {`MandiMind Alert 🌾
Hello Ramesh!
Crop: Tomato | Region: Karnataka

Today's Price: Rs.1800/quintal
5-Day Prediction: Rs.2150/quintal
Predicted to RISE by Rs.350 (+19.4%)

Best Mandi: Bangalore APMC
Recommendation: Wait 3 days then sell.

Reply STOP to unsubscribe.
- MandiMind AI`}
                            </div>
                            {/* Steps */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                                {[
                                    { step: '1', text: 'Register with name, phone & crop' },
                                    { step: '2', text: 'Receive welcome SMS immediately' },
                                    { step: '3', text: 'Get daily alerts at 7 AM every morning' },
                                ].map(s => (
                                    <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: 24, height: 24, flexShrink: 0,
                                            background: 'var(--primary)', borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.7rem', fontWeight: 800, color: 'white',
                                        }}>{s.step}</div>
                                        <span style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.7)' }}>{s.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .sms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--border)',
    background: 'white',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    appearance: 'none',
    boxSizing: 'border-box',
};

const labelStyle = {
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    display: 'block',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
};
