import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import { Header, VIEWER_QUERY } from "../../components/Header";

const mocks = [
  {
    request: {
      query: VIEWER_QUERY
    },
    result: {
      data: {
        viewer: { avatarUrl: "http://avatarUrl.jpg" }
      }
    }
  }
];

describe("Header", () => {
  describe("Rendering", () => {
    const props = {
      data: {
        viewer: {
          avatarUrl: "avatarurl"
        }
      },
      isLoggedIn: true,
      search: jest.fn()
    };
    xit("should match to snapshot", () => {
      const component = renderer
        .create(
          <MockedProvider mocks={mocks} addTypename={false}>
            <Header />
          </MockedProvider>
        )
        .toJSON();

      expect(component).toMatchSnapshot();
    });

    xit("should call the search prop", () => {
      const search = jest.fn();
      const component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Header isLoggedIn={true} search={search} />
        </MockedProvider>
      );

      const textInput = component.root.findByType("TextInput");
      textInput.props.onChangeText("text");

      expect(search).toHaveBeenCalledWith("text");
      expect(component.toJSON()).toMatchSnapshot();
    });

    it("should display the search bar", () => {
      const component = shallow(<Header {...props} />);
      const instance = component.instance();
      instance.displaySearch();
      expect(component).toMatchSnapshot();
    });

    it("should display the search bar", () => {
      const component = shallow(<Header {...props} />);
      const instance = component.instance();
      instance.displayDropdown();
      expect(component).toMatchSnapshot();
    });

    it("should display the search bar", () => {
      const component = shallow(<Header {...props} />);
      const instance = component.instance();
      instance.logout();
      expect(component).toMatchSnapshot();
    });

    it("should type in search bar", () => {
      const component = shallow(<Header {...props} />);
      const input = component.find("TextInput").simulate("changeText", "text");
      expect(component).toMatchSnapshot();
    });
  });
});
