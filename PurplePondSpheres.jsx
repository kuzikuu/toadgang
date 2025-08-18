// File: src/PurplePondSpheres.jsx
// Assets expected at: public/pond.png and public/lily.png (or adjust paths below)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Shuffle, X, Share2 } from "lucide-react";
import { useMiniKit, useComposeCast } from '@coinbase/onchainkit/minikit';

// --- Data: Zora profiles ---
const TOAD_LEAFS = [
  { name: "nfttrappin", url: "https://zora.co/@nfttrappin" },
  { name: "tangyyoghurt", url: "https://zora.co/@tangyyoghurt" },
  { name: "tanazolam", url: "https://zora.co/@tanazolam" },
  { name: "realmrider", url: "https://zora.co/@realmrider" },
  { name: "nadayar", url: "https://zora.co/@nadayar" },
  { name: "maxgains", url: "https://zora.co/@maxgains" },
  { name: "hippophant", url: "https://zora.co/@hippophant" },
  { name: "gringosuave", url: "https://zora.co/@gringosuave" },
  { name: "idree", url: "https://zora.co/@idree" },
  { name: "smhsince91", url: "https://zora.co/@smhsince91" },
  { name: "bicillinla", url: "https://zora.co/@bicillinla" },
  { name: "nova100x", url: "https://zora.co/@nova100x" },
  { name: "tobiasfollows", url: "https://zora.co/@tobiasfollows" },
  { name: "7101dogdaot", url: "https://zora.co/@7101dogdaot" },
  { name: "decenenthusiast_pt", url: "https://zora.co/@decenenthusiast_pt" },
  { name: "blockchainjoe", url: "https://zora.co/@blockchainjoe" },
  { name: "theparshuram", url: "https://zora.co/@theparshuram" },
  { name: "heldpenguin", url: "https://zora.co/@heldpenguin" },
  { name: "biggerton", url: "https://zora.co/@biggerton" },
  { name: "carlybee", url: "https://zora.co/@carlybee" },
  { name: "metamessiah", url: "https://zora.co/@metamessiah" },
  { name: "cryptomag", url: "https://zora.co/@cryptomag" },
  { name: "magicman", url: "https://zora.co/@magicman" },
  { name: "gilligan", url: "https://zora.co/@gilligan" },
  { name: "jshockyall", url: "https://zora.co/@jshockyall" },
  { name: "messyyplayer", url: "https://zora.co/@messyyplayer" },
  { name: "thegardener", url: "https://zora.co/@thegardener" },
  { name: "l0rdsir1us", url: "https://zora.co/@l0rdsir1us" },
  { name: "sophieji", url: "https://zora.co/@sophieji" },
  { name: "flexy2kk", url: "https://zora.co/@flexy2kk" },
  { name: "livelife", url: "https://zora.co/@livelife" },
  { name: "berick06", url: "https://zora.co/@berick06" },
  { name: "darudragond", url: "https://zora.co/@darudragond" },
  { name: "toby_apprentice777", url: "https://zora.co/@toby_apprentice777" },
  { name: "digitdrifter", url: "https://zora.co/@digitdrifter" },
  { name: "ricardojgms", url: "https://zora.co/@ricardojgms" },
  { name: "kuzikuu", url: "https://zora.co/@kuzikuu" },
  { name: "bossboss", url: "https://zora.co/@bossboss" },
  { name: "ernie", url: "https://zora.co/@ernie" },
  { name: "fallenfrog9", url: "https://zora.co/@fallenfrog9" },
  { name: "habit777", url: "https://zora.co/@habit777" },
  { name: "drolesab", url: "https://zora.co/@drolesab" },
  { name: "dub", url: "https://zora.co/@dub" },
  { name: "toadgang777", url: "https://zora.co/@toadgang777" },
  { name: "desperad0", url: "https://zora.co/@desperad0" },
  { name: "lordsat0by", url: "https://zora.co/@lordsat0by" },
  { name: "cptbased", url: "https://zora.co/@cptbased" },
  { name: "cryptovenkey", url: "https://zora.co/@cryptovenkey" },
  { name: "barrylane", url: "https://zora.co/@barrylane" },
  { name: "geniusjoe", url: "https://zora.co/@geniusjoe" },
  { name: "rocho69", url: "https://zora.co/@rocho69" },
  { name: "bleedndodgerblu", url: "https://zora.co/@bleedndodgerblu" },
  { name: "yellon982", url: "https://zora.co/@yellon982" },
  { name: "bull_sararu", url: "https://zora.co/@bull_sararu" },
{ name: "christian", url: "https://zora.co/@clj38" },
{ name: "johndabeast", url: "https://zora.co/@johndabeast" },
{ name: "bloo", url: "https://zora.co/@bloo" },
{ name: "g_l0", url: "https://zora.co/@g_l0" },
];

