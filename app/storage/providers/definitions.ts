export interface IStorageProvider {
  getStartFastingTime(): StartTimeType;
  setStartFastingTime(newTime: Date): Promise<Date>;
  removeStartFastingTime(): void;
  getStartEatingTime(): StartTimeType;
  setStartEatingTime(newTime: Date): Promise<Date>;
  removeStartEatingTime(): void;
}

export type StartTimeType = Date | undefined;
