import React, { useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ColorPropType,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colors";

import { ConventionContex } from "../../config/ConventionContex";

export const ReturnCancellAlert = ({ onClose }) => {
  const { setRSelectCurCondition } = useContext(ConventionContex);
  return (
    <View
      style={{
        width: "100%",

        height: 290,
        backgroundColor: "white",
      }}
    >
      <View style={{ padding: 15 }}>
        <Text style={styles.headerText}>Are you sure ?</Text>
        <TouchableOpacity style={styles.icon} onPress={() => onClose()}>
          <AntDesign name="close" size={30} color={colors.mediumGray} />
        </TouchableOpacity>
        <Text style={styles.msg}>
          Remember, you can cancel your booking for free up to 24 hours before
          pick-up
        </Text>
      </View>
      <View style={{ borderWidth: 1, borderColor: colors.lightGray }}></View>
      <View style={{ padding: 15, paddingTop: 20 }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setRSelectCurCondition(false);
            onClose();
          }}
        >
          <Text style={styles.btnText}>Remove return</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "white" }]}
          onPress={() => onClose()}
        >
          <Text style={[styles.btnText, { color: colors.green }]}>
            I want to keep the return
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  msg: {
    color: colors.mediumGray,
    fontSize: 16,
    paddingBottom: 15,
  },
  btn: {
    backgroundColor: "red",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
