import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import Dev from "../../components/Dev";
import { TouchableHighlight } from "react-native-gesture-handler";

describe("Render Dev Component", () => {
  const props = {
    dev: {
      avatarUrl: "url",
      name: "name",
      login: "username",
      repositories: {
        totalCount: 0
      }
    },
    navigation: {
      navigate: jest.fn()
    }
  };
  it("render Dev component", async () => {
    const wrapper = shallow(<Dev {...props} />);
  });

  it("description", async () => {
    const wrapper = shallow(<Dev {...props} />);
    const clickable = wrapper
      .find("TouchableWithoutFeedback")
      .simulate("press");
  });
});
