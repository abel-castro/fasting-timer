import { IStorageProvider, StartTimeType } from "./definitions";

type TestStorageType = {
  startFastingTime: StartTimeType
  startEatingTime: StartTimeType
}

const Data: TestStorageType = {
  startFastingTime: undefined,
  startEatingTime: undefined,
};

export default class TestStorageProvider implements IStorageProvider {
  getStartFastingTime(): StartTimeType {
    return Data.startFastingTime;
  }

  async setStartFastingTime(newTime: Date): Promise<Date> {
    Data.startFastingTime = newTime
    return newTime;
  }

  async removeStartFastingTime() {}

  getStartEatingTime(): StartTimeType {
    return Data.startEatingTime;
  }

  async setStartEatingTime(newTime: Date): Promise<Date> {
    Data.startEatingTime = newTime
    return newTime;
  }

  async removeStartEatingTime() {}
}
