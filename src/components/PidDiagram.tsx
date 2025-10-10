import React from 'react';

const PidDiagram: React.FC = () => {
  return (
    <div className="w-full h-full p-4 bg-white flex items-center justify-center overflow-auto">
      <svg width="1100" height="800" viewBox="0 0 1100 800" preserveAspectRatio="xMidYMid meet" className="block h-auto max-w-full">
        <defs>
          <marker id="arrowblack" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000" />
          </marker>
        </defs>
        <g transform="translate(0, 80)">

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

        {/* OIL TANK */}
        <image href="/svgs/U-shape-container.svg" x="-10" y="297" width="160" height="90" />
        <text x="60" y="395" fontSize="14" fontFamily="Arial" fontWeight="bold">OIL TANK</text>

        {/* Oil tank level indicators using H, L, LL svgs */}
        <image href="/svgs/H.svg" x="113" y="280" width="70" height="70" />

        <image href="/svgs/L.svg" x="113" y="302" width="70" height="70" />

        <image href="/svgs/LL.svg" x="113" y="323" width="70" height="70" />

        {/* Motor symbols on oil tank */}
        <image href="/svgs/M_in_circle.svg" x="270" y="279" width="30" height="30" />
        <image href="/svgs/infinity.svg" x="16" y="300" width="25" height="25" />

        {/* Pump symbols */}
        <image href="/svgs/M_in_circle.svg" x="15" y="260" width="30" height="30" />

        {/* 2nd and 3rd M symbols in Oil tank */}
        <image href="/svgs/M_in_circle.svg" x="65" y="270" width="30" height="30" />
        <image href="/svgs/M_in_circle.svg" x="105" y="270" width="30" height="30" />

        {/* Vertical lines to make rectangle around M symbols */}
        <line x1="80" y1="250" x2="80" y2="280" stroke="#000" strokeWidth="1" />
        <line x1="80" y1="291" x2="80" y2="320" stroke="#000" strokeWidth="1" />
        <line x1="120" y1="250" x2="120" y2="280" stroke="#000" strokeWidth="1" />
        <line x1="120" y1="291" x2="120" y2="320" stroke="#000" strokeWidth="1" />

        {/* Horizontal lines to make rectangle around M symbols */}
        <line x1="80" y1="250" x2="120" y2="250" stroke="#000" strokeWidth="1" />
        <line x1="80" y1="320" x2="120" y2="320" stroke="#000" strokeWidth="1" />

        {/* Vertical line and valve from oil tank */}
        <line x1="105" y1="310" x2="105" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/12pm_arrow.svg" x="99" y="325" width="12" height="12" />
        <line x1="105" y1="337" x2="105" y2="350" stroke="#000" strokeWidth="2" />

        {/* Horizontal pipe to instruments box */}
        <line x1="105" y1="350" x2="220" y2="350" stroke="#000" strokeWidth="2" />

        {/* FT#2 */}
        <image href="/svgs/circle.svg" x="125" y="230" width="40" height="40" />
        <text x="137" y="254" fontSize="10" fontFamily="Arial" fontWeight="bold">FT</text>
        <image href="/svgs/FT#2.svg" x="168" y="238" width="40" height="22" />

        {/* LT */}
        <image href="/svgs/LT.svg" x="225" y="228" width="70" height="50" />

        {/* TIC with thermometer */}
        <image href="/svgs/TIC.svg" x="300" y="238" width="40" height="22" />
        <image href="/svgs/TEMP.svg" x="260" y="265" width="35" height="40" />

        {/* Rectangle */}
        <line x1="285" y1="300" x2="285" y2="330" stroke="#000" strokeWidth="1" />
        <image href="/svgs/rectangle.svg" x="260" y="290" width="50" height="50" />

        {/* Vertical triangles for TIC */}
        <image href="/svgs/vertical-triangles.svg" x="325" y="265" width="35" height="40" />
        <image href="/svgs/vertical-triangles.svg" x="365" y="265" width="35" height="40" />

        {/* Motor M3 in instruments */}

        {/* Valves below instrument box */}
        <line x1="220" y1="315" x2="220" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/infinity.svg" x="272.5" y="321" width="25" height="20" />
        <line x1="220" y1="338" x2="220" y2="350" stroke="#000" strokeWidth="2" />

        {/* Control valves - using filled triangles */}
        <line x1="342" y1="295" x2="342" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/6pm_arrow.svg" x="329" y="305" width="25" height="25" />

        {/* Vertcal line with 6pm triangles to 2 triangles */}
        <line x1="382" y1="295" x2="382" y2="330" stroke="#000" strokeWidth="2" />
        <image href="/svgs/6pm_arrow.svg" x="369.5" y="305" width="25" height="25" />

        {/* Lines to clean tank from instruments with 12pm arrow in middle below the rectangle */}
        <line x1="450" y1="303" x2="450" y2="350" stroke="#000" strokeWidth="1" />
        <image href="/svgs/12pm_arrow.svg" x="438" y="310" width="25" height="25" />
        <image href="/svgs/filled_circle.svg" x="445" y="295" width="10" height="10" />

        {/* Lines to clean tank from instruments with 12pm arrow in middle above the rectangle */}
        <line x1="450" y1="150" x2="450" y2="225" stroke="#000" strokeWidth="1" />
        <image href="/svgs/12pm_arrow.svg" x="438" y="165" width="25" height="25" />
        <image href="/svgs/filled_circle.svg" x="445" y="221" width="10" height="10" />

        {/* Vertical lines to make rectangle around M symbols */}
        <line x1="430" y1="226" x2="430" y2="259" stroke="#000" strokeWidth="1" />
        <line x1="468" y1="270" x2="468" y2="300" stroke="#000" strokeWidth="1" />
        <line x1="468" y1="226" x2="468" y2="259" stroke="#000" strokeWidth="1" />
        <line x1="430" y1="270" x2="430" y2="300" stroke="#000" strokeWidth="1" />

        {/* Horizontal lines to make rectangle around M symbols */}
        <line x1="430" y1="226" x2="468" y2="226" stroke="#000" strokeWidth="1" />
        <line x1="430" y1="300" x2="468" y2="300" stroke="#000" strokeWidth="1" />

        {/* Vertical line and arrow above trapezoid */}
        <line x1="555" y1="228" x2="555" y2="248" stroke="#000" strokeWidth="2" />
        <image href="/svgs/6pm_arrow.svg" x="543" y="238" width="25" height="25" />

        {/* Horizontal line above trapezoid */}
        <line x1="554" y1="227" x2="660" y2="227" stroke="#000" strokeWidth="2" />
        
        {/* Vertical line till M synbol above the infinity symbol */}
        <line x1="660" y1="226" x2="660" y2="258" stroke="#000" strokeWidth="2" />

        {/* CLEAN TANK */}
        <text x="360" y="395" fontSize="14" fontFamily="Arial" fontWeight="bold">CLEAN TANK</text>

        {/* Elements inside clean tank */}
        <image href="/svgs/trapezoid.svg" x="505" y="228" width="100" height="50" />
        <line x1="395" y1="270" x2="395" y2="290" stroke="#000" strokeWidth="2" />

        {/* U shape Extended container of Clean and Dirty tanks */}
        <image href="/svgs/U-shape-ext-container.svg" x="220" y="290" width="550" height="100" />

        {/* Motors in clean tank */}
        <image href="/svgs/M_in_circle.svg" x="453" y="250" width="30" height="30" />
        <image href="/svgs/M_in_circle.svg" x="415.5" y="250" width="30" height="30" />

        {/* Outlet from clean tank */}
        <line x1="555" y1="260" x2="555" y2="342" stroke="#000" strokeWidth="2" />
        <image href="/svgs/6pm_arrow.svg" x="542.5" y="320" width="25" height="25" />

        {/* XT#1 text */}
        <text x="540" y="100" fontSize="12" fontFamily="Arial" fontWeight="bold">XT#1</text>

        {/* Circle with filled circle inside it  */}
        <image href="/svgs/circle.svg" x="543" y="123" width="25" height="25" />
        <image href="/svgs/filled_circle.svg" x="551" y="130" width="10" height="10" />
        
        {/* Vertical pink lines below XT#1 text */}
        <image href="/svgs/pink-vertical-line.svg" x="507" y="130" width="30" height="60" />
        <image href="/svgs/pink-vertical-line.svg" x="575" y="130" width="30" height="60" />

        {/* Horizontal pink lines below XT#1 text */}
        <image href="/svgs/pink-horizontal-line.svg" x="520" y="120" width="25" height="25" />
        <image href="/svgs/pink-horizontal-line.svg" x="565" y="120" width="25" height="25" />

        {/* Pink dots below XT#1 text */}
        <image href="/svgs/pink-black-dot.svg" x="517" y="188" width="10" height="10" />
        <image href="/svgs/pink-black-dot.svg" x="585" y="188" width="10" height="10" />

        {/* Vertical Lines below XT#1 */}
        <line x1="555" y1="105" x2="555" y2="125" stroke="#000" strokeWidth="1" />
        <line x1="555" y1="145" x2="555" y2="170" stroke="#000" strokeWidth="1" />

        {/* Horizontal line connecting pink dots below XT#1 and dot at end */}
        <line x1="450" y1="192.5" x2="1095" y2="192.5" stroke="#000" strokeWidth="1" />
        <image href="/svgs/filled_circle.svg" x="1090" y="187" width="10" height="10" />

        {/* DIRTY TANK */}
        <text x="645" y="395" fontSize="14" fontFamily="Arial" fontWeight="bold">DIRTY TANK</text>

        {/* Dirty tank level indicators */}
        <image href="/svgs/H.svg" x="740" y="280" width="70" height="70" />

        <image href="/svgs/L.svg" x="740" y="300" width="70" height="70" />

        <image href="/svgs/LL.svg" x="740" y="320" width="70" height="70" />

        {/* Motor at dirty tank top */}
        <image href="/svgs/M_in_circle.svg" x="645" y="249" width="30" height="30" />

        {/* Pump elements */}
        <image href="/svgs/rectangle.svg" x="616" y="265" width="50" height="50" />
        <line x1="750" y1="230" x2="800" y2="230" stroke="#000" strokeWidth="2" />
        <image href="/svgs/infinity.svg" x="629" y="300" width="25" height="25" />
        <line x1="641" y1="270" x2="641" y2="312" stroke="#000" strokeWidth="1" />
        <line x1="660" y1="270" x2="660" y2="312" stroke="#000" strokeWidth="1" />
        <image href="/svgs/12pm_arrow.svg" x="648" y="278" width="25" height="25" />

        {/* Vertical line andd arrow at right end of dirty tank */}
        <line x1="693" y1="226" x2="693" y2="286" stroke="#000" strokeWidth="1" />
        <image href="/svgs/6pm_arrow.svg" x="680" y="278" width="25" height="25" />
        <line x1="693" y1="225" x2="910" y2="225" stroke="#000" strokeWidth="2" />

        {/* Motors at dirty tank */}
        <image href="/svgs/M_in_circle.svg" x="625" y="249" width="30" height="30" />
        <image href="/svgs/slanting-line-2pm.svg" x="733" y="184" width="50" height="50" />
        <image href="/svgs/moving-roll.svg" x="710" y="217" width="90" height="80" />
        <image href="/svgs/M_in_circle.svg" x="758" y="185" width="30" height="30" />

        {/* Vertical Dashed line in dirty tank */}
        <image href="/svgs/vertical-dotted_line.svg" x="565" y="275" width="100" height="100" />

        {/* Vertical line for Heat Exchanger */}
        <line x1="800" y1="230" x2="800" y2="20" stroke="#000" strokeWidth="2" />
        
        {/* Heat exchanger circles - 6 circles with proper sizing */}
        {/* Top circle - largest */}
        <circle cx="935" cy="15" r="22" fill="white" stroke="#000" strokeWidth="2" />

        {/* Second circle */}
        <circle cx="935" cy="59" r="18" fill="white" stroke="#000" strokeWidth="2" />

        {/* Third circle - smallest */}
        <circle cx="935" cy="92" r="13" fill="white" stroke="#000" strokeWidth="2" />

        {/* Fourth circle - smallest (on dashed line) */}
        <circle cx="935" cy="121" r="13" fill="white" stroke="#000" strokeWidth="2" />

        {/* Fifth circle */}
        <circle cx="935" cy="155" r="18" fill="white" stroke="#000" strokeWidth="2" />

        {/* Bottom circle - largest */}
        <circle cx="935" cy="198" r="22" fill="white" stroke="#000" strokeWidth="2" />

         {/* Bottom circle - largest */}
        <image href="/svgs/trapezoid.svg" x="860" y="190" width="150" height="100" />

        {/* Left inlet lines with dots and arrows */}
        <line x1="800" y1="20" x2="875" y2="20" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="900" y="27" width="6" height="6" />
        <line x1="875" y1="20" x2="903" y2="30" stroke="#000" strokeWidth="2" />
        <image href="/svgs/4pm_arrow.svg" x="900" y="27" width="20" height="20" />

        <line x1="800" y1="48" x2="875" y2="48" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="897" y="67" width="6" height="6" />
        <line x1="874.5" y1="48" x2="900" y2="70" stroke="#000" strokeWidth="2" />
        <image href="/svgs/4pm_arrow.svg" x="894" y="65" width="20" height="20" />

        <line x1="800" y1="78" x2="865" y2="78" stroke="#000" strokeWidth="2" />
        <image href="/svgs/filled_circle.svg" x="891" y="90" width="6" height="6" />
        <line x1="865" y1="78" x2="895" y2="93" stroke="#000" strokeWidth="2" />
        <image href="/svgs/4pm_arrow.svg" x="890" y="90" width="20" height="20" />

        {/* Dashed line across heat exchanger */}
        <image href="/svgs/Horizontal-dotted_line.svg" x="800" y="99" width="270" height="15" />

        <line x1="800" y1="140" x2="865" y2="140" stroke="#000" strokeWidth="2" />
        <line x1="865" y1="140" x2="895" y2="122" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="893" y="110.5" width="20" height="20" />

        <line x1="800" y1="168" x2="870" y2="168" stroke="#000" strokeWidth="2" />
        <line x1="870" y1="168" x2="900" y2="148" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="898" y="136" width="20" height="20" />

        <line x1="800" y1="196" x2="875" y2="196" stroke="#000" strokeWidth="2" />
        <line x1="875" y1="196" x2="905" y2="185" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="903" y="173" width="20" height="20" />

        {/* Connection from clean tank to heat exchanger */}
        <line x1="760" y1="323" x2="800" y2="323" stroke="#000" strokeWidth="2" />
        <line x1="800" y1="230" x2="800" y2="323" stroke="#000" strokeWidth="2" />

        {/* Connection from heat exchanger back down */}
        <line x1="1070" y1="230" x2="1070" y2="323" stroke="#000" strokeWidth="2" />
        <line x1="760" y1="323" x2="1070" y2="323" stroke="#000" strokeWidth="2" />
        <image href="/svgs/2pm_arrow.svg" x="1064" y="317" width="12" height="12" />

        {/* Connection from heat exchanger to XT#1 */}
        <line x1="935" y1="230" x2="935" y2="280" stroke="#000" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

export default PidDiagram;
