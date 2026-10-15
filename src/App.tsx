/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Zap, Globe, Instagram, Youtube, Twitter, ArrowUp, LogOut, CheckCircle2, User } from 'lucide-react';
import { motion } from 'motion/react';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import ServicesSection from './components/ServicesSection';
import ServicesPipeline from './components/ServicesPipeline';
import TrustAnimation from './components/TrustAnimation';
import ShopNow from './components/ShopNow';
import { GoogleAuthModal, UserProfile } from './components/GoogleAuthModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [shopDefaultMode, setShopDefaultMode] = useState<'browse' | 'sell'>('browse');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('zed_store_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    try {
      localStorage.setItem('zed_store_user', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('zed_store_user');
    } catch (e) {
      console.error(e);
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    'Shop Now', 'Panels', 'Likes', 'Guild Glory Bot', 'IG Services', 'Proxy FF', 'Pricing', 'Reviews', 'Contact'
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      <BackgroundAnimation />

      {/* Real Google Auth Modal */}
      <GoogleAuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />

      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div 
            onClick={() => setCurrentPage('Home')}
            className="text-2xl font-bold tracking-tighter uppercase font-display text-white cursor-pointer select-none"
          >
            Zed Store
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition cursor-pointer"
                title={user.email}
              >
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-medium text-white max-w-[110px] truncate hidden sm:inline">{user.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition px-3 py-1.5 rounded-full hover:bg-white/5 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Log in</span>
              </button>
            )}

            <button 
              onClick={() => {
                setCurrentPage('Shop Now');
                setShopDefaultMode('browse');
              }}
              className="bg-white text-black px-5 py-2 rounded-sm text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
            >
              Get Started
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 ml-1 hover:bg-white/10 rounded-sm text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Sidebar Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full w-80 max-w-[90vw] bg-[#0a0a0a] border-l border-b border-white/10 shadow-2xl p-6 sm:p-8 z-50">
            {/* Navigation links */}
            <div className="flex flex-col gap-5 text-right">
              {navItems.map(item => (
                <button 
                  key={item}
                  onClick={() => {
                    setCurrentPage(item);
                    setIsMenuOpen(false);
                  }}
                  className={`text-xl sm:text-2xl font-display font-light transition ${currentPage === item ? 'text-white underline decoration-2 underline-offset-8' : 'text-neutral-400 hover:text-white'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Below the content: User Auth & Logout */}
            <div className="mt-8 pt-6 border-t border-white/10">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-left">
                    {user.picture ? (
                      <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 text-sm font-medium transition cursor-pointer"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black hover:bg-neutral-200 text-sm font-semibold transition cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign In with Google</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {currentPage === 'Home' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-32"
          >
            {/* Hero Section with Grid */}
            <div className="relative">
              <div className="absolute inset-0 grid-lines pointer-events-none"></div>
              <section className="grid lg:grid-cols-12 gap-12 lg:gap-12 min-h-[50vh] items-center relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-12 space-y-8 text-center flex flex-col items-center"
              >
                
                <h1 className="leading-[0.95] lg:text-7xl xl:text-8xl text-5xl font-black text-white tracking-tighter font-sans">
                  The Ultimate <br />
                  <span className="text-white">FF Marketplace</span>
                </h1>
                
                <p className="leading-relaxed lg:text-xl text-lg font-normal text-neutral-400 font-sans max-w-2xl">
                  Unlock exclusive FF assets and professional gaming tools with unparalleled security and speed.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4 w-full justify-center lg:justify-center">
                  {/* Browse Inventory */}
                  <button onClick={() => { setCurrentPage('Shop Now'); setShopDefaultMode('browse'); }} className="group flex min-w-[180px] decoration-0 transition-transform active:scale-95 cursor-pointer outline-none w-auto h-[50px] pr-8 pl-8 relative items-center justify-center bg-[rgba(255,255,255,0.05)] rounded-full border-none">
                    {/* Glow Layer */}
                    <div className="pointer-events-none transition-opacity ease-in-out duration-[1200ms] group-hover:opacity-0 opacity-100 absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(15%_50%_at_50%_100%,rgb(255,255,255)_0%,rgba(255,255,255,0)_100%)] rounded-full blur-[15px]"></div>
                    {/* Glow Hover Layer */}
                    <div className="pointer-events-none transition-opacity ease-in-out duration-[1200ms] group-hover:opacity-100 opacity-0 absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(60.6%_50%_at_50%_100%,rgb(255,255,255)_0%,rgba(255,255,255,0)_100%)] rounded-full blur-[18px]"></div>
                    {/* Stroke Layer */}
                    <div className="pointer-events-none will-change-auto transition-opacity ease-in-out duration-[1200ms] group-hover:opacity-0 opacity-100 absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(10.7%_50%_at_50%_100%,rgb(255,255,255)_0%,rgba(255,255,255,0)_100%)] rounded-full"></div>
                    {/* Stroke Hover Layer */}
                    <div className="pointer-events-none will-change-auto transition-opacity ease-in-out duration-[1200ms] group-hover:opacity-100 opacity-0 absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(60.1%_50%_at_50%_100%,rgb(255,255,255)_0%,rgba(255,255,255,0)_100%)] rounded-full"></div>
                    {/* Fill Layer */}
                    <div className="rounded-full absolute top-[1px] right-[1px] bottom-[1px] left-[1px] bg-[rgb(0,0,0)] opacity-100"></div>

                    {/* Content Layer */}
                    <div className="relative z-20 flex items-center justify-center gap-2 opacity-100">
                      <span className="m-0 p-0 font-sans text-[15px] font-medium text-white tracking-wide" style={{ WebkitFontSmoothing: 'antialiased', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        Browse Inventory
                      </span>
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </button>

                  {/* Create Account */}
                  <button type="button" role="button" aria-label="Create Account" className="group relative inline-flex shadow-[0_8px_16px_-4px_rgba(255,255,255,0.05)] hover:shadow-[0_12px_20px_-6px_rgba(255,255,255,0.1)] transition duration-300 ease-out select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 transform-gpu hover:-translate-y-0.5 text-white rounded-full pt-[1px] pr-[1px] pb-[1px] pl-[1px] items-center justify-center" style={{ backgroundImage: 'linear-gradient(144deg,rgba(255,255,255,0.3), rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2))' }}>
                    <span className="flex items-center justify-center gap-2 text-[15px] leading-none min-w-[140px] w-full h-full transition-colors duration-300 group-hover:bg-black/50 font-medium bg-black/80 rounded-full pt-3 pr-5 pb-3 pl-5">
                      <span className="">Create Account</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Hero Visual */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 flex flex-col justify-start relative h-full min-h-[400px]"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-900/30 to-blue-900/30 opacity-50 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="relative flex flex-col justify-start">
                </div>
              </motion.div>
            </section>
          </div>

            {/* Services Section */}
            <ServicesPipeline />
            <ServicesSection />
            <TrustAnimation />

            {/* Trending Items */}
            <section>
              <div className="flex justify-between items-end mb-12">
                <h2 className="text-4xl font-display font-bold tracking-tighter text-white">Premium Assets</h2>
                <button onClick={() => setCurrentPage('Shop Now')} className="text-sm font-medium underline underline-offset-4 text-neutral-300">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer border border-transparent hover:border-white/10 transition-all p-2 rounded-xl"
                  >
                    <div className="h-96 bg-neutral-900 mb-6 overflow-hidden rounded-lg">
                      <div className="w-full h-full bg-neutral-800 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex justify-between items-start px-2">
                      <div>
                        <h4 className="font-display font-bold text-lg text-white">Elite Free Fire Account</h4>
                        <p className="text-neutral-400 text-sm">Seller: @ZedOfficial</p>
                      </div>
                      <span className="font-mono text-lg font-bold text-white">$250.00</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
        
        {/* Shop Now Page */}
        {currentPage === 'Shop Now' && <ShopNow defaultMode={shopDefaultMode} />}

        {/* Simple Page Content */}
        {currentPage !== 'Home' && currentPage !== 'Shop Now' && (
          <div className="py-20">
            <h1 className="text-5xl font-bold tracking-tighter mb-8 text-white">{currentPage}</h1>
            <p className="text-lg text-neutral-400 max-w-2xl">This page is currently under development. Our team is working to provide the premium experience you expect from Zed Store.</p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-32 w-full px-4 md:px-8">
        <div className="max-w-[1920px] mx-auto">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 border-b border-white/10">
              {/* Left: Brand & Mission */}
              <div className="p-8 md:p-16 border-r border-white/10 space-y-6">
                <div className="text-3xl md:text-4xl font-bold tracking-tighter text-white">ZED STORE</div>
                
                <p className="text-lg text-white/70 max-w-md">
                  The authority in premium gaming services and FF assets. Providing security, speed, and trust for all users.
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-black uppercase tracking-wide font-bold mb-2">Our Mission</p>
                  <p className="text-white/80 font-medium">Making professional gaming assets secure, accessible, and fast for everyone.</p>
                </div>
              </div>

              {/* Right: Newsletter Signup */}
              <div className="p-8 md:p-16 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white/95 mb-2">Stay Connected</h3>
                  <p className="text-white/60">Get updates on new inventory and exclusive deals.</p>
                </div>
                <div className="space-y-3">
                  <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
                    <input type="email" placeholder="Enter your email address" className="h-12 w-full bg-transparent px-4 text-white/90 placeholder-white/50 focus:outline-none focus:ring-0" />
                  </div>
                  <button className="w-full h-12 hover:from-slate-900 hover:to-slate-700 transition font-medium text-slate-400 bg-gradient-to-t from-slate-900 to-slate-700/25 border-slate-50/10 border rounded-xl shadow-lg">
                    Subscribe to Updates
                  </button>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="p-8 md:p-16 grid grid-cols-2 lg:grid-cols-7 gap-8 border-b border-white/10">
              {['Shop Now', 'Panels', 'Likes', 'Guild Glory Bot', 'IG Services', 'Proxy FF', 'Pricing', 'Reviews', 'Contact', user ? 'Logout' : 'Log in'].map((item) => (
                <div key={item} className="space-y-4">
                  <a 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (item === 'Logout') {
                        handleLogout();
                      } else if (item === 'Log in') {
                        setIsAuthModalOpen(true);
                      } else {
                        setCurrentPage(item); 
                      }
                    }} 
                    className="text-white/70 hover:text-white transition text-sm font-bold uppercase tracking-wide cursor-pointer"
                  >
                    {item}
                  </a>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="p-8 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="text-sm text-white/60">
                <p>© 2026 ZED STORE. All rights reserved.</p>
              </div>
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition">
                <ArrowUp className="w-4 h-4" />
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
