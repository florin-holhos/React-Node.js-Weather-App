import Storage from "./StorageService";

const auth = async () => {
  const storage = new Storage(localStorage);
  const token = storage.getItems("weather_app_token");
  if (!token) {
    try {
      const response = await fetch("http://localhost:9000/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      storage.setItems("weather_app_token", data.token);
      return data.token;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return token;
};

export default auth;
