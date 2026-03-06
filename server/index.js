import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import twilio from 'twilio';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODEL_SCRIPT = path.join(__dirname, '..', 'ml-model-repo', 'ai-model', 'predict.py');

// ── Helper: run the Python ML model ──
function runPythonPredict(crop = 'Tomato') {
    return new Promise((resolve, reject) => {
        // Pass crop as env var so predict.py can filter if needed
        const cmd = `python "${MODEL_SCRIPT}"`;
        exec(cmd, { env: { ...process.env, CROP: crop } }, (err, stdout, stderr) => {
            if (err) {
                console.error('Python model error:', stderr || err.message);
                reject(new Error(stderr || err.message));
                return;
            }
            try {
                resolve(JSON.parse(stdout.trim()));
            } catch (e) {
                reject(new Error('Failed to parse model output: ' + stdout));
            }
        });
    });
}

// ── Extensive Mandi Database mapped by State ──
const MANDI_DB = [
    // Karnataka
    { mandi: 'Bangalore APMC', district: 'Bangalore', state: 'Karnataka', basePrice: 2200 },
    { mandi: 'Mysore APMC', district: 'Mysore', state: 'Karnataka', basePrice: 2050 },
    { mandi: 'Tumkur Mandi', district: 'Tumkur', state: 'Karnataka', basePrice: 1900 },
    { mandi: 'Hubli APMC', district: 'Dharwad', state: 'Karnataka', basePrice: 1950 },
    { mandi: 'Belagavi APMC', district: 'Belagavi', state: 'Karnataka', basePrice: 1800 },
    { mandi: 'Bellary APMC', district: 'Bellary', state: 'Karnataka', basePrice: 2100 },
    { mandi: 'Hassan APMC', district: 'Hassan', state: 'Karnataka', basePrice: 1980 },
    { mandi: 'Kolar APMC', district: 'Kolar', state: 'Karnataka', basePrice: 2300 },
    { mandi: 'Mandya APMC', district: 'Mandya', state: 'Karnataka', basePrice: 1850 },

    // Maharashtra
    { mandi: 'Pune APMC', district: 'Pune', state: 'Maharashtra', basePrice: 2350 },
    { mandi: 'Nashik Mandi', district: 'Nashik', state: 'Maharashtra', basePrice: 2150 },
    { mandi: 'Mumbai APMC', district: 'Mumbai', state: 'Maharashtra', basePrice: 2600 },
    { mandi: 'Lasalgaon APMC', district: 'Nashik', state: 'Maharashtra', basePrice: 2250 },
    { mandi: 'Nagpur APMC', district: 'Nagpur', state: 'Maharashtra', basePrice: 2000 },
    { mandi: 'Aurangabad Mandi', district: 'Aurangabad', state: 'Maharashtra', basePrice: 1950 },
    { mandi: 'Solapur APMC', district: 'Solapur', state: 'Maharashtra', basePrice: 2100 },
    { mandi: 'Ahmednagar APMC', district: 'Ahmednagar', state: 'Maharashtra', basePrice: 2050 },

    // Uttar Pradesh
    { mandi: 'Agra Mandi', district: 'Agra', state: 'Uttar Pradesh', basePrice: 1700 },
    { mandi: 'Lucknow Mandi', district: 'Lucknow', state: 'Uttar Pradesh', basePrice: 1900 },
    { mandi: 'Kanpur Mandi', district: 'Kanpur', state: 'Uttar Pradesh', basePrice: 1850 },
    { mandi: 'Varanasi Mandi', district: 'Varanasi', state: 'Uttar Pradesh', basePrice: 1950 },
    { mandi: 'Meerut Mandi', district: 'Meerut', state: 'Uttar Pradesh', basePrice: 1750 },
    { mandi: 'Mathura Mandi', district: 'Mathura', state: 'Uttar Pradesh', basePrice: 1800 },
    { mandi: 'Allahabad Mandi', district: 'Prayagraj', state: 'Uttar Pradesh', basePrice: 1880 },

    // Punjab
    { mandi: 'Amritsar Mandi', district: 'Amritsar', state: 'Punjab', basePrice: 1950 },
    { mandi: 'Ludhiana Mandi', district: 'Ludhiana', state: 'Punjab', basePrice: 2050 },
    { mandi: 'Jalandhar Mandi', district: 'Jalandhar', state: 'Punjab', basePrice: 1850 },
    { mandi: 'Patiala Mandi', district: 'Patiala', state: 'Punjab', basePrice: 1900 },
    { mandi: 'Bathinda Mandi', district: 'Bathinda', state: 'Punjab', basePrice: 1800 },

    // Haryana
    { mandi: 'Karnal Mandi', district: 'Karnal', state: 'Haryana', basePrice: 2000 },
    { mandi: 'Panipat Mandi', district: 'Panipat', state: 'Haryana', basePrice: 2050 },
    { mandi: 'Rohtak Mandi', district: 'Rohtak', state: 'Haryana', basePrice: 1900 },
    { mandi: 'Hisar Mandi', district: 'Hisar', state: 'Haryana', basePrice: 1950 },
    { mandi: 'Ambala Mandi', district: 'Ambala', state: 'Haryana', basePrice: 2100 },

    // Madhya Pradesh
    { mandi: 'Indore Mandi', district: 'Indore', state: 'Madhya Pradesh', basePrice: 1950 },
    { mandi: 'Bhopal Mandi', district: 'Bhopal', state: 'Madhya Pradesh', basePrice: 1850 },
    { mandi: 'Ujjain Mandi', district: 'Ujjain', state: 'Madhya Pradesh', basePrice: 1900 },
    { mandi: 'Jabalpur Mandi', district: 'Jabalpur', state: 'Madhya Pradesh', basePrice: 1800 },
    { mandi: 'Gwalior Mandi', district: 'Gwalior', state: 'Madhya Pradesh', basePrice: 1750 },

    // Rajasthan
    { mandi: 'Jaipur Mandi', district: 'Jaipur', state: 'Rajasthan', basePrice: 1850 },
    { mandi: 'Jodhpur Mandi', district: 'Jodhpur', state: 'Rajasthan', basePrice: 1900 },
    { mandi: 'Kota Mandi', district: 'Kota', state: 'Rajasthan', basePrice: 1800 },
    { mandi: 'Bikaner Mandi', district: 'Bikaner', state: 'Rajasthan', basePrice: 1750 },
    { mandi: 'Udaipur Mandi', district: 'Udaipur', state: 'Rajasthan', basePrice: 1950 },

    // Tamil Nadu
    { mandi: 'Chennai APMC', district: 'Chennai', state: 'Tamil Nadu', basePrice: 2400 },
    { mandi: 'Coimbatore APMC', district: 'Coimbatore', state: 'Tamil Nadu', basePrice: 2200 },
    { mandi: 'Madurai APMC', district: 'Madurai', state: 'Tamil Nadu', basePrice: 2100 },
    { mandi: 'Salem APMC', district: 'Salem', state: 'Tamil Nadu', basePrice: 2050 },
    { mandi: 'Trichy APMC', district: 'Tiruchirappalli', state: 'Tamil Nadu', basePrice: 2150 },
];

