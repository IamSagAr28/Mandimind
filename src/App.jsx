import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import PricePredictor from './components/PricePredictor';
import AIAssistant from './components/AIAssistant';
import MarketPulse from './components/MarketPulse';
import ImpactSection from './components/ImpactSection';
import SMSAlerts from './components/SMSAlerts';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <PricePredictor />
        <AIAssistant />
        <MarketPulse />
        <ImpactSection />
        <SMSAlerts />
      </main>
      <Footer />
    </div>
  );
}
