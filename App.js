import React, { Component } from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { AsyncStorage } from "react-native";
import AuthLoading from "./screens/AuthLoading";
import HomeScreen from "./screens/Home";
import ListScreen from "./screens/ListDevs";
import ProfileScreen from "./screens/Profile";
import WebViewScreen from "./screens/WebView";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

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
      screen: ListScreen,
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
