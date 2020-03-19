const asyncRedis = require("async-redis");

/**@threshold in seconds => exp time for items */
module.exports = class Cache {
  constructor(threshold) {
    this.threshold = threshold || 1140; // default threshold 19 min‬
    // redis setup
    this.client = asyncRedis.createClient(6379);
  }

  setItems(key, value) {
    this.client.set(key, JSON.stringify(value));
    this.client.expire(key, this.threshold);
  }

  async getItems(key) {
    const items = await this.client.get(key);
    return items;
  }

  removeItems(key) {
    this.client.del(key);
  }
};
