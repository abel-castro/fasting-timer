"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TimerButton from "./components/timer-button";
import { calculateTimeDelta } from "./utils/time-utils";
import FastingPeriod from "./components/fasting-period";
import storageService from "./storage/storage-service";
import { StartTimeType } from "./storage/providers/definitions";
import { calculatePercentage } from "./utils/progress-utils";
import FastingProgress from "./components/fasting-progress";
import EatingPeriod from "./components/eating-period";
import EatingProgress from "./components/eating-progress";

const MAXIMAL_FASTING_PERIOD = 18;
const MAXIMAL_EATING_PERIOD = 6;

export default function Home() {
  const now = new Date();
  const currentYear = now.getFullYear();

  // true if timer started, false if not
  const [timerStarted, setTimerStarted] = useState(false);
  // true if fasting, false if eating
  const [isFasting, setIsFasting] = useState(false);
  // It is only possible to complete a fasting cycle (fasting + eating) once a day
  const [fastingCycleCompleted, setFastingCycleCompleted] = useState(false);

  const [startFastingTime, setStartFastingTime] =
    useState<StartTimeType>(undefined);
  const [fastingPeriod, setFastingPeriod] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentFastingProgress, setCurrentFastingProgress] =
    useState<string>("0%");

  const [startEatingTime, setStartEatingTime] =
    useState<StartTimeType>(undefined);
  const [eatingPeriod, setEatingPeriod] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentEatingProgress, setCurrentEatingProgress] =
    useState<string>("0%");

  function updateFastingPeriod() {
    if (startFastingTime) {
      const now = new Date();
      const currentFastingPeriod = calculateTimeDelta(startFastingTime, now);
      setFastingPeriod(currentFastingPeriod);
      setCurrentFastingProgress(
        calculatePercentage(MAXIMAL_FASTING_PERIOD, currentFastingPeriod.hours)
      );
    }
  }

  function updateEatingPeriod() {
    if (startEatingTime && !isFasting) {
      const now = new Date();
      const currentEatingPeriod = calculateTimeDelta(startEatingTime, now);
      setEatingPeriod(currentEatingPeriod);
      setCurrentEatingProgress(
        calculatePercentage(MAXIMAL_EATING_PERIOD, currentEatingPeriod.hours)
      );
    }
  }

  // submit handler
  async function submitFastingHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTimerStarted(true);

    if (isFasting) {
      // stop fasting
      setIsFasting(false);
      setStartEatingTime(new Date());
      await storageService.setStartEatingTime(new Date());
      // disable the form button
      setFastingCycleCompleted(true);
    } else {
      // start fasting
      setIsFasting(true);
      setStartFastingTime(new Date());
      await storageService.setStartFastingTime(new Date());
    }
  }

  async function submitResetHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await storageService.removeStartFastingTime();
    await storageService.removeStartEatingTime();
    setTimerStarted(false);
    setFastingCycleCompleted(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const currentFastingPeriod = await storageService.getStartFastingTime();
      const currentEatingPeriod = await storageService.getStartEatingTime();

      if (currentFastingPeriod) {
        setStartFastingTime(currentFastingPeriod);
        setIsFasting(true);
      }

      if (currentEatingPeriod) {
        setStartEatingTime(currentEatingPeriod);
        setIsFasting(false);
      }

      if (currentFastingPeriod || currentEatingPeriod) {
        setTimerStarted(true);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // Initial set progress
    updateFastingPeriod();
    updateEatingPeriod();

    if (isFasting) {
      updateFastingPeriod();
      interval = setInterval(updateFastingPeriod, 1000); // update every 1 second
    } else {
      updateEatingPeriod();
      interval = setInterval(updateEatingPeriod, 1000); // update every 1 second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFasting, startFastingTime, startEatingTime]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-4 max-w-xl w-full mx-auto">
        <header className="p-4 mb-16">
          <h1 className="text-3xl text-center">Fasting Timer 18:6</h1>
        </header>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full">
            {!timerStarted ? (
              <>
                <p className="flex flex-col items-center justify-center mt-16">
                  Press start for initiate the timer
                </p>
              </>
            ) : (
              <>
                <FastingProgress
                  currentFastingProgress={currentFastingProgress}
                  maximal_fasting_period={MAXIMAL_FASTING_PERIOD}
                />
                <EatingProgress
                  currentEatingProgress={currentEatingProgress}
                  maximal_eating_period={MAXIMAL_EATING_PERIOD}
                />
                <div className="flex flex-col items-center justify-center mt-16">
                  {isFasting ? (
                    <>
                      <FastingPeriod {...fastingPeriod} />
                    </>
                  ) : (
                    <>
                      <EatingPeriod {...eatingPeriod} />
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {fastingCycleCompleted ? (
            <form onSubmit={submitResetHandler} className="p-4">
              <button
                type="submit"
                className="text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded bg-gray-500 hover:bg-gray-700 hover:bg-gray-700 hover:border-gray-500"
              >
                Reset timer
              </button>
            </form>
          ) : (
            <form onSubmit={submitFastingHandler} className="p-4">
              <TimerButton isFasting={isFasting} />
            </form>
          )}
        </div>

        <footer className="text-slate-300 mt-48 text-center text-sm">
          <p>
            Abel Castro {currentYear} - checkout the source code on{" "}
            <Link
              href="https://github.com/abel-castro/fasting-timer"
              className="footer-link text-teal-500 hover:text-teal-700"
              target="_blank"
              prefetch={false}
            >
              GitHub
            </Link>{" "}
          </p>
        </footer>
      </div>
    </main>
  );
}