function getTransportCost(distanceKm) {
    return Math.round(distanceKm * 4.5); // Rs 4.5 per km approx
}

const app = express();
app.use(cors());
app.use(express.json());

// ── In-memory farmer registry (use MongoDB/PostgreSQL in production) ──
const farmers = [];

// ── Twilio client ──
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// ── Mock price data (replace with real ML model output) ──
const MOCK_PRICES = {
    tomato: { current: 1800, predicted: 2150, mandi: 'Bangalore APMC', wait: 3 },
    onion: { current: 2200, predicted: 2600, mandi: 'Pune APMC', wait: 4 },
    potato: { current: 900, predicted: 1100, mandi: 'Kanpur Mandi', wait: 2 },
    rice: { current: 2100, predicted: 2300, mandi: 'Ludhiana Mandi', wait: 5 },
    wheat: { current: 1870, predicted: 1950, mandi: 'Patiala Mandi', wait: 3 },
    maize: { current: 1450, predicted: 1600, mandi: 'Gulbarga APMC', wait: 2 },
    cotton: { current: 5800, predicted: 6200, mandi: 'Guntur APMC', wait: 4 },
    soybean: { current: 3900, predicted: 4150, mandi: 'Indore Mandi', wait: 3 },
};

// ── Helper: build readable SMS body ──
function buildSMSMessage(farmer) {
    const crop = farmer.crop.toLowerCase();
    const data = MOCK_PRICES[crop];
    if (!data) {
        return `MandiMind Alert\nHello ${farmer.name}, no data available for ${farmer.crop} yet. Stay tuned!\n- MandiMind AI`;
    }
    const gain = data.predicted - data.current;
    const pct = ((gain / data.current) * 100).toFixed(1);
    const trend = gain > 0
        ? `Predicted to RISE by Rs.${gain} (+${pct}%)`
        : `Prices may fall. Consider selling soon.`;

    return [
        `MandiMind Alert`,
        `Hello ${farmer.name}!`,
        `Crop: ${farmer.crop} | Region: ${farmer.state}`,
        ``,
        `Today: Rs.${data.current}/quintal`,
        `Predicted (5 days): Rs.${data.predicted}/quintal`,
        `${trend}`,
        ``,
        `Best Mandi: ${data.mandi}`,
        `Tip: Wait ${data.wait} day(s) then sell.`,
        ``,
        `Reply STOP to unsubscribe`,
        `- MandiMind AI`,
    ].join('\n');
}

