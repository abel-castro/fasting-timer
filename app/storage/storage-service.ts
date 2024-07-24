import BrowserStorageProvider from "./providers/browser.storage-provider";
import { IStorageProvider, StartTimeType } from "./providers/definitions";

export class StorageService {
  private provider: IStorageProvider;

  constructor(provider: IStorageProvider) {
    this.provider = provider;
  }

  getStartFastingTime(): StartTimeType {
    return this.provider.getStartFastingTime();
  }

  async setStartFastingTime(newTime: Date): Promise<Date> {
    return this.provider.setStartFastingTime(newTime);
  }

  async removeStartFastingTime() {
    return this.provider.removeStartFastingTime();
  }

  getStartEatingTime(): StartTimeType {
    return this.provider.getStartEatingTime();
  }

  async setStartEatingTime(newTime: Date): Promise<Date> {
    return this.provider.setStartEatingTime(newTime);
  }

  async removeStartEatingTime() {
    return this.provider.removeStartEatingTime();
  }
}


const storageService = new StorageService(new BrowserStorageProvider());

export default storageService;
