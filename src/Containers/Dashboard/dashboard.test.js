import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as helpers from "../../Helper/searchbar-method";
import Dashboard from "./dashboard";

jest.useFakeTimers();

describe("Dashboard component", () => {
  configure({ adapter: new Adapter() });

  let component;
  beforeEach(() => {
    component = shallow(<Dashboard />);
  })

  it("should check loadMore function", () => {
    component.instance().searchValDebounce = jest.fn();
    component.setState({
      searchText: "some"
    })
    component.instance().loadMore();
    expect(component.instance().searchValDebounce)
      .toHaveBeenCalledWith(component.state().searchText)
  })

  it("should check onBlur function", () => {
    component.instance().onBlur();
  })

  it("should check the onChange function if value is provided", () => {
    const event = {
      target: {
        value: "abc"
      },
      preventDefault: jest.fn()
    }
    component.instance().searchValDebounce = jest.fn();
    component.instance().onChange(event);
    expect(component.instance().searchValDebounce).toHaveBeenCalledWith("abc")
  })

  it("should check the onChange function if value is null", () => {
    const event = {
      target: {
        value: ""
      },
      preventDefault: jest.fn()
    }
    component.instance().onChange(event);
    expect(component.state().videos).toEqual([])
  })

  it("should check the searchValDebounce function", () => {
    helpers.debounce = jest.fn()
    component.instance().getVideos = jest.fn()
    component.instance().searchValDebounce("value");
    jest.advanceTimersByTime(500);
    expect(component.instance().getVideos).toHaveBeenCalledTimes(1)
  })

  it("should check the getVideos function", () => {
    component.setState({
      pageToken: ""
    })
    component.instance().getVideos("abc")
  })

  it("should find loadmore button", () => {
    component.setState({
      loading: false,
      error: false,
      videos: [{ kind: "youtube#searchResult", etag: "Ctmh2WI233BiZQRhMBjAreK7EjM" }]
    })
    component.instance().loadMore = jest.fn();
    const loadMorebtn = component.find({ id: "load-more-btn" });
    loadMorebtn.props().onClick();
    expect(component.instance().loadMore).toHaveBeenCalled()
  })

  it("should display the no-items class text", () => {
    component.setState({
      videos: []
    })
    expect(component.find(".no-items").text()).toEqual("Please search for videos")
  })

  it("should check if loading is true and display the spinner", () => {
    component.setState({
      loading: true
    })
    expect(component.find(".spinner-border")).toHaveLength(1)
  })

  it("should check if error is true and display the error message", () => {
    component.setState({
      loading: false,
      error: true
    })
    expect(component.find(".error").text()).toEqual("Error while fetching data...")
  })
})
