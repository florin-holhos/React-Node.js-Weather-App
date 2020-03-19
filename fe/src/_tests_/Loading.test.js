import React, { Component, createContext } from "react";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Loading from "../components/Loading/Loading";
Enzyme.configure({ adapter: new Adapter() });

describe("Loading", () => {
  it("Should render correctly", () => {
    const wrapper = shallow(<Loading></Loading>);
    expect(wrapper.exists()).toBe(true);
  });
});
