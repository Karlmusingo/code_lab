import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  SafeAreaView
} from "react-native";
import { Icon } from "react-native-elements";
import auth from "../utils/auth";
import Header from "../components/Header";

export default class Home extends React.Component {
  login = async () => {
    try {
      const { access_token } = await auth();
      await AsyncStorage.setItem("access_token", access_token);
      const token = await AsyncStorage.getItem("access_token");
      this.props.navigation.navigate("List");
    } catch ({ message }) {
      return message;
    }
  };

  render() {
    return (
      <SafeAreaView style={{ borderBottomColor: "red" }}>
        <View>
          <Header />
          <View style={styles.touch}>
            <TouchableOpacity onPress={this.login}>
              <View style={styles.container}>
                <Icon
                  name="github"
                  size={35}
                  color="#FFF"
                  type="font-awesome"
                />
                <Text style={styles.text}>Login with GitHub</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  touch: {
    display: "flex",
    height: Dimensions.get("window").height - 150,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    width: 250,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
