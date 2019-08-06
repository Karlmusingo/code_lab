import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { Right } from "native-base";

class Dev extends Component {
  state = {};

  goToProfile = dev => {
    this.props.navigation.navigate("Profile", { dev });
  };

  render() {
    const { dev } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.goToProfile(dev)}>
        <View style={[styles.dev]}>
          <Image source={{ uri: dev.avatarUrl }} style={styles.image} />
          <View style={styles.names}>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>{dev.name}</Text>
            <Text style={{ marginTop: 8 }}>@{dev.login}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.textBadge}>{dev.repositories.totalCount}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  dev: {
    backgroundColor: "#F0F0F0",
    borderBottomColor: "#8492A6",
    borderBottomWidth: 1,
    paddingRight: 15,
    paddingLeft: 15,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  image: {
    width: 70,
    height: 70,
    margin: 8,
    borderRadius: 35
  },
  names: {
    width: 190,
    display: "flex",
    justifyContent: "center"
  },
  badge: {
    backgroundColor: "#15cd66",
    height: 25,
    borderRadius: 13,
    paddingRight: 3
  },
  textBadge: {
    color: "#fff",
    padding: 5
  }
});

export default Dev;
