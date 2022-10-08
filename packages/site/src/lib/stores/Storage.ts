import type { ZodType } from 'zod';

interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

abstract class Storable {
  protected readonly storage: IStorage;

  protected constructor(getStorage = (): IStorage => window.localStorage) {
    this.storage = getStorage();
  }
}

export default abstract class Storage<T> extends Storable {
  private validate(validator: ZodType, json: any): any {
    return validator.parse(json);
  }

  protected get(validator: ZodType, key: string): T | null {
    const raw = this.storage.getItem(key);
    if (!raw) {
      return null;
    }
    const result = JSON.parse(raw);
    try {
      this.validate(validator, result);
    } catch {
      this.clearItem(key);
      return null;
    }
    return result;
  }

  protected set(validator: ZodType, value: T, key: string): void {
    try {
      this.validate(validator, value);
    } catch {
      return;
    }
    this.storage.setItem(key, JSON.stringify(value));
  }

  protected clearItem(key: string): void {
    this.storage.removeItem(key);
  }
}
