import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ViewTaxiScreen from "../screens/ViewTaxiScreen";
import SummaryScreen from "../screens/SummaryScreen";
import { NavigationContainer } from "@react-navigation/native";
import { ConventionContexProvider } from "../config/ConventionContex";
import colors from "../constants/colors";
import { PickUpLocation } from "../components/HomeScreenComponents/PickUpLocation";
import { DropOffLocation } from "../components/HomeScreenComponents/DropOffLocation";
import { MainSearchLocation } from "../components/HomeScreenComponents/MainSearchLocation";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import App from "../components/SummaryScreenComponents/CardDetails";

const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </MainStack.Navigator>
);

const ModalStack = createStackNavigator();
//Choose taxi
const ModalStackScreen = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen
      name="MainStackScreen"
      component={MainStackScreen}
      options={{ headerShown: false }}
    />
    <ModalStack.Screen
      name="ViewTaxiScreen"
      component={ViewTaxiScreen}
      options={({ navigation, route }) => ({
        title: "Choose taxi",
        headerStyle: {
          backgroundColor: colors.green,
        },

        headerTitleStyle: {
          color: "white",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name="arrow-back-sharp" size={30} color="white" />
          </TouchableOpacity>
        ),
      })}
    />
    <ModalStack.Screen
      name="SummaryScreen"
      component={SummaryScreen}
      options={({ navigation, route }) => ({
        title: "Journey summary",
        headerStyle: {
          backgroundColor: colors.green,
        },

        headerTitleStyle: {
          color: "white",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name="arrow-back-sharp" size={30} color="white" />
          </TouchableOpacity>
        ),
      })}
    />

    <ModalStack.Screen
      name="App"
      component={App}
      options={({ navigation, route }) => ({
        title: "Add new card",
        headerStyle: {
          backgroundColor: colors.green,
        },

        headerTitleStyle: {
          color: "white",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name="arrow-back-sharp" size={30} color="white" />
          </TouchableOpacity>
        ),
      })}
    />

    <ModalStack.Screen
      name="MainSearchLocation"
      component={MainSearchLocation}
      options={({ navigation, route }) => ({
        title: "Router plan",
        headerStyle: {
          backgroundColor: colors.green,
        },

        headerTitleStyle: {
          color: "white",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{ paddingHorizontal: 10 }}
          >
            <Ionicons name="close-outline" size={30} color="white" />
          </TouchableOpacity>
        ),
      })}
    />
  </ModalStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ConventionContexProvider>
      <ModalStackScreen />
    </ConventionContexProvider>
  </NavigationContainer>
);
