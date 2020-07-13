// // eslint-disable-next-line no-unused-vars
import { configure, shallow } from "enzyme";
// eslint-disable-next-line no-unused-vars
import React from "react";
import Adaptor from "enzyme-adapter-react-16";
import App from "./App";

describe("should check the App", () => {
  configure({ adapter : new Adaptor()});
  let component;
  beforeEach(() => {
    component = shallow(<App />)
  })
  
  it("should check if Route is present", () => {
    expect(component.find("Route")).toHaveLength(1)
  })
})