import { useState, FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Menu, 
  X, 
  Timer, 
  Percent, 
  ShieldCheck, 
  Headphones, 
  HandCoins, 
  Shield, 
  Coins, 
  Plane, 
  CircleCheck, 
  ArrowRight, 
  MessageCircle, 
  Calculator, 
  Quote, 
  Star,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState('');
  
  // EMI Calculator State
  const [amount, setAmount] = useState(1000000); // 10 Lakh default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenure, setTenure] = useState(5); // 5 Years default

  // Lead Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    service: '',
    city: ''
  });

  // Calculate EMI
  const monthlyInterestRate = interestRate / 12 / 100;
  const numberOfMonths = tenure * 12;
  const emi = amount > 0 && monthlyInterestRate > 0 && numberOfMonths > 0
    ? Math.round(
        (amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1)
      )
    : 0;
  const totalAmountPayable = emi * numberOfMonths;
  const totalInterestPayable = totalAmountPayable - amount;

  // Format currency in Indian Rupees
  const formatINR = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) {
      alert('Please enter your Name and Phone Number');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setLeadForm({ name: '', phone: '', service: '', city: '' });
    }, 4000);
  };

  const selectServiceAndScroll = (serviceKey: string) => {
    setLeadForm(prev => ({ ...prev, service: serviceKey }));
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const testimonials = [
    {
      id: 1,
      name: "Girish Jangid",
      location: "Sikar",
      text: "Very fast loan approval process. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 2,
      name: "Nishant Nehra",
      location: "Jaipur",
      text: "Got the best health insurance for my family at affordable price.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 3,
      name: "Mishal Tripathi",
      location: "Mumbai",
      text: "Best forex rates and excellent customer service.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Instagram, href: "https://instagram.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
    { icon: MessageCircle, href: "https://wa.me/917977479299" }
  ];

  return (
    <div className="min-h-screen flex flex-col w-full antialiased text-gray-900 bg-white font-sans selection:bg-brand-gold selection:text-brand-blue">
      
      {/* 1. TOPBAR */}
      <div className="bg-[#1A1A1A] text-gray-300 py-2.5 text-xs hidden md:block border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+917977479299" className="flex items-center space-x-2 hover:text-brand-gold transition-colors">
              <Phone size={14} className="text-brand-gold" />
              <span>+91 79774 79299</span>
            </a>
            <a href="mailto:kml.finance.1@gmail.com" className="flex items-center space-x-2 hover:text-brand-gold transition-colors">
              <Mail size={14} className="text-brand-gold" />
              <span>kml.finance.1@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock size={14} className="text-brand-gold" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={idx} 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white transition-colors p-1 bg-white/5 rounded-full hover:bg-white/15"
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="bg-brand-blue text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <a href="#" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-transparent border-2 border-brand-gold rounded-full flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 bg-brand-gold/15 transform rotate-45 scale-150" />
                  <div className="w-6 h-6 border-b-2 border-r-2 border-brand-gold transform rotate-[-45deg] translate-y-[-4px]" />
                  <div className="w-4 h-4 border-t-2 border-brand-gold absolute bottom-2 left-2" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-wider text-brand-gold leading-none">KML</h1>
                  <p className="text-[10px] tracking-[0.25em] text-white mt-1 uppercase">Finance</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex space-x-7">
                {[
                  { name: "Home", href: "#" },
                  { name: "Loans", onClick: () => selectServiceAndScroll('loans') },
                  { name: "Insurance", onClick: () => selectServiceAndScroll('insurance') },
                  { name: "Forex", onClick: () => selectServiceAndScroll('forex') },
                  { name: "Travel", onClick: () => selectServiceAndScroll('travel') },
                  { name: "About Us", onClick: () => document.getElementById('why-choose')?.scrollIntoView({ behavior: 'smooth' }) },
                  { name: "Contact Us", onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className={`text-sm font-medium hover:text-brand-gold cursor-pointer transition-colors relative py-1 ${
                      idx === 0 ? "text-brand-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-gold" : "text-gray-200"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-gold hover:bg-yellow-400 text-brand-blue font-semibold py-2.5 px-6 rounded transition-all duration-300 transform active:scale-95 shadow-md shadow-brand-gold/10"
              >
                Get Free Consultation
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/5"
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-blue border-t border-gray-800 absolute w-full left-0 shadow-xl">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {[
                { name: "Home", onClick: () => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
                { name: "Loans", onClick: () => selectServiceAndScroll('loans') },
                { name: "Insurance", onClick: () => selectServiceAndScroll('insurance') },
                { name: "Forex", onClick: () => selectServiceAndScroll('forex') },
                { name: "Travel", onClick: () => selectServiceAndScroll('travel') },
                { name: "About Us", onClick: () => { setMobileMenuOpen(false); document.getElementById('why-choose')?.scrollIntoView({ behavior: 'smooth' }); } },
                { name: "Contact Us", onClick: () => { setMobileMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium hover:bg-blue-950 hover:text-brand-gold transition-all"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-800">
                <button 
                  onClick={() => { setMobileMenuOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="w-full bg-brand-gold hover:bg-yellow-400 text-brand-blue font-semibold py-3 px-4 rounded transition-colors text-center shadow-lg"
                >
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        
        {/* 3. HERO SECTION */}
        <div className="relative bg-brand-blue min-h-[580px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/90 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80" 
              alt="Family and finance background" 
              className="w-full h-full object-cover opacity-35 mix-blend-overlay"
            />
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-brand-blue/15 to-transparent z-10 mix-blend-multiply" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16 md:py-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Hero Copy & Value Prop */}
              <div className="lg:col-span-6 text-white space-y-6">
                <div className="text-sm md:text-base font-semibold tracking-wider uppercase text-brand-gold">
                  Loans | Insurance | Forex | Travel
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                  Your Trusted Partner for<br />
                  <span className="text-brand-gold">LOANS, INSURANCE</span><br />
                  <span className="text-brand-gold">& TRAVEL</span> SOLUTIONS
                </h1>
                <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
                  Quick approvals, best interest rates, and complete financial and trip planning support under one roof.
                </p>

                {/* USP List */}
                <div className="grid grid-cols-2 gap-4 max-w-xl">
                  {[
                    { icon: Timer, text: "Fast Approvals" },
                    { icon: Percent, text: "Best Interest Rates" },
                    { icon: ShieldCheck, text: "Trusted Partners" },
                    { icon: Headphones, text: "End-to-End Support" }
                  ].map((usp, idx) => {
                    const Icon = usp.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2.5">
                        <div className="p-1 bg-brand-gold/10 border border-brand-gold/20 rounded">
                          <Icon size={18} className="text-brand-gold" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium leading-tight text-gray-200">{usp.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button 
                    onClick={() => selectServiceAndScroll('loans')}
                    className="bg-brand-gold hover:bg-yellow-400 text-brand-blue font-bold py-3.5 px-8 rounded-lg flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer hover:shadow-brand-gold/15"
                  >
                    Apply for Loan
                    <ArrowRight className="ml-2" size={18} />
                  </button>
                  <button 
                    onClick={() => selectServiceAndScroll('insurance')}
                    className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3.5 px-8 rounded-lg flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                  >
                    Get Insurance Quote
                    <ArrowRight className="ml-2" size={18} />
                  </button>
                </div>
              </div>

              {/* Right Column: Hero EMI Calculator Card */}
              <div className="lg:col-span-6 w-full max-w-lg mx-auto lg:mr-0">
                <div className="bg-[#0b132c]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
                  <div className="bg-gradient-to-r from-brand-blue to-blue-950 px-6 py-4 border-b border-white/5 flex items-center gap-2">
                    <Calculator className="text-brand-gold" size={20} />
                    <h3 className="text-lg font-bold text-white">Interactive EMI Calculator</h3>
                  </div>
                  
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Amount Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <label className="text-gray-300 font-medium">Loan Amount</label>
                        <span className="text-brand-gold font-bold bg-white/5 px-2.5 py-1 rounded border border-white/10">
                          {formatINR(amount)}
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="100000" 
                        max="10000000" 
                        step="100000" 
                        value={amount} 
                        onChange={e => setAmount(Number(e.target.value))} 
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>₹1 Lakh</span>
                        <span>₹1 Crore</span>
                      </div>
                    </div>

                    {/* Interest Rate Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <label className="text-gray-300 font-medium">Interest Rate (p.a.)</label>
                        <span className="text-brand-gold font-bold bg-white/5 px-2.5 py-1 rounded border border-white/10">
                          {interestRate}%
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="25" 
                        step="0.1" 
                        value={interestRate} 
                        onChange={e => setInterestRate(Number(e.target.value))} 
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>5%</span>
                        <span>25%</span>
                      </div>
                    </div>

                    {/* Tenure Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <label className="text-gray-300 font-medium">Loan Tenure (Years)</label>
                        <span className="text-brand-gold font-bold bg-white/5 px-2.5 py-1 rounded border border-white/10">
                          {tenure} Yrs
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="30" 
                        step="1" 
                        value={tenure} 
                        onChange={e => setTenure(Number(e.target.value))} 
                        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold focus:outline-none"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span>1 Yr</span>
                        <span>30 Yrs</span>
                      </div>
                    </div>

                    {/* Result Card */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 space-y-4">
                      <div className="text-center pb-3 border-b border-white/10">
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Monthly EMI</p>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-brand-gold">
                          {formatINR(emi)}
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-gray-400 block">Total Interest</span>
                          <span className="text-white font-semibold">{formatINR(totalInterestPayable > 0 ? totalInterestPayable : 0)}</span>
                        </div>
                        <div className="space-y-1 border-l border-white/10 pl-4">
                          <span className="text-gray-400 block">Total Payable</span>
                          <span className="text-white font-semibold">{formatINR(totalAmountPayable > 0 ? totalAmountPayable : 0)}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => selectServiceAndScroll('loans')}
                      className="w-full bg-brand-gold hover:bg-yellow-400 text-brand-blue font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md shadow-brand-gold/10 active:scale-95 cursor-pointer text-sm"
                    >
                      Apply For Loan Now
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 4. OUR SERVICES */}
        <section id="services" className="py-20 bg-[#F8F9FB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-xs sm:text-sm">Our Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mt-2">One Stop Solution for All Your Needs</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1: LOANS */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/40 rounded-bl-full -z-10 group-hover:bg-blue-50 transition-colors" />
                <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center mb-6 shadow-md text-white">
                  <HandCoins size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-blue-800 uppercase tracking-wide">Loans</h3>
                <ul className="w-full space-y-3.5 mb-8 flex-grow">
                  {["Personal Loan", "Business Loan", "Home Loan", "Loan Against Property"].map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CircleCheck size={18} className="text-blue-800 mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => selectServiceAndScroll('loans')}
                  className="w-full py-3 rounded font-semibold transition-all bg-blue-800 hover:bg-blue-900 text-white cursor-pointer active:scale-95 shadow-sm"
                >
                  Apply Now
                </button>
              </div>

              {/* Card 2: INSURANCE */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/40 rounded-bl-full -z-10 group-hover:bg-emerald-50 transition-colors" />
                <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center mb-6 shadow-md text-white">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-brand-green uppercase tracking-wide">Insurance</h3>
                <ul className="w-full space-y-3.5 mb-8 flex-grow">
                  {["Motor Insurance", "Health Insurance", "Life Insurance", "Travel Insurance"].map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CircleCheck size={18} className="text-brand-green mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => selectServiceAndScroll('insurance')}
                  className="w-full py-3 rounded font-semibold transition-all bg-brand-green hover:bg-green-700 text-white cursor-pointer active:scale-95 shadow-sm"
                >
                  Apply Now
                </button>
              </div>

              {/* Card 3: FOREX */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/40 rounded-bl-full -z-10 group-hover:bg-purple-50 transition-colors" />
                <div className="w-16 h-16 rounded-full bg-brand-purple flex items-center justify-center mb-6 shadow-md text-white">
                  <Coins size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-brand-purple uppercase tracking-wide">Forex</h3>
                <ul className="w-full space-y-3.5 mb-8 flex-grow">
                  {["Currency Exchange", "Travel Forex Card", "International Money Transfer"].map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CircleCheck size={18} className="text-brand-purple mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => selectServiceAndScroll('forex')}
                  className="w-full py-3 rounded font-semibold transition-all bg-brand-purple hover:bg-purple-800 text-white cursor-pointer active:scale-95 shadow-sm"
                >
                  Apply Now
                </button>
              </div>

              {/* Card 4: TOUR & TRAVEL */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/40 rounded-bl-full -z-10 group-hover:bg-orange-50 transition-colors" />
                <div className="w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center mb-6 shadow-md text-white">
                  <Plane size={32} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-brand-orange uppercase tracking-wide">Tour & Travel</h3>
                <ul className="w-full space-y-3.5 mb-8 flex-grow">
                  {["Flight Booking", "Holiday Packages", "Visa Assistance", "Hotel Booking"].map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <CircleCheck size={18} className="text-brand-orange mr-2.5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => selectServiceAndScroll('travel')}
                  className="w-full py-3 rounded font-semibold transition-all bg-brand-orange hover:bg-orange-600 text-white cursor-pointer active:scale-95 shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>



        {/* 6. WHY CHOOSE KML FINANCE */}
        <section id="why-choose" className="bg-brand-blue py-20 text-white overflow-hidden relative">
          <div className="absolute top-1/2 -left-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-0 -right-32 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-xs sm:text-sm">Value Proposition</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Why Choose KML Finance?</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: Timer, 
                  title: "Fast Approval", 
                  desc: "Quick processing and instant document closing options with zero physical paperwork hassle."
                },
                { 
                  icon: Percent, 
                  title: "Best Rates", 
                  desc: "Lowest interest rates on mortgages/loans and the best market currency exchange rates."
                },
                { 
                  icon: ShieldCheck, 
                  title: "Trusted Partners", 
                  desc: "Officially associated and certified with leading public/private banks & insurance providers."
                },
                { 
                  icon: Headphones, 
                  title: "End-to-End Support", 
                  desc: "Dedicated account manager assigned to handle complete assistance and steps for you."
                }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-lg bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                      <Icon size={32} className="text-brand-gold" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white leading-tight">{item.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. GET STARTED TODAY FORM */}
        <section id="contact" className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row relative">
              
              {/* Left Column banner */}
              <div className="p-10 lg:p-14 lg:w-2/5 flex flex-col justify-center relative bg-brand-blue text-white overflow-hidden">
                <div className="absolute inset-0 bg-blue-950/25 z-0" />
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-gold" />
                
                <div className="relative z-10 space-y-6">
                  <span className="text-brand-gold font-bold text-xs uppercase tracking-widest bg-brand-gold/10 px-3.5 py-1.5 rounded-full border border-brand-gold/25">
                    Fast Consultation
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">
                    Tell Us Your Requirements
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Submit your basic contact details and required service. Our advisory team will reach out within 2 hours with customized packages.
                  </p>
                  
                  <div className="pt-4 border-t border-white/10 space-y-4 text-xs sm:text-sm text-gray-300 font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center">
                        <Timer size={16} className="text-brand-gold" />
                      </div>
                      <span>Callback within 120 minutes guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center">
                        <ShieldCheck size={16} className="text-brand-gold" />
                      </div>
                      <span>Safe, secure & confidential details</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Form */}
              <div className="p-10 lg:p-14 lg:w-3/5 bg-gray-50 flex flex-col justify-center relative">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <CircleCheck size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-blue">Thank You!</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Your requirements have been submitted successfully. A KML Finance executive will get in touch with you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="w-full space-y-5 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Enter your name" 
                          value={leadForm.name}
                          onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors text-sm"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="Enter phone number" 
                          value={leadForm.phone}
                          onChange={e => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors text-sm"
                        />
                      </div>

                      {/* Service */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Service Required</label>
                        <div className="relative">
                          <select 
                            value={leadForm.service}
                            onChange={e => setLeadForm(prev => ({ ...prev, service: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors appearance-none text-gray-700 text-sm font-medium"
                          >
                            <option value="">Select Service</option>
                            <option value="loans">Loans</option>
                            <option value="insurance">Insurance</option>
                            <option value="forex">Forex</option>
                            <option value="travel">Tour & Travel</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <ChevronRight className="transform rotate-90" size={16} />
                          </div>
                        </div>
                      </div>

                      {/* City */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                        <input 
                          type="text" 
                          placeholder="Your city" 
                          value={leadForm.city}
                          onChange={e => setLeadForm(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-brand-gold hover:bg-yellow-400 text-brand-blue font-bold py-4 rounded-xl mt-4 flex items-center justify-center transition-all duration-300 shadow-md shadow-brand-gold/15 cursor-pointer active:scale-[0.98]"
                    >
                      Get Free Consultation
                      <ClipboardCheck className="ml-2" size={20} />
                    </button>
                  </form>
                )}

                {/* Decorative Icon */}
                <div className="hidden lg:flex absolute right-4 bottom-4 opacity-5 pointer-events-none transform translate-x-8 translate-y-8">
                  <ClipboardCheck size={220} className="text-brand-blue" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS SECTION */}
        <section className="py-20 bg-[#F8F9FB] border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-xs sm:text-sm">Client Reviews</span>
              <h2 className="text-3xl font-bold text-brand-blue mt-2">Trusted by Hundreds of Happy Customers</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto mt-4 rounded-full" />
            </div>

            <div className="relative">
              {/* Prev/Next Navigation icons (aesthetic decorators) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-12 hidden md:flex items-center justify-center">
                <button className="w-10 h-10 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors cursor-pointer">
                  <ChevronLeft size={20} />
                </button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-12 hidden md:flex items-center justify-center">
                <button className="w-10 h-10 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-brand-blue hover:border-brand-blue transition-colors cursor-pointer">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Grid of Testimonials */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((test) => (
                  <div 
                    key={test.id} 
                    className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    <Quote size={36} className="absolute top-6 left-6 text-gray-100 group-hover:text-gray-200/50 transition-colors" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} className="fill-brand-gold text-brand-gold" />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 font-medium text-sm leading-relaxed min-h-[50px]">
                        "{test.text}"
                      </p>
                      
                      <div className="flex items-center gap-4 border-t border-gray-100 pt-5">
                        <img 
                          src={test.image} 
                          alt={test.name} 
                          className="w-11 h-11 rounded-full object-cover shadow-sm border border-gray-200"
                        />
                        <div>
                          <h4 className="font-bold text-brand-blue text-sm leading-tight">{test.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{test.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 9. FOOTER */}
      <footer className="bg-brand-blue text-white pt-16 border-t-[8px] border-brand-gold relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1 & 2: Brand Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-transparent border-2 border-brand-gold rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-gold/15 transform rotate-45 scale-150" />
                  <div className="w-5 h-5 border-b-2 border-r-2 border-brand-gold transform rotate-[-45deg] translate-y-[-3px]" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold tracking-wider text-brand-gold leading-none">KML</h2>
                  <p className="text-[9px] tracking-[0.22em] text-white mt-1 uppercase">Finance</p>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Your trusted partner for Loans, Insurance, Forex & Travel. We provide tailor-made finance structures, instant documentation pre-approvals, and complete trip solutions with 24/7 client support.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={idx}
                      href={social.href} 
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/5 hover:bg-brand-gold hover:text-brand-blue w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Col 3: Quick Links */}
            <div>
              <h3 className="text-brand-gold font-bold text-sm tracking-wider uppercase mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#" },
                  { name: "Loans", onClick: () => selectServiceAndScroll('loans') },
                  { name: "Insurance", onClick: () => selectServiceAndScroll('insurance') },
                  { name: "Forex", onClick: () => selectServiceAndScroll('forex') },
                  { name: "Tour & Travel", onClick: () => selectServiceAndScroll('travel') },
                  { name: "Contact Us", onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }
                ].map((link, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={link.onClick}
                      className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Our Services */}
            <div>
              <h3 className="text-brand-gold font-bold text-sm tracking-wider uppercase mb-6">Our Services</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                {["Personal Loan", "Business Loan", "Health Insurance", "Forex Exchange", "Flight Booking", "Visa Assistance"].map((srv, idx) => (
                  <li key={idx}>
                    <button 
                      onClick={() => selectServiceAndScroll(idx < 2 ? 'loans' : idx === 2 ? 'insurance' : idx === 3 ? 'forex' : 'travel')} 
                      className="hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {srv}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-brand-gold font-bold text-sm tracking-wider uppercase mb-5">Contact Us</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-3">
                    <Timer size={18} className="text-brand-gold flex-shrink-0 mt-0.5" />
                    <span>First Floor, Shop No 7, Near Allen Coaching, Piprali Road, Sikar Rajasthan-332001</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} className="text-brand-gold flex-shrink-0" />
                    <a href="tel:+917977479299" className="hover:text-white transition-colors">+91 79774 79299</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={18} className="text-brand-gold flex-shrink-0" />
                    <a href="mailto:kml.finance.1@gmail.com" className="hover:text-white transition-colors">kml.finance.1@gmail.com</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe size={18} className="text-brand-gold flex-shrink-0" />
                    <span>www.kmlfinance.com</span>
                  </li>
                </ul>
              </div>

              {/* WhatsApp Box */}
              <div className="pt-4 border-t border-white/5">
                <h3 className="text-brand-gold font-bold text-sm tracking-wider uppercase mb-3">WhatsApp Us</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <span className="text-xs text-gray-300 leading-tight">
                    Chat with us<br />on WhatsApp
                  </span>
                </div>
                <a 
                  href="https://wa.me/917977479299" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-block bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold py-2 px-5 text-xs rounded transition-all text-center"
                >
                  Chat Now
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-white/5 py-6 bg-[#070d20]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © 2026 KML Finance. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp CTA */}
        <a 
          href="https://wa.me/917977479299" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#1ebd5a] hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer animate-pulse"
        >
          <MessageCircle size={30} />
        </a>
      </footer>

    </div>
  );
}
