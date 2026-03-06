import { useState } from 'react';
import {
    Search, MapPin, TrendingUp, TrendingDown, Bot, ChevronRight,
    Info, AlertCircle, CheckCircle, Clock, Truck
} from 'lucide-react';
import { CROPS, STATES, getMandiData, getPriceForecast } from '../data/mandiData';

const BACKEND = 'http://localhost:3001';

const STATE_DISTRICT_MAP = {
    'Karnataka': {
        'Bangalore': ['Bangalore APMC'], 'Mysore': ['Mysore APMC'], 'Tumkur': ['Tumkur Mandi'], 'Dharwad': ['Hubli APMC'],
        'Belagavi': ['Belagavi APMC'], 'Bellary': ['Bellary APMC'], 'Hassan': ['Hassan APMC'], 'Kolar': ['Kolar APMC'], 'Mandya': ['Mandya APMC']
    },
    'Maharashtra': {
        'Pune': ['Pune APMC'], 'Nashik': ['Nashik Mandi', 'Lasalgaon APMC'], 'Mumbai': ['Mumbai APMC'], 'Nagpur': ['Nagpur APMC'],
        'Aurangabad': ['Aurangabad Mandi'], 'Solapur': ['Solapur APMC'], 'Ahmednagar': ['Ahmednagar APMC']
    },
    'Uttar Pradesh': {
        'Agra': ['Agra Mandi'], 'Lucknow': ['Lucknow Mandi'], 'Kanpur': ['Kanpur Mandi'], 'Varanasi': ['Varanasi Mandi'],
        'Meerut': ['Meerut Mandi'], 'Mathura': ['Mathura Mandi'], 'Prayagraj': ['Allahabad Mandi']
    },
    'Punjab': {
        'Amritsar': ['Amritsar Mandi'], 'Ludhiana': ['Ludhiana Mandi'], 'Jalandhar': ['Jalandhar Mandi'],
        'Patiala': ['Patiala Mandi'], 'Bathinda': ['Bathinda Mandi']
    },
    'Haryana': {
        'Karnal': ['Karnal Mandi'], 'Panipat': ['Panipat Mandi'], 'Rohtak': ['Rohtak Mandi'], 'Hisar': ['Hisar Mandi'], 'Ambala': ['Ambala Mandi']
    },
    'Madhya Pradesh': {
        'Indore': ['Indore Mandi'], 'Bhopal': ['Bhopal Mandi'], 'Ujjain': ['Ujjain Mandi'], 'Jabalpur': ['Jabalpur Mandi'], 'Gwalior': ['Gwalior Mandi']
    },
    'Rajasthan': {
        'Jaipur': ['Jaipur Mandi'], 'Jodhpur': ['Jodhpur Mandi'], 'Kota': ['Kota Mandi'], 'Bikaner': ['Bikaner Mandi'], 'Udaipur': ['Udaipur Mandi']
    },
    'Tamil Nadu': {
        'Chennai': ['Chennai APMC'], 'Coimbatore': ['Coimbatore APMC'], 'Madurai': ['Madurai APMC'], 'Salem': ['Salem APMC'], 'Tiruchirappalli': ['Trichy APMC']
    }
};

const COMMODITY_GROUP_MAP = {
    'Vegetables': ['tomato', 'onion', 'potato'],
    'Cereals': ['wheat', 'maize', 'paddy_common', 'bajra', 'barley', 'jowar', 'ragi'],
    'Pulses': ['arhar', 'bengal_gram', 'black_gram', 'green_gram', 'lentil'],
    'Oilseeds': ['copra', 'groundnut', 'mustard', 'niger_seed', 'safflower', 'sesamum', 'soyabean', 'sunflower', 'sunflower_seed', 'toria'],
    'Commercial Crops': ['cotton', 'jute', 'sugarcane']
};

