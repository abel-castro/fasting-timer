import { IStorageProvider, StartTimeType } from "./definitions";

export default class DummyStorageProvider implements IStorageProvider {
  getStartFastingTime(): StartTimeType {
    return new Date("2024-07-23T03:00:00");
  }

  async setStartFastingTime(newTime: Date): Promise<Date> {
    return new Date();
  }

  async removeStartFastingTime() {}

  getStartEatingTime(): StartTimeType {
    return new Date("2024-07-23T14:00:00");
  }

  async setStartEatingTime(newTime: Date): Promise<Date> {
    return new Date();
  }

  async removeStartEatingTime() {}
}
