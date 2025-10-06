import React from 'react';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { useAlarmContext } from './AlarmContext';

const SAMPLE_MESSAGES = [
  'Hydraulic pressure spike detected',
  'Coolant temperature above threshold',
  'Pump #2 vibration anomaly',
  'Low oil level in reservoir',
  'Unauthorized panel access attempt',
  'Overcurrent detected on motor M3',
];

const LEVELS = ['low','medium','high','critical'] as const;

function randomItem<T>(arr: readonly T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

export const AlarmNotifier: React.FC = () => {
  const { addAcknowledged } = useAlarmContext();

  React.useEffect(() => {
    const showToast = () => {
      const alarm = {
        id: Math.random().toString(36).slice(2),
        level: randomItem(LEVELS),
        message: randomItem(SAMPLE_MESSAGES),
        time: new Date().toLocaleString(),
      } as const;

      let dismiss: (() => void) | undefined;
      const t = toast({
        title: `New ${alarm.level.toUpperCase()} Alarm`,
        description: `${alarm.message} — ${alarm.time}`,
        action: (
          <ToastAction altText="Acknowledge" onClick={() => { addAcknowledged(alarm); dismiss?.(); }}>
            Acknowledge
          </ToastAction>
        ),
      });
      dismiss = t.dismiss;
    };

    const id = setInterval(showToast, 60_000);
    // fire one after 3s to indicate behavior without long wait
    const warmup = setTimeout(showToast, 3000);
    return () => { clearInterval(id); clearTimeout(warmup); };
  }, [addAcknowledged]);

  return null;
};
