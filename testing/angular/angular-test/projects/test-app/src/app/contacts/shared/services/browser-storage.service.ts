import { Injectable } from '@angular/core';
import { IContactPreference } from './preferences.service'

@Injectable({
  providedIn: "root"
})
export class BrowserStorage {
  getItem: (property: string) => string | object;
  setItem: (property: string, value: string | object) => void;
}

@Injectable({
  providedIn: "root"
})
export class BrowserStorageAsync {
  getItem: (property: string) => Promise<IContactPreference>;
  setItem: (property: string, value: string | object) => Promise<boolean>;
}
