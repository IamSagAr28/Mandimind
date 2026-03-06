import { useState } from 'react';
import { Bot, Send, Mic, Sparkles } from 'lucide-react';

const PRESET_QUESTIONS = [
    { lang: 'English', q: 'Should I sell my onions today?' },
    { lang: 'Hindi', q: 'क्या मुझे आज टमाटर बेचने चाहिए?' },
    { lang: 'Kannada', q: 'ಇಂದು ಈರುಳ್ಳಿ ಮಾರಬೇಕೆ?' },
    { lang: 'Marathi', q: 'आज कांदा विकला पाहिजे का?' },
];

const MOCK_RESPONSES = {
    onion: {
        en: "Based on current market data, **onion prices are predicted to rise by ₹200–₹350 in the next 4–5 days** due to reduced supply from Nashik mandis and increased export demand. I recommend **waiting 4 days** before selling. Consider Pune APMC for best net profit after transport.",
        hi: "वर्तमान बाज़ार डेटा के आधार पर, **अगले 4-5 दिनों में प्याज के दाम ₹200-₹350 बढ़ने की उम्मीद है**। मेरी सलाह है कि **4 दिन प्रतीक्षा करें**। पुणे APMC आपके लिए सबसे अच्छा विकल्प है।",
    },
    tomato: {
        en: "Tomato prices are currently **₹1,800/quintal** in your region. Predictions show a rise to **₹2,150 within 5 days**. Wait and sell at Bangalore APMC for net gain of ₹250/quintal after transport costs.",
        kn: "ಈಗ ಟೊಮೆಟೊ ಬೆಲೆ ₹1,800/ಕ್ವಿಂಟಾಲ್. **5 ದಿನಗಳಲ್ಲಿ ₹2,150ಕ್ಕೆ ಏರಬಹುದು**. ಬೆಂಗಳೂರು APMC ನಲ್ಲಿ ಮಾರಾಟ ಮಾಡಿ — ₹250/ಕ್ವಿಂಟಾಲ್ ಹೆಚ್ಚು ಲಾಭ.",
    },
    default: {
        en: "Based on seasonal patterns and current market data, **prices are expected to remain stable or slightly increase** over the next week. Monitor MandiMind daily for updated forecasts as supply conditions change.",
    }
};

function getResponse(question) {
    const q = question.toLowerCase();
    if (q.includes('onion') || q.includes('प्याज') || q.includes('कांदा') || q.includes('ಈರುಳ್ಳಿ')) {
        if (q.includes('today') || q.includes('आज') || q.includes('ಇಂದು')) return MOCK_RESPONSES.onion.hi || MOCK_RESPONSES.onion.en;
        return MOCK_RESPONSES.onion.en;
    }
    if (q.includes('tomato') || q.includes('टमाटर') || q.includes('ಟೊಮೆಟೊ')) return MOCK_RESPONSES.tomato.en;
    return MOCK_RESPONSES.default.en;
}

