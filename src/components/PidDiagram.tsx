import React from 'react';

// This diagram uses symbol SVGs from public/svgs and draws connection lines between them
const PidDiagram: React.FC = () => {
  const ASSET = {
    M_CIRC: '/svgs/M_in_circle.svg',
    M: '/svgs/M.svg',
    FT2: '/svgs/FT#2.svg',
    LT: '/svgs/LT.svg',
    TIC: '/svgs/TIC.svg',
    TRI_VERT: '/svgs/green-vertical-triangles.svg',
    TRI_HORZ: '/svgs/green-horizontal-triangles.svg',
    DOT_V: '/svgs/vertical-dotted_line.svg',
    DOT_H: '/svgs/Horizontal-dotted_line.svg',
    H: '/svgs/H.svg',
    L: '/svgs/L.svg',
    LL: '/svgs/LL.svg',
    PURPLE_DOT: '/svgs/purple-black-dot.svg',
  } as const;

  // Base canvas is designed at 1200x520 to roughly match the provided layout
  const W = 1200;
  const Ht = 520;

  return (
    <div className="w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${W} ${Ht}`}
        className="block w-full h-full"
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000" />
          </marker>
        </defs>

        {/* DM Water feed and FT#1 at top-left */}
        <text x={60} y={40} fontFamily="Arial" fontSize={16}>DM Water</text>
        <line x1={95} y1={45} x2={95} y2={100} stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />
        {/* FT#1 symbol (drawn) */}
        <circle cx={95} cy={125} r={20} fill="none" stroke="#000" strokeWidth={2} />
        <text x={80} y={130} fontFamily="Arial" fontSize={12} fontWeight="bold">FT</text>
        <text x={120} y={126} fontFamily="Arial" fontSize={12}>#1</text>

        {/* Legend at top-left */}
        <text x={165} y={95} fontFamily="Arial" fontSize={12}>FT : Flow Transmitter</text>
        <text x={165} y={115} fontFamily="Arial" fontSize={12}>LT : Level Transmitter</text>
        <text x={165} y={135} fontFamily="Arial" fontSize={12}>TIC : Temp. indicator and controller</text>
        <text x={165} y={155} fontFamily="Arial" fontSize={12}>XT1: On-Line oil concentration measure</text>

        {/* Tanks baseline */}
        <line x1={40} y1={430} x2={560} y2={430} stroke="#000" strokeWidth={2} />
        <line x1={560} y1={430} x2={1120} y2={430} stroke="#000" strokeWidth={2} />

        {/* OIL TANK */}
        <rect x={30} y={260} width={170} height={150} fill="none" stroke="#000" strokeWidth={2} />
        <text x={65} y={435} fontFamily="Arial" fontSize={16} fontWeight={600}>OIL TANK</text>
        {/* Mixer motor */}
        <image href={ASSET.M_CIRC} x={55} y={270} width={36} height={36} />
        {/* Pump motor */}
        <image href={ASSET.M_CIRC} x={120} y={270} width={36} height={36} />
        {/* Outlet valve symbol using horizontal triangles */}
        <image href={ASSET.TRI_VERT} x={110} y={340} width={40} height={50} />
        {/* Oil tank level marks */}
        <image href={ASSET.H} x={60} y={315} width={28} height={28} />
        <image href={ASSET.L} x={60} y={350} width={28} height={28} />
        <image href={ASSET.LL} x={60} y={385} width={28} height={28} />

        {/* Outlet line from oil tank to manifold */}
        <line x1={115} y1={390} x2={210} y2={390} stroke="#000" strokeWidth={2} />

        {/* Instrument manifold box with FT#2, LT, TIC */}
        <rect x={200} y={220} width={280} height={95} fill="none" stroke="#000" strokeWidth={2} />
        <image href={ASSET.FT2} x={215} y={235} width={85} height={55} />
        <image href={ASSET.LT} x={315} y={235} width={70} height={55} />
        <image href={ASSET.TIC} x={400} y={235} width={85} height={55} />

        {/* Two motors under manifold feeding clean tank */}
        <image href={ASSET.M_CIRC} x={250} y={305} width={32} height={32} />
        <image href={ASSET.M_CIRC} x={290} y={305} width={32} height={32} />

        {/* Check valves to clean tank */}
        <image href={ASSET.TRI_VERT} x={330} y={320} width={30} height={40} />
        <image href={ASSET.TRI_VERT} x={370} y={320} width={30} height={40} />

        {/* Drops to clean tank */}
        <line x1={345} y1={360} x2={345} y2={390} stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />
        <line x1={385} y1={360} x2={385} y2={390} stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />

        {/* CLEAN TANK */}
        <rect x={210} y={300} width={380} height={150} fill="none" stroke="#000" strokeWidth={2} />
        <text x={340} y={470} fontFamily="Arial" fontSize={16} fontWeight={600}>CLEAN TANK</text>
        {/* Internal diversion and one motor */}
        <image href={ASSET.TRI_VERT} x={380} y={305} width={30} height={35} />
        <image href={ASSET.M_CIRC} x={430} y={305} width={30} height={30} />
        <image href={ASSET.M_CIRC} x={465} y={305} width={30} height={30} />

        {/* Outlet to XT#1 path */}
        <line x1={485} y1={390} x2={485} y2={420} stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />

        {/* XT#1 - purple sensor and label */}
        <image href={ASSET.PURPLE_DOT} x={520} y={200} width={26} height={26} />
        <text x={555} y={214} fontFamily="Arial" fontSize={14} fontWeight={600}>XT#1</text>
        {/* XT#1 branch box and ties */}
        <rect x={495} y={180} width={70} height={60} fill="none" stroke="#000" strokeWidth={2} />
        <line x1={530} y1={160} x2={530} y2={180} stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />
        <line x1={530} y1={240} x2={530} y2={270} stroke="#000" strokeWidth={2} />
        <line x1={490} y1={270} x2={570} y2={270} stroke="#000" strokeWidth={2} />
        <line x1={490} y1={270} x2={490} y2={300} stroke="#000" strokeWidth={2} />
        <line x1={570} y1={270} x2={570} y2={300} stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />

        {/* DIRTY TANK */}
        <rect x={610} y={300} width={150} height={150} fill="none" stroke="#000" strokeWidth={2} />
        <text x={630} y={470} fontFamily="Arial" fontSize={16} fontWeight={600}>DIRTY TANK</text>
        {/* Level keys */}
        <image href={ASSET.H} x={690} y={320} width={28} height={28} />
        <image href={ASSET.L} x={690} y={355} width={28} height={28} />
        <image href={ASSET.LL} x={690} y={390} width={28} height={28} />
        {/* Motors and valve */}
        <image href={ASSET.M_CIRC} x={630} y={305} width={30} height={30} />
        <image href={ASSET.M_CIRC} x={585} y={350} width={30} height={30} />
        <image href={ASSET.M_CIRC} x={585} y={385} width={30} height={30} />
        <image href={ASSET.TRI_VERT} x={665} y={360} width={24} height={36} />

        {/* Dashed cross line in dirty tank */}
        <line x1={620} y1={380} x2={755} y2={380} stroke="#000" strokeWidth={2} strokeDasharray="6 6" />
        {/* Outlet from dirty tank to main header */}
        <line x1={605} y1={380} x2={575} y2={380} stroke="#000" strokeWidth={2} />
        <line x1={575} y1={380} x2={575} y2={430} stroke="#000" strokeWidth={2} />
        <line x1={30} y1={430} x2={575} y2={430} stroke="#000" strokeWidth={2} />
        <polyline points="30,430 30,360 95,360" fill="none" stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />

        {/* Heat Exchanger block on right with stacked circles and angled feeders */}
        <rect x={815} y={40} width={300} height={240} fill="none" stroke="#000" strokeWidth={2} />
        {/* Stacked circles */}
        <circle cx={965} cy={60} r={26} fill="#fff" stroke="#000" strokeWidth={2} />
        <circle cx={965} cy={100} r={21} fill="#fff" stroke="#000" strokeWidth={2} />
        <circle cx={965} cy={135} r={15} fill="#fff" stroke="#000" strokeWidth={2} />
        <circle cx={965} cy={160} r={15} fill="#fff" stroke="#000" strokeWidth={2} />
        <circle cx={965} cy={195} r={21} fill="#fff" stroke="#000" strokeWidth={2} />
        <circle cx={965} cy={240} r={28} fill="#fff" stroke="#000" strokeWidth={2} />
        {/* Horizontal dotted ref line through center */}
        <image href={ASSET.DOT_H} x={840} y={155} width={250} height={20} />
        {/* Left angled inlets */}
        <polyline points="815,40 890,70" fill="none" stroke="#000" strokeWidth={2} />
        <circle cx={890} cy={70} r={3} fill="#000" />
        <polyline points="815,70 885,105" fill="none" stroke="#000" strokeWidth={2} />
        <circle cx={885} cy={105} r={3} fill="#000" />
        <polyline points="815,100 880,122" fill="none" stroke="#000" strokeWidth={2} />
        <circle cx={880} cy={122} r={3} fill="#000" />
        <polyline points="815,125 880,140" fill="none" stroke="#000" strokeWidth={2} />
        <circle cx={880} cy={140} r={3} fill="#000" />
        <polyline points="815,160 885,175" fill="none" stroke="#000" strokeWidth={2} />
        <circle cx={885} cy={175} r={3} fill="#000" />
        <polyline points="815,200 890,222" fill="none" stroke="#000" strokeWidth={2} />
        {/* Lower base line */}
        <line x1={815} y1={280} x2={895} y2={280} stroke="#000" strokeWidth={2} />
        {/* Right outlets */}
        <line x1={990} y1={60} x2={1115} y2={40} stroke="#000" strokeWidth={2} />
        <line x1={990} y1={100} x2={1115} y2={70} stroke="#000" strokeWidth={2} />
        <line x1={990} y1={135} x2={1115} y2={110} stroke="#000" strokeWidth={2} />
        <line x1={990} y1={160} x2={1115} y2={130} stroke="#000" strokeWidth={2} />
        <line x1={990} y1={195} x2={1115} y2={165} stroke="#000" strokeWidth={2} />
        <line x1={990} y1={240} x2={1115} y2={205} stroke="#000" strokeWidth={2} />
        <line x1={1025} y1={280} x2={1115} y2={280} stroke="#000" strokeWidth={2} />

        {/* Connections to/from exchanger */}
        <line x1={750} y1={380} x2={815} y2={380} stroke="#000" strokeWidth={2} />
        <line x1={815} y1={280} x2={815} y2={380} stroke="#000" strokeWidth={2} />
        <line x1={1115} y1={280} x2={1115} y2={380} stroke="#000" strokeWidth={2} />
        <line x1={750} y1={380} x2={1115} y2={380} stroke="#000" strokeWidth={2} markerEnd="url(#arrow)" />

        {/* Tie exchanger to XT#1 rail */}
        <line x1={965} y1={280} x2={965} y2={295} stroke="#000" strokeWidth={2} />
        <line x1={530} y1={295} x2={965} y2={295} stroke="#000" strokeWidth={2} />
        <line x1={530} y1={160} x2={530} y2={295} stroke="#000" strokeWidth={2} />
      </svg>
    </div>
  );
};

export default PidDiagram;
