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
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Header from "../components/Header";
import Dev from "../components/Dev";

export class ListDevs extends Component {
  state = { data: [], refreshing: false };
  componentDidUpdate(prevProps) {
    const { data } = this.props;

    if (data.loading !== prevProps.data.loading) {
      if (data.search) this.setState({ data: data.search.edges });
    }
  }

  search = text => {
    const { data } = this.props;
    if (data.search) {
      const result = data.search.edges.filter(dev => {
        if (!dev.node.name) return null;
        return dev.node.name.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({ data: result });
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

  render() {
    const { data } = this.state;

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
        <View style={styles.container}>
          {this.props.data.loading ? (
            <Text style={{ padding: 10 }}>Loading...</Text>
          ) : this.props.data.error ? (
            <Text style={{ padding: 10 }}>Oups, Something went wrong ):</Text>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            >
              {data.map(dev => (
                <Dev
                  navigation={this.props.navigation}
                  dev={dev.node}
                  key={dev.node.createdAt}
                />
              ))}
            </ScrollView>
          )}
        </View>
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

const graphqlDynamic = (query, config) => {
  return component => {
    return props => {
      return React.createElement(
        graphql(query(props), config)(component),
        props
      );
    };
  };
};

const query = props => {
  const location = props.navigation.getParam("location", "NO-ID");
  return gql`
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
};

export default graphqlDynamic(query, {})(ListDevs);