// ────────────────────────────────────────────────────────────────────────────
// POST /api/register — Register farmer + send welcome SMS
// ────────────────────────────────────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
    const { name, phone, crop, state } = req.body;
    if (!name || !phone || !crop || !state) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const normalizedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/\D/g, '')}`;
    if (farmers.find(f => f.phone === normalizedPhone)) {
        return res.status(409).json({ success: false, message: 'This number is already registered.' });
    }

    farmers.push({ name, phone: normalizedPhone, crop, state, registeredAt: new Date() });

    try {
        const msg = await client.messages.create({
            body: [
                `Welcome to MandiMind, ${name}!`,
                ``,
                `You are registered for daily crop alerts.`,
                `Crop: ${crop} | State: ${state}`,
                ``,
                `You will receive price predictions & best mandi tips every morning at 7 AM.`,
                ``,
                `Reply STOP to unsubscribe.`,
                `- MandiMind AI`,
            ].join('\n'),
            from: FROM_NUMBER,
            to: normalizedPhone,
        });
        console.log(`SMS sent to ${normalizedPhone} | SID: ${msg.sid}`);
        res.json({ success: true, message: `Welcome SMS sent to +91${phone}. You will get daily crop alerts at 7 AM!` });
    } catch (err) {
        console.error('Twilio error:', err.message);
        res.status(500).json({ success: false, message: 'Registered but SMS failed. Check Twilio credentials.', error: err.message });
    }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/send-alert — Broadcast alert to ALL registered farmers
// ────────────────────────────────────────────────────────────────────────────
app.post('/api/send-alert', async (req, res) => {
    if (farmers.length === 0) return res.json({ success: true, message: 'No registered farmers.' });

    const results = await Promise.allSettled(
        farmers.map(farmer =>
            client.messages.create({ body: buildSMSMessage(farmer), from: FROM_NUMBER, to: farmer.phone })
                .then(m => ({ phone: farmer.phone, status: 'sent', sid: m.sid }))
                .catch(e => ({ phone: farmer.phone, status: 'failed', error: e.message }))
        )
    );

    const sent = results.filter(r => r.value?.status === 'sent').length;
    res.json({ success: true, total: farmers.length, sent, results: results.map(r => r.value) });
});

// ────────────────────────────────────────────────────────────────────────────
// POST /api/send-single — Send instant SMS to one number (live demo)
// ────────────────────────────────────────────────────────────────────────────
app.post('/api/send-single', async (req, res) => {
    const { phone, crop, name = 'Farmer', state = 'Karnataka' } = req.body;
    if (!phone || !crop) return res.status(400).json({ success: false, message: 'phone and crop required.' });

    const normalizedPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/\D/g, '')}`;
    const body = buildSMSMessage({ name, phone: normalizedPhone, crop, state });

    try {
        const msg = await client.messages.create({ body, from: FROM_NUMBER, to: normalizedPhone });
        res.json({ success: true, sid: msg.sid, message: 'SMS sent!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/farmers — List registered farmers (masked)
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/farmers', (req, res) => {
    res.json({
        count: farmers.length,
        farmers: farmers.map(f => ({ ...f, phone: f.phone.slice(0, -4) + 'XXXX' })),
    });
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/predict?crop=tomato  — Run REAL Python ML model (RandomForest)
// Returns 7-day price forecast from price_model.pkl
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/predict', async (req, res) => {
    const crop = req.query.crop || 'Tomato';
    console.log(`\n🤖 Running ML model for crop: ${crop}`);
    try {
        const predictions = await runPythonPredict(crop);
        // Add metadata
        const today = predictions[0]?.predicted_price ?? 0;
        const peak = Math.max(...predictions.map(p => p.predicted_price));
        const peakDay = predictions.find(p => p.predicted_price === peak);
        res.json({
            success: true,
            crop,
            model: 'RandomForestRegressor (scikit-learn)',
            forecast: predictions,
            summary: {
                today_price: Math.round(today),
                peak_price: Math.round(peak),
                peak_date: peakDay?.date,
                days_to_peak: predictions.indexOf(peakDay),
                gain_pct: today > 0 ? (((peak - today) / today) * 100).toFixed(1) : 0,
            }
        });
    } catch (err) {
        console.error('ML predict error:', err.message);
        res.status(500).json({ success: false, error: err.message, hint: 'Make sure Python + scikit-learn + joblib are installed' });
    }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /api/recommend?crop=tomato&state=Karnataka
// Runs ML model → ranks mandis by (predicted_price - transport_cost)
// ────────────────────────────────────────────────────────────────────────────
app.get('/api/recommend', async (req, res) => {
    const crop = req.query.crop || 'Tomato';
    const state = req.query.state || 'Karnataka';

    try {
        const predictions = await runPythonPredict(crop);
        const predictedPrice = predictions[0]?.predicted_price ?? 2000;
        const peakPrice = Math.max(...predictions.map(p => p.predicted_price));
        const peakDay = predictions.findIndex(p => p.predicted_price === peakPrice);

        let stateMandis = MANDI_DB.filter(m => m.state.toLowerCase() === state.toLowerCase());

        // Fallback to random mandis if the state isn't in our database yet
        if (stateMandis.length === 0) {
            stateMandis = MANDI_DB.slice(0, 3);
        }

        // Score each mandi by net profit
        const ranked = stateMandis.map(m => {
            const distance = Math.floor(Math.random() * 150) + 30; // simulate GPS distance
            const transport = getTransportCost(distance);
            const netPrice = Math.round(m.basePrice + (peakPrice - predictedPrice) * 0.6);
            const profit = netPrice - transport;
            return {
                mandi: m.mandi,
                district: m.district,
                state: m.state,
                predicted_price: Math.round(netPrice),
                distance_km: distance,
                transport_cost: transport,
                net_profit_per_qtl: profit,
                is_best: false,
            };
        }).sort((a, b) => b.net_profit_per_qtl - a.net_profit_per_qtl);

        ranked[0].is_best = true; // mark top mandi

        res.json({
            success: true,
            crop,
            state,
            model_prediction: {
                today: Math.round(predictedPrice),
                peak: Math.round(peakPrice),
                best_day_to_sell: predictions[peakDay]?.date,
                wait_days: peakDay,
            },
            daily_forecast: predictions,
            top_mandis: ranked.slice(0, 3),
            recommendation: `Wait ${peakDay} day(s) and sell at ${ranked[0].mandi} for best profit of ₹${ranked[0].net_profit_per_qtl}/quintal`,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/health
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', farmers: farmers.length, twilio: !!process.env.TWILIO_ACCOUNT_SID });
});

// ── Start ──
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`\n🌾  MandiMind SMS Server → http://localhost:${PORT}`);
    console.log(`📱  Twilio: ${process.env.TWILIO_ACCOUNT_SID?.startsWith('AC') ? '✅ Configured' : '❌ Add credentials to .env'}`);
    console.log(`\n   POST /api/register    Register farmer`);
    console.log(`   POST /api/send-alert  Broadcast to all`);
    console.log(`   POST /api/send-single Send demo SMS\n`);
});
