import React, { Component, createContext } from "react";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import Hamburger from "../components/Hamburger/Hamburger";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Hamburger", () => {
  const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event("resize"));
  };
  const props = {
    resetMenu: jest.fn()
  };

  jest.useFakeTimers();

  it("calls function when resize", done => {
    shallow(<Hamburger {...props} />);
    resizeWindow(500, 300);
    jest.runAllTimers();
    expect(props.resetMenu).toHaveBeenCalledTimes(1);
    done();
  });
  it("calls componentDidMount ", () => {
    jest.spyOn(Hamburger.prototype, "componentDidMount");
    shallow(<Hamburger {...props} />);
    expect(Hamburger.prototype.componentDidMount.mock.calls.length).toBe(1);
  });
  it("calls componenentWillUnmount ", () => {
    const wrapper = shallow(<Hamburger {...props} />);
    const x = jest.spyOn(Hamburger.prototype, "componentWillUnmount");
    wrapper.unmount();
    expect(x.mock.calls.length).toBe(1);
  });
});
