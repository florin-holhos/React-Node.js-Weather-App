import React from "react";
import Enzyme, { shallow, mount, render, configure } from "enzyme";
import SideMenu from "../components/SideMenu/SideMenu";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("SideMenu", () => {
  let props;
  beforeEach(() => {
    props = {
      setActive: jest.fn(),
      locations: [
        {
          id: "a2045d0f-7892-4a0d-83d1-a191449cf498",
          lat: "35.070000",
          lon: "-78.870003",
          name: "Fayetteville, North Carolina"
        },
        {
          id: "448596ed-af23-4635-8b12-a8922929f607",
          lat: "22.030001",
          lon: "112.769997",
          name: "Dalian, China"
        }
      ],
      toggleHamburger: () => jest.fn()
    };
  });

  it("Should render correctly", () => {
    const wrapper = shallow(<SideMenu {...props}></SideMenu>);
    expect(wrapper.exists()).toBe(true);
  });
  it("Content should not exist if no props are passed", () => {
    const wrapper = shallow(<SideMenu></SideMenu>);
    //expect(wrapper.children().length).toBe(0);
    expect(wrapper.exists(".side-menu-content")).toEqual(false);
  });
  it("Should recieve location name correctly", () => {
    const wrapper = shallow(<SideMenu {...props}></SideMenu>);
    const name = wrapper.find(".locName").at(0);
    expect(name.text()).toBe("Fayetteville, North Carolina");
  });
  it("Location name should be visible", () => {
    const wrapper = shallow(<SideMenu {...props}></SideMenu>);
    expect(wrapper.find(".locName").at(0).length).toBe(1);
  });
  it("Should call the function on click", () => {
    const wrapper = shallow(<SideMenu {...props}></SideMenu>);
    const button = wrapper.find(".list-item").at(0);
    window.innerWidth = 500;
    button.simulate("click");
    expect(props.setActive).toBeCalledTimes(1);
    expect(props.setActive).toBeCalledWith(props.locations[0]);
  });
});
