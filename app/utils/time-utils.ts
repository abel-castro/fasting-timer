import { StartTimeType } from "../storage/providers/definitions";

export type TimeDelta = {
  hours: number;
  minutes: number;
  seconds: number;
};

const DEFAULT_TIME_DELTA: TimeDelta = { hours: 0, minutes: 0, seconds: 0 };

export function calculateTimeDelta(
  date1?: StartTimeType,
  date2: Date = new Date()
): TimeDelta {
  if (!date1) {
    return DEFAULT_TIME_DELTA;
  }

  // Calculate the difference in milliseconds
  const deltaMilliseconds = Math.abs(date2.getTime() - date1.getTime());

  // Convert milliseconds to seconds, minutes, and hours
  const deltaSeconds = Math.floor(deltaMilliseconds / 1000);
  const deltaMinutes = Math.floor(deltaSeconds / 60);
  let hours = Math.floor(deltaMinutes / 60);
  let minutes = deltaMinutes % 60;
  let seconds = deltaSeconds % 60;

  if (hours >= 24) {
    hours = 0;
    minutes = 0;
    seconds = 0;
  }

  return { hours, minutes, seconds };
}
