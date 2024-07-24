export default function EatingProgress({
  currentEatingProgress = "0%",
  maximal_eating_period,
}: {
  currentEatingProgress: string;
  maximal_eating_period: number;
}) {
  return (
    <>
      <div className="mb-1 font-medium text-gray-300 text-sm text-center">
        {currentEatingProgress} from {maximal_eating_period} hours
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300"
          style={{ width: `${currentEatingProgress}` }}
        ></div>
      </div>
    </>
  );
}
