'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ClipboardCheck, 
  CheckCircle2,
  Building,
  Activity,
  Award,
  Sliders,
  Wrench
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  
  // Earthing System Grounding Parameters
  earthingSystemType: string;
  faultCurrent: string; // kA
  soilResistivity: string; // ohm-meter
  
  // Hardware Dimensions
  electrodeDiameter: string; // mm
  electrodeLength: string; // meters
  electrodeQty: string;
  
  // Backfill Chemical Compounds
  compoundQty: string; // 25kg bags
  
  // Lightning Arrester Options
  arresterType: string;
  arresterQty: string;
  
  // Pits & Accessories
  inspectionChamber: string;
  clampsNeeded: boolean;
  notes: string;
}

const initialFormState: QuoteFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  location: '',
  
  earthingSystemType: 'Chemical Pipe-in-Pipe Electrode',
  faultCurrent: '40', // 40 kA
  soilResistivity: '100', // ohm-meter
  
  electrodeDiameter: '40mm',
  electrodeLength: '3.0 Meters',
  electrodeQty: '10',
  
  compoundQty: '20', // bags
  
  arresterType: 'Conventional Multi-Spike Franklin Rod',
  arresterQty: '2',
  
  inspectionChamber: 'Heavy-Duty Polyplastic Earth Pit',
  clampsNeeded: true,
  notes: ''
};

