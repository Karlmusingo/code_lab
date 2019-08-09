import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import Profile from "../../screens/Profile";

describe("Render the profile component", () => {
  const props = {
    navigation: {
      getParam: jest.fn(() => ({
        avatarUrl: "avatar.url",
        name: "name",
        bio: "",
        avatarUrl: "",
        createdAt: "",
        starredRepositories: {
          totalCount: 3
        },
        repositories: {
          totalCount: 3
        },
        followers: {
          totalCount: 3
        },
        following: {
          totalCount: 3
        }
      })),
      navigate: jest.fn()
    }
  };

  it("should render the profile component", async () => {
    const component = shallow(<Profile {...props} />);
    component.find("TouchableHighlight").simulate("press");
    expect(component).toMatchSnapshot();
  });
});
