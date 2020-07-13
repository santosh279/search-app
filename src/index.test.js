import ReactDOM from 'react-dom'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import App from './App';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }))

describe("Index file", () => {
  configure({ adapter: new Adapter() });

  it('renders without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
    global.document.getElementById = (id) => id === 'root' && div
    expect(ReactDOM.render).toHaveBeenCalled()
  });
})