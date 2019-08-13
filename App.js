import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { AsyncStorage, Image, StyleSheet } from "react-native";
import AuthLoading from "./screens/AuthLoading";
import HomeScreen from "./screens/Home";
import ListScreen from "./screens/ListDevs";
import ListScreen2 from "./screens/ListDevs2";
import ProfileScreen from "./screens/Profile";
import WebViewScreen from "./screens/WebView";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

const styles = StyleSheet.create({
  icons: {
    width: 35,
    height: 20
  }
});

const Tabs = createBottomTabNavigator(
  {
    Kigali: { screen: ListScreen2, params: { location: "kigali" } },
    Lagos: { screen: ListScreen2, params: { location: "lagos" } },
    Kampala: { screen: ListScreen2, params: { location: "kampala" } },
    Nairobi: { screen: ListScreen2, params: { location: "nairobi" } }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        switch (routeName) {
          case "Kigali":
            return (
              <Image
                style={styles.icons}
                source={require("./assets/rwanda.png")}
              />
            );
            break;

          case "Lagos":
            return (
              <Image
                style={styles.icons}
                source={require("./assets/nigeria.jpg")}
              />
            );
            break;

          case "Kampala":
            return (
              <Image
                style={styles.icons}
                source={require("./assets/uganda.png")}
              />
            );
            break;

          case "Nairobi":
            return (
              <Image
                style={styles.icons}
                source={require("./assets/kenya.png")}
              />
            );
            break;

          default:
            break;
        }
      }
    }),
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#555"
      },
      headerTintColor: "#000",
      paddingBottom: 5
    }
  }
);

const AppNavigator = createStackNavigator(
  // createSwitchNavigator(
  {
    Auth: AuthLoading,
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    List: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null
      }
    },
    Web: {
      screen: WebViewScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "rgba(0, 0, 0, 1)"
        },
        headerTintColor: "white"
      }
    }
  },
  {
    initialRouteName: "Auth"
    // headerMode: "none"
  }
  // )
);

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  state = {};
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

export default App;
