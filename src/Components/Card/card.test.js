import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as helpers from "../../Helper/searchbar-method";
import Card from "./card";

describe("Card view component", () => {
  configure({ adapter: new Adapter() });

  let component;
  let props;
  beforeEach(() => {
    props = {
      data: {
        snippet: {
          thumbnails: {
            medium: {
              url: "",
            }
          },
          title: "",
          channelTitle: "",
          publishTime: ""
        },
        id: {
          videoId: ""
        }
      }
    }
    component = shallow(<Card {...props} />);
  })

  it("should test whether if data provided incorrectly is displayed on the card", () => {
    props.data = {
      snippet: {
        thumbnails: {
          medium: {
            url: "",
          }
        },
        title: "",
        channelTitle: "",
        publishTime: ""
      },
      id: {
        videoId: ""
      }
    }
    component = shallow(<Card {...props} />);
    helpers.trimDetails = jest.fn();
    const imgSrc = component.find(".card-img-top").props().alt;
    expect(imgSrc).toEqual("");
    expect(component.find(".card-title").text()).toEqual("No title available");
    expect(component.find(".card-text").text()).toEqual("No channel title available || No publish time provided");
    expect(component.find(".card-title").props().href).toEqual("https://www.youtube.com/watch?v=")
  })

  it("should test whether if data provided is displayed on the card", () => {
    props.data = {
      snippet: {
        thumbnails: {
          medium: {
            url: "https://i.ytimg.com/vi/Ua3Q-LFsbhA/hqdefault.jpg",
          }
        },
        title: "DD News Aizawl, 11 July, 2020 @ 6:30  PM",
        channelTitle: "DD News Aizawl",
        publishTime: Date.now()
      },
      id: {
        videoId: "Ua3Q-LFsbhA"
      }
    }
    component = shallow(<Card {...props} />);
    helpers.trimDetails = jest.fn();
    const imgSrc = component.find(".card-img-top").props().src;
    expect(imgSrc).toEqual("https://i.ytimg.com/vi/Ua3Q-LFsbhA/hqdefault.jpg");
    expect(component.find(".card-title").props().href).toEqual("https://www.youtube.com/watch?v=Ua3Q-LFsbhA")
  })

  it("should check the publishTime with length 0", () => {
    props.data.snippet.publishTime = "2017-11-25T13:10:30Z";
    component = shallow(<Card {...props} />);
    expect(component.find(".card-text").text()).toEqual("No channel title available || 3 years ago")
  })
})
