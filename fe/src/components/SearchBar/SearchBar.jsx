import React, { Component } from "react";
import "./SearchBar.css";
import { searchAutocomplete } from "../../services/searchAutocomplete";

// receives [locations, updateLocations] through props
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      suggestions: [],
      error: false
    };
    this.timeout = null;
    this.counter = -1; // helps iterating through suggestions list
    this.currentFocus = React.createRef();
    this.activeItem = null;
    // use props to update LocationContext
    this.updateLocations = this.props.updateLocations;
    this.setActive = this.props.setActive;
  }

  // lifecycle methods
  componentDidMount() {
    // close suggestions list if user clicks somewhere else
    window.addEventListener("click", this.checkForClicks);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.checkForClicks);
  }

  // handlers
  checkForClicks = event => {
    const autocomplete = document.getElementById("autocomplete");
    if (event.target.parentNode !== autocomplete) {
      this.closePredictions();
    }
  };

  handleSelect = suggestion => {
    if (!suggestion) return;
    const isCity =
      suggestion.lat !== "-9999.000000" && suggestion.lon !== "-9999.000000";
    if (!isCity) {
      const error = true;
      return this.setState({ error });
    }
    const inputValue = suggestion.name;
    this.setState({ inputValue });
    this.updateLocations(suggestion);
    return this.setState({ inputValue: "" });
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.fetch(inputValue), 500);
    return (this.state.error && this.setState({ error: false })) || false;
  };

  handleKeyDown = event => {
    if (!event.target.value) return;
    const keyCode = event.keyCode;
    const first = 0;
    const last = this.state.suggestions.length - 1;
    switch (keyCode) {
      case 40: {
        if (this.counter < last) {
          const currentSuggestion = this.state.suggestions[++this.counter];
          const inputValue = currentSuggestion.name;
          this.setState({ inputValue }, () => {
            this.currentFocus.current.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          });
          this.activeItem = currentSuggestion;
        }
        break;
      }
      case 38: {
        if (this.counter > first) {
          const currentSuggestion = this.state.suggestions[--this.counter];
          const inputValue = currentSuggestion.name;
          this.setState({ inputValue }, () => {
            this.currentFocus.current.scrollIntoView({
              block: "center"
            });
          });
          this.activeItem = currentSuggestion;
        }
        break;
      }
      case 27:
        this.closePredictions();
        break;
      case 13:
        this.handleSelect(this.state.suggestions[this.counter]);
        this.closePredictions();
        break;
      default:
        return false;
    }
  };

  // helper functions
  fetch = async value => {
    // reset counter
    this.counter = -1;
    if (!value) return this.setState({ suggestions: [] });
    const data = await searchAutocomplete(value);
    if (!data) return;
    const suggestions = data.map(pred => {
      return {
        name: pred.name,
        lat: pred.lat,
        lon: pred.lon
      };
    });
    this.setState({ suggestions });
  };

  closePredictions = () => {
    const suggestions = [];
    this.setState({ suggestions });
  };

  render() {
    return (
      <div id="autocomplete">
        <input
          className="autocomplete-input"
          placeholder={"Search for location"}
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          style={
            (this.state.error && {
              color: "#ed0c31"
            }) ||
            null
          }
        />
        {this.state.suggestions.length > 0 && (
          <ul className="autocomplete-items">
            {this.state.suggestions.map((suggestion, index) => (
              <li
                tabIndex={index}
                key={`suggestion_${index}`}
                onClick={() => this.handleSelect(suggestion)}
                style={
                  (this.activeItem === suggestion && {
                    backgroundColor: "#eee"
                  }) ||
                  null
                }
                ref={
                  (this.activeItem === suggestion && this.currentFocus) || null
                }
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchBar;
