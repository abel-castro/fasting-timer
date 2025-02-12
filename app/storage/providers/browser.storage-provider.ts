import { IStorageProvider, StartTimeType } from "./definitions";

export default class BrowserStorageProvider implements IStorageProvider {
  async getStartFastingTime(): Promise<StartTimeType> {
    const startFastingTime = localStorage.getItem("startFastingTime");
    if (startFastingTime) {
      return new Date(startFastingTime);
    }
  }

  async setStartFastingTime(newTime: Date): Promise<Date> {
    localStorage.setItem("startFastingTime", newTime.toISOString());
    return newTime;
  }

  async removeStartFastingTime() {
    localStorage.removeItem("startFastingTime");
  }

  async getStartEatingTime(): Promise<StartTimeType> {
    const startEatingTime = localStorage.getItem("startEatingTime");
    if (startEatingTime) {
      return new Date(startEatingTime);
    }
  }

  async setStartEatingTime(newTime: Date): Promise<Date> {
    localStorage.setItem("startEatingTime", newTime.toISOString());
    return newTime;
  }

  async removeStartEatingTime() {
    localStorage.removeItem("startEatingTime");
  }
}
