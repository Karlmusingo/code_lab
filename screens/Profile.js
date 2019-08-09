import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Icon } from "react-native-elements";
import ProfileHeader from "../components/ProfileHeader";

class Profile extends Component {
  state = {};

  render() {
    const { navigation } = this.props;
    const dev = navigation.getParam("dev", "NO-ID");

    return (
      <View>
        <ProfileHeader
          login={dev.login}
          goBack={() => navigation.goBack(null)}
        />
        <ScrollView>
          <View style={{}}>
            <ImageBackground
              source={{
                uri: dev.avatarUrl
              }}
              style={{ height: 540, width: Dimensions.width }}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.75)"
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    position: "absolute",
                    top: 370,
                    alignItems: "flex-end",
                    paddingRight: 20,
                    paddingLeft: 20
                  }}
                >
                  <Text style={{ width: 39 }} />
                  <Image
                    source={{
                      uri: dev.avatarUrl
                    }}
                    style={{ height: 140, width: 140, borderRadius: 70 }}
                  />
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate("Web", { login: dev.login })
                    }
                  >
                    <Icon
                      name="share-square"
                      size={45}
                      color="#fff"
                      type="font-awesome"
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              padding: 20
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 25 }}>{dev.name}</Text>
            <Text style={{ fontWeight: "400", fontSize: 20, color: "#47525E" }}>
              @{dev.login}
            </Text>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 15,
                textAlign: "center",
                paddingTop: 20,
                paddingBottom: 20
              }}
            >
              {dev.bio}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%"
              }}
            >
              <View>
                <Text style={styles.text}>{dev.followers.totalCount}</Text>
                <Text style={styles.text}>Followers</Text>
              </View>
              <View>
                <Text style={styles.text}>{dev.following.totalCount}</Text>
                <Text style={styles.text}>Followings</Text>
              </View>
              <View>
                <Text style={styles.text}>
                  {dev.starredRepositories.totalCount}
                </Text>
                <Text style={styles.text}>Stars</Text>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{ fontWeight: "700", fontSize: 35, textAlign: "center" }}
              >
                {dev.repositories.totalCount}
              </Text>
              <Text
                style={{ fontWeight: "700", fontSize: 20, textAlign: "center" }}
              >
                Repositories
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "400",
    fontSize: 20,
    color: "#47525E",
    textAlign: "center"
  }
});

export default Profile;
