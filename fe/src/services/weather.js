const getLocations = async token => {
  try {
    const response = await fetch('http://localhost:9000/api/user/locations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        weather_app_token: token
      }
    });
    return response.status === 200 ? response.json() : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addLocation = async (token, body) => {
  try {
    const response = await fetch('http://localhost:9000/api/user/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        weather_app_token: token
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteLocation = async (token, id) => {
  try {
    await fetch(`http://localhost:9000/api/user/locations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        weather_app_token: token
      }
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { getLocations, addLocation, deleteLocation };
