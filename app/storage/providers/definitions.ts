export interface IStorageProvider {
  getStartFastingTime(): Promise<StartTimeType>;
  setStartFastingTime(newTime: Date): Promise<Date>;
  removeStartFastingTime(): void;
  getStartEatingTime(): Promise<StartTimeType>;
  setStartEatingTime(newTime: Date): Promise<Date>;
  removeStartEatingTime(): void;
}

export type StartTimeType = Date | undefined;
