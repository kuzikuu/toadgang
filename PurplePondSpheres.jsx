// File: src/PurplePondSpheres.jsx
// Assets expected at: public/pond.png and public/lily.png (or adjust paths below)

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Shuffle } from "lucide-react";

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
  // Mobile-optimized sizes
  const minSize = w < 640 ? 60 : w < 1024 ? 80 : 88; // Smaller on mobile
  const maxSize = w < 640 ? 100 : w < 1024 ? 120 : 148;
  const items = [];

  for (let i = 0; i < count; i++) {
    const size = Math.floor(minSize + rand() * (maxSize - minSize));
    const padding = w < 640 ? 8 : 16; // Smaller padding on mobile
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
          onClick={() => setSeed(Math.floor(Math.random() * 100000))}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 sm:px-3 sm:py-2 bg-fuchsia-600/90 hover:bg-fuchsia-500 active:bg-fuchsia-700 transition shadow-lg shadow-fuchsia-900/40 touch-manipulation"
        >
          <Shuffle className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sm:hidden">Shuffle Layout</span>
          <span className="hidden sm:inline">Shuffle</span>
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
                <span className="absolute left-1/2 -translate-x-1/2 bottom-1 translate-y-1/2 whitespace-nowrap text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-semibold bg-black/55 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ring-1 ring-white/20 backdrop-blur max-w-[90%] truncate">
                  🍃 {item.name}
                </span>
              </div>

              {/* hover ripple ring */}
              <span className="pointer-events-none absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition ring-2 ring-fuchsia-300/50" />

              <style>{`
                @keyframes drift-${i} {
                  0%   { transform: translateX(0px) rotate(${pos.angle}deg); }
                  100% { transform: translateX(${Math.round((pos.size/2) * (i % 2 === 0 ? 1 : -1))}px) rotate(${pos.angle + (i % 2 === 0 ? 4 : -4)}deg); }
                }
                @keyframes float-${i} {
                  0%   { transform: translateY(0px); }
                  100% { transform: translateY(${Math.round((pos.size/4) * (i % 3 === 0 ? 1 : -1))}px); }
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
    </div>
  );
}
