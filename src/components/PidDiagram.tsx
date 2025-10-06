import React from 'react';

const PidDiagram: React.FC = () => {
  return (
    <div className="w-full h-full bg-white p-8 overflow-auto">
      <svg width="1100" height="600" viewBox="0 0 1100 600" className="border border-gray-300">
        <defs>
          <marker id="arrowblack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000" />
          </marker>
        </defs>

        {/* DM Water label and line */}
        <text x="50" y="70" fontSize="14" fontFamily="Arial">DM Water</text>
        <line x1="85" y1="75" x2="85" y2="120" stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />

        {/* FT#1 Flow Transmitter */}
        <circle cx="85" cy="145" r="20" fill="none" stroke="#000" strokeWidth="2" />
        <circle cx="85" cy="145" r="15" fill="none" stroke="#000" strokeWidth="1" />
        <text x="69" y="151" fontSize="12" fontFamily="Arial" fontWeight="bold">FT</text>
        <text x="107" y="147" fontSize="11" fontFamily="Arial">#1</text>

        {/* Legend */}
        <text x="160" y="135" fontSize="10" fontFamily="Arial">FT : Flow Transmitter</text>
        <text x="160" y="150" fontSize="10" fontFamily="Arial">LT : Level Transmitter</text>
        <text x="160" y="165" fontSize="10" fontFamily="Arial">TIC : Temp. indicator and controller</text>
        <text x="160" y="180" fontSize="10" fontFamily="Arial">XT1: On-Line oil concentration measure</text>

        {/* Line from FT#1 to Oil Tank */}
        <line x1="85" y1="165" x2="85" y2="290" stroke="#000" strokeWidth="2" />

        {/* OIL TANK */}
        <rect x="30" y="290" width="150" height="130" fill="none" stroke="#000" strokeWidth="2" />
        <text x="50" y="435" fontSize="14" fontFamily="Arial" fontWeight="bold">OIL TANK</text>

        {/* Oil tank levels */}
        <text x="50" y="350" fontSize="12" fontFamily="Arial">H</text>
        <line x1="65" y1="348" x2="90" y2="348" stroke="#000" strokeWidth="1" />
        <text x="50" y="375" fontSize="12" fontFamily="Arial">L</text>
        <line x1="65" y1="373" x2="90" y2="373" stroke="#000" strokeWidth="1" />
        <text x="50" y="400" fontSize="12" fontFamily="Arial">LL</text>
        <line x1="65" y1="398" x2="90" y2="398" stroke="#000" strokeWidth="1" />

        {/* Motor M symbol at oil tank */}
        <circle cx="60" cy="305" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="54" y="311" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        {/* Pump from oil tank */}
        <rect x="105" y="315" width="30" height="40" fill="none" stroke="#000" strokeWidth="2" />
        <circle cx="120" cy="295" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="114" y="301" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        {/* Oil tank outlet valve */}
        <line x1="100" y1="365" x2="100" y2="375" stroke="#000" strokeWidth="2" />
        <polygon points="95,375 105,375 100,385" fill="none" stroke="#000" strokeWidth="2" />
        <line x1="100" y1="385" x2="100" y2="395" stroke="#000" strokeWidth="2" />

        {/* Horizontal pipe from oil tank */}
        <line x1="100" y1="395" x2="210" y2="395" stroke="#000" strokeWidth="2" />

        {/* FT#2 and instruments box */}
        <rect x="130" y="240" width="240" height="90" fill="none" stroke="#000" strokeWidth="2" />

        {/* FT#2 */}
        <circle cx="155" cy="270" r="15" fill="none" stroke="#000" strokeWidth="2" />
        <circle cx="155" cy="270" r="11" fill="none" stroke="#000" strokeWidth="1" />
        <text x="145" y="274" fontSize="10" fontFamily="Arial" fontWeight="bold">FT</text>
        <rect x="175" y="260" width="35" height="20" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="182" y="273" fontSize="10" fontFamily="Arial">#2</text>

        {/* LT */}
        <rect x="240" y="260" width="25" height="20" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="245" y="273" fontSize="10" fontFamily="Arial">LT</text>

        {/* TIC with thermometer */}
        <rect x="285" y="260" width="30" height="20" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="287" y="273" fontSize="9" fontFamily="Arial">TIC</text>
        <rect x="252" y="280" width="20" height="35" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <rect x="257" y="285" width="10" height="25" fill="#d3d3d3" stroke="#000" strokeWidth="1" />

        {/* Motor M3 */}
        <circle cx="165" cy="295" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="159" y="301" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        {/* Valves below instrument box */}
        <line x1="210" y1="330" x2="210" y2="350" stroke="#000" strokeWidth="2" />
        <rect x="205" y="350" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.5" />
        <circle cx="210" cy="355" r="3" fill="#000" />
        <line x1="210" y1="360" x2="210" y2="395" stroke="#000" strokeWidth="2" />

        {/* Triangular valves (control valves) */}
        <line x1="305" y1="330" x2="305" y2="355" stroke="#000" strokeWidth="2" />
        <polygon points="295,355 315,355 305,375" fill="#000" />
        <line x1="305" y1="375" x2="305" y2="395" stroke="#000" strokeWidth="2" />

        <line x1="345" y1="330" x2="345" y2="355" stroke="#000" strokeWidth="2" />
        <polygon points="335,355 355,355 345,375" fill="#000" />
        <line x1="345" y1="375" x2="345" y2="395" stroke="#000" strokeWidth="2" />

        {/* Vertical lines to clean tank */}
        <line x1="385" y1="330" x2="385" y2="395" stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />
        <line x1="425" y1="330" x2="425" y2="395" stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />

        {/* CLEAN TANK */}
        <rect x="200" y="300" width="380" height="135" fill="none" stroke="#000" strokeWidth="2" />
        <text x="330" y="450" fontSize="14" fontFamily="Arial" fontWeight="bold">CLEAN TANK</text>

        {/* Clean tank internal elements */}
        <polygon points="385,315 405,315 395,335" fill="none" stroke="#000" strokeWidth="2" />
        <line x1="395" y1="335" x2="395" y2="355" stroke="#000" strokeWidth="2" />

        {/* Motor symbols in clean tank */}
        <circle cx="440" cy="315" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="434" y="321" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        <circle cx="470" cy="315" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="464" y="321" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        {/* Clean tank outlet */}
        <line x1="480" y1="395" x2="480" y2="415" stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />

        {/* XT#1 box */}
        <rect x="485" y="190" width="60" height="60" fill="none" stroke="#000" strokeWidth="2" />
        <circle cx="515" cy="220" r="15" fill="none" stroke="#000" strokeWidth="2" />
        <line x1="505" y1="210" x2="525" y2="230" stroke="#000" strokeWidth="2" />
        <line x1="505" y1="230" x2="525" y2="210" stroke="#000" strokeWidth="2" />
        <text x="560" y="225" fontSize="12" fontFamily="Arial" fontWeight="bold">XT#1</text>

        {/* Lines from XT#1 */}
        <line x1="515" y1="165" x2="515" y2="190" stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />
        <line x1="515" y1="250" x2="515" y2="265" stroke="#000" strokeWidth="2" />
        <line x1="475" y1="265" x2="555" y2="265" stroke="#000" strokeWidth="2" />
        <line x1="555" y1="265" x2="555" y2="300" stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />
        <line x1="475" y1="265" x2="475" y2="300" stroke="#000" strokeWidth="2" />

        {/* Pink/magenta highlighting around XT#1 connection */}
        <rect x="500" y="250" width="30" height="30" fill="rgba(255,192,203,0.3)" stroke="#ff69b4" strokeWidth="1.5" />

        {/* DIRTY TANK */}
        <rect x="610" y="300" width="135" height="135" fill="none" stroke="#000" strokeWidth="2" />
        <text x="625" y="450" fontSize="14" fontFamily="Arial" fontWeight="bold">DIRTY TANK</text>

        {/* Dirty tank levels */}
        <text x="665" y="345" fontSize="12" fontFamily="Arial">H</text>
        <line x1="680" y1="343" x2="705" y2="343" stroke="#000" strokeWidth="1" />
        <text x="665" y="370" fontSize="12" fontFamily="Arial">L</text>
        <line x1="680" y1="368" x2="705" y2="368" stroke="#000" strokeWidth="1" />
        <text x="665" y="395" fontSize="12" fontFamily="Arial">LL</text>
        <line x1="680" y1="393" x2="705" y2="393" stroke="#000" strokeWidth="1" />

        {/* Motor at dirty tank top */}
        <circle cx="635" cy="315" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="629" y="321" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        {/* Pump and valve at dirty tank */}
        <rect x="655" y="360" width="20" height="35" fill="#fff" stroke="#000" strokeWidth="2" />
        <line x1="660" y1="365" x2="670" y2="365" stroke="#000" strokeWidth="1" />
        <line x1="660" y1="390" x2="670" y2="390" stroke="#000" strokeWidth="1" />

        <rect x="670" y="370" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.5" />
        <circle cx="675" cy="375" r="3" fill="#000" />

        {/* Motor at dirty tank */}
        <circle cx="590" cy="365" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="584" y="371" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        <circle cx="590" cy="395" r="12" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="584" y="401" fontSize="11" fontFamily="Arial" fontWeight="bold">M</text>

        {/* Dashed line in dirty tank */}
        <line x1="620" y1="377" x2="740" y2="377" stroke="#000" strokeWidth="2" strokeDasharray="5,5" />

        {/* Outlet from dirty tank */}
        <line x1="610" y1="377" x2="580" y2="377" stroke="#000" strokeWidth="2" />
        <line x1="580" y1="377" x2="580" y2="420" stroke="#000" strokeWidth="2" />
        <line x1="30" y1="420" x2="580" y2="420" stroke="#000" strokeWidth="2" />
        <line x1="30" y1="420" x2="30" y2="355" stroke="#000" strokeWidth="2" />
        <line x1="30" y1="355" x2="85" y2="355" stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />

        {/* Heat Exchanger on right */}
        <rect x="800" y="35" width="270" height="230" fill="none" stroke="#000" strokeWidth="2" />

        {/* Heat exchanger circles - 6 circles with varying sizes */}
        {/* Top circle - largest */}
        <circle cx={935} cy={50} r={25} fill="#fff" stroke="#000" strokeWidth="2" />

        {/* Second circle */}
        <circle cx={935} cy={90} r={20} fill="#fff" stroke="#000" strokeWidth="2" />

        {/* Third circle - smallest */}
        <circle cx={935} cy={125} r={14} fill="#fff" stroke="#000" strokeWidth="2" />

        {/* Fourth circle - smallest (on dashed line) */}
        <circle cx={935} cy={150} r={14} fill="#fff" stroke="#000" strokeWidth="2" />

        {/* Fifth circle */}
        <circle cx={935} cy={185} r={20} fill="#fff" stroke="#000" strokeWidth="2" />

        {/* Bottom circle - largest */}
        <circle cx={935} cy={230} r={27} fill="#fff" stroke="#000" strokeWidth="2" />

        {/* Left side angled inlet lines connected to circles */}
        {/* Top circle line */}
        <line x1={800} y1={35} x2={870} y2={65} stroke="#000" strokeWidth="2" />
        <circle cx={870} cy={65} r={3} fill="#000" />
        <line x1={870} y1={65} x2={895} y2={55} stroke="#000" strokeWidth="2" />
        <polygon points="895,55 885,50 885,60" fill="#000" />
        <line x1={895} y1={55} x2={910} y2={50} stroke="#000" strokeWidth="2" />

        {/* Second circle line */}
        <line x1={800} y1={65} x2={865} y2={100} stroke="#000" strokeWidth="2" />
        <circle cx={865} cy={100} r={3} fill="#000" />
        <line x1={865} y1={100} x2={895} y2={93} stroke="#000" strokeWidth="2" />
        <polygon points="895,93 885,88 885,98" fill="#000" />
        <line x1={895} y1={93} x2={915} y2={90} stroke="#000" strokeWidth="2" />

        {/* Third circle line - two paths converging */}
        <line x1={800} y1={100} x2={860} y2={118} stroke="#000" strokeWidth="2" />
        <circle cx={860} cy={118} r={3} fill="#000" />
        <line x1={860} y1={118} x2={900} y2={121} stroke="#000" strokeWidth="2" />
        <polygon points="900,121 890,116 890,126" fill="#000" />
        <line x1={900} y1={121} x2={921} y2={123} stroke="#000" strokeWidth="2" />

        <line x1={800} y1={125} x2={860} y2={137} stroke="#000" strokeWidth="2" />
        <circle cx={860} cy={137} r={3} fill="#000" />
        <line x1={860} y1={137} x2={900} y2={135} stroke="#000" strokeWidth="2" />
        <polygon points="900,135 890,130 890,140" fill="#000" />
        <line x1={900} y1={135} x2={921} y2={134} stroke="#000" strokeWidth="2" />

        {/* Fourth circle with dashed line - two paths */}
        <line x1={800} y1={150} x2={1070} y2={150} stroke="#000" strokeWidth="2" strokeDasharray="8,4" />
        <line x1={800} y1={145} x2={860} y2={145} stroke="#000" strokeWidth="2" />
        <circle cx={860} cy={145} r={3} fill="#000" />
        <line x1={860} y1={145} x2={900} y2={147} stroke="#000" strokeWidth="2" />
        <polygon points="900,147 890,142 890,152" fill="#000" />
        <line x1={900} y1={147} x2={921} y2={149} stroke="#000" strokeWidth="2" />

        <line x1={800} y1={155} x2={860} y2={155} stroke="#000" strokeWidth="2" />
        <circle cx={860} cy={155} r={3} fill="#000" />
        <line x1={860} y1={155} x2={900} y2={153} stroke="#000" strokeWidth="2" />
        <polygon points="900,153 890,148 890,158" fill="#000" />
        <line x1={900} y1={153} x2={921} y2={151} stroke="#000" strokeWidth="2" />

        {/* Fifth circle line */}
        <line x1={800} y1={160} x2={865} y2={172} stroke="#000" strokeWidth="2" />
        <circle cx={865} cy={172} r={3} fill="#000" />
        <line x1={865} y1={172} x2={895} y2={180} stroke="#000" strokeWidth="2" />
        <polygon points="895,180 885,175 885,185" fill="#000" />
        <line x1={895} y1={180} x2={915} y2={185} stroke="#000" strokeWidth="2" />

        {/* Bottom circle line */}
        <line x1={800} y1={200} x2={870} y2={220} stroke="#000" strokeWidth="2" />
        <line x1={870} y1={220} x2={893} y2={227} stroke="#000" strokeWidth="2" />
        <polygon points="893,227 883,222 883,232" fill="#000" />
        <line x1={893} y1={227} x2={908} y2={232} stroke="#000" strokeWidth="2" />

        <line x1={800} y1={265} x2={875} y2={265} stroke="#000" strokeWidth="2" />

        {/* Right side angled outlet lines */}
        <line x1={960} y1={50} x2={1070} y2={35} stroke="#000" strokeWidth="2" />
        <line x1={955} y1={90} x2={1070} y2={65} stroke="#000" strokeWidth="2" />
        <line x1={949} y1={123} x2={1070} y2={100} stroke="#000" strokeWidth="2" />
        <line x1={949} y1={150} x2={1070} y2={125} stroke="#000" strokeWidth="2" />
        <line x1={955} y1={185} x2={1070} y2={160} stroke="#000" strokeWidth="2" />
        <line x1={960} y1={232} x2={1070} y2={200} stroke="#000" strokeWidth="2" />
        <line x1={995} y1={265} x2={1070} y2={265} stroke="#000" strokeWidth="2" />

        {/* Connection from clean tank to heat exchanger */}
        <line x1={745} y1={377} x2={800} y2={377} stroke="#000" strokeWidth="2" />
        <line x1={800} y1={265} x2={800} y2={377} stroke="#000" strokeWidth="2" />

        {/* Connection from heat exchanger back down */}
        <line x1={1070} y1={265} x2={1070} y2={377} stroke="#000" strokeWidth="2" />
        <line x1={745} y1={377} x2={1070} y2={377} stroke="#000" strokeWidth="2" markerEnd="url(#arrowblack)" />

        {/* Connection from heat exchanger to XT#1 */}
        <line x1={935} y1={265} x2={935} y2={280} stroke="#000" strokeWidth="2" />
        <line x1={515} y1={280} x2={935} y2={280} stroke="#000" strokeWidth="2" />
        <line x1={515} y1={165} x2={515} y2={280} stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default PidDiagram;
