import React, { Component, createContext } from 'react';
import Storage from '../services/StorageService';
import history from '../services/browserHistory';
import WeatherService from '../services/weatherService';
import auth from '../services/auth';
import { getLocations, addLocation, deleteLocation } from '../services/weather';
export const LocationContext = createContext();

export default class LocationProvider extends Component {
  constructor(props) {
    super(props);
    this.storage = new Storage(localStorage);
    this.weatherService = new WeatherService();
    this.state = {
      locations: null,
      activeLocation: null,
      loading: true,
      user_token: null
    };
  }

  //lifecycle methods
  async componentDidMount() {
    this.updateWeather();
    setInterval(this.updateWeather, 1200000); // 20 min update
  }

  // helper functions
  updateWeather = async () => {
    const user_token = await auth();
    const locations = await getLocations(user_token);
    this.setState({
      user_token,
      locations: locations
    });
    if (!locations) return this.setState({ loading: false });
    // get last active location id from router
    const lastLocationId = Number(history.location.pathname.slice(1));
    const activeLocation = locations.find(loc => loc.id === lastLocationId);
    return this.setActive(activeLocation);
  };

  updateLocations = async location => {
    this.setState({ loading: true });
    let locations = this.state.locations;
    const newLocation = await addLocation(this.state.user_token, location);
    if (!newLocation) return this.setState({ loading: false });
    if (locations) {
      const locationExists = locations.find(loc => loc.name === location.name);
      if (locationExists) return this.setState({ loading: false });
      locations = [...this.state.locations, newLocation];
    } else {
      locations = [newLocation];
    }
    this.setState({
      locations: locations
    });
    this.setActive(newLocation);
  };

  removeLocation = async locationId => {
    const locations = this.state.locations.filter(loc => {
      return loc.id !== Number(locationId);
    });
    this.setState({ locations });
    if (!locations) return;
    this.setActive(locations[0] || null);
    await deleteLocation(this.state.user_token, locationId);
    return locations.length
      ? history.push(`/${locations[0].id}`)
      : history.push('/');
  };

  setActive = async location => {
    if (!location) return this.setState({ loading: false });
    this.setState({ activeLocation: location, loading: false });
    return history.push(`/${location.id}`);
  };

  render() {
    return (
      <LocationContext.Provider
        value={{
          locations: this.state.locations,
          updateLocations: this.updateLocations,
          activeLocation: this.state.activeLocation,
          setActive: this.setActive,
          removeLocation: this.removeLocation,
          loading: this.state.loading
        }}
      >
        {this.props.children}
      </LocationContext.Provider>
    );
  }
}
