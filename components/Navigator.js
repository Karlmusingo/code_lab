import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/Home";
// import ListScreen from "../screens/ListDevs";

export default createAppContainer(
  createStackNavigator(
    {
      Home: HomeScreen,
      List: ListScreen
    },
    {
      initialRouteName: "Home"
    }
  )
);
