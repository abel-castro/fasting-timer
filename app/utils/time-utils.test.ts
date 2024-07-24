import { calculateTimeDelta } from "./time-utils";

describe("calculateTimeDelta", () => {
  it("should calculate the difference in hours, minutes, and seconds correctly", () => {
    const date1 = new Date("2024-07-18T08:00:00");
    const date2 = new Date("2024-07-18T14:45:30");
    const result = calculateTimeDelta(date1, date2);
    expect(result).toEqual({ hours: 6, minutes: 45, seconds: 30 });
  });

  it("should return 0 hours, 0 minutes, and 0 seconds for the same time", () => {
    const date1 = new Date("2024-07-18T10:00:00");
    const date2 = new Date("2024-07-18T10:00:00");
    const result = calculateTimeDelta(date1, date2);
    expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it("should handle the case when the first date is later than the second date", () => {
    const date1 = new Date("2024-07-18T14:45:30");
    const date2 = new Date("2024-07-18T08:00:00");
    const result = calculateTimeDelta(date1, date2);
    expect(result).toEqual({ hours: 6, minutes: 45, seconds: 30 });
  });

  it("should handle edge cases correctly", () => {
    const date1 = new Date("2024-07-18T23:59:30");
    const date2 = new Date("2024-07-19T00:01:30");
    const result = calculateTimeDelta(date1, date2);
    expect(result).toEqual({ hours: 0, minutes: 2, seconds: 0 });
  });

  it("should return 0 hours, 0 minutes and 0 seconds is delta is bigger than 24 hours", () => {
    const date1 = new Date("2024-07-18T10:00:00");
    const date2 = new Date("2024-07-20T10:00:00");
    const result = calculateTimeDelta(date1, date2);
    expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });

  it("should return 0 hours, 0 minutes and 0 seconds if no date1 is passed", () => {
    const date2 = new Date("2024-07-20T10:00:00");
    const result = calculateTimeDelta(undefined, date2);
    expect(result).toEqual({ hours: 0, minutes: 0, seconds: 0 });
  });
});
