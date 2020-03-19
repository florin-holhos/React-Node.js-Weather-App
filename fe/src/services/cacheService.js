import Storage from "./StorageService";

/**@store => localStorage/sessionStorage */
/**@threshold => time in seconds */
export default class Cache extends Storage {
  constructor(store, threshold) {
    super(store || localStorage);
    this.threshold = threshold * 1000;
  }

  setItems = (key, value) => {
    const expTime = new Date().getTime() + this.threshold;
    super.setItems(key, { ...value, expTime });
  };

  getItems = key => {
    const items = super.getItems(key);
    if (!items) return null;
    if (items.expTime <= new Date().getTime()) {
      super.removeItems(key);
      return null;
    }
    return items;
  };

  removeItems = key => {
    super.removeItems(key);
  };
}