export default function PricePredictor() {
    const [stateId, setStateId] = useState('');
    const [district, setDistrict] = useState('');
    const [market, setMarket] = useState('');
    const [commodityGroup, setCommodityGroup] = useState('');
    const [crop, setCrop] = useState('');
    const [variety, setVariety] = useState('');

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);

    // Dynamic Lists based on selections
    const stateConfig = STATE_DISTRICT_MAP[stateId] || {};
    const districts = stateId ? Object.keys(stateConfig) : [];
    const markets = district && stateConfig[district] ? stateConfig[district] : [];

    const commodityGroups = Object.keys(COMMODITY_GROUP_MAP);
    const availableCropIds = commodityGroup ? COMMODITY_GROUP_MAP[commodityGroup] : CROPS.map(c => c.id);
    const filteredCrops = CROPS.filter(c => availableCropIds.includes(c.id));

    const varieties = crop ? ['FAQ', 'Premium', 'Local'] : [];

    const handlePredict = async () => {
        if (!crop || !stateId) return;
        setLoading(true);
        setResults(null);
        const cropObj = CROPS.find(c => c.id === crop);

        try {
            // ── Call REAL Python ML model via backend ──
            const res = await fetch(`${BACKEND}/api/recommend?crop=${crop}&state=${encodeURIComponent(stateId)}`);
            if (!res.ok) throw new Error('Backend error');
            const data = await res.json();

            // Map backend response to component shape
            const mandis = data.top_mandis.map(m => ({
                name: m.mandi,
                district: m.district,
                state: m.state,
                currentPrice: data.model_prediction.today,
                predictedPrice: m.predicted_price,
                transport: m.transport_cost,
                netProfit: m.net_profit_per_qtl,
                distanceKm: m.distance_km,
                isBest: m.is_best,
            }));

            const best = mandis[0];
            const forecast = data.daily_forecast
                ? data.daily_forecast.map((f) => ({
                    day: f.date,
                    date: f.date,
                    price: Math.round(f.predicted_price),
                    type: f.type || 'future'
                }))
                : getPriceForecast(data.model_prediction.today, data.model_prediction.peak).map((f, i) => ({
                    ...f, type: i === 0 ? 'today' : 'future'
                }));

            setResults({
                mandis,
                best,
                forecast,
                cropObj,
                mlData: data, // raw ML output for display
                isRealML: true,
            });
        } catch (err) {
            console.warn('Backend offline, falling back to mock data:', err.message);
            // Fallback to mock data if backend is not running
            const mandis = getMandiData(crop, stateId);
            const enriched = mandis.map(m => ({
                ...m,
                netProfit: m.predictedPrice - m.transport,
            }));
            enriched.sort((a, b) => b.netProfit - a.netProfit);
            const best = enriched[0];
            const forecast = getPriceForecast(best.currentPrice, best.predictedPrice);
            setResults({ mandis: enriched, best, forecast, cropObj, isRealML: false });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="predictor"
            style={{
                padding: '100px 24px',
                background: 'linear-gradient(180deg, #f0fdf4 0%, white 100%)',
                position: 'relative',
            }}
        >
            <div className="blob" style={{ width: 500, height: 500, background: 'rgba(5,150,105,0.06)', top: 0, left: -200 }} />

            <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                    <div className="section-label animate-fade-in-up" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                        <TrendingUp size={14} />
                        Live Price Predictor
                    </div>
                    <h2
                        className="animate-fade-in-up delay-100"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: '12px' }}
                    >
                        Where Should You
                        <span className="gradient-text"> Sell Today?</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Select your crop and state—our ML engine does the rest in seconds.
                    </p>
                </div>

                {/* Input Card */}
                {/* Input Card — eNAM Dashboard Style */}
                <div className="glass animate-scale-in" style={{ padding: '32px', marginBottom: '40px', boxShadow: 'var(--shadow-lg)' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }} className="enam-form">
                        <EnamSelect
                            label="State"
                            value={stateId}
                            onChange={e => {
                                setStateId(e.target.value);
                                setDistrict('');
                                setMarket('');
                                setResults(null);
                            }}
                            options={STATES.map(s => ({ value: s, label: s }))}
                            placeholder="Select State..."
                        />
                        <EnamSelect
                            label="District"
                            value={district}
                            onChange={e => {
                                setDistrict(e.target.value);
                                setMarket('');
                                setResults(null);
                            }}
                            options={districts.map(d => ({ value: d, label: d }))}
                            placeholder="All Districts"
                        />
                        <EnamSelect
                            label="Market"
                            value={market}
                            onChange={e => {
                                setMarket(e.target.value);
                                setResults(null);
                            }}
                            options={markets.map(m => ({ value: m, label: m }))}
                            placeholder="All Markets"
                        />
                        <EnamSelect
                            label="Commodity Group"
                            value={commodityGroup}
                            onChange={e => {
                                setCommodityGroup(e.target.value);
                                setCrop('');
                                setVariety('');
                                setResults(null);
                            }}
                            options={commodityGroups.map(cg => ({ value: cg, label: cg }))}
                            placeholder="All Commodities"
                        />
                        <EnamSelect
                            label="Commodity"
                            value={crop}
                            onChange={e => {
                                setCrop(e.target.value);
                                setVariety('');
                                setResults(null);
                            }}
                            options={filteredCrops.map(c => ({ value: c.id, label: c.name }))}
                            placeholder="Select Crop..."
                        />
                        <EnamSelect
                            label="Variety"
                            value={variety}
                            onChange={e => {
                                setVariety(e.target.value);
                                setResults(null);
                            }}
                            options={varieties.map(v => ({ value: v, label: v }))}
                            placeholder="All Varieties"
                        />
                        <div style={{ marginLeft: 'auto', display: 'flex' }}>
                            <button
                                id="predict-btn"
                                onClick={handlePredict}
                                disabled={!crop || !stateId || loading}
                                style={{
                                    padding: '10px 24px',
                                    height: '44px',
                                    borderRadius: '6px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    border: 'none',
                                    opacity: (!crop || !stateId) ? 0.6 : 1,
                                    cursor: (!crop || !stateId || loading) ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    whiteSpace: 'nowrap',
                                    transition: 'background 0.2s',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                                onMouseEnter={e => { if (!(!crop || !stateId || loading)) e.target.style.background = '#047857' }}
                                onMouseLeave={e => { if (!(!crop || !stateId || loading)) e.target.style.background = 'var(--primary)' }}
                            >
                                {loading ? <LoadingSpinner /> : <Search size={16} />}
                                {loading ? 'Wait...' : 'Go'}
                            </button>
                        </div>
                    </div>

                    {/* Quick picks */}
                    <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Quick demo:</span>
                        {[
                            { crop: 'tomato', state: 'Karnataka', label: '🍅 Tomato · Karnataka' },
                            { crop: 'onion', state: 'Maharashtra', label: '🧅 Onion · Maharashtra' },
                            { crop: 'potato', state: 'Uttar Pradesh', label: '🥔 Potato · UP' },
                        ].map(q => (
                            <button
                                key={q.label}
                                onClick={() => { setCrop(q.crop); setState(q.state); setResults(null); }}
                                style={{
                                    padding: '5px 14px',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1px solid var(--border-strong)',
                                    background: 'var(--muted)',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)',
                                }}
                                onMouseEnter={e => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; }}
                                onMouseLeave={e => { e.target.style.background = 'var(--muted)'; e.target.style.color = 'var(--primary)'; }}
                            >
                                {q.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading Skeleton */}
                {loading && <LoadingSkeleton />}

                {/* Results */}
                {results && <ResultsPanel results={results} />}
            </div>

            <style>{`
        @media (max-width: 800px) {
          .enam-form { flex-direction: column; align-items: stretch !important; }
          .enam-form > div { width: 100%; margin-left: 0 !important; }
        }
      `}</style>
        </section>
    );
}

function LoadingSpinner() {
    return (
        <div style={{
            width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)',
            borderTopColor: 'white', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
        }} />
    );
}

