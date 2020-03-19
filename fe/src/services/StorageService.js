/** Storage class provides services for storing
 data into @LocalStorage and @SessionStorage **/

/**@constructor creates a new instance based on parameter (sessionStorage, localStorage)*/
/** default storage is localStorage */

export default class Storage {
  constructor(store) {
    this.store = store ? store : localStorage;
  }

  /**@setItems method stores data into selected storage */
  setItems(key, value) {
    this.store.setItem(key, JSON.stringify(value));
  }

  /**@getItems method returns stored data from the storage */
  getItems(key) {
    try {
      let data = JSON.parse(this.store.getItem(key));
      return data ? data : null;
    } catch (err) {
      return null;
    }
  }

  removeItems(key) {
    return this.store.removeItem(key);
  }
}
