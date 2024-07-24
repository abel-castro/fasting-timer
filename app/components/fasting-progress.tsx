import { TimeDelta } from "../utils/time-utils";

export default function FastingProgress({
  currentFastingProgress = "0%",
  maximal_fasting_period,
}: {
  currentFastingProgress: string;
  maximal_fasting_period: number;
}) {
  return (
    <>
      <div className="mb-1 font-medium text-gray-300 text-sm text-center">
        {currentFastingProgress} from {maximal_fasting_period} hours
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
          style={{ width: `${currentFastingProgress}` }}
        ></div>
      </div>
    </>
  );
}
