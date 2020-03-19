function generateUUID() {
  var date = new Date().getTime();
  var date2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var randomNumber = Math.random() * 16;
    if (date > 0) {
      randomNumber = (date + randomNumber) % 16 | 0;
      date = Math.floor(date / 16);
    } else {
      randomNumber = (date2 + randomNumber) % 16 | 0;
      date2 = Math.floor(date2 / 16);
    }
    return (c === "x" ? randomNumber : (randomNumber & 0x3) | 0x8).toString(16);
  });
}

export default generateUUID;
