import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import AuthLoading from "../../screens/AuthLoading";

jest.mock("react-native", () => ({
  AsyncStorage: {
    getItem: jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve("token_from_asyncStorage");
      });
    })
  }
}));

describe("Render the Home screen", () => {
  const props = {
    navigation: {
      navigate: jest.fn()
    }
  };
  it("should render the home screen", () => {
    const wrapper = shallow(<AuthLoading {...props} />);
  });

  //   it("should call the login method", () => {
  //     const wrapper = shallow(<Home />);
  //     wrapper.find("TouchableOpacity").simulate("press");
  //   });
});
