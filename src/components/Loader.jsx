import { useEffect, useState, useRef } from "react";

const SYSTEMS = [
  { id: "PROP", label: "PROPULSION SYSTEMS", duration: 600 },
  { id: "AVNX", label: "AVIONICS & GUIDANCE", duration: 500 },
  { id: "STRCT", label: "STRUCTURAL INTEGRITY", duration: 700 },
  { id: "TLMTR", label: "TELEMETRY LINK", duration: 400 },
  { id: "PAYLD", label: "PAYLOAD INTERFACE", duration: 550 },
  { id: "IGNIT", label: "IGNITION SEQUENCE", duration: 800 },
];

const NUM_PARTICLES = 38;

function useCountUp(target, duration, active) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function Particle({ index, triggered }) {
  const angle = (index / NUM_PARTICLES) * 360;
  const radius = 55 + Math.random() * 40;
  const delay = Math.random() * 0.4;
  const size = 1.5 + Math.random() * 2.5;
  const isCore = index % 4 === 0;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "50%",
        left: "50%",
        width: size,
        height: isCore ? size * 6 : size * 3,
        borderRadius: 2,
        background: isCore
          ? "linear-gradient(to top, #FF6B35, #FFD700)"
          : "linear-gradient(to top, #1E90FF88, #1E90FF22)",
        transformOrigin: "bottom center",
        transform: `rotate(${angle}deg) translateY(0px)`,
        opacity: 0,
        animation: triggered
          ? `particle-fly 1.2s ease-out ${delay}s forwards`
          : "none",
      }}
    />
  );
}

