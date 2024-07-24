import { TimeDelta } from "../utils/time-utils";

export default function EatingPeriod({
  hours = 0,
  minutes = 0,
  seconds = 0,
}: TimeDelta) {
  return (
    <>
      <p>In eating period since:</p>
      <p>{hours} hours</p>
      <p>{minutes} minutes</p>
      <p>{seconds} seconds</p>
    </>
  );
}
