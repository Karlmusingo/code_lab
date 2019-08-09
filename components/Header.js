import React, { Component } from "react";
import { Query } from "react-apollo";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  FlatList,
  AsyncStorage,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StatusBar,
  NativeModules
} from "react-native";
import { Icon } from "react-native-elements";
import ElevatedView from "react-native-elevated-view";

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;

export class Header extends Component {
  state = {
    displaySearch: false,
    displayDropdown: false,
    dropdownMenu: [{ key: "Logout" }]
  };

  displaySearch = () => {
    const { displaySearch } = this.state;
    this.props.search("");
    if (displaySearch) this.textInput.clear();
    this.setState({ displaySearch: !displaySearch });
  };

  displayDropdown = () => {
    this.setState({ displayDropdown: !this.state.displayDropdown });
  };

  logout = async () => {
    this.displayDropdown();
    this.props.navigation.navigate("Home");
    await AsyncStorage.clear();
  };

  render() {
    const { isLoggedIn, data, search } = this.props;

    return (
      <View style={styles.header}>
        <StatusBar />
        <TouchableWithoutFeedback onPress={this.displayDropdown}>
          {isLoggedIn ? (
            <View
              style={[styles.avatar, { display: isLoggedIn ? "flex" : "none" }]}
            >
              <Image
                source={
                  data.viewer
                    ? { uri: data.viewer.avatarUrl }
                    : { uri: "image" }
                }
                style={styles.image}
                onPress={this.displayDropdown}
              />
              <Icon name="sort-down" color="#000" type="font-awesome" />
            </View>
          ) : (
            <Text />
          )}
        </TouchableWithoutFeedback>
        <ElevatedView
          elevation={10}
          style={[
            styles.dropdown
            // { display: this.state.displayDropdown ? "flex" : "none" }
          ]}
        >
          <FlatList
            style={{ display: this.state.displayDropdown ? "flex" : "none" }}
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
                    backgroundColor: "#fff",
                    width: 100
                  }}
                >
                  <Text style={styles.dropdownItem}>{item.key}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </ElevatedView>
        <Text style={styles.banner}>Code Lab</Text>
        <View style={styles.search}>
          <TextInput
            style={[
              styles.searchInput,
              { display: this.state.displaySearch ? "flex" : "none" }
            ]}
            ref={input => {
              this.textInput = input;
            }}
            placeholder="Search..."
            onChangeText={text => search(text)}
          />
        </View>
        {isLoggedIn ? (
          <Icon
            style={styles.searchIcon}
            name="search"
            onPress={this.displaySearch}
            color="#929292"
            type="font-awesome"
          />
        ) : (
          <Text />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: "#929292",
    borderBottomWidth: 1,
    paddingHorizontal: 17,
    paddingTop: Platform.OS === "android" ? STATUSBAR_HEIGHT : 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 9
  },
  banner: {
    fontWeight: "700",
    fontSize: 25
  },
  avatar: {
    width: 70,
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 25,
    left: 0,
    top: 0
  },
  search: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    right: 14,
    top: Platform.OS === "android" ? STATUSBAR_HEIGHT + 14 : 14
  },
  searchInput: {
    height: 35,
    width: 250,
    borderColor: "gray",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
    display: "none",
    right: 0,
    top: 0
  },
  searchIcon: {
    zIndex: 999,
    marginLeft: 20,
    marginRight: 70
  },
  dropdown: {
    position: "absolute",
    display: "flex",
    top: Platform.OS === "android" ? STATUSBAR_HEIGHT + 62 : 62,
    left: 15,
    paddingLeft: 5
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

export const VIEWER_QUERY = gql`
  query {
    viewer {
      avatarUrl
    }
  }
`;

export default graphql(VIEWER_QUERY)(Header);