const Loader=({ onComplete })=> {
  const [checkedSystems, setCheckedSystems] = useState([]);
  const [currentChecking, setCurrentChecking] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [igniting, setIgniting] = useState(false);
  const [done, setDone] = useState(false);
  const totalDuration = SYSTEMS.reduce((a, s) => a + s.duration, 0);
  const overallProgress = useCountUp(
    100,
    totalDuration,
    currentChecking >= 0
  );
  const missionsRef = useRef(0);

  useEffect(() => {
    let elapsed = 0;
    const timers = [];

    SYSTEMS.forEach((sys, i) => {
      const t = setTimeout(() => {
        setCurrentChecking(i + 1);
        setCheckedSystems((prev) => [...prev, sys.id]);
        if (i === SYSTEMS.length - 1) {
          setTimeout(() => setIgniting(true), 300);
          setTimeout(() => setLaunched(true), 900);
          setTimeout(() => {
            setDone(true);
            onComplete?.();
          }, 2200);
        }
      }, elapsed + sys.duration);
      elapsed += sys.duration;
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050810",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Share Tech Mono', 'Courier New', monospace",
        overflow: "hidden",
        opacity: launched ? 0 : 1,
        transition: launched ? "opacity 0.9s ease-in 0.8s" : "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap');

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes tick-in {
          0% { opacity: 0; transform: scale(1.6); }
          60% { opacity: 1; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes row-appear {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes particle-fly {
          0%   { opacity: 1; transform: rotate(var(--ang)) translateY(0px); }
          100% { opacity: 0; transform: rotate(var(--ang)) translateY(-${120}px) scaleY(0.3); }
        }
        @keyframes rocket-lift {
          0%   { transform: translateY(0px); opacity: 1; }
          30%  { transform: translateY(-6px); opacity: 1; }
          100% { transform: translateY(-160px); opacity: 0; }
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.12; }
        }
        @keyframes flicker {
          0%,100% { opacity:1; } 92% { opacity:1; } 93% { opacity:0.4; } 94%{opacity:1;} 97%{opacity:0.7;} 98%{opacity:1;}
        }
        .loader-title {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.35em;
          color: #5A7FBF;
          text-transform: uppercase;
          animation: flicker 4s infinite;
        }
        .main-title {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: clamp(28px, 5vw, 46px);
          letter-spacing: 0.12em;
          color: #F0F4FF;
          line-height: 1;
          animation: flicker 7s infinite 1s;
        }
        .sys-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 7px 0;
          animation: row-appear 0.3s ease forwards;
        }
        .sys-id {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #2A4A7F;
          width: 44px;
          flex-shrink: 0;
        }
        .sys-label {
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #8AAAD0;
          flex: 1;
        }
        .sys-status-ok {
          font-size: 11px;
          color: #1E90FF;
          animation: tick-in 0.25s ease forwards;
          flex-shrink: 0;
        }
        .sys-status-checking {
          font-size: 11px;
          color: #FF6B35;
          animation: blink 0.5s infinite;
          flex-shrink: 0;
        }
        .progress-bar-outer {
          width: 100%;
          height: 2px;
          background: #0D1525;
          border-radius: 2px;
          overflow: hidden;
          margin-top: 2px;
        }
        .progress-bar-inner {
          height: 100%;
          background: linear-gradient(to right, #1E90FF, #00CFFF);
          border-radius: 2px;
          box-shadow: 0 0 8px #1E90FF88;
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>

      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#1E90FF11 1px, transparent 1px), linear-gradient(90deg, #1E90FF11 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "grid-pulse 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 40%, #1E90FF08 50%, transparent 60%)",
          animation: "scanline 3.5s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* Corner brackets */}
      {[
        { top: 20, left: 20, borderTop: "1px solid #1E4080", borderLeft: "1px solid #1E4080" },
        { top: 20, right: 20, borderTop: "1px solid #1E4080", borderRight: "1px solid #1E4080" },
        { bottom: 20, left: 20, borderBottom: "1px solid #1E4080", borderLeft: "1px solid #1E4080" },
        { bottom: 20, right: 20, borderBottom: "1px solid #1E4080", borderRight: "1px solid #1E4080" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: 28, height: 28, ...s }} />
      ))}

      {/* HUD panel */}
      <div
        style={{
          position: "relative",
          width: "min(480px, 92vw)",
          border: "1px solid #1A2E50",
          background: "#07101F",
          padding: "32px 36px 28px",
          boxShadow: "0 0 60px #1E90FF18, inset 0 0 40px #050810",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(to right, transparent, #1E90FF, transparent)",
            boxShadow: "0 0 12px #1E90FF",
          }}
        />

        {/* Header */}
        <div style={{ marginBottom: 28, borderBottom: "1px solid #0D1A30", paddingBottom: 20 }}>
          <div className="loader-title" style={{ marginBottom: 8 }}>
            ROCKET BUILDER ∙ LAUNCH CONTROL
          </div>
          <div className="main-title">SYSTEM CHECK</div>
          <div
            style={{
              marginTop: 6,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10,
              color: "#2A4A7F",
              letterSpacing: "0.25em",
            }}
          >
            INIT_SEQ ∙ {new Date().toISOString().replace("T", " ").slice(0, 19)} UTC
          </div>
        </div>

        {/* Systems list */}
        <div style={{ marginBottom: 24 }}>
          {SYSTEMS.map((sys, i) => {
            const isChecked = checkedSystems.includes(sys.id);
            const isActive = currentChecking === i;
            const isVisible = i <= currentChecking;
            if (!isVisible) return null;
            return (
              <div key={sys.id} className="sys-row">
                <span className="sys-id">{sys.id}</span>
                <span className="sys-label">{sys.label}</span>
                {isChecked ? (
                  <span className="sys-status-ok">■ OK</span>
                ) : (
                  <span className="sys-status-checking">● RUN</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 7,
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "#2A4A7F",
            }}
          >
            <span>MISSION READINESS</span>
            <span style={{ color: overallProgress === 100 ? "#1E90FF" : "#FF6B35" }}>
              {String(overallProgress).padStart(3, "0")}%
            </span>
          </div>
          <div className="progress-bar-outer">
            <div
              className="progress-bar-inner"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Status footer */}
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: igniting ? "#FF6B35" : "#2A4A7F",
            transition: "color 0.3s",
            animation: igniting ? "blink 0.35s infinite" : "none",
          }}
        >
          {igniting
            ? "▶ IGNITION SEQUENCE INITIATED"
            : currentChecking < SYSTEMS.length
            ? `▶ CHECKING: ${SYSTEMS[currentChecking]?.label ?? "..."}`
            : "▶ ALL SYSTEMS GO"}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right, transparent, #1E90FF44, transparent)",
          }}
        />
      </div>

      {/* Rocket + exhaust */}
      <div
        style={{
          marginTop: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          animation: launched ? "rocket-lift 1.2s ease-in 0.1s forwards" : "none",
        }}
      >
        {/* Rocket SVG */}
        <svg
          width="40"
          height="90"
          viewBox="0 0 40 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body */}
          <rect x="13" y="18" width="14" height="52" rx="2" fill="#D0D8E8" />
          {/* Nose cone */}
          <path d="M20 2 L27 18 L13 18 Z" fill="#E8EDF5" />
          {/* SpaceX stripe */}
          <rect x="13" y="42" width="14" height="3" fill="#1E90FF" opacity="0.6" />
          {/* Fins */}
          <path d="M13 62 L6 72 L13 70 Z" fill="#B0BCCC" />
          <path d="M27 62 L34 72 L27 70 Z" fill="#B0BCCC" />
          {/* Nozzle */}
          <path d="M15 70 Q20 76 25 70" stroke="#888" strokeWidth="1.5" fill="none" />
          {/* F9 label */}
          <text x="20" y="36" textAnchor="middle" fill="#1E90FF" fontSize="6" fontFamily="Rajdhani, sans-serif" fontWeight="700">F9</text>
        </svg>

        {/* Exhaust particles */}
        <div
          style={{
            position: "absolute",
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
          }}
        >
          {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
            <Particle key={i} index={i} triggered={igniting} />
          ))}

          {/* Core plume */}
          {igniting && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 28,
                background:
                  "linear-gradient(to bottom, #FFD700, #FF6B35, transparent)",
                borderRadius: 3,
                boxShadow: "0 0 18px #FF6B3566",
                animation: "blink 0.08s infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom data strip */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 36,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.25em",
          color: "#1A2E50",
          whiteSpace: "nowrap",
        }}
      >
        {["FALCON-9 BLOCK 5", "SLC-40 ∙ CCAFS", "T-00:00:00"].map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export default Loader