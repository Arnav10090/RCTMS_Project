import React from 'react';

const PidDiagram: React.FC = () => {
  return (
    <div className="w-full h-full p-4 overflow-hidden bg-white">
      <svg width="100%" height="100%" viewBox="0 0 1100 500" preserveAspectRatio="xMinYMid meet" className="block w-full h-full">
        <defs>
          <marker id="arrowblack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000" />
          </marker>
        </defs>

        {/* DM Water label and vertical line with arrow */}
        <text x="70" y="25" fontSize="14" fontFamily="Arial">DM Water</text>
        <line x1="85" y1="30" x2="85" y2="120" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="79" y="115" width="12" height="12" />

        {/* FT#1 Flow Transmitter - using circle svg */}
        <image href="/svgs/circle.svg" x="55" y="125" width="60" height="60" />
        <text x="72" y="160" fontSize="12" fontFamily="Arial" fontWeight="bold">FT#1</text>

        {/* Legend */}
        <text x="150" y="145" fontSize="10" fontFamily="Arial">FT : Flow Transmitter</text>
        <text x="150" y="160" fontSize="10" fontFamily="Arial">LT : Level Transmitter</text>
        <text x="150" y="175" fontSize="10" fontFamily="Arial">TIC : Temp. indicator and controller</text>
        <text x="150" y="190" fontSize="10" fontFamily="Arial">XT1: On-Line oil concentration measure</text>

        {/* Vertical line from FT#1 down */}
        <line x1="85" y1="185" x2="85" y2="240" stroke="#000" strokeWidth="2" />

        {/* OIL TANK - using rectangle */}
        <image href="/svgs/rectangle.svg" x="30" y="240" width="140" height="140" />
        <text x="60" y="395" fontSize="14" fontFamily="Arial" fontWeight="bold">OIL TANK</text>

        {/* Oil tank level indicators using H, L, LL svgs */}
        <image href="/svgs/H.svg" x="32" y="250" width="25" height="25" />
        <image href="/svgs/Horizontal-dotted_line.svg" x="58" y="260" width="40" height="5" />

        <image href="/svgs/L.svg" x="32" y="285" width="25" height="25" />
        <image href="/svgs/Horizontal-dotted_line.svg" x="58" y="295" width="40" height="5" />

        <image href="/svgs/LL.svg" x="32" y="320" width="25" height="25" />
        <image href="/svgs/Horizontal-dotted_line.svg" x="58" y="330" width="40" height="5" />

        {/* Motor symbols on oil tank */}
        <image href="/svgs/M_in_circle.svg" x="35" y="365" width="25" height="25" />
        <image href="/svgs/infinity.svg" x="57" y="372" width="20" height="10" />

        {/* Pump symbols */}
        <image href="/svgs/M_in_circle.svg" x="108" y="250" width="25" height="25" />
        <image href="/svgs/M_in_circle.svg" x="125" y="270" width="25" height="25" />

        {/* Vertical line and valve from oil tank */}
        <line x1="105" y1="310" x2="105" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="99" y="325" width="12" height="12" />
        <line x1="105" y1="337" x2="105" y2="350" stroke="#000" strokeWidth="2" />

        {/* Horizontal pipe to instruments box */}
        <line x1="105" y1="350" x2="220" y2="350" stroke="#000" strokeWidth="2" />

        {/* Instruments box - FT#2, LT, TIC */}
        <rect x="120" y="220" width="280" height="95" fill="none" stroke="#000" strokeWidth="2" />

        {/* FT#2 */}
        <image href="/svgs/circle.svg" x="125" y="230" width="40" height="40" />
        <text x="137" y="254" fontSize="10" fontFamily="Arial" fontWeight="bold">FT</text>
        <image href="/svgs/FT#2.svg" x="168" y="238" width="40" height="22" />

        {/* LT */}
        <image href="/svgs/LT.svg" x="245" y="238" width="35" height="22" />

        {/* TIC with thermometer */}
        <image href="/svgs/TIC.svg" x="300" y="238" width="40" height="22" />
        <image href="/svgs/TEMP.svg" x="260" y="265" width="35" height="40" />

        {/* Motor M3 in instruments */}
        <image href="/svgs/M_in_circle.svg" x="145" y="275" width="25" height="25" />
        <image href="/svgs/M_in_circle.svg" x="360" y="275" width="25" height="25" />

        {/* Valves below instrument box */}
        <line x1="220" y1="315" x2="220" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/infinity.svg" x="210" y="328" width="20" height="10" />
        <line x1="220" y1="338" x2="220" y2="350" stroke="#000" strokeWidth="2" />

        {/* Control valves - using filled triangles */}
        <line x1="315" y1="315" x2="315" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="309" y="328" width="12" height="12" />
        <line x1="315" y1="340" x2="315" y2="350" stroke="#000" strokeWidth="2" />

        <line x1="350" y1="315" x2="350" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="344" y="328" width="12" height="12" />
        <line x1="350" y1="340" x2="350" y2="350" stroke="#000" strokeWidth="2" />

        {/* Lines to clean tank from instruments */}
        <line x1="395" y1="315" x2="395" y2="350" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="389" y="345" width="12" height="12" />

        <line x1="430" y1="315" x2="430" y2="350" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="424" y="345" width="12" height="12" />

        {/* CLEAN TANK */}
        <rect x="220" y="240" width="380" height="140" fill="none" stroke="#000" strokeWidth="2" />
        <text x="360" y="395" fontSize="14" fontFamily="Arial" fontWeight="bold">CLEAN TANK</text>

        {/* Elements inside clean tank */}
        <image href="/svgs/trapezoid.svg" x="370" y="245" width="50" height="25" />
        <line x1="395" y1="270" x2="395" y2="290" stroke="#000" strokeWidth="2" />

        {/* Motors in clean tank */}
        <image href="/svgs/M_in_circle.svg" x="455" y="250" width="25" height="25" />
        <image href="/svgs/M_in_circle.svg" x="490" y="250" width="25" height="25" />
        <image href="/svgs/M_in_circle.svg" x="520" y="285" width="25" height="25" />
        <image href="/svgs/M_in_circle.svg" x="555" y="285" width="25" height="25" />

        {/* Dashed line in clean tank */}
        <image href="/svgs/Horizontal-dotted_line.svg" x="240" y="320" width="340" height="5" />

        {/* Outlet from clean tank */}
        <line x1="495" y1="350" x2="495" y2="365" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="489" y="360" width="12" height="12" />

        {/* XT#1 box with circle and X */}
        <rect x="520" y="125" width="70" height="70" fill="none" stroke="#000" strokeWidth="2" />
        <image href="/svgs/P_in_circle.svg" x="535" y="140" width="40" height="40" />
        <line x1="545" y1="150" x2="565" y2="170" stroke="#000" strokeWidth="2" />
        <line x1="545" y1="170" x2="565" y2="150" stroke="#000" strokeWidth="2" />
        <text x="595" y="165" fontSize="12" fontFamily="Arial" fontWeight="bold">XT#1</text>

        {/* Lines from XT#1 */}
        <line x1="555" y1="105" x2="555" y2="125" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="549" y="120" width="12" height="12" />

        <line x1="555" y1="195" x2="555" y2="215" stroke="#000" strokeWidth="2" />
        <line x1="495" y1="215" x2="615" y2="215" stroke="#000" strokeWidth="2" />

        {/* Pink highlight box around connection */}
        <rect x="540" y="195" width="30" height="30" fill="rgba(255,192,203,0.3)" stroke="#ff69b4" strokeWidth="1.5" />

        <line x1="615" y1="215" x2="615" y2="240" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="609" y="235" width="12" height="12" />

        <line x1="495" y1="215" x2="495" y2="240" stroke="#000" strokeWidth="2" />

        {/* DIRTY TANK */}
        <rect x="620" y="240" width="140" height="140" fill="none" stroke="#000" strokeWidth="2" />
        <text x="645" y="395" fontSize="14" fontFamily="Arial" fontWeight="bold">DIRTY TANK</text>

        {/* Dirty tank level indicators */}
        <image href="/svgs/H.svg" x="685" y="250" width="25" height="25" />
        <image href="/svgs/Horizontal-dotted_line.svg" x="710" y="260" width="40" height="5" />

        <image href="/svgs/L.svg" x="685" y="285" width="25" height="25" />
        <image href="/svgs/Horizontal-dotted_line.svg" x="710" y="295" width="40" height="5" />

        <image href="/svgs/LL.svg" x="685" y="320" width="25" height="25" />
        <image href="/svgs/Horizontal-dotted_line.svg" x="710" y="330" width="40" height="5" />

        {/* Motor at dirty tank top */}
        <image href="/svgs/M_in_circle.svg" x="637" y="250" width="25" height="25" />

        {/* Pump elements */}
        <image href="/svgs/rectangle.svg" x="665" y="300" width="25" height="45" />
        <line x1="670" y1="310" x2="685" y2="310" stroke="#000" strokeWidth="1" />
        <line x1="670" y1="335" x2="685" y2="335" stroke="#000" strokeWidth="1" />
        <image href="/svgs/infinity.svg" x="680" y="318" width="20" height="10" />

        {/* Motors at dirty tank */}
        <image href="/svgs/M_in_circle.svg" x="622" y="285" width="25" height="25" />
        <image href="/svgs/M_in_circle.svg" x="622" y="320" width="25" height="25" />

        {/* Dashed line in dirty tank */}
        <image href="/svgs/Horizontal-dotted_line.svg" x="630" y="320" width="120" height="5" />

        {/* Return line from dirty tank to oil tank */}
        <line x1="620" y1="323" x2="590" y2="323" stroke="#000" strokeWidth="2" />
        <line x1="590" y1="323" x2="590" y2="410" stroke="#000" strokeWidth="2" />
        <line x1="30" y1="410" x2="590" y2="410" stroke="#000" strokeWidth="2" />
        <line x1="30" y1="310" x2="30" y2="410" stroke="#000" strokeWidth="2" />
        <line x1="30" y1="310" x2="85" y2="310" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="79" y="304" width="12" height="12" />

        {/* HEAT EXCHANGER on right */}
        <rect x="800" y="20" width="270" height="240" fill="none" stroke="#000" strokeWidth="2" />

        {/* Heat exchanger circles - 6 circles with proper sizing */}
        {/* Top circle - largest */}
        <circle cx="935" cy="45" r="22" fill="white" stroke="#000" strokeWidth="2" />
        <line x1="913" y1="45" x2="957" y2="45" stroke="#000" strokeWidth="1" />

        {/* Second circle */}
        <circle cx="935" cy="85" r="18" fill="white" stroke="#000" strokeWidth="2" />
        <line x1="917" y1="85" x2="953" y2="85" stroke="#000" strokeWidth="1" />

        {/* Third circle - smallest */}
        <circle cx="935" cy="120" r="13" fill="white" stroke="#000" strokeWidth="2" />
        <line x1="922" y1="120" x2="948" y2="120" stroke="#000" strokeWidth="1" />

        {/* Fourth circle - smallest (on dashed line) */}
        <circle cx="935" cy="145" r="13" fill="white" stroke="#000" strokeWidth="2" />
        <line x1="922" y1="145" x2="948" y2="145" stroke="#000" strokeWidth="1" />

        {/* Fifth circle */}
        <circle cx="935" cy="180" r="18" fill="white" stroke="#000" strokeWidth="2" />
        <line x1="917" y1="180" x2="953" y2="180" stroke="#000" strokeWidth="1" />

        {/* Bottom circle - largest */}
        <circle cx="935" cy="220" r="22" fill="white" stroke="#000" strokeWidth="2" />
        <line x1="913" y1="220" x2="957" y2="220" stroke="#000" strokeWidth="1" />

        {/* Left inlet lines with dots and arrows */}
        <line x1="800" y1="30" x2="875" y2="50" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="872" y="47" width="6" height="6" />
        <line x1="875" y1="50" x2="903" y2="42" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="897" y="36" width="12" height="12" />
        <line x1="903" y1="42" x2="913" y2="40" stroke="#000" strokeWidth="2" />

        <line x1="800" y1="60" x2="870" y2="78" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="867" y="75" width="6" height="6" />
        <line x1="870" y1="78" x2="900" y2="82" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="894" y="76" width="12" height="12" />
        <line x1="900" y1="82" x2="917" y2="84" stroke="#000" strokeWidth="2" />

        <line x1="800" y1="95" x2="865" y2="108" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="862" y="105" width="6" height="6" />
        <line x1="865" y1="108" x2="895" y2="115" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="889" y="109" width="12" height="12" />
        <line x1="895" y1="115" x2="922" y2="119" stroke="#000" strokeWidth="2" />

        <line x1="800" y1="125" x2="865" y2="135" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="862" y="132" width="6" height="6" />
        <line x1="865" y1="135" x2="895" y2="140" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="889" y="134" width="12" height="12" />
        <line x1="895" y1="140" x2="922" y2="143" stroke="#000" strokeWidth="2" />

        {/* Dashed line across heat exchanger */}
        <image href="/svgs/Horizontal-dotted_line.svg" x="800" y="130" width="270" height="5" />

        <line x1="800" y1="145" x2="865" y2="145" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="862" y="142" width="6" height="6" />
        <line x1="865" y1="145" x2="895" y2="145" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="889" y="139" width="12" height="12" />
        <line x1="895" y1="145" x2="922" y2="145" stroke="#000" strokeWidth="2" />

        <line x1="800" y1="155" x2="865" y2="155" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="862" y="152" width="6" height="6" />
        <line x1="865" y1="155" x2="895" y2="152" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="889" y="146" width="12" height="12" />
        <line x1="895" y1="152" x2="922" y2="150" stroke="#000" strokeWidth="2" />

        <line x1="800" y1="170" x2="870" y2="175" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="867" y="172" width="6" height="6" />
        <line x1="870" y1="175" x2="900" y2="178" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="894" y="172" width="12" height="12" />
        <line x1="900" y1="178" x2="917" y2="180" stroke="#000" strokeWidth="2" />

        <line x1="800" y1="210" x2="875" y2="218" stroke="#000" strokeWidth="2" />
        <line x1="875" y1="218" x2="905" y2="222" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="899" y="216" width="12" height="12" />
        <line x1="905" y1="222" x2="913" y2="223" stroke="#000" strokeWidth="2" />

        {/* Bottom line */}
        <line x1="800" y1="260" x2="870" y2="260" stroke="#000" strokeWidth="2" />

        {/* Right outlet lines */}
        <line x1="957" y1="40" x2="965" y2="38" stroke="#000" strokeWidth="2" />
        <line x1="965" y1="38" x2="1070" y2="30" stroke="#000" strokeWidth="2" />

        <line x1="953" y1="84" x2="960" y2="82" stroke="#000" strokeWidth="2" />
        <line x1="960" y1="82" x2="1070" y2="60" stroke="#000" strokeWidth="2" />

        <line x1="948" y1="119" x2="955" y2="117" stroke="#000" strokeWidth="2" />
        <line x1="955" y1="117" x2="1070" y2="95" stroke="#000" strokeWidth="2" />

        <line x1="948" y1="143" x2="955" y2="142" stroke="#000" strokeWidth="2" />
        <line x1="955" y1="142" x2="1070" y2="125" stroke="#000" strokeWidth="2" />

        <line x1="953" y1="180" x2="960" y2="182" stroke="#000" strokeWidth="2" />
        <line x1="960" y1="182" x2="1070" y2="200" stroke="#000" strokeWidth="2" />

        <line x1="957" y1="223" x2="965" y2="225" stroke="#000" strokeWidth="2" />
        <line x1="965" y1="225" x2="1070" y2="235" stroke="#000" strokeWidth="2" />

        <line x1="995" y1="260" x2="1070" y2="260" stroke="#000" strokeWidth="2" />

        {/* Connection from clean tank to heat exchanger */}
        <line x1="760" y1="323" x2="800" y2="323" stroke="#000" strokeWidth="2" />
        <line x1="800" y1="260" x2="800" y2="323" stroke="#000" strokeWidth="2" />

        {/* Connection from heat exchanger back down */}
        <line x1="1070" y1="260" x2="1070" y2="323" stroke="#000" strokeWidth="2" />
        <line x1="760" y1="323" x2="1070" y2="323" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="1064" y="317" width="12" height="12" />

        {/* Connection from heat exchanger to XT#1 */}
        <line x1="935" y1="260" x2="935" y2="280" stroke="#000" strokeWidth="2" />
        <line x1="555" y1="280" x2="935" y2="280" stroke="#000" strokeWidth="2" />
        <line x1="555" y1="105" x2="555" y2="280" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default PidDiagram;