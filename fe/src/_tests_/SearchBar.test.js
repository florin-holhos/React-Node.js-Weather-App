import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import SearchBar from "../components/SearchBar/SearchBar";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("SearchBar component", () => {
  let props;
  let mockState;
  beforeEach(() => {
    props = {
      updateLocations: jest.fn(),
      setActive: jest.fn(),
      locations: [
        {
          id: "123fg-222f-ssgf-23hh",
          name: "Bucuresti",
          lat: 123342323,
          lon: 542532222
        },
        {
          id: "123fg-222f-ssgf-23hh",
          name: "Baia Mare",
          lat: 123342323,
          lon: 542532222
        }
      ]
    };

    mockState = {
      inputValue: "",
      suggestions: [
        {
          id: "123fg-222f-ssgf-23hh",
          name: "Bucuresti",
          lat: 123342323,
          lon: 542532222
        },
        {
          id: "123fg-222f-ssgf-23hh",
          name: "Baia Mare",
          lat: 123342323,
          lon: 542532222
        },
        {
          id: "test-test-test-test",
          name: "Test Name",
          lat: "123",
          lon: "456"
        }
      ],
      error: false
    };
  });

  it("should render without crashing...", () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should mount in a full DOM", () => {
    expect(mount(<SearchBar />).find("#autocomplete").length).toBe(1);
  });

  it("should have an input element", () => {
    expect(mount(<SearchBar />).find(".autocomplete-input").length).toBe(1);
  });

  it("should add state to the component", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    const instance = wrapper.instance();
    expect(instance.state).toEqual(mockState);
  });

  it("should render a list with suggestions when state gets updated", () => {
    const wrapper = shallow(<SearchBar />);
    const instance = wrapper.instance();
    instance.setState({ ...mockState });
    const li = wrapper.find("ul li");
    expect(li.length).toBe(mockState.suggestions.length);
  });

  it("should not render a list with suggestions when the suggestions array from state is empty", () => {
    const wrapper = shallow(<SearchBar />);
    const li = wrapper.find("ul li");
    expect(li.length).toEqual(0);
  });

  // checkForClicks method
  it("should close the suggestions list when user clicks outside component", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    document.documentElement.click();
    expect(wrapper.find("ul li").length).toBe(0);
  });

  it("should not close the suggestions list when user clicks on SearchBar input", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    wrapper.find("input").simulate("click");
    expect(wrapper.find("ul li").length).toEqual(mockState.suggestions.length);
  });

  // handleSelect method
  it("should update the inputValue from state with the suggestion name when user clicks on a suggestion", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    const clickIndex = 1;
    wrapper
      .find("ul li")
      .at(clickIndex)
      .simulate("click");
    expect(wrapper.state().inputValue).toBe(
      mockState.suggestions[clickIndex].name
    );
  });

  // handleSelect call
  it("should raise an error when called with wrong coordinates", () => {
    const wrapper = shallow(<SearchBar />);
    const instance = wrapper.instance();
    const testLocation = {
      id: "test-test-test-test",
      name: "Test",
      lat: "-9999.000000",
      lon: "-9999.000000"
    };
    instance.handleSelect(testLocation);
    expect(instance.state.error).toBe(true);
  });

  // handleSelect
  it("should not call updateLocations if the given location already exists", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    const instance = wrapper.instance();
    const spyUpdateLocations = jest.spyOn(instance, "updateLocations");
    instance.handleSelect(mockState.suggestions.shift());
    expect(spyUpdateLocations).toHaveBeenCalledTimes(0);
  });

  // inside handleSelect
  it("should call setActive method if the given location doesn't exists in props", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    const instance = wrapper.instance();
    const spyUpdateLocations = jest.spyOn(instance, "setActive");
    const testLocation = {
      id: "test-test-test-test",
      name: "Test Name",
      lat: "123",
      lon: "456"
    };
    instance.handleSelect(testLocation);
    expect(spyUpdateLocations).toHaveBeenCalledTimes(1);
  });

  // inside handleSelect
  it("should empty inputValue from state when a new location is added", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    wrapper
      .find("ul li")
      .at(2)
      .simulate("click");
    expect(wrapper.state().inputValue).toBe("");
  });

  // handleChange method
  it("should update the state with the #input value on change", () => {
    const wrapper = shallow(<SearchBar />);
    const inputValue = "Timisoara";
    wrapper.find("input").simulate("change", {
      target: { value: inputValue }
    });
    const instance = wrapper.instance();
    expect(instance.state.inputValue).toEqual(inputValue);
  });

  // handleKeyDown method
  it("should update the inputValue from state when the user presses arrow-down key 2 times", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    wrapper.instance().currentFocus.current = wrapper.find("ul li").at(0);
    wrapper.instance().currentFocus.current.scrollIntoView = jest.fn();
    const input = wrapper.find("input").at(0);

    // one time down
    input.simulate("keydown", {
      target: {
        value: wrapper
          .find("ul li")
          .at(0)
          .text()
      },
      key: "ArrowDown",
      keyCode: 40
    });
    expect(wrapper.instance().state.inputValue).toEqual(
      mockState.suggestions[0].name
    );

    // two times down
    input.simulate("keydown", {
      target: {
        value: wrapper
          .find("ul li")
          .at(0)
          .text()
      },
      key: "ArrowDown",
      keyCode: 40
    });

    expect(wrapper.instance().state.inputValue).toEqual(
      mockState.suggestions[1].name
    );
  });

  // handleKeyDown method
  it("should update the inputValue from state when the user presses arrow-up key", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    wrapper.instance().currentFocus.current = wrapper.find("ul li").at(0);
    wrapper.instance().currentFocus.current.scrollIntoView = jest.fn();
    wrapper.instance().counter = 2; // counter property from SearchBar component
    const input = wrapper.find("input").at(0);

    // one time up
    input.simulate("keydown", {
      target: {
        value: wrapper
          .find("ul li")
          .at(0)
          .text()
      },
      key: "ArrowUp",
      keyCode: 38
    });

    expect(wrapper.instance().state.inputValue).toEqual(
      mockState.suggestions[wrapper.instance().counter].name
    );
  });

  // handleKeyDown method
  it("should close the suggestions list when Escape key is pressed down", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    wrapper.instance().currentFocus.current = wrapper.find("ul li").at(0);
    wrapper.instance().currentFocus.current.scrollIntoView = jest.fn();
    const input = wrapper.find("input").at(0);
    // press escape
    input.simulate("keydown", {
      target: {
        value: wrapper
          .find("ul li")
          .at(0)
          .text()
      },
      key: "Escape",
      keyCode: 27
    });

    expect(wrapper.find("ul li").length).toEqual(0);
  });

  // handleKeyDown method
  it("should close the suggestions list when Enter key is pressed down", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    wrapper.instance().currentFocus.current = wrapper.find("ul li").at(0);
    wrapper.instance().currentFocus.current.scrollIntoView = jest.fn();
    const input = wrapper.find("input").at(0);
    wrapper.instance().counter = -1;
    // press enter
    input.simulate("keydown", {
      target: {
        value: wrapper
          .find("ul li")
          .at(0)
          .text()
      },
      key: "Enter",
      keyCode: 13
    });
    expect(wrapper.find("ul li").length).toEqual(0);
  });

  // handleKeyDown method
  it("should call closePredictions and handleSelect methods when Enter key is pressed down", () => {
    const wrapper = shallow(<SearchBar {...props} />);
    wrapper.setState({ ...mockState });
    wrapper.instance().currentFocus.current = wrapper.find("ul li").at(0);
    wrapper.instance().currentFocus.current.scrollIntoView = jest.fn();
    const input = wrapper.find("input").at(0);
    const spyClosePredictions = jest.spyOn(
      wrapper.instance(),
      "closePredictions"
    );
    const spyHandleSelect = jest.spyOn(wrapper.instance(), "handleSelect");
    // press enter
    input.simulate("keydown", {
      target: {
        value: wrapper
          .find("ul li")
          .at(0)
          .text()
      },
      key: "Enter",
      keyCode: 13
    });
    expect(spyClosePredictions).toHaveBeenCalledTimes(1);
    expect(spyHandleSelect).toHaveBeenCalledTimes(1);
  });

  // closePredictions
  it("should empty the suggestions array from state when closePredictions method is called", () => {
    const wrapper = shallow(<SearchBar />);
    const instance = wrapper.instance();
    instance.setState({ ...mockState });
    expect(instance.state.suggestions.length).toEqual(
      mockState.suggestions.length
    );
    instance.closePredictions();
    expect(instance.state.suggestions.length).toEqual(0);
  });

  // fetch method
  it("should update state with a suggestions array when called", async () => {
    const wrapper = shallow(<SearchBar />);
    const instance = wrapper.instance();
    const argument = "Timi";
    await instance.fetch(argument);
    expect(instance.state.suggestions.length > 0).toBe(true);
    expect(
      instance.state.suggestions.every(sugg => sugg.name.startsWith(argument))
    ).toBe(true);
  });

  // fetch method
  it("should empty the suggestions list from state when called with an empty input value", () => {
    const wrapper = shallow(<SearchBar />).setState({ ...mockState });
    expect(wrapper.instance().state.suggestions.length > 0).toBe(true);
    wrapper.instance().fetch("");
    expect(wrapper.instance().state.suggestions > 0).toBe(false);
  });

  it("should call the componentWillUnmount method", () => {
    const wrapper = mount(<SearchBar />);
    const spyUnmount = jest.spyOn(wrapper.instance(), "componentWillUnmount");
    wrapper.unmount();
    expect(spyUnmount).toHaveBeenCalledTimes(1);
  });
});
