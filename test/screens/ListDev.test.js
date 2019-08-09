import React from "react";
import { shallow, mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import renderer from "react-test-renderer";
import ListDevsComp, { ListDevs, DEV_LIST_QUERY } from "../../screens/ListDevs";

const mocks = [
  {
    request: {
      query: DEV_LIST_QUERY
    },
    result: {
      data: [
        {
          node: {
            name: "",
            login: "",
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
          }
        },
        {
          node: {
            name: "",
            login: "",
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
          }
        }
      ]
    }
  }
];

describe("Render the ListDevs screen", () => {
  it("should render the ListDevs screen", () => {
    const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ListDevsComp />
      </MockedProvider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should render the ListDevs screen", () => {
    const props = {
      data: {
        search: {
          edges: [
            {
              node: {
                name: "text",
                login: "",
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
              }
            }
          ]
        }
      }
    };
    const component = shallow(<ListDevs {...props} />);
    const instance = component.instance();
    instance.search("text");
    component.setProps({ data: { ...props.data, loading: true } });
    expect(component).toMatchSnapshot();
  });
});
