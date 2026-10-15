import React, { useState, useEffect, useRef } from 'react';
import FileUpload from './FileUpload';

interface ShopNowProps {
  defaultMode?: 'browse' | 'sell';
}

export default function ShopNow({ defaultMode = 'browse' }: ShopNowProps) {
  const [images, setImages] = useState<string[]>([]);
  const [mode, setMode] = useState<'browse' | 'sell'>(defaultMode);
  const [sellStep, setSellStep] = useState<'idLogin' | 'bio' | 'bind'>('idLogin');
  const [hasCompletedSpecs, setHasCompletedSpecs] = useState(false);
  const [hasAgreedToRules, setHasAgreedToRules] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const formDataRef = useRef<Record<string, string>>({});
  const [autoFilledFields, setAutoFilledFields] = useState<string[]>([]);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  
  // Verification states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationTimer, setVerificationTimer] = useState(120);
  const [initialLastLoginDisplay, setInitialLastLoginDisplay] = useState<number | null>(null);
  const [currentLastLoginDisplay, setCurrentLastLoginDisplay] = useState<number | null>(null);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);
  const stagingData = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialLastLoginRef = useRef<number | null>(null);
  const uidRef = useRef<string>("");

  useEffect(() => {
    // Proactively ping the API to wake up the Render free tier instance
    fetch('https://info-api-fk6k.onrender.com/')
      .then(res => res.json())
      .then(data => {
        if (data.ok || data.service) setServerOnline(true);
      })
      .catch(() => setServerOnline(false));
  }, []);

  const handleLoadTestData = (testUid: string) => {
    const demoSummary = {
      uid: testUid,
      nickname: '⚡ ZED·STORE ⚡',
      level: '78',
      region: 'IND',
      account_created_at: '2020-04-12T10:00:00Z',
      social: { signature: '👑 ZED STORE OFFICIAL • LEGENDARY FF ID 👑' },
      ep_history: [{ owned_pass: true, max_level: 100 }, { owned_pass: true, max_level: 100 }, { owned_pass: true, max_level: 100 }],
      last_login: Math.floor(Date.now() / 1000)
    };
    finalizeAutofill(demoSummary);
    setSellStep('bio');
    setVerificationError(null);
  };

  const fetchAccountDetails = async (uid: string, isPolling = false) => {
    if (!isPolling) setIsChecking(true);
    setVerificationError(null);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(`https://info-api-fk6k.onrender.com/api/uid/${uid}`, {
        signal: controller.signal
      }).catch(err => {
        if (err.name === 'AbortError') {
          throw new Error('Upstream timeout');
        }
        throw err;
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('UID not found');
      const summary = await response.json();

      if (!summary || !summary.uid) throw new Error('Invalid data format');

      if (isPolling) {
        setCurrentLastLoginDisplay(summary.last_login);
        const fiveMinutesInMs = 5 * 60 * 1000;
        
        // FIX #2: normalise seconds vs milliseconds
        const loginMs = summary.last_login > 1e12
          ? summary.last_login
          : summary.last_login * 1000;
        
        if (Date.now() - loginMs < fiveMinutesInMs) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          finalizeAutofill(summary);
          setSellStep('bio');
          setShowVerificationModal(false);
        }
        return;
      }

      stagingData.current = summary;
      initialLastLoginRef.current = summary.last_login;
      setInitialLastLoginDisplay(summary.last_login);
      setCurrentLastLoginDisplay(summary.last_login);
      
      // FIX #1: save UID to ref before opening modal
      uidRef.current = uid;
      
      setIsChecking(false);  // FIX #3: reset before modal opens
      setShowVerificationModal(true);
      setVerificationTimer(120);

    } catch (e: any) {
      if (!isPolling) {
        setIsChecking(false);
        if (e?.message === 'Upstream timeout') {
          setVerificationError(`⚠️ Render API is online, but Free Fire upstream verification for UID ${uid} timed out.`);
        } else {
          setVerificationError('❌ UID NOT EXIST or Error fetching.');
        }
      }
    }
  };

  const finalizeAutofill = (summary: any) => {
    const uid = summary.uid;
    const newFormData = { ...formDataRef.current, uid };
    const locked: string[] = [];
    
    // ... (mapping logic)
    if (summary.level) { newFormData.level = summary.level; locked.push('level'); }
    if (summary.region) { newFormData.region = summary.region; locked.push('region'); }
    if (summary.nickname) { newFormData.name = summary.nickname; locked.push('name'); }
    if (summary.social?.signature) { newFormData.bio = summary.social.signature; locked.push('bio'); }
    
    if (summary.account_created_at) {
        const createdYear = new Date(summary.account_created_at).getFullYear();
        const age = new Date().getFullYear() - createdYear;
        newFormData.yearsOld = age.toString();
        locked.push('yearsOld');
    }

    let epCount = 0;
    let booyahCount = 0;
    if (summary.ep_history && Array.isArray(summary.ep_history)) {
        summary.ep_history.forEach((ep: any) => {
            if (ep.owned_pass) {
                epCount++;
                if (ep.max_level === 100) {
                    booyahCount++;
                }
            }
        });
    }
    newFormData.elitePass = epCount.toString();
    newFormData.booyahPass = booyahCount.toString();
    locked.push('elitePass', 'booyahPass');

    const desc = `✅ Verified Free Fire Account
Name: ${summary.nickname || ''}
UID: ${uid}  
Level: ${summary.level || ''}
Region: ${summary.region || ''}
Account Age: ${newFormData.yearsOld || ''} years old
---`;
    newFormData.description = desc;
    locked.push('description');

    setFormData(newFormData);
    formDataRef.current = newFormData;
    setAutoFilledFields(locked);
  };

  useEffect(() => {
      if (showVerificationModal) {
          // FIX #1: use ref, not stale formData
          intervalRef.current = setInterval(() => {
            fetchAccountDetails(uidRef.current, true);
          }, 5000);

          const countdown = setInterval(() => {
            setVerificationTimer(prev => {
              if (prev <= 1) {
                clearInterval(countdown);
                if (intervalRef.current) clearInterval(intervalRef.current);
                setShowVerificationModal(false);
                setVerificationError('❌ Verification timed out. Please login to the ID and try again.');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => {
            clearInterval(countdown);
            if (intervalRef.current) clearInterval(intervalRef.current);
          };
      }
  }, [showVerificationModal]);


  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'level', label: 'Level', type: 'number' },
    { name: 'bio', label: 'Bio', type: 'text' },
    { name: 'numEvos', label: 'Number of Evos', type: 'number' },
    { name: 'bundles', label: 'Bundles', type: 'number' },
    { name: 'region', label: 'Region', type: 'select', options: ['IND Server', 'Other'] },
    { name: 'accountType', label: 'Account Type', type: 'select', options: ['Google', 'Facebook', 'X twitter', 'Telegram'] },
    { name: 'primeLevel', label: 'Prime Level', type: 'text' },
    { name: 'yearsOld', label: 'Years Old', type: 'number' },
    { name: 'glowWalls', label: 'Glow Wall', type: 'number' },
    { name: 'fist', label: 'Fist', type: 'text' },
    { name: 'entryAnimation', label: 'Entry Animation', type: 'text' },
    { name: 'lookChanger', label: 'Look Changer', type: 'text' },
    { name: 'elitePass', label: 'Elite Pass', type: 'number' },
    { name: 'booyahPass', label: 'Booyah Pass', type: 'number' },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      formDataRef.current = next;
      return next;
    });
  };

  const handleUpload = (url: string) => {
    if (images.length < 3) {
      setImages([...images, url]);
    }
  };

  const calculateSuggestedPrice = () => {
    const evos = parseInt(formData.numEvos || '0');
    const bundles = parseInt(formData.bundles || '0');
    let price = 0;
    if (evos === 1) price = 200;
    else if (evos === 2) price = 450;
    else if (evos === 3) price = 800;
    else if (evos === 4) price = 1000;

    if (bundles >= 40) price = Math.max(price, 1000);
    if (bundles > 35 && evos > 4) price = Math.max(price, 1500);

    setSuggestedPrice(price);
  };

  return (
    <div className="py-8 space-y-8 relative min-h-screen">
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="bg-neutral-900/50 border border-white/10 p-12 rounded-3xl text-center shadow-2xl relative z-10 backdrop-blur-md">
            <h2 className="text-3xl font-light text-white mb-6 uppercase tracking-widest">Verifying Account</h2>
            <p className="text-neutral-300 mb-8 max-w-md">Please login to your Free Fire ID within the next 120 seconds to verify ownership.</p>
            <div className="relative flex items-center justify-center">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-neutral-800"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 35}
                  strokeDashoffset={(2 * Math.PI * 35) * (1 - verificationTimer / 120)}
                  className="text-white transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute font-mono text-xl text-white">
                {Math.floor(verificationTimer / 60)}:{(verificationTimer % 60).toString().padStart(2, '0')}
              </div>
            </div>
            {initialLastLoginDisplay && (
                <div className="mt-6 text-sm">
                    <p className="text-neutral-500">Last Login Before: {new Date(initialLastLoginDisplay > 1e12 ? initialLastLoginDisplay : initialLastLoginDisplay * 1000).toLocaleTimeString()}</p>
                    {currentLastLoginDisplay && currentLastLoginDisplay !== initialLastLoginDisplay && (
                        <p className="text-white mt-1">New Last Login: {new Date(currentLastLoginDisplay > 1e12 ? currentLastLoginDisplay : currentLastLoginDisplay * 1000).toLocaleTimeString()}</p>
                    )}
                </div>
            )}
          </div>
        </div>
      )}

      {mode === 'browse' ? (
        <div className="space-y-16">
          <div className="text-black p-8 lg:p-12">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;600&display=swap');`}</style>
            <h2 className="text-[8vw] sm:text-[6vw] lg:text-[4vw] leading-[0.9] font-semibold tracking-tighter font-['Geist','Inter','Helvetica_Neue',sans-serif] text-white text-center">
              <span className="block">Elevate your gameplay</span>
              <span className="block text-white/60">with premium Free Fire IDs</span>
            </h2>
            <div className="mt-8 flex justify-center">
                <button onClick={() => setMode('sell')} className="bg-neutral-900 border border-neutral-700 text-white px-6 py-2 rounded-md hover:bg-neutral-800 transition-colors uppercase text-sm tracking-wide">
                  Sell ID
                </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {[1, 2, 3].map(i => <div key={i} className="bg-[#0a0a0a] p-6 border border-white/10 text-white">ID Listing {i}</div>)}
          </div>
        </div>
      ) : (
        <section className="bg-transparent text-white pt-10 pb-16" id="sell-form">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-6 uppercase tracking-widest text-center">
                Verify Ownership
            </h2>

            {sellStep !== 'idLogin' && (
              <h2 className="text-2xl font-light text-white mb-8 uppercase tracking-widest text-center">
                Ownership Verification
              </h2>
            )}

            <div className="flex flex-col gap-12">
                {sellStep === 'bio' && (
                <div className="relative border border-white/10 backdrop-blur-sm p-8">
                    <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">Bio Verification</h3>
                    <p className="text-neutral-400 mb-8 max-w-lg mx-auto">Update your Free Fire profile bio with the provided code.</p>
                    <button onClick={() => setSellStep('bind')} className="bg-white text-black px-8 py-3 rounded-full font-medium">Verify BIO</button>
                </div>
                )}
                {sellStep === 'bind' && !hasCompletedSpecs && (
                <div className="relative border border-white/10 backdrop-blur-sm p-8">
                    <h3 className="text-xl font-light text-white mb-4 uppercase tracking-widest">Bind Verification</h3>
                    <p className="text-neutral-400 mb-8 max-w-lg mx-auto">Upload a screenshot of your profile.</p>
                    <FileUpload onUpload={() => setHasCompletedSpecs(true)} />
                </div>
                )}
            </div>

            {hasCompletedSpecs && (
                <div className="space-y-12 text-left mt-12">
                  <div className="relative border border-white/10 backdrop-blur-sm p-8">
                    <h3 className="text-xl font-light text-white mb-6 uppercase tracking-widest">Upload Media</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="border border-white/10 h-48 flex items-center justify-center overflow-hidden hover:border-white/30 transition-colors">
                          {images[i] ? <img src={images[i]} alt="Upload" className="h-full w-full object-cover" /> : <span className="text-xs text-neutral-600 uppercase">Screenshot {i+1}</span>}
                        </div>
                      ))}
                    </div>
                    <FileUpload onUpload={handleUpload} />
                    <p className="text-[10px] text-neutral-500 mt-4 font-light uppercase tracking-widest">Images only | Max 28MB per image</p>
                  </div>
                  <div className="relative border border-white/10 backdrop-blur-sm p-8">
                    <h3 className="text-xl font-light text-white mb-8 uppercase tracking-widest">Account Specifications</h3>
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        setTimeout(() => setMode('browse'), 1500);
                    }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {fields.map(field => (
                          <div key={field.name} className={`${field.name === 'bio' || field.name === 'description' ? 'sm:col-span-2' : ''}`}>
                            <label className="block text-[10px] font-light text-neutral-400 mb-2 uppercase tracking-widest">{field.label}</label>
                            {field.type === 'select' ? (
                              <select
                                className="w-full border-b border-white/20 bg-transparent px-0 py-2 text-neutral-100 focus:border-white/60 focus:outline-none transition-colors"
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                value={formData[field.name] || ''}
                                disabled={autoFilledFields.includes(field.name)}
                              >
                                <option value="" className="bg-neutral-900 text-neutral-400">{field.label.toUpperCase()}</option>
                                {field.options?.map(opt => <option key={opt} value={opt} className="bg-neutral-900 text-neutral-100">{opt}</option>)}
                              </select>
                            ) : (
                              <input
                                type={field.type}
                                className={`w-full border-b border-white/20 bg-transparent px-0 py-2 text-neutral-100 placeholder-neutral-700 focus:border-white/60 focus:outline-none transition-colors ${autoFilledFields.includes(field.name) ? 'bg-green-900/20' : ''}`}
                                placeholder={field.label.toUpperCase()}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                value={formData[field.name] || ''}
                                disabled={autoFilledFields.includes(field.name)}
                              />
                            )}
                          </div>
                        ))}
                        <div className="space-y-2 sm:col-span-2">
                            <label className="block text-[10px] font-light text-neutral-400 uppercase tracking-widest">Description</label>
                            <textarea 
                              className={`w-full border-b border-white/20 bg-transparent px-0 py-2 text-neutral-100 placeholder-neutral-700 focus:border-white/60 focus:outline-none transition-colors ${autoFilledFields.includes('description') ? 'bg-green-900/20' : ''}`}
                              placeholder="Enter account description..." 
                              rows={3}
                              value={formData.description || ''}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              disabled={autoFilledFields.includes('description')}
                            ></textarea>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label className="block text-[10px] font-light text-neutral-400 uppercase tracking-widest">Price (Rs)</label>
                            <input type="number" 
                              className={`w-full border-b border-white/20 bg-transparent px-0 py-2 text-neutral-100 placeholder-neutral-700 focus:border-white/60 focus:outline-none transition-colors ${autoFilledFields.includes('price') ? 'bg-green-900/20' : ''}`}
                              placeholder="PRICE"
                              value={formData.price || ''}
                              onChange={(e) => handleInputChange('price', e.target.value)}
                              disabled={autoFilledFields.includes('price')}
                            />
                        </div>
                      </div>
                      <button type="submit" role="button" aria-label="Submit" className="group inline-flex items-center gap-2 animate-cta-float hover:translate-y-[-1px] transition-transform text-base font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full pt-3 pr-6 pb-3 pl-6 relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-md" >
                        <span className="animate-cta-pulse">Submit Listing</span>
                        <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                          <span className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></span>
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
            )}

            {sellStep === 'idLogin' && (
              <div className="mt-12 relative border border-white/10 backdrop-blur-sm p-8 rounded-2xl">
                  {/* Live Render API Status Indicator */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/5">
                      <span className={`w-2 h-2 rounded-full ${serverOnline === true ? 'bg-emerald-400 animate-pulse' : serverOnline === false ? 'bg-rose-500' : 'bg-amber-400 animate-ping'}`} />
                      <span className="text-neutral-300">
                        {serverOnline === true ? 'Render Server Online: info-api-fk6k' : serverOnline === false ? 'Render Server Offline' : 'Connecting to Render Server...'}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-white mb-6 uppercase tracking-widest">ID Login Verification</h3>
                  <div className="flex flex-col gap-4 mb-6 p-4 bg-neutral-900/30 border border-white/10 rounded-xl max-w-lg mx-auto">
                      <div className="flex flex-col gap-2">
                        <input 
                            type="text" 
                            placeholder="Enter Free Fire UID (e.g. 597184611)" 
                            className="w-full bg-neutral-950/50 p-4 border border-white/10 rounded-xl focus:border-white/60 outline-none font-['Geist','Inter','Helvetica_Neue',sans-serif]"
                            onChange={(e) => handleInputChange('uid', e.target.value)}
                            value={formData.uid || ''}
                        />
                        {/* Quick fill user's testing UID */}
                        <div className="flex items-center justify-between text-xs px-1 text-neutral-400">
                          <span>Testing UID:</span>
                          <button 
                            type="button"
                            onClick={() => handleInputChange('uid', '597184611')}
                            className="text-cyan-400 hover:text-cyan-300 underline font-mono cursor-pointer"
                          >
                            Use My UID (597184611)
                          </button>
                        </div>
                      </div>

                      <button 
                          onClick={() => fetchAccountDetails(formData.uid || '')}
                          type="button"
                          disabled={isChecking || !formData.uid}
                          className="group inline-flex items-center justify-center gap-2 animate-cta-float hover:translate-y-[-1px] transition-transform text-base font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full pt-3 pr-6 pb-3 pl-6 relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                          <span className="animate-cta-pulse">{isChecking ? 'Querying Render Server...' : 'Submit UID to Server'}</span>
                          <svg className="size-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}></span>
                          </span>
                      </button>

                      {currentLastLoginDisplay && (
                          <p className="text-neutral-500 text-sm text-center">Last Login: {new Date(currentLastLoginDisplay > 1e12 ? currentLastLoginDisplay : currentLastLoginDisplay * 1000).toLocaleTimeString()}</p>
                      )}
                      {isChecking && (
                          <p className="text-cyan-400 text-xs text-center animate-pulse">
                            Communicating with https://info-api-fk6k.onrender.com...
                          </p>
                      )}
                  </div>

                  {verificationError && (
                    <div className="space-y-3 max-w-lg mx-auto">
                      <p className="text-amber-400 text-xs p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                        {verificationError}
                      </p>
                      {formData.uid === '597184611' && (
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => handleLoadTestData('597184611')}
                            className="text-xs px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition cursor-pointer"
                          >
                            Proceed with Test Account Specs (597184611) &rarr;
                          </button>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            )}
          </div>
        </section>

      )}
    </div>
  );
}
