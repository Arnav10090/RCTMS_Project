import React, { useEffect, useRef, useState } from 'react';

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));

export const PidDiagram: React.FC = () => {
  const [cleanLevel, setCleanLevel] = useState<number>(87);
  const [dirtyLevel, setDirtyLevel] = useState<number>(45);
  const [oilLevel, setOilLevel] = useState<number>(78);
  const [pumpRunning, setPumpRunning] = useState<boolean>(true);
  const [valveOpen, setValveOpen] = useState<boolean>(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Keep levels within 0-100
  useEffect(() => {
    setCleanLevel((v) => clamp(v));
    setDirtyLevel((v) => clamp(v));
    setOilLevel((v) => clamp(v));
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Controls overlay */}
      <div className="absolute top-3 right-3 z-20 bg-card/80 backdrop-blur rounded-md p-3 shadow-industrial flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            className={`px-2 py-1 rounded text-sm border ${pumpRunning ? 'bg-success/20 border-success' : 'bg-muted/10 border-border'}`}
            onClick={() => setPumpRunning((s) => !s)}
            aria-pressed={pumpRunning}
          >
            {pumpRunning ? 'Stop Pump' : 'Start Pump'}
          </button>
          <button
            className={`px-2 py-1 rounded text-sm border ${valveOpen ? 'bg-primary/20 border-primary' : 'bg-muted/10 border-border'}`}
            onClick={() => setValveOpen((s) => !s)}
          >
            {valveOpen ? 'Close Valve' : 'Open Valve'}
          </button>
        </div>
        <div className="text-xs text-muted-foreground">Clean Tank: {Math.round(cleanLevel)}%</div>
        <input
          aria-label="Clean tank level"
          type="range"
          min={0}
          max={100}
          value={cleanLevel}
          onChange={(e) => setCleanLevel(Number(e.target.value))}
        />
      </div>

      <svg ref={svgRef} viewBox="0 0 1200 520" className="w-full h-full">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--primary)" />
          </marker>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Tanks container background */}
        <rect x="12" y="12" width="1176" height="496" rx="8" fill="none" stroke="var(--border)" strokeWidth="0.8" />

        {/* Oil Tank (left) */}
        <g transform="translate(40,80)">
          <text x="0" y="-8" className="text-xs font-medium" fill="var(--foreground)">OIL TANK</text>
          <rect x="0" y="0" width="180" height="160" rx="6" fill="transparent" stroke="var(--primary)" strokeWidth="2" />
          <clipPath id="oilClip">
            <rect x="0" y="0" width="180" height="160" rx="6" />
          </clipPath>
          <rect x="0" y="160" width="180" height="160" rx="6" fill="url(#oilGrad)" clipPath="url(#oilClip)" style={{ transformOrigin: '0 160' }} />
          {/* level */}
          <rect x="0" y={160 - (160 * oilLevel) / 100} width="180" height={(160 * oilLevel) / 100} fill="rgba(59,130,246,0.12)" clipPath="url(#oilClip)" />
          <text x="90" y="180" textAnchor="middle" className="text-xs font-mono" fill="var(--foreground)">{oilLevel}%</text>
        </g>

        {/* Clean Tank (center) */}
        <g transform="translate(360,28)">
          <text x="110" y="-8" className="text-xs font-medium" fill="var(--foreground)">CLEAN TANK</text>
          <rect x="90" y="12" width="220" height="260" rx="8" fill="transparent" stroke="var(--success)" strokeWidth="2" />
          <clipPath id="cleanClip">
            <rect x="90" y="12" width="220" height="260" rx="8" />
          </clipPath>
          <rect x="90" y={12 + 260 - (260 * cleanLevel) / 100} width="220" height={(260 * cleanLevel) / 100} fill="rgba(34,197,94,0.12)" clipPath="url(#cleanClip)" />
          <text x="200" y="150" textAnchor="middle" className="text-xs font-mono" fill="var(--foreground)">{cleanLevel}%</text>
        </g>

        {/* Dirty Tank (right) */}
        <g transform="translate(840,80)">
          <text x="0" y="-8" className="text-xs font-medium" fill="var(--foreground)">DIRTY TANK</text>
          <rect x="0" y="0" width="180" height="160" rx="6" fill="transparent" stroke="var(--warning)" strokeWidth="2" />
          <clipPath id="dirtyClip">
            <rect x="0" y="0" width="180" height="160" rx="6" />
          </clipPath>
          <rect x="0" y={160 - (160 * dirtyLevel) / 100} width="180" height={(160 * dirtyLevel) / 100} fill="rgba(245,158,11,0.12)" clipPath="url(#dirtyClip)" />
          <text x="90" y="180" textAnchor="middle" className="text-xs font-mono" fill="var(--foreground)">{dirtyLevel}%</text>
        </g>

        {/* Pipes */}
        <g strokeWidth="6" strokeLinecap="round" stroke="var(--muted)">
          {/* Left pipe from oil tank to clean tank */}
          <path d="M220 140 L330 140" stroke="var(--foreground)" strokeWidth="6" />
          {/* Pipe from clean tank to dirty tank */}
          <path d="M580 160 L840 160" stroke="var(--foreground)" strokeWidth="6" />
        </g>

        {/* Pump (between oil and clean) */}
        <g transform="translate(320,130)">
          <g onClick={() => setPumpRunning((s) => !s)} style={{ cursor: 'pointer' }}>
            <circle cx="0" cy="0" r="18" fill="var(--primary)" className={pumpRunning ? 'animate-spin-slow' : ''} />
            <circle cx="0" cy="0" r="10" fill="var(--card)" />
          </g>
          <text x="28" y="6" className="text-xs text-muted-foreground">Main Pump</text>
        </g>

        {/* Valve near clean tank */}
        <g transform="translate(560,120)">
          <rect x="-8" y="-8" width="16" height="16" rx="2" fill={valveOpen ? 'var(--primary)' : 'var(--muted)'} onClick={() => setValveOpen((s) => !s)} style={{ cursor: 'pointer' }} />
          <text x="20" y="6" className="text-xs text-muted-foreground">Valve</text>
        </g>

        {/* Flow animations using animateMotion along paths (only shown when running) */}
        {pumpRunning && (
          <>
            <path id="flowPathClean" d="M430 150 C480 150, 540 150, 580 150" fill="none" stroke="none" />
            <circle r="5" fill="var(--success)">
              <animateMotion dur="1.2s" repeatCount="indefinite">
                <mpath href="#flowPathClean" />
              </animateMotion>
            </circle>

            <path id="flowPathReturn" d="M580 170 C540 170, 480 170, 430 170" fill="none" stroke="none" />
            <circle r="5" fill="var(--warning)">
              <animateMotion dur="1.6s" repeatCount="indefinite">
                <mpath href="#flowPathReturn" />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Labels and small instruments */}
        <g className="text-xs" fill="var(--muted-foreground)">
          <text x="40" y="260">FT#1</text>
          <text x="190" y="320">LT</text>
          <text x="360" y="320">TIC</text>
        </g>

      </svg>

      {/* Footer small hint */}
      <div className="absolute left-3 bottom-3 text-xs text-muted-foreground">Click pump to toggle. Use slider to adjust clean tank level.</div>
    </div>
  );
};

export default PidDiagram;
