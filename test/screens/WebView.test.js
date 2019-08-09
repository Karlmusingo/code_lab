import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import WebView from "../../screens/WebView";

describe("Render the profile component", () => {
  const props = {
    navigation: {
      getParam: jest.fn(() => "login"),
      navigate: jest.fn()
    }
  };
  it("should render the profile component", async () => {
    const component = shallow(<WebView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
