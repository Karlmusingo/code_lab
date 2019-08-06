import React, { Component } from "react";
import { WebView } from "react-native-webview";

class ProfilePage extends Component {
  state = {};
  render() {
    const { navigation } = this.props;
    const login = navigation.getParam("login", "NO-ID");
    return <WebView source={{ uri: `https://github.com/${login}` }} />;
  }
}

export default ProfilePage;
