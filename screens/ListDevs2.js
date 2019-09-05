import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  FlatList,
  TouchableHighlight,
  Image,
  NativeModules,
  AsyncStorage
} from "react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Header from "../components/Header";
import Dev from "../components/Dev";
import ElevatedView from "react-native-elevated-view";

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export class ListDevs extends Component {
  state = {
    data: [],
    refreshing: false,
    displayDropdown: false,
    dropdownMenu: [{ icon: "sign-out-alt", key: "Logout" }]
  };
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data.loading !== prevProps.data.loading) {
      if (data.search) this.setState({ data: data.search.edges });
    }
  }

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      if (data.search) this.setState({ data: data.search.edges });
    }
  }

  displayDropdown = () => {
    this.setState({ displayDropdown: !this.state.displayDropdown });
  };

  logout = async () => {
    this.displayDropdown();
    this.props.navigation.navigate("Home");
    await AsyncStorage.clear();
  };

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

    if (this.props.data) {
      // delete this.props.data.search.edges;
      // console.log(this.props.data.search.userCount);
      // console.log(this.props.data.error);
    }

    return (
      <SafeAreaView>
        <StatusBar
          translucent={true}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Header
          search={this.search}
          displayDropdown={this.displayDropdown}
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
        <ElevatedView
          elevation={20}
          style={[
            styles.dropdown
            // { display: this.state.displayDropdown ? "flex" : "none" }
          ]}
        >
          <FlatList
            style={{
              zIndex: 999,
              display: this.state.displayDropdown ? "flex" : "none"
            }}
            ItemSeparatorComponent={({ highlighted }) => (
              <View
                style={[styles.separator, highlighted && { marginLeft: 0 }]}
              />
            )}
            data={[...this.state.dropdownMenu]}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={item => {
                  this.logout();
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "#fff",
                    width: 110
                  }}
                >
                  <Image
                    style={styles.logoutIcon}
                    source={require("../assets/signout.png")}
                  />
                  <Text style={styles.dropdownItem}>{item.key}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </ElevatedView>
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
    zIndex: 1,
    borderRadius: 8
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },

  logoutIcon: {
    width: 15,
    height: 15,
    padding: 10,
    margin: 7
  },
  dropdown: {
    position: "absolute",
    display: "flex",
    top: Platform.OS === "android" ? STATUSBAR_HEIGHT + 62 : 62,
    left: 15,
    paddingLeft: 5,
    zIndex: 999
  },
  dropdownItem: {
    fontSize: 20,
    padding: 5,
    paddingLeft: 5
  },
  separator: {
    backgroundColor: "#fff",
    borderBottomColor: "#8492A6",
    borderBottomWidth: 1,
    padding: 3,
    width: 100
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
