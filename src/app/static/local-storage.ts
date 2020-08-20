export class LocalStorage {
  constructor(){}

  setItem (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem (key) {
    return JSON.parse(localStorage.getItem(key));
  }
}