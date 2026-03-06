// Mock mandi data and ML predictions

export const CROPS = [
    // Vegetables
    { id: 'tomato', name: 'Tomato', emoji: '🍅', unit: 'quintal' },
    { id: 'onion', name: 'Onion', emoji: '🧅', unit: 'quintal' },
    { id: 'potato', name: 'Potato', emoji: '🥔', unit: 'quintal' },
    // Cereals
    { id: 'wheat', name: 'Wheat', emoji: '🌾', unit: 'quintal' },
    { id: 'maize', name: 'Maize', emoji: '🌽', unit: 'quintal' },
    { id: 'paddy_common', name: 'Paddy(Common)', emoji: '🌾', unit: 'quintal' }, // equivalent to Rice
    { id: 'bajra', name: 'Bajra(Pearl Millet/Cumbu)', emoji: '🌾', unit: 'quintal' },
    { id: 'barley', name: 'Barley(Jau)', emoji: '🌾', unit: 'quintal' },
    { id: 'jowar', name: 'Jowar(Sorghum)', emoji: '🌾', unit: 'quintal' },
    { id: 'ragi', name: 'Ragi(Finger Millet)', emoji: '🌾', unit: 'quintal' },
    // Pulses
    { id: 'arhar', name: 'Arhar(Tur/Red Gram)(Whole)', emoji: '🫘', unit: 'quintal' },
    { id: 'bengal_gram', name: 'Bengal Gram(Gram)(Whole)', emoji: '🫘', unit: 'quintal' },
    { id: 'black_gram', name: 'Black Gram(Urd Beans)(Whole)', emoji: '🫘', unit: 'quintal' },
    { id: 'green_gram', name: 'Green Gram(Moong)(Whole)', emoji: '🫘', unit: 'quintal' },
    { id: 'lentil', name: 'Lentil(Masur)(Whole)', emoji: '🫘', unit: 'quintal' },
    // Oilseeds
    { id: 'copra', name: 'Copra', emoji: '🥥', unit: 'quintal' },
    { id: 'groundnut', name: 'Groundnut', emoji: '🥜', unit: 'quintal' },
    { id: 'mustard', name: 'Mustard', emoji: '🌼', unit: 'quintal' },
    { id: 'niger_seed', name: 'Niger Seed(Ramtil)', emoji: '🌻', unit: 'quintal' },
    { id: 'safflower', name: 'Safflower', emoji: '🌻', unit: 'quintal' },
    { id: 'sesamum', name: 'Sesamum(Sesame,Gingelly,Til)', emoji: '🪴', unit: 'quintal' },
    { id: 'soyabean', name: 'Soyabean', emoji: '🫘', unit: 'quintal' },
    { id: 'sunflower', name: 'Sunflower', emoji: '🌻', unit: 'quintal' },
    { id: 'sunflower_seed', name: 'Sunflower Seed', emoji: '🌻', unit: 'quintal' },
    { id: 'toria', name: 'Toria', emoji: '🌼', unit: 'quintal' },
    // Commercial Crops
    { id: 'cotton', name: 'Cotton', emoji: '🌿', unit: 'quintal' },
    { id: 'jute', name: 'Jute', emoji: '🌾', unit: 'quintal' },
    { id: 'sugarcane', name: 'Sugarcane', emoji: '🎋', unit: 'quintal' },
];

export const STATES = [
    'Karnataka', 'Maharashtra', 'Uttar Pradesh', 'Punjab',
    'Haryana', 'Madhya Pradesh', 'Rajasthan', 'Tamil Nadu',
];

