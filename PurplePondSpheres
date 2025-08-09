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
  const minSize = 64; // px
  const maxSize = 112; // px
  const items = [];

  for (let i = 0; i < count; i++) {
    const size = Math.floor(minSize + rand() * (maxSize - minSize));
    const padding = 8;
    const x = Math.floor(rand() * Math.max(1, w - size - padding)) + padding / 2;
    const y = Math.floor(rand() * Math.max(1, h - size - padding)) + padding / 2;

    // random drift speeds (CSS animation durations)
    const drift = 6 + rand() * 10; // seconds
    const float = 4 + rand() * 6; // seconds
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
    <div className="relative min-h-screen bg-[#11011a] text-white overflow-hidden">
      {/* Background pond gradient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/30 via-purple-900/50 to-indigo-950" />
        {/* ripples */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmax] h-[140vmax] rounded-full opacity-40" style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.20) 0%, rgba(59,7,100,0.12) 30%, transparent 60%), radial-gradient(circle at 55% 45%, rgba(99,102,241,0.20) 0%, rgba(30,27,75,0.12) 26%, transparent 56%)",
          filter: "blur(12px)",
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-6xl px-4 pt-8 pb-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
          Purple Pond: <span className="text-fuchsia-300">Lily Pad Links</span>
        </h1>
        <p className="mt-1 text-sm text-fuchsia-100/80 max-w-3xl">
          Toads and fallen frogs alike, hop into the purple pond of Zora and explore the community artwork, memes, and moments. Click a sphere to visit a pad.
        </p>
      </header>

      {/* Controls */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-70" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search handles…"
            className="w-full rounded-2xl bg-white/10 backdrop-blur px-10 py-2 outline-none ring-1 ring-white/10 focus:ring-fuchsia-400/60"
          />
        </div>
        <button
          onClick={() => setSeed(Math.floor(Math.random() * 100000))}
          className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-500 transition shadow-lg shadow-fuchsia-900/40"
        >
          <Shuffle className="h-5 w-5" />
          Shuffle
        </button>
      </div>

      {/* Pond play area */}
      <main ref={wrapRef} className="relative z-0 mx-auto mt-4 mb-10 max-w-7xl h-[72vh] sm:h-[76vh] md:h-[78vh] lg:h-[80vh] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-purple-950/60 to-indigo-950/60 backdrop-blur">
        {/* Spheres */}
        {filtered.map((item, i) => {
          const pos = layout[i] || { x: 0, y: 0, size: 80, drift: 8, float: 6, angle: 0 };
          const hue = 260 + ((i * 19) % 40); // small hue variance around purple
          const style = {
            left: pos.x,
            top: pos.y,
            width: pos.size,
            height: pos.size,
            // Unique animation timings per sphere
            animation: `drift-${i} ${pos.drift}s ease-in-out infinite alternate, float-${i} ${pos.float}s ease-in-out infinite alternate`,
            // Glow ring
            boxShadow: `0 0 0 2px rgba(255,255,255,0.08), inset 0 0 24px rgba(255,255,255,0.18), 0 12px 40px rgba(147,51,234,0.35)`
          };

          const label = `🍃 ${item.name}`;

          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.name}
              className="group absolute select-none rounded-full grid place-items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/80"
              style={style}
            >
              <div
                className="rounded-full w-full h-full grid place-items-center text-xs sm:text-sm md:text-base font-medium"
                style={{
                  background: `radial-gradient(circle at 30% 30%, hsl(${hue} 80% 65% / 0.95), hsl(${hue} 80% 35% / 0.95))`,
                  color: "white",
                }}
              >
                <span className="px-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                  {label}
                </span>
              </div>
              {/* Hover ring */}
              <span className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition ring-2 ring-fuchsia-300/60" />
              <style>{`
                @keyframes drift-${i} {
                  0%   { transform: translateX(0px) rotate(${pos.angle}deg); }
                  100% { transform: translateX(${Math.round((pos.size/2) * (i % 2 === 0 ? 1 : -1))}px) rotate(${pos.angle + (i % 2 === 0 ? 6 : -6)}deg); }
                }
                @keyframes float-${i} {
                  0%   { transform: translateY(0px); }
                  100% { transform: translateY(${Math.round((pos.size/3) * (i % 3 === 0 ? 1 : -1))}px); }
                }
              `}</style>
            </a>
          );
        })}

        {/* Helper empty state */}
        {filtered.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-center px-6">
            <p className="text-fuchsia-100/80">
              No pads match your search. Try another handle.
            </p>
          </div>
        )}

        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.4)]" />
        </div>
      </main>

      {/* Footer blurb */}
      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-8 text-xs text-fuchsia-100/70">
        <p>
          Built for <a href="https://github.com/kuzikuu/toadgang" className="underline decoration-fuchsia-400/60 hover:decoration-fuchsia-300" target="_blank" rel="noreferrer noopener">toadgang</a>. Add or remove lily pads by editing the TOAD_LEAFS array.
        </p>
      </footer>
    </div>
  );
}
