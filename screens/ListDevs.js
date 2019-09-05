import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
  RefreshControl
} from "react-native";
import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";
import Header from "../components/Header";
import Dev from "../components/Dev";

export const DEV_LIST_QUERY = gql`
  query {
    search(query: "location:kigali", type: USER, first: 100) {
      userCount
      edges {
        node {
          ... on User {
            name
            login
            bio
            email
            location
            avatarUrl
            createdAt
            starredRepositories {
              totalCount
            }
            repositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
    viewer {
      avatarUrl
    }
  }
`;

export class ListDevs extends Component {
  state = { dataFromState: [], refreshing: false };
  // componentDidUpdate(prevProps) {
  //   const { data } = this.props;

  //   if (data.loading !== prevProps.data.loading) {
  //     if (data.search) this.setState({ data: data.search.edges });
  //   }
  // }

  search = text => {
    const { dataForSearch } = this.state;
    if (dataForSearch) {
      const result = dataForSearch.filter(dev => {
        if (!dev.node.name) return null;
        console.log(">>>>>>>>>>>", dev.node.name);
        return dev.node.name.includes(text);
      });
      this.setState({ dataFromState: result });
    }
  };

  _onRefresh = async () => {
    const { data } = this.props;
    this.setState({ refreshing: true });
    try {
      await this.props.data.refetch();
      this.setState({
        refreshing: false,
        data: data.search.edges
      });
    } catch (e) {
      this.setState({ refreshing: false });
      console.log(e);
    }
  };

  static methode = () => {
    return this.props;
  };
  render() {
    const { dataFromState } = this.state;
    const { navigation } = this.props;
    const location = navigation.getParam("location", "NO-ID");

    const DEV_LIST_QUERY_GQL = gql`
  query {
    search(query: "location:${location}", type: USER, first: 100) {
      userCount
      edges {
        node {
          ... on User {
            name
            login
            bio
            email
            location
            avatarUrl
            createdAt
            starredRepositories {
              totalCount
            }
            repositories {
              totalCount
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
          }
        }
      }
    }
    viewer {
      avatarUrl
    }
  }
`;

    return (
      <SafeAreaView>
        <StatusBar
          translucent={true}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Header
          search={this.search}
          isLoggedIn={true}
          navigation={this.props.navigation}
        />

        <Query query={DEV_LIST_QUERY_GQL}>
          {({ loading, error, data }) => {
            if (loading) return <Text style={{ padding: 10 }}>Loading...</Text>;
            if (error)
              return (
                <Text style={{ padding: 10 }}>
                  Oups, Something went wrong ):
                </Text>
              );
            if (data.search.edges !== dataFromState)
              this.setState({
                dataFromState: data.search.edges,
                dataForSearch: data.search.edges
              });
            return (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
              >
                {dataFromState.map(dev => {
                  return (
                    <Dev
                      navigation={this.props.navigation}
                      dev={dev.node}
                      key={dev.node.createdAt}
                    />
                  );
                })}
              </ScrollView>
            );
          }}
        </Query>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    width: "100%",
    borderRadius: 8
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});

// export default ListDevs;

export default graphql(DEV_LIST_QUERY)(ListDevs);