function LoadingSkeleton() {
    return (
        <div style={{ display: 'grid', gap: '16px' }}>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            {[1, 2, 3].map(i => (
                <div key={i} className="shimmer" style={{ height: '80px', borderRadius: 'var(--radius-md)' }} />
            ))}
        </div>
    );
}

function ResultsPanel({ results }) {
    const { mandis, best, forecast, cropObj, mlData, isRealML } = results;
    const forecastGain = best.predictedPrice - best.currentPrice;
    const pctGain = ((forecastGain / best.currentPrice) * 100).toFixed(1);
    const positive = forecastGain >= 0;
    const daysToWait = forecast.findIndex(p => p.price === Math.max(...forecast.map(f => f.price)));

    return (
        <div className="animate-fade-in-up">
            {/* AI Recommendation Banner */}
            <div style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                marginBottom: '28px',
                boxShadow: 'var(--shadow-glow)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                color: 'white',
            }}>
                <div style={{
                    width: 44, height: 44, background: 'rgba(255,255,255,0.15)',
                    borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                    <Bot size={22} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, opacity: 0.8, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        🤖 MandiMind AI Recommendation
                    </div>
                    <p style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                        {positive
                            ? `Prices are expected to rise by ${pctGain}% in ~${daysToWait || 3} days. `
                            : `Prices may decline. Consider selling soon. `}
                        <span style={{ fontWeight: 700 }}>Best mandi: {best.name}</span>
                        {best.transport > 0 ? ` — Net profit after ₹${best.transport} transport: ₹${best.netProfit.toLocaleString('en-IN')}/quintal.` : `. Currently the closest option with best net return.`}
                        {positive && ` Estimated gain by waiting: +₹${forecastGain.toLocaleString('en-IN')}/quintal`}
                    </p>
                </div>
                <div style={{
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 16px',
                    textAlign: 'center',
                    flexShrink: 0,
                }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>+{pctGain}%</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Predicted</div>
                </div>
            </div>

            {/* Mandi Comparison Table */}
            <div className="glass" style={{ padding: '28px', marginBottom: '24px', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={18} color="var(--primary)" />
                    Nearby Mandis Comparison
                </h3>

                {/* Table Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr',
                    gap: '8px',
                    padding: '8px 12px',
                    background: 'var(--muted)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                }}>
                    <span>Mandi</span>
                    <span style={{ textAlign: 'right' }}>Current</span>
                    <span style={{ textAlign: 'right' }}>Predicted</span>
                    <span style={{ textAlign: 'right' }}>Transport</span>
                    <span style={{ textAlign: 'right' }}>Net Profit</span>
                </div>

                {mandis.map((m, i) => (
                    <MandiRow key={m.name} mandi={m} isFirst={i === 0} />
                ))}
            </div>

            {/* Price Forecast Table & Chart */}
            <div className="glass" style={{ padding: '28px', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={18} color="var(--primary)" />
                    Price Timeline — Past &amp; Future
                    <span style={{ fontSize: '0.75rem', background: isRealML ? 'rgba(5,150,105,0.1)' : 'var(--muted)', padding: '2px 10px', borderRadius: 'var(--radius-full)', color: isRealML ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 700, marginLeft: 'auto', border: isRealML ? '1px solid rgba(5,150,105,0.3)' : 'none' }}>
                        {isRealML ? '🤖 RandomForest Model (LIVE)' : 'Mock Data'}
                    </span>
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{cropObj?.name} price prediction — {best.name}{isRealML && mlData && <span style={{ color: 'var(--primary)', fontWeight: 600 }}> · Best sell: {mlData.model_prediction.best_day_to_sell}</span>}</p>

                <PriceTimelineChart forecast={forecast} />
            </div>
        </div>
    );
}

function MandiRow({ mandi, isFirst }) {
    const isBest = isFirst;
    const positive = mandi.predictedPrice > mandi.currentPrice;
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1fr',
            gap: '8px',
            padding: '14px 12px',
            borderRadius: 'var(--radius-md)',
            background: isBest ? 'rgba(5,150,105,0.06)' : 'transparent',
            border: isBest ? '1px solid var(--border-strong)' : '1px solid transparent',
            marginBottom: '4px',
            alignItems: 'center',
            transition: 'background var(--transition-fast)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color={isBest ? 'var(--primary)' : 'var(--text-muted)'} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{mandi.name}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>District: {mandi.district || mandi.state}</span>
                </div>
                {isBest && <span className="badge-success" style={{ fontSize: '0.65rem' }}>★ Best Net</span>}
            </div>
            <span style={{ textAlign: 'right', fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                ₹{mandi.currentPrice.toLocaleString('en-IN')}
            </span>
            <span style={{ textAlign: 'right', fontSize: '0.88rem', fontWeight: 700, color: positive ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                ₹{mandi.predictedPrice.toLocaleString('en-IN')}
            </span>
            <span style={{ textAlign: 'right', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {mandi.transport === 0 ? '—' : `₹${mandi.transport}`}
            </span>
            <span style={{ textAlign: 'right', fontSize: '0.92rem', fontWeight: 800, color: isBest ? 'var(--primary)' : 'var(--text-primary)' }}>
                ₹{mandi.netProfit.toLocaleString('en-IN')}
            </span>
        </div>
    );
}

function PriceTimelineChart({ forecast }) {
    if (!forecast || forecast.length === 0) return null;

    const prices = forecast.map(f => f.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const W = 100, H = 60;

    // Color per type
    const color = (type) => type === 'past' ? '#94a3b8' : type === 'today' ? '#f59e0b' : '#059669';
    const bgColor = (type) => type === 'past' ? 'rgba(148,163,184,0.06)' : type === 'today' ? 'rgba(245,158,11,0.1)' : 'rgba(5,150,105,0.06)';

    // SVG points
    const pts = forecast.map((f, i) => {
        const x = (i / (forecast.length - 1)) * W;
        const y = H - ((f.price - min) / range) * H * 0.75 - H * 0.12;
        return { x, y, ...f };
    });

    // Split into past+today line & future line
    const todayIdx = forecast.findIndex(f => f.type === 'today');
    const pastLine = pts.slice(0, todayIdx + 1).map(p => `${p.x},${p.y}`).join(' ');
    const futureLine = pts.slice(todayIdx).map(p => `${p.x},${p.y}`).join(' ');
    const areaFuture = `${pts[todayIdx].x},${H} ` + pts.slice(todayIdx).map(p => `${p.x},${p.y}`).join(' ') + ` ${pts[pts.length - 1].x},${H}`;

    return (
        <div>
            {/* SVG Chart */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '160px', overflow: 'visible' }}>
                    <defs>
                        <linearGradient id="futureGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Future area fill */}
                    {todayIdx >= 0 && <polygon points={areaFuture} fill="url(#futureGrad)" />}
                    {/* Past line (grey) */}
                    {pastLine && <polyline points={pastLine} fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />}
                    {/* Future line (green) */}
                    {futureLine && <polyline points={futureLine} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
                    {/* Dots */}
                    {pts.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={p.type === 'today' ? 4 : 3}
                            fill={color(p.type)} stroke="white" strokeWidth="1" />
                    ))}
                    {/* Today vertical line */}
                    {todayIdx >= 0 && (
                        <line x1={pts[todayIdx].x} y1="0" x2={pts[todayIdx].x} y2={H}
                            stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
                    )}
                </svg>
            </div>

            {/* eNAM-style Price Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                        <tr style={{ background: '#1d4e89', color: 'white' }}>
                            <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, borderRadius: '6px 0 0 0' }}>Type</th>
                            <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700 }}>Date</th>
                            <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700 }}>Price (₹/Quintal)</th>
                            <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, borderRadius: '0 6px 0 0' }}>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecast.map((f, i) => {
                            const prev = i > 0 ? forecast[i - 1].price : f.price;
                            const change = f.price - prev;
                            const pct = prev > 0 ? ((change / prev) * 100).toFixed(1) : 0;
                            return (
                                <tr key={i} style={{
                                    background: bgColor(f.type),
                                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                                    fontWeight: f.type === 'today' ? 700 : 400
                                }}>
                                    <td style={{ padding: '9px 14px' }}>
                                        <span style={{
                                            display: 'inline-block', padding: '2px 10px',
                                            borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700,
                                            background: color(f.type), color: 'white'
                                        }}>
                                            {f.type === 'past' ? 'Historical' : f.type === 'today' ? '📍 Today' : '🔮 Forecast'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '9px 14px', textAlign: 'center', color: '#374151' }}>{f.date}</td>
                                    <td style={{ padding: '9px 14px', textAlign: 'right', fontWeight: 700, color: color(f.type) }}>₹{f.price.toLocaleString('en-IN')}</td>
                                    <td style={{ padding: '9px 14px', textAlign: 'right', color: change >= 0 ? '#059669' : '#dc2626', fontWeight: 600 }}>
                                        {i === 0 ? '—' : `${change >= 0 ? '▲' : '▼'} ₹${Math.abs(change).toFixed(0)} (${change >= 0 ? '+' : ''}${pct}%)`}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '14px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                {[['#94a3b8', 'Historical (Past)'], ['#f59e0b', 'Today'], ['#059669', 'ML Forecast (Future)']].map(([c, l]) => (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#6b7280' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                        {l}
                    </div>
                ))}
            </div>
        </div>
    );
}

function EnamSelect({ label, value, options, onChange, placeholder, disabled }) {
    return (
        <div style={{ position: 'relative', flex: '1 1 120px', minWidth: '130px', marginTop: '6px' }}>
            <label style={{
                position: 'absolute',
                top: '-9px',
                left: '8px',
                background: 'white',
                padding: '0 4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6b7280',
                zIndex: 1,
                borderRadius: '2px',
                pointerEvents: 'none'
            }}>
                {label}
            </label>
            <select
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={{
                    width: '100%',
                    padding: '12px 32px 12px 14px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    background: disabled ? '#f9fafb' : '#f8fafc',
                    fontSize: '0.95rem',
                    color: value || disabled ? '#1f2937' : '#9ca3af',
                    appearance: 'none',
                    outline: 'none',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    transition: 'border-color 0.2s',
                    fontFamily: 'inherit'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            {/* Custom SVG chevron matching eNAM style */}
            <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
    );
}
