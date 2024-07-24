import { useState } from "react";
import clsx from "clsx";

export default function TimerButton({ isFasting }: { isFasting: boolean }) {
  return (
    <button
      type="submit"
      className={clsx(
        "text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded",
        {
          "bg-red-500 border-red-700 hover:bg-red-700 hover:border-red-500":
            isFasting === true,
          "bg-blue-500 hover:bg-blue-700 hover:bg-blue-700 hover:border-blue-500":
            isFasting === false,
        }
      )}
    >
      {isFasting ? "Stop fasting" : "Start fasting"}
    </button>
  );
}
