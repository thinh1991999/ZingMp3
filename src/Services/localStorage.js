class LocalStorageKey {
  INFO_SONG = "INFO_SONG";
}

class BaseLocalStorage {
  key;
  constructor(_key) {
    this.key = _key;
  }
  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  get() {
    const value = localStorage.getItem(this.key);
    return value ? JSON.parse(value) : null;
  }
  remove() {
    localStorage.removeItem(this.key);
  }
}

class LocalStorageService extends LocalStorageKey {
  infoSong = new BaseLocalStorage(this.INFO_SONG);
}

const localStorageServ = new LocalStorageService();

export default localStorageServ;