const systemTypes = [
  { id: 'pipe', name: 'Chemical Pipe-in-Pipe Electrode', tag: 'HEAVY DUTY', desc: 'Inner/outer metal tubes filled with crystalline salts.' },
  { id: 'bonded', name: 'Copper Bonded Solid Steel Rod', tag: 'POPULAR', desc: '99.9% molecular copper-coated steel rods.' },
  { id: 'plate', name: 'Plate Earthing System', tag: 'STATION GRADE', desc: 'Pure copper plate buried with charcoal & salt layers.' },
  { id: 'strip', name: 'Strip/Grid Grounding', tag: 'SUBSTATION', desc: 'Horizontal flat copper strip running inside concrete.' },
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');
      if (product) {
        // Pre-fill matching grounding system if possible, otherwise write into notes
        const matchedSystem = systemTypes.find(sys => 
          sys.name.toLowerCase().includes(product.toLowerCase()) || 
          product.toLowerCase().includes(sys.name.toLowerCase())
        );

        setFormData(prev => ({
          ...prev,
          earthingSystemType: matchedSystem ? matchedSystem.name : prev.earthingSystemType,
          notes: `Inquiry for product: ${product}. Please provide specifications and details.`
        }));
      }
    }
  }, []);

  const handleInputChange = (field: keyof QuoteFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEstimate = () => {
    // Estimating cost of selected grounding system
    let baseRatePerElectrode = 1500; // Copper bonded rod
    if (formData.earthingSystemType === 'Chemical Pipe-in-Pipe Electrode') baseRatePerElectrode = 2800;
    if (formData.earthingSystemType === 'Plate Earthing System') baseRatePerElectrode = 6500;
    if (formData.earthingSystemType === 'Strip/Grid Grounding') baseRatePerElectrode = 4500;

    // Adjust according to length and diameter
    const lengthFactor = formData.electrodeLength.includes('3.0') ? 1.5 : formData.electrodeLength.includes('2.0') ? 1.1 : 0.8;
    const diameterFactor = formData.electrodeDiameter.includes('40mm') ? 1.6 : formData.electrodeDiameter.includes('25mm') ? 1.2 : 0.9;
    const electrodeQty = parseInt(formData.electrodeQty) || 1;

    // Fault current factors (higher kA requires thicker copper, raising cost)
    const kAFactor = parseFloat(formData.faultCurrent) > 40 ? 1.4 : parseFloat(formData.faultCurrent) > 25 ? 1.1 : 0.9;

    const totalElectrodeCost = baseRatePerElectrode * lengthFactor * diameterFactor * kAFactor * electrodeQty;

    // Backfill Compound bags (typically ₹450 / 25KG bag)
    const compoundBags = parseInt(formData.compoundQty) || 1;
    const compoundCost = compoundBags * 480;

    // Lightning Arrester System
    let arresterUnitCost = 1800; // Franklin rod
    if (formData.arresterType === 'ESE Active Streamer Terminal') arresterUnitCost = 14500; // Premium ESE terminal
    const arresterQty = parseInt(formData.arresterQty) || 0;
    const arresterCost = arresterQty * arresterUnitCost;

    // Pit Chamber cost (Concrete vs Polyplastic)
    const pitCost = formData.inspectionChamber.includes('Concrete') ? 750 : 450;
    const clampCost = formData.clampsNeeded ? (electrodeQty * 120) : 0;

    return Math.round(totalElectrodeCost + compoundCost + arresterCost + pitCost + clampCost);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#060a14] min-h-screen text-white font-display relative">
      {/* High-Tech Grounding Grid Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(212, 175, 55, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(212, 175, 55, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="absolute top-20 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-32 pb-12 z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            GROUNDING ESTIMATION CALCULATOR
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Get an <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] to-[#b8860b]">Earthing Quote</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Calculate your fault current requirements, select premium copper alloys, and size chemical compounds for heavy-duty protection.
          </p>
        </motion.div>
      </section>

      {/* Main Earthing Interface */}
      <section className="py-8 pb-24 relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Earthing Form container */}
          <div className="lg:col-span-8">
            <motion.div 
              layout
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Progress Line */}
              <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                {[
                  { num: 1, label: 'Partner details' },
                  { num: 2, label: 'Earthing Systems' },
                  { num: 3, label: 'Hardware Dimensions' }
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${step >= s.num ? 'bg-[#d4af37] text-black shadow-lg shadow-yellow-400/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                      {s.num}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest hidden sm:inline ${step >= s.num ? 'text-white' : 'text-white/40'}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-[#d4af37]/20 border border-[#d4af37]/35 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <ShieldCheck className="text-[#d4af37]" size={36} />
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Earthing Inquiry Received!</h3>
                    <p className="text-white/60 text-sm max-w-lg mx-auto mb-8 leading-relaxed font-medium">
                      Thank you, <span className="text-[#d4af37] font-bold">{formData.name}</span>. Our grounding design team has received your fault ratings and is stamping your project design drawing layout now.
                    </p>
                    <button 
                      onClick={() => { setStep(1); setFormData(initialFormState); setSubmitted(false); }}
                      className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                      New Earth Design Calculation
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* STEP 1: Contact Details & Location */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Step 1: Contact & Project Site</h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {[
                            { id: 'name', label: 'Contact Name', placeholder: 'John Doe', type: 'text' },
                            { id: 'email', label: 'Corporate Email', placeholder: 'engineer@substation.com', type: 'email' },
                            { id: 'phone', label: 'Direct Phone', placeholder: '+91 99798 52555', type: 'tel' },
                            { id: 'company', label: 'Company / Project Client', placeholder: 'Solar Power Grid Ltd', type: 'text' },
                          ].map(f => (
                            <div key={f.id} className="flex flex-col gap-2">
                              <label htmlFor={f.id} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">{f.label}</label>
                              <input
                                id={f.id}
                                required
                                type={f.type}
                                placeholder={f.placeholder}
                                value={formData[f.id as keyof QuoteFormData] as string}
                                onChange={(e) => handleInputChange(f.id as keyof QuoteFormData, e.target.value)}
                                onFocus={() => setFocused(f.id)}
                                onBlur={() => setFocused('')}
                                className={`w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none transition-all duration-300 bg-white/5 border ${focused === f.id ? 'border-[#d4af37] bg-white/10 shadow-lg shadow-yellow-400/5' : 'border-white/10'}`}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="location" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Project Site Location (City/State)</label>
                          <input
                            id="location"
                            required
                            type="text"
                            placeholder="Rajkot, Gujarat, India"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            onFocus={() => setFocused('location')}
                            onBlur={() => setFocused('')}
                            className={`w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none transition-all duration-300 bg-white/5 border ${focused === 'location' ? 'border-[#d4af37] bg-white/10 shadow-lg shadow-yellow-400/5' : 'border-white/10'}`}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Grounding System selection & Electrical metrics */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Step 2: Grounding System Selection</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {systemTypes.map(sys => (
                              <button
                                key={sys.id}
                                type="button"
                                onClick={() => handleInputChange('earthingSystemType', sys.name)}
                                className={`p-6 rounded-3xl border text-left transition-all ${formData.earthingSystemType === sys.name ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider ${formData.earthingSystemType === sys.name ? 'bg-[#d4af37] text-black' : 'bg-white/5 text-white/50'}`}>
                                    {sys.tag}
                                  </span>
                                </div>
                                <h4 className="text-sm font-black uppercase tracking-tight mb-2">{sys.name}</h4>
                                <p className="text-white/40 text-xs leading-normal font-medium">{sys.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="soilResistivity" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Estimated Soil Resistivity (Ω·m)</label>
                            <select
                              id="soilResistivity"
                              value={formData.soilResistivity}
                              onChange={(e) => handleInputChange('soilResistivity', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none bg-[#0a0f1d] border border-white/10"
                            >
                              <option value="50">Low Ground Moist Soil (50 Ω·m)</option>
                              <option value="100">Standard Sandy/Loam Clay (100 Ω·m)</option>
                              <option value="250">Dry Clay & Gravel Mix (250 Ω·m)</option>
                              <option value="800">Hard Solid Granite (800 Ω·m)</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="faultCurrent" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Required Fault Current Rating (kA)</label>
                            <select
                              id="faultCurrent"
                              value={formData.faultCurrent}
                              onChange={(e) => handleInputChange('faultCurrent', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none bg-[#0a0f1d] border border-white/10"
                            >
                              <option value="10">10 kA (Commercial Building)</option>
                              <option value="25">25 kA (Light Industrial Substation)</option>
                              <option value="40">40 kA (Heavy-Duty Generating Grid)</option>
                              <option value="50">50 kA (Ultra-Voltage Station / Refinery)</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Specific Earthing Hardware Dimensions & Accessories */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Step 3: Component sizing & extras</h3>
                        
                        <div className="grid sm:grid-cols-3 gap-6">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="electrodeDiameter" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Electrode Diameter</label>
                            <select
                              id="electrodeDiameter"
                              value={formData.electrodeDiameter}
                              onChange={(e) => handleInputChange('electrodeDiameter', e.target.value)}
                              className="w-full px-5 py-4 rounded-2xl text-xs font-bold text-white outline-none bg-[#0a0f1d] border border-white/10"
                            >
                              <option value="17.2mm">17.2 mm (Standard Ground Rod)</option>
                              <option value="25mm">25 mm (Substation Core)</option>
                              <option value="40mm">40 mm (Pipe-in-Pipe Super Duty)</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="electrodeLength" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Electrode Length</label>
                            <select
                              id="electrodeLength"
                              value={formData.electrodeLength}
                              onChange={(e) => handleInputChange('electrodeLength', e.target.value)}
                              className="w-full px-5 py-4 rounded-2xl text-xs font-bold text-white outline-none bg-[#0a0f1d] border border-white/10"
                            >
                              <option value="1.2 Meters">1.2 Meters</option>
                              <option value="2.0 Meters">2.0 Meters</option>
                              <option value="3.0 Meters">3.0 Meters</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="electrodeQty" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Electrode Quantity</label>
                            <input
                              id="electrodeQty"
                              type="number"
                              min="1"
                              max="1000"
                              value={formData.electrodeQty}
                              onChange={(e) => handleInputChange('electrodeQty', e.target.value)}
                              className="w-full px-5 py-4 rounded-2xl text-xs font-bold text-white outline-none bg-white/5 border border-white/10"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="compoundQty" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Backfill Compound Volume (25KG Bags)</label>
                            <input
                              id="compoundQty"
                              type="number"
                              min="1"
                              max="1000"
                              value={formData.compoundQty}
                              onChange={(e) => handleInputChange('compoundQty', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none bg-white/5 border border-white/10"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="inspectionChamber" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Earth Pit / Inspection Chamber</label>
                            <select
                              id="inspectionChamber"
                              value={formData.inspectionChamber}
                              onChange={(e) => handleInputChange('inspectionChamber', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none bg-[#0a0f1d] border border-white/10"
                            >
                              <option value="Heavy-Duty Polyplastic Earth Pit">Polyplastic Heavy-Duty Pit (₹450)</option>
                              <option value="Reinforced Concrete Chamber">Reinforced Precast Concrete Pit (₹750)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 items-center">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="arresterType" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Lightning Arrester Model</label>
                            <select
                              id="arresterType"
                              value={formData.arresterType}
                              onChange={(e) => handleInputChange('arresterType', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none bg-[#0a0f1d] border border-white/10"
                            >
                              <option value="Conventional Multi-Spike Franklin Rod">Conventional Franklin Multi-Spike (₹1,800)</option>
                              <option value="ESE Active Streamer Terminal">ESE Active Early Streamer Arrester (₹14,500)</option>
                            </select>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="arresterQty" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">Lightning Arrester Quantity</label>
                            <input
                              id="arresterQty"
                              type="number"
                              min="0"
                              max="100"
                              value={formData.arresterQty}
                              onChange={(e) => handleInputChange('arresterQty', e.target.value)}
                              className="w-full px-6 py-4 rounded-2xl text-sm font-bold text-white outline-none bg-white/5 border border-white/10"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                          <input
                            id="clampsNeeded"
                            type="checkbox"
                            checked={formData.clampsNeeded}
                            onChange={(e) => handleInputChange('clampsNeeded', e.target.checked)}
                            className="w-5 h-5 rounded border-white/10 accent-[#d4af37]"
                          />
                          <label htmlFor="clampsNeeded" className="text-xs font-black uppercase tracking-wider text-white/80">Include Custom Grounding Clamps & U-Bolts (Expt. Estimate ₹120 per clamp)</label>
                        </div>
                      </motion.div>
                    )}

                    {/* Step controllers */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-12">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors"
                        >
                          <ChevronLeft size={16} /> Previous
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-6 py-4 bg-[#d4af37] text-black hover:bg-[#b8860b] rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-yellow-400/20"
                        >
                          Next Step <ChevronRight size={16} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest transition-transform transform active:scale-95 shadow-xl shadow-yellow-400/30"
                        >
                          Submit Grounding Spec <Send size={14} />
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Estimation Preview Sidebar */}
          <div className="lg:col-span-4 sticky top-32 self-start">


            {/* Support guarantee cards */}
            <div className="p-8 rounded-[40px] bg-slate-900/50 border border-white/5 space-y-6">
              {[
                { icon: CheckCircle2, title: 'CPRI Certified Electrodes', desc: 'Sourced from heavy-duty pure alloys, compliant with IS 3043 & IEC 62561.' },
                { icon: Award, title: 'Extreme Anti-Corrosion', desc: 'Superior molecular copper bonded coating with 250+ micron thickness.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-black uppercase tracking-tight text-white">{item.title}</h5>
                    <p className="text-white/40 text-xs leading-normal mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
