import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Share
} from "react-native";
import { Icon } from "react-native-elements";

class ProfileHeader extends Component {
  state = {};
  onShare = async () => {
    try {
      const { login } = this.props;
      const result = await Share.share({
        message: `https://github.com/${login}`,
        title: "Share profile"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { goBack } = this.props;
    return (
      <View style={styles.header}>
        <View>
          <TouchableHighlight onPress={goBack}>
            <Icon
              // style={styles.searchIcon}
              name="chevron-left"
              onPress={this.displaySearch}
              color="#fff"
              type="font-awesome"
            />
          </TouchableHighlight>
        </View>
        <View>
          <Text style={styles.title}>Code Lab</Text>
        </View>
        <View>
          <TouchableHighlight>
            <Icon
              // style={styles.searchIcon}
              name="share-alt"
              onPress={this.onShare}
              color="#fff"
              type="font-awesome"
              size={30}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 17,
    position: "absolute",
    top: 40,
    width: "100%",
    zIndex: 9
    // backgroundColor: "#fff"
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff"
  }
});

export default ProfileHeader;
