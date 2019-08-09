import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import ProfileHeader from "../../components/ProfileHeader";

describe("Render ProfileHeader component", () => {
  const props = {
    login: "username",
    goBack: jest.fn()
  };

  it("render ProfileHeader component", () => {
    const wrapper = shallow(<ProfileHeader {...props} />);
  });

  it("should call onShare method component", () => {
    const wrapper = shallow(<ProfileHeader {...props} />);
    wrapper.find("#share").simulate("press");
  });
});
