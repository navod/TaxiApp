import React from "react";
import { View, Text } from "react-native";
import colors from "../constants/colors";

export const ThinRowSeperator = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors.lightGray,
        height: 2,
        borderRadius: 8,
      }}
    ></View>
  );
};

export const BoldRowSeperator = () => {
  return (
    <View
      style={{ width: "100%", backgroundColor: colors.lightGray, height: 30 }}
    ></View>
  );
};
