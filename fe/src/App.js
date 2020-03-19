import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { LocationContext } from './contexts/LocationContext';
import { Router, Switch, Route } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Details from './components/pages/Details/Details';
import NotFound from './components/pages/NotFound/NotFound';
import Loading from './components/Loading/Loading';
import history from './services/browserHistory';
import Hamburger from './components/Hamburger/Hamburger';

class App extends Component {
  static contextType = LocationContext;
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '',
      activeHamburger: ''
    };
  }

  // toggle SideMenu classes
  toggleMenu = () => {
    const activeMenu =
      this.state.activeMenu === 'active' ? 'inactive' : 'active';
    this.setState({ activeMenu });
  };

  // handlers
  toggleHamburger = () => {
    const activeHamburger =
      this.state.activeHamburger === 'is-active' ? '' : 'is-active';
    this.setState({ activeHamburger }, () => this.toggleMenu());
  };

  // clear SideMenu animations
  resetMenu = () => this.setState({ activeMenu: '', activeHamburger: '' });

  render() {
    if (!this.context) return null;
    const {
      locations,
      updateLocations,
      activeLocation,
      setActive,
      loading
    } = this.context;
    return (
      <Router history={history}>
        <div className='app'>
          <div className={`side-menu ${this.state.activeMenu}`}>
            <SideMenu
              locations={locations}
              setActive={setActive}
              toggleHamburger={this.toggleHamburger}
            />
          </div>
          <div id='main-content'>
            <Hamburger
              toggleHamburger={this.toggleHamburger}
              resetMenu={this.resetMenu}
              activeMenu={this.state.active}
              activeHamburger={this.state.activeHamburger}
            />
            <SearchBar
              locations={locations}
              updateLocations={updateLocations}
              setActive={setActive}
            />
            {(loading && <Loading />) || (
              <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route
                  path={`/${activeLocation && activeLocation.id}`}
                  component={Details}
                />
                <Route component={NotFound} />
              </Switch>
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
