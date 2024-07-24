import { TimeDelta } from "../utils/time-utils";

export default function FastingPeriod({
  hours = 0,
  minutes = 0,
  seconds = 0,
}: TimeDelta) {
  return (
    <>
      <p>In fasting period since:</p>
      <p>{hours} hours</p>
      <p>{minutes} minutes</p>
      <p>{seconds} seconds</p>
    </>
  );
}
