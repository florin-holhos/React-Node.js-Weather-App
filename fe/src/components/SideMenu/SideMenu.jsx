import React from "react";
import history from "../../services/browserHistory";
import "./SideMenu.css";

function SideMenu({ locations, setActive, toggleHamburger }) {
  function makeActiveLocation(location) {
    setActive(location);
    if (window.innerWidth <= 768) toggleHamburger();
  }

  return (
    <>
      {(locations && locations.length && (
        <div className="side-menu-content">
          <ul className="side-menu-list">
            {locations.map((location, index) => {
              return (
                <li
                  key={`loc_${index}`}
                  className="list-item"
                  onClick={() => {
                    makeActiveLocation(location);
                    return history.push(`/${location.id}`);
                  }}
                >
                  <img
                    src="img/location.png"
                    className="location-image "
                    alt="locationImage"
                  ></img>
                  <h4 className="locName">{location.name}</h4>
                  <div className="line"></div>
                </li>
              );
            })}
          </ul>
        </div>
      )) || (
        <h4 className="no-locations">You don't have any saved locations!</h4>
      )}
    </>
  );
}

export default SideMenu;
