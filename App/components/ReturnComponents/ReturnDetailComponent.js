import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import colors from "../../constants/colors";
import { YourTripComponent } from "../SummaryScreenComponents/YourTripComponent";
import { RetrunTripComponent } from "./ReturnTripComponent";

const FirstRoute = () => <YourTripComponent />;

const SecondRoute = () => <RetrunTripComponent />;
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: colors.green,
      width: 100,
      marginLeft: 10,
      height: 3,
    }}
    tabStyle={{ width: 150, shadowOffset: 0 }}
    style={{
      backgroundColor: "white",
      margin: 0,
      borderWidth: 0,
      shadowOpacity: 0,
      shadowColor: "white",
    }}
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{
          color: colors.darkGray,
          marginLeft: -45,
          padding: 0,
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

export const TripInfo = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Outbound" },
    { key: "second", title: "Return" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};