export default function AIAssistant() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: "Namaste! 🌾 I'm MandiMind AI. Ask me about crop prices, best mandis, or when to sell — in **English, Hindi, Kannada, or Marathi**.",
        }
    ]);
    const [input, setInput] = useState('');
    const [thinking, setThinking] = useState(false);

    const sendMessage = (text) => {
        const q = text || input;
        if (!q.trim()) return;
        setMessages(m => [...m, { role: 'user', text: q }]);
        setInput('');
        setThinking(true);
        setTimeout(() => {
            const response = getResponse(q);
            setMessages(m => [...m, { role: 'assistant', text: response }]);
            setThinking(false);
        }, 1200 + Math.random() * 800);
    };

    const renderText = (text) => {
        // Convert markdown-ish bold to HTML
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    return (
        <section
            id="ai-assistant"
            style={{
                padding: '100px 24px',
                background: 'linear-gradient(180deg, white 0%, #f0fdf4 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <div className="blob" style={{ width: 400, height: 400, background: 'rgba(52,211,153,0.08)', bottom: -100, right: -100 }} />

            <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div className="section-label animate-fade-in-up" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                        <Sparkles size={14} />
                        Multilingual AI Assistant
                    </div>
                    <h2
                        className="animate-fade-in-up delay-100"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: '12px' }}
                    >
                        Ask in Your
                        <span className="gradient-text"> Native Language</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Farmers can ask price questions in Kannada, Hindi, Marathi or English — our AI understands all.
                    </p>
                </div>

                {/* Chat Window */}
                <div className="glass animate-scale-in" style={{ overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                    {/* Chat Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: 36, height: 36, background: 'rgba(255,255,255,0.2)',
                            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Bot size={20} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>MandiMind AI</div>
                            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>● Online — Powered by ML + LLM</div>
                        </div>
                        <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-full)', padding: '4px 12px', fontSize: '0.72rem', color: 'white', fontWeight: 600 }}>
                            Understands 10+ Languages
                        </span>
                    </div>

                    {/* Messages */}
                    <div style={{
                        padding: '20px',
                        minHeight: '280px',
                        maxHeight: '360px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        background: '#fafbf8',
                    }}>
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    gap: '8px',
                                    animationDelay: '0.05s',
                                }}
                                className="animate-fade-in-up"
                            >
                                {msg.role === 'assistant' && (
                                    <div style={{
                                        width: 28, height: 28, flexShrink: 0,
                                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                        borderRadius: '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Bot size={14} color="white" />
                                    </div>
                                )}
                                <div style={{
                                    maxWidth: '75%',
                                    padding: '10px 14px',
                                    borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                                    background: msg.role === 'user'
                                        ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
                                        : 'white',
                                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                                    fontSize: '0.88rem',
                                    lineHeight: 1.6,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                    border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                                }}
                                    dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
                                />
                            </div>
                        ))}
                        {thinking && (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <div style={{
                                    width: 28, height: 28,
                                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                    borderRadius: '8px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Bot size={14} color="white" />
                                </div>
                                <div style={{ background: 'white', padding: '10px 16px', borderRadius: '4px 16px 16px 16px', border: '1px solid var(--border)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{
                                            width: 6, height: 6, borderRadius: '50%',
                                            background: 'var(--primary)',
                                            animation: 'bounce 1s ease-in-out infinite',
                                            animationDelay: `${i * 0.2}s`,
                                        }} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preset Questions */}
                    <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '6px', flexWrap: 'wrap', background: 'white' }}>
                        {PRESET_QUESTIONS.map(pq => (
                            <button
                                key={pq.lang}
                                onClick={() => sendMessage(pq.q)}
                                style={{
                                    padding: '5px 12px',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1px solid var(--border-strong)',
                                    background: 'var(--muted)',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)',
                                }}
                                onMouseEnter={e => { e.target.style.background = 'var(--primary)'; e.target.style.color = 'white'; }}
                                onMouseLeave={e => { e.target.style.background = 'var(--muted)'; e.target.style.color = 'var(--primary)'; }}
                            >
                                {pq.lang}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px', background: 'white' }}>
                        <input
                            id="ai-input"
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !thinking && sendMessage()}
                            placeholder="Ask about your crop prices…"
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                borderRadius: 'var(--radius-full)',
                                border: '2px solid var(--border)',
                                background: 'var(--muted)',
                                fontSize: '0.88rem',
                                fontFamily: 'var(--font-sans)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                transition: 'border-color var(--transition-fast)',
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                        <button
                            id="ai-send-btn"
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || thinking}
                            className="btn-primary"
                            style={{ padding: '10px 18px', flexShrink: 0, opacity: (!input.trim() || thinking) ? 0.5 : 1 }}
                        >
                            <Send size={16} />
                            <span>Send</span>
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
        </section>
    );
}
