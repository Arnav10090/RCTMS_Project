import React from 'react';
import { useAlarmContext } from './AlarmContext';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

const SAMPLE_MESSAGES = [
  'Hydraulic pressure spike detected',
  'Coolant temperature above threshold',
  'Pump #2 vibration anomaly',
  'Low oil level in reservoir',
  'Unauthorized panel access attempt',
  'Overcurrent detected on motor M3',
];

const LEVELS = ['low', 'medium', 'high', 'critical'] as const;

function randomItem<T>(arr: readonly T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const AlarmNotifier: React.FC = () => {
  const { addAcknowledged } = useAlarmContext();
  const [alarm, setAlarm] = React.useState<null | { id: string; level: typeof LEVELS[number]; message: string; time: string }>(null);

  React.useEffect(() => {
    const showModal = () => {
      setAlarm((prev) => prev ?? {
        id: Math.random().toString(36).slice(2),
        level: randomItem(LEVELS),
        message: randomItem(SAMPLE_MESSAGES),
        time: new Date().toLocaleString(),
      });
    };
    const id = setInterval(showModal, 60_000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const open = !!alarm;

  return (
    <AlertDialog open={open} onOpenChange={() => { /* block close until acknowledge */ }}>
      <AlertDialogContent
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:rounded-xl"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>New {alarm?.level.toUpperCase()} Alarm</AlertDialogTitle>
          <AlertDialogDescription>
            {alarm?.message} — {alarm?.time}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              if (alarm) {
                addAcknowledged(alarm);
                setAlarm(null);
              }
            }}
          >
            Acknowledge
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
