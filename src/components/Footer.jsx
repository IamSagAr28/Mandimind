import { Leaf, Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{
            background: '#071811',
            padding: '60px 24px 32px',
            borderTop: '1px solid rgba(52,211,153,0.1)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="blob" style={{ width: 400, height: 400, background: 'rgba(5,150,105,0.06)', bottom: -200, right: -100 }} />

            <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
                {/* Top Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }} className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <div style={{
                                width: 38, height: 38,
                                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Leaf size={20} color="white" />
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'white', letterSpacing: '-0.02em' }}>
                                Mandi<span style={{ color: 'var(--accent)' }}>Mind</span>
                            </span>
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '20px', maxWidth: '280px' }}>
                            AI-powered crop price intelligence for Indian farmers. Turn market chaos into profitable decisions.
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[
                                { Icon: Github, href: '#' },
                                { Icon: Twitter, href: '#' },
                                { Icon: Linkedin, href: '#' },
                            ].map(({ Icon, href }) => (
                                <a
                                    key={href + Icon.name}
                                    href={href}
                                    style={{
                                        width: 36, height: 36,
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.5)',
                                        textDecoration: 'none',
                                        transition: 'all var(--transition-fast)',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(52,211,153,0.12)'; e.currentTarget.style.borderColor = 'rgba(52,211,153,0.3)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {[
                        {
                            title: 'Product',
                            links: ['Price Predictor', 'Market Pulse', 'AI Assistant', 'SMS Alerts', 'API Access'],
                        },
                        {
                            title: 'Resources',
                            links: ['Documentation', 'Data Sources', 'ML Models', 'Research Paper', 'Open Data'],
                        },
                        {
                            title: 'Contact',
                            links: ['support@mandimind.in', '+91-80-1234-5678', 'Bangalore, Karnataka', 'Press Kit'],
                        },
                    ].map(col => (
                        <div key={col.title}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                                {col.title}
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {col.links.map(link => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}
                                            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.9)'}
                                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Row */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                }}>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                        © 2025 MandiMind. Built for Indian Farmers. Made with ❤️ in Bangalore.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                            <a key={l} href="#" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
                                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                            >{l}</a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    );
}
