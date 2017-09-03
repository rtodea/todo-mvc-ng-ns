import { Injectable } from '@angular/core';

export class InMemoryStore {
  private map;

  constructor() {
    this.map = new Map();
  }

  setItem(key, value) {
    this.map.set(key, value);
  }

  getItem(key) {
    return this.map.get(key);
  }

  clear() {
    this.map.clear();
  }

  removeItem(key) {
    this.map.delete(key);
  }
}

@Injectable()
export class StoreService {
  private store;

  constructor() {
    this.store = this.getBrowserOrInMemoryLocalStorage();
  }

  getBrowserOrInMemoryLocalStorage() {
    try {
      const browserLocalStorage = (window || {})['localStorage'];// TODO: fix this...
      if (!browserLocalStorage) {
        throw Error('No Local Storage support');
      }
      const testKey = 'test-local-storage-support';
      browserLocalStorage.setItem(testKey, 'on');
      browserLocalStorage.removeItem(testKey);

      return browserLocalStorage;
    } catch (error) {
      // mostly Safari in incognito mode
      console.log('this browser does not have LocalStorage support');
      return new InMemoryStore();
    }
  }

  getItem(key) {
    const item = this.store.getItem(key);
    if (!item) {
      return item;
    }

    return JSON.parse(item);
  }

  setItem(key, value) {
    this.store.setItem(key, JSON.stringify(value));
  }

  clear() {
    this.store.clear();
  }

  removeItem(key) {
    this.store.removeItem(key);
  }
}
