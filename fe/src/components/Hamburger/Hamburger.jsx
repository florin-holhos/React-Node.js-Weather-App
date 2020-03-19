import React, { Component } from "react";
import "./Hamburger.css";
import "./hamburgers.css";

class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: window.innerWidth > 768 ? "desktop" : "mobile"
    };
    this.timeout = null; // helper for handleResize method
  }

  //lifecycle methods
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const device = window.innerWidth > 768 ? "desktop" : "mobile";
      const active = "";
      if (device === this.state.device) return;
      this.setState({ device, active });
      return this.props.resetMenu();
    }, 50);
  };

  render() {
    return (
      <>
        {this.state.device === "mobile" && (
          <button
            className={`hamburger hamburger--slider-r ${this.props.activeHamburger}`}
            type="button"
            onClick={this.props.toggleHamburger}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        )}
      </>
    );
  }
}

export default Hamburger;
