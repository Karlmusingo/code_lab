import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import Home from "../../screens/Home";

describe("Render the Home screen", () => {
  it("should render the home screen", () => {
    const wrapper = shallow(<Home />);
  });

  it("should call the login method", () => {
    const wrapper = shallow(<Home />);
    wrapper.find("TouchableOpacity").simulate("press");
  });
});
