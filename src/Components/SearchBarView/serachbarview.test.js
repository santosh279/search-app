import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import SearchBarView from "./searchbarview";

describe("Searchbar View Component", () => {
  configure({ adapter :  new Adapter() });

  let component;
  let props;
  beforeEach(() => {
    props = {
      onChange : jest.fn(),
      onBlur   : jest.fn()
    }
    component = shallow(<SearchBarView { ...props }/>);
  })

  it("should check onChange handler", () => {
    const inputTag = component.find(".form-control")
    inputTag.props().onChange();
    expect(props.onChange).toHaveBeenCalled();
  })

  it("should check onBlur handler", () => {
    const inputTag = component.find(".form-control")
    inputTag.props().onBlur();
    expect(props.onBlur).toHaveBeenCalled();
  })
})