const mandiData = {
    tomato: {
        Karnataka: [
            { name: 'Tumkur APMC', lat: 13.34, lng: 77.10, currentPrice: 1800, predictedPrice: 2150, transport: 0, distance: 0 },
            { name: 'Bangalore APMC', lat: 12.97, lng: 77.59, currentPrice: 2200, predictedPrice: 2480, transport: 150, distance: 65 },
            { name: 'Mysore APMC', lat: 12.29, lng: 76.64, currentPrice: 2100, predictedPrice: 2300, transport: 200, distance: 140 },
            { name: 'Hassan APMC', lat: 13.00, lng: 76.10, currentPrice: 1950, predictedPrice: 2080, transport: 120, distance: 80 },
            { name: 'Mandya APMC', lat: 12.52, lng: 76.90, currentPrice: 1700, predictedPrice: 1920, transport: 90, distance: 55 },
        ],
        Maharashtra: [
            { name: 'Nashik APMC', lat: 19.99, lng: 73.78, currentPrice: 2300, predictedPrice: 2600, transport: 0, distance: 0 },
            { name: 'Pune APMC', lat: 18.52, lng: 73.86, currentPrice: 2450, predictedPrice: 2700, transport: 180, distance: 210 },
            { name: 'Mumbai APMC', lat: 19.08, lng: 72.87, currentPrice: 2800, predictedPrice: 3100, transport: 300, distance: 175 },
            { name: 'Aurangabad APMC', lat: 19.87, lng: 75.34, currentPrice: 2100, predictedPrice: 2350, transport: 140, distance: 230 },
        ],
        'Uttar Pradesh': [
            { name: 'Agra Mandi', lat: 27.17, lng: 78.01, currentPrice: 1600, predictedPrice: 1900, transport: 0, distance: 0 },
            { name: 'Mathura Mandi', lat: 27.49, lng: 77.67, currentPrice: 1750, predictedPrice: 2000, transport: 80, distance: 55 },
            { name: 'Lucknow Mandi', lat: 26.84, lng: 80.94, currentPrice: 2000, predictedPrice: 2200, transport: 220, distance: 335 },
        ],
    },
    onion: {
        Karnataka: [
            { name: 'Bellary APMC', lat: 15.14, lng: 76.92, currentPrice: 2400, predictedPrice: 2800, transport: 0, distance: 0 },
            { name: 'Bangalore APMC', lat: 12.97, lng: 77.59, currentPrice: 2800, predictedPrice: 3200, transport: 200, distance: 300 },
            { name: 'Hubli APMC', lat: 15.36, lng: 75.12, currentPrice: 2600, predictedPrice: 2900, transport: 120, distance: 200 },
        ],
        Maharashtra: [
            { name: 'Nashik APMC', lat: 19.99, lng: 73.78, currentPrice: 2200, predictedPrice: 2600, transport: 0, distance: 0 },
            { name: 'Pune APMC', lat: 18.52, lng: 73.86, currentPrice: 2500, predictedPrice: 2900, transport: 160, distance: 210 },
            { name: 'Lasalgaon APMC', lat: 20.11, lng: 74.03, currentPrice: 2350, predictedPrice: 2700, transport: 40, distance: 20 },
        ],
    },
    potato: {
        'Uttar Pradesh': [
            { name: 'Agra Mandi', lat: 27.17, lng: 78.01, currentPrice: 900, predictedPrice: 1100, transport: 0, distance: 0 },
            { name: 'Kanpur Mandi', lat: 26.46, lng: 80.32, currentPrice: 1050, predictedPrice: 1200, transport: 120, distance: 257 },
            { name: 'Allahabad Mandi', lat: 25.44, lng: 81.84, currentPrice: 1100, predictedPrice: 1280, transport: 150, distance: 342 },
        ],
        Punjab: [
            { name: 'Jalandhar Mandi', lat: 31.32, lng: 75.57, currentPrice: 950, predictedPrice: 1150, transport: 0, distance: 0 },
            { name: 'Amritsar Mandi', lat: 31.63, lng: 74.87, currentPrice: 1000, predictedPrice: 1180, transport: 60, distance: 79 },
            { name: 'Ludhiana Mandi', lat: 30.90, lng: 75.85, currentPrice: 980, predictedPrice: 1160, transport: 45, distance: 64 },
        ],
    },
    rice: {
        Punjab: [
            { name: 'Amritsar Mandi', lat: 31.63, lng: 74.87, currentPrice: 2100, predictedPrice: 2300, transport: 0, distance: 0 },
            { name: 'Ludhiana Mandi', lat: 30.90, lng: 75.85, currentPrice: 2200, predictedPrice: 2400, transport: 80, distance: 85 },
            { name: 'Patiala Mandi', lat: 30.33, lng: 76.39, currentPrice: 2150, predictedPrice: 2350, transport: 90, distance: 104 },
        ],
        Haryana: [
            { name: 'Karnal Mandi', lat: 29.68, lng: 76.98, currentPrice: 2050, predictedPrice: 2250, transport: 0, distance: 0 },
            { name: 'Panipat Mandi', lat: 29.38, lng: 76.96, currentPrice: 2100, predictedPrice: 2280, transport: 60, distance: 50 },
        ],
    },
};

// Fallback generic data if combination not found
const genericMandiData = (crop) => [
    { name: 'Local APMC', lat: 20, lng: 78, currentPrice: 1500, predictedPrice: 1750, transport: 0, distance: 0 },
    { name: 'Nearby Mandi', lat: 20.5, lng: 78.2, currentPrice: 1700, predictedPrice: 1950, transport: 100, distance: 60 },
    { name: 'City APMC', lat: 21, lng: 79, currentPrice: 1900, predictedPrice: 2100, transport: 180, distance: 120 },
];

export function getMandiData(cropId, state) {
    if (mandiData[cropId] && mandiData[cropId][state]) {
        return mandiData[cropId][state];
    }
    return genericMandiData(cropId);
}

// Simulated 10-day price chart data
export function getPriceHistory(currentPrice) {
    const points = [];
    let price = currentPrice * 0.85;
    for (let i = -9; i <= 0; i++) {
        price += (Math.random() - 0.4) * currentPrice * 0.04;
        price = Math.max(price, currentPrice * 0.6);
        points.push({ day: i, price: Math.round(price) });
    }
    points[points.length - 1].price = currentPrice;
    return points;
}

// Simulated 7-day forecast data
export function getPriceForecast(currentPrice, predictedPrice) {
    const points = [{ day: 0, price: currentPrice }];
    const delta = (predictedPrice - currentPrice) / 5;
    for (let i = 1; i <= 7; i++) {
        const noise = (Math.random() - 0.5) * currentPrice * 0.03;
        const prev = points[points.length - 1].price;
        const next = i <= 5 ? prev + delta + noise : prev - delta * 0.3 + noise;
        points.push({ day: i, price: Math.round(Math.max(next, currentPrice * 0.7)) });
    }
    return points;
}

export const MARKET_TICKER = [
    { crop: 'Tomato', location: 'Bangalore', price: '₹2,200', change: '+8.2%', up: true },
    { crop: 'Onion', location: 'Nashik', price: '₹2,350', change: '+12.5%', up: true },
    { crop: 'Potato', location: 'Agra', price: '₹900', change: '-3.1%', up: false },
    { crop: 'Rice', location: 'Amritsar', price: '₹2,100', change: '+2.4%', up: true },
    { crop: 'Wheat', location: 'Ludhiana', price: '₹1,870', change: '+1.8%', up: true },
    { crop: 'Maize', location: 'Gulbarga', price: '₹1,450', change: '-1.5%', up: false },
    { crop: 'Cotton', location: 'Guntur', price: '₹5,800', change: '+4.7%', up: true },
    { crop: 'Soybean', location: 'Indore', price: '₹3,900', change: '+6.3%', up: true },
];

export const TESTIMONIALS = [
    {
        name: 'Ramesh Kumar',
        location: 'Tumkur, Karnataka',
        crop: 'Tomato Farmer',
        quote: 'MandiMind told me to wait 3 days before selling. I earned ₹250 extra per quintal. That is ₹12,500 more from one truck load!',
        gain: '+₹12,500',
        avatar: 'RK',
    },
    {
        name: 'Sarita Devi',
        location: 'Nashik, Maharashtra',
        crop: 'Onion Farmer',
        quote: 'The app suggested Pune mandi instead of local. After transport cost, I still gained ₹180 more per quintal. Very useful!',
        gain: '+₹9,000',
        avatar: 'SD',
    },
    {
        name: 'Harjeet Singh',
        location: 'Amritsar, Punjab',
        crop: 'Rice Farmer',
        quote: 'I used to depend on the arhtiya for price. Now MandiMind gives me real predictions. I feel more confident in decisions.',
        gain: '+₹6,200',
        avatar: 'HS',
    },
];

export const STATS = [
    { label: 'Farmers Served', value: '2.4L+', suffix: '' },
    { label: 'Avg. Profit Gain', value: '23', suffix: '%' },
    { label: 'Mandis Covered', value: '850+', suffix: '' },
    { label: 'Prediction Accuracy', value: '78', suffix: '%' },
];