// Utility to get a seeded RNG so positions are repeatable per shuffle
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useContainerSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

function generateLayout(count, w, h, seed = 42) {
  const rand = mulberry32(seed);
  // Proper sizing for good spacing
  const minSize = w < 640 ? 80 : w < 1024 ? 100 : 120;
  const maxSize = w < 640 ? 120 : w < 1024 ? 140 : 160;
  const items = [];

  for (let i = 0; i < count; i++) {
    const size = Math.floor(minSize + rand() * (maxSize - minSize));
    // Proper padding to prevent crowding
    const padding = w < 640 ? 40 : 60; // Adequate spacing on all devices
    const x = Math.floor(rand() * Math.max(1, w - size - padding)) + padding / 2;
    const y = Math.floor(rand() * Math.max(1, h - size - padding)) + padding / 2;

    // random drift speeds (CSS animation durations)
    const drift = 7 + rand() * 10; // seconds
    const float = 5 + rand() * 7; // seconds
    const angle = Math.floor(rand() * 360);

    items.push({ x, y, size, drift, float, angle });
  }
  return items;
}

export default function PurplePondSpheres() {
  const [query, setQuery] = useState("");
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [wrapRef, { w, h }] = useContainerSize();
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({ zoraProfile: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { setFrameReady, isFrameReady } = useMiniKit();
  const { composeCast } = useComposeCast();

  // Haptic feedback function
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration for lily pad clicks
    }
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileRegex.test(userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize the frame - following Base documentation exactly
  useEffect(() => {
    if (!isFrameReady && setFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);





  // Preload the splash image for better UX
  useEffect(() => {
    const lilyImage = new Image();
    lilyImage.onload = () => {
      setIsImageLoaded(true);
    };
    lilyImage.onerror = () => {
      // If image fails to load, still mark as loaded to show the app
      setIsImageLoaded(true);
    };
    lilyImage.src = '/lily.png';
    
    // Auto-hide loading screen after 1 second for better UX
    const autoHideTimer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 1000);
    
    return () => {
      lilyImage.onload = null;
      lilyImage.onerror = null;
      clearTimeout(autoHideTimer);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOAD_LEAFS;
    return TOAD_LEAFS.filter((t) => t.name.toLowerCase().includes(q));
  }, [query]);

  const layout = useMemo(() => generateLayout(filtered.length, w, h, seed), [
    filtered.length,
    w,
    h,
    seed,
  ]);

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xvgqyyay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'kuzikuu@gmail.com', // Your email
          subject: 'New Toad Gang Registration Request',
          zoraProfile: registrationData.zoraProfile,
          userEmail: registrationData.email,
          message: `New Toad Gang registration request from ${registrationData.zoraProfile} (${registrationData.email})`
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowRegistration(false);
          setSubmitted(false);
          setRegistrationData({ zoraProfile: "", email: "" });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    composeCast({
      text: 'Check out Purple Pond - the interactive lily pad interface for Toad Gang Zora community members! 🐸🍃',
      embeds: ['https://kuzikuu.github.io/toadgang'],
    });
  };

  // Show loading screen only briefly - prioritize showing the app for Farcaster
  if (!isImageLoaded) {
    // On mobile, show app content immediately to bypass splash screen
    if (isMobile) {
      console.log('Mobile detected - bypassing loading screen to show app immediately');
      return (
        <div className="relative min-h-screen text-white overflow-hidden">
          
          {/* Background pond photo */}
          <div className="absolute inset-0 -z-10">
            <img src="/pond.png" alt="Purple pond background" className="w-full h-full object-cover" />
            {/* subtle darkening for contrast */}
            <div className="absolute inset-0 bg-[rgba(12,0,24,0.45)]" />
          </div>

          {/* Header - Mobile optimized */}
          <header className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4 pt-4 sm:pt-6 md:pt-8 pb-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight drop-shadow leading-tight">
              Purple Pond: <span className="text-fuchsia-200">Toad Gang Zora Links</span>
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-fuchsia-50/90 max-w-3xl drop-shadow leading-relaxed">
              Click a lily pad to jump to a Zora profile.
            </p>
          </header>

          {/* Show a simple message that the app is loading */}
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="text-fuchsia-300 text-lg mb-4">Loading Purple Pond...</div>
              <div className="text-fuchsia-400 text-sm">Mobile app loading...</div>
            </div>
          </div>
        </div>
      );
    }

    // Desktop loading screen (unchanged)
    return (
      <div className="fixed inset-0 bg-purple-950 flex items-center justify-center z-50">
        <div className="text-center">
          <img 
            src="/lily.png" 
            alt="Loading..." 
            className="w-32 h-32 mx-auto mb-4 animate-pulse"
          />
          <div className="text-white text-lg">Loading Purple Pond...</div>
          {isMobile && (
            <>
              <div className="text-sm text-fuchsia-300 mt-2">
                Mobile device detected - optimizing...
              </div>
              <div className="text-xs text-fuchsia-400 mt-1">
                If splash screen persists, tap anywhere to continue
              </div>
            </>
          )}
        </div>
        
        {/* Mobile emergency continue button */}
        {isMobile && (
          <button
            onClick={() => setIsImageLoaded(true)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Continue to App
          </button>
        )}
      </div>
    );
  }



  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* Background pond photo */}
      <div className="absolute inset-0 -z-10">
        <img src="/pond.png" alt="Purple pond background" className="w-full h-full object-cover" />
        {/* subtle darkening for contrast */}
        <div className="absolute inset-0 bg-[rgba(12,0,24,0.45)]" />
      </div>

      {/* Header - Mobile optimized */}
      <header className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4 pt-4 sm:pt-6 md:pt-8 pb-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight drop-shadow leading-tight">
          Purple Pond: <span className="text-fuchsia-200">Toad Gang Zora Links</span>
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-fuchsia-50/90 max-w-3xl drop-shadow leading-relaxed">
          Click a lily pad to jump to a Zora profile.
        </p>
      </header>

      {/* Controls - Mobile optimized layout */}
      <div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 opacity-80" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search handles…"
            className="w-full rounded-2xl bg-black/30 backdrop-blur px-10 py-3 sm:py-2 outline-none ring-1 ring-white/20 focus:ring-fuchsia-300/70 text-white placeholder-white/70 text-sm sm:text-base"
          />
        </div>
        <button
          onClick={() => {
            triggerHaptic();
            setSeed(Math.floor(Math.random() * 100000));
          }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 sm:px-3 sm:py-2 bg-fuchsia-600/90 hover:bg-fuchsia-500 active:bg-fuchsia-700 transition shadow-lg shadow-fuchsia-900/40 touch-manipulation"
        >
          <Shuffle className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sm:hidden">Shuffle Layout</span>
          <span className="hidden sm:inline">Shuffle</span>
        </button>
        <button
          onClick={() => {
            triggerHaptic();
            handleShare();
          }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 sm:px-3 sm:py-2 bg-purple-600/90 hover:bg-purple-500 active:bg-purple-700 transition shadow-lg shadow-purple-900/40 touch-manipulation"
          title="Share Purple Pond"
        >
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sm:hidden">Share</span>
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Pond play area - Mobile optimized heights */}
      <main ref={wrapRef} className="relative z-0 mx-auto mt-3 sm:mt-4 mb-6 sm:mb-10 max-w-7xl h-[60vh] sm:h-[72vh] md:h-[76vh] lg:h-[78vh] xl:h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-black/10 backdrop-blur-[2px]">
        {/* Lily pads */}
        {filtered.map((item, i) => {
          const pos = layout[i] || { x: 0, y: 0, size: 120, drift: 8, float: 6, angle: 0 };

          const style = {
            left: pos.x,
            top: pos.y,
            width: pos.size,
            height: pos.size,
            animation: `drift-${i} ${pos.drift}s ease-in-out infinite alternate, float-${i} ${pos.float}s ease-in-out infinite alternate`,
          };

          return (
                         <a
               key={item.name}
               href={item.url}
               target="_blank"
               rel="noopener noreferrer"
               title={item.name}
               onClick={triggerHaptic}
               className="group absolute select-none grid place-items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/80 touch-manipulation"
               style={style}
             >
              <div className="relative w-full h-full">
                <img
                  src="/lily.png"
                  alt="lily pad"
                  draggable={false}
                  className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)] transition-transform group-active:scale-95"
                />
                {/* Handle label - Mobile optimized */}
                <span className="lily-pad-text absolute left-1/2 -translate-x-1/2 bottom-1 translate-y-1/2 whitespace-nowrap text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-semibold bg-black/55 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ring-1 ring-white/20 backdrop-blur max-w-[90%] truncate">
                  🍃 {item.name}
                </span>
              </div>

              {/* hover ripple ring */}
              <span className="pointer-events-none absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition ring-2 ring-fuchsia-300/50" />

              <style>{`
                @keyframes drift-${i} {
                  0%   { transform: translate3d(0px, 0px, 0px) rotate(${pos.angle}deg); }
                  100% { transform: translate3d(${Math.round((pos.size/2) * (i % 2 === 0 ? 1 : -1))}px, 0px, 0px) rotate(${pos.angle + (i % 2 === 0 ? 4 : -4)}deg); }
                }
                @keyframes float-${i} {
                  0%   { transform: translate3d(0px, 0px, 0px); }
                  100% { transform: translate3d(0px, ${Math.round((pos.size/4) * (i % 3 === 0 ? 1 : -1))}px, 0px); }
                }
              `}</style>
            </a>
          );
        })}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-center px-4 sm:px-6">
            <p className="text-sm sm:text-base text-fuchsia-50/90 drop-shadow">
              No pads match your search. Try another handle.
            </p>
          </div>
        )}

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.45)]" />
        </div>
      </main>

      {/* Footer blurb - Mobile optimized */}
      <footer className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4 pb-4 sm:pb-6 md:pb-8 text-xs sm:text-sm text-fuchsia-50/90 drop-shadow">
        <p className="leading-relaxed">
          Arigato <a href="https://x.com/TopNoshFinance" className="underline decoration-fuchsia-300/70 hover:decoration-fuchsia-200" target="_blank" rel="noreferrer noopener">Topnoshfinance </a> for building the list. Built for <a href="https://github.com/kuzikuu/toadgang" className="underline decoration-fuchsia-300/70 hover:decoration-fuchsia-200" target="_blank" rel="noreferrer noopener">toadgang</a>. Study the lore <a href="https://toadgod.xyz" className="underline decoration-fuchsia-300/70 hover:decoration-fuchsia-200" target="_blank" rel="noreferrer noopener">toadgod.xyz</a>.
        </p>
      </footer>

      {/* Registration Button */}
      <button
        onClick={() => {
          triggerHaptic();
          setShowRegistration(true);
        }}
        className="fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full bg-fuchsia-600/90 hover:bg-fuchsia-500 active:bg-fuchsia-700 transition-all duration-200 shadow-lg shadow-fuchsia-900/40 hover:scale-110 touch-manipulation"
        title="Register for Toad Gang"
      >
        <img 
          src="/toby.png" 
          alt="Toby" 
          className="w-full h-full object-contain p-2"
        />
      </button>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-gradient-to-br from-purple-900/95 to-fuchsia-900/95 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowRegistration(false)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {!submitted ? (
                <>
                  <div className="text-center mb-6">
                    <img 
                      src="/toby.png" 
                      alt="Toby" 
                      className="w-16 h-16 mx-auto mb-4 object-contain"
                    />
                    <h2 className="text-2xl font-bold text-white mb-2">Join Toad Gang</h2>
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-3 mb-4">
                      <p className="text-sm text-yellow-200 font-medium">
                        ⚠️ Requirement: You must have at least 1 TobyWorld related post to join
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="zoraProfile" className="block text-sm font-medium text-white/90 mb-2">
                        Zora Profile Name
                      </label>
                      <input
                        type="text"
                        id="zoraProfile"
                        value={registrationData.zoraProfile}
                        onChange={(e) => setRegistrationData({...registrationData, zoraProfile: e.target.value})}
                        placeholder="Enter your Zora profile name"
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/20 focus:border-fuchsia-300/70 focus:ring-2 focus:ring-fuchsia-300/20 outline-none text-white placeholder-white/50 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={registrationData.email}
                        onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
                        placeholder="Enter your email address"
                        required
                        className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/20 focus:border-fuchsia-300/70 focus:ring-2 focus:ring-fuchsia-300/20 outline-none text-white placeholder-white/50 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 bg-fuchsia-600 hover:bg-fuchsia-500 active:bg-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-semibold text-white transition-all duration-200 shadow-lg shadow-fuchsia-900/40 touch-manipulation"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-white/80">
                    We will review your registration and add you shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
