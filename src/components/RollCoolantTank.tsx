import React, { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface RollCoolantTankProps {
  targetVolume: number; // Vset
  currentVolume: number; // Vact
  currentConcentration: number; // Dact (%), used to split current oil/water
  oilToAdd: number; // Vsup_o
  waterToAdd: number; // Vsup_w
  className?: string;
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export const RollCoolantTank: React.FC<RollCoolantTankProps> = ({
  targetVolume,
  currentVolume,
  currentConcentration,
  oilToAdd,
  waterToAdd,
  className,
}) => {
  const {
    vact_o,
    vact_w,
    vsup_o,
    vsup_w,
    total,
  } = useMemo(() => {
    const total = Math.max(targetVolume, 0);
    const vact_o = Math.max(currentVolume * (currentConcentration / 100), 0);
    const vact_w = Math.max(currentVolume - vact_o, 0);
    const vsup_o = Math.max(oilToAdd, 0);
    const vsup_w = Math.max(waterToAdd, 0);
    return { vact_o, vact_w, vsup_o, vsup_w, total };
  }, [currentConcentration, currentVolume, oilToAdd, targetVolume, waterToAdd]);

  const pct = (v: number) => (total <= 0 ? 0 : clamp((v / total) * 100, 0, 100));

  const layers = [
    {
      key: 'vact_o',
      label: 'Vact_o: Current oil volume',
      value: vact_o,
      color: 'from-zinc-600/70 to-zinc-500/70',
      text: 'text-zinc-100',
    },
    {
      key: 'vact_w',
      label: 'Vact_w: Current water volume',
      value: vact_w,
      color: 'from-sky-600/70 to-cyan-500/70',
      text: 'text-white',
    },
    {
      key: 'vsup_o',
      label: 'Vsup_o: Supplied oil volume',
      value: vsup_o,
      color: 'from-zinc-400/80 to-stone-300/80',
      text: 'text-zinc-900',
    },
    {
      key: 'vsup_w',
      label: 'Vsup_w: Supplied water volume',
      value: vsup_w,
      color: 'from-sky-400/80 to-cyan-300/80',
      text: 'text-cyan-950',
    },
  ];

  const scaleMarks = useMemo(() => {
    const marks: { pct: number; label: string }[] = [];
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps;
      marks.push({ pct: ratio * 100, label: `${(targetVolume * ratio).toFixed(0)} m³` });
    }
    return marks;
  }, [targetVolume]);

  return (
    <TooltipProvider>
      <div className={cn('relative w-full rounded-2xl border border-border/70 bg-gradient-to-br from-background/60 to-background/20 p-4', className)}>
        <div className="grid grid-cols-12 gap-4">
          {/* Y axis with ticks */}
          <div className="col-span-2 flex items-end">
            <div className="relative h-64 w-full">
              <div className="absolute inset-y-0 right-1 w-px bg-border" />
              {scaleMarks.map((m) => (
                <div key={m.pct} className="absolute right-1 -translate-y-1/2" style={{ bottom: `${m.pct}%` }}>
                  <div className="h-px w-3 bg-border" />
                  <div className="pr-2 text-[10px] text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tank body */}
          <div className="col-span-10">
            <div className="relative h-64 w-full overflow-hidden rounded-xl border border-foreground/30 bg-gradient-to-b from-muted/40 to-background">
              {/* Inner shine */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
              {/* Layers */}
              {layers.reduce<JSX.Element[]>((acc, layer, idx) => {
                const heightPct = pct(layer.value);
                const bottomPct = layers
                  .slice(0, idx)
                  .reduce((s, l) => s + pct(l.value), 0);
                const content = (
                  <Tooltip key={layer.key}>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          'absolute left-0 w-full bg-gradient-to-r',
                          layer.color,
                          'border-t border-white/20'
                        )}
                        style={{ height: `${heightPct}%`, bottom: `${bottomPct}%` }}
                      >
                        <div className={cn('flex h-full items-center justify-center px-2 text-xs font-semibold', layer.text)}>
                          <span className="hidden sm:block drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{layer.label}</span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{layer.label} – {layer.value.toFixed(2)} m³ ({pct(layer.value).toFixed(0)}%)</TooltipContent>
                  </Tooltip>
                );
                acc.push(content);
                return acc;
              }, [])}

              {/* Frame accents */}
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/20" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-black/20" />
            </div>

            {/* Legend */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              {layers.map((l) => (
                <div key={`legend-${l.key}`} className="flex items-center gap-2">
                  <span className={cn('h-3 w-3 rounded-sm bg-gradient-to-r', l.color, 'ring-1 ring-border/50')} />
                  <span className="text-muted-foreground">
                    {l.key.replace('_', '')}: {l.value.toFixed(2)} m³
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RollCoolantTank;
