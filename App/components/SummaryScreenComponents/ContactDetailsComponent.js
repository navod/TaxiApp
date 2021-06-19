import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import colors from "../../constants/colors";
import { BoldRowSeperator, ThinRowSeperator } from "../Seperators";
import { Contact } from "./Contact";
import { AntDesign } from "@expo/vector-icons";
// https://reactnativemaster.com/react-native-country-picker/

export const ContactDetailsComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");

  const [isValidName, setIsValidName] = useState(false);

  let nameBC = isValidName ? "red" : colors.lightGray;
  const checkValidTextFields = text => {};

  const validCheck = () => {
    if (name === "") {
      setIsValidName(true);
    }
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <Text style={styles.headerText}>Contact Details</Text>
      <ThinRowSeperator />
      <View style={{ padding: 20 }}>
        <View style={styles.containerStyles}>
          <Text style={styles.labelStyles}>Name</Text>
          <TextInput
            value={name}
            placeholder="Jhon"
            style={styles.inputStyles}
            onChangeText={text => setName(text)}
          />
          <AntDesign
            name="checkcircleo"
            size={24}
            color={colors.green}
            style={styles.icon}
          />
        </View>
        <View style={[styles.containerStyles, { marginTop: 35 }]}>
          <Text style={[styles.labelStyles, { width: 90 }]}>Last Name</Text>
          <TextInput placeholder="De silva" style={styles.inputStyles} />
          <AntDesign
            name="checkcircleo"
            size={24}
            color={colors.green}
            style={styles.icon}
          />
        </View>

        <View style={[styles.containerStyles, { marginTop: 35 }]}>
          <Text style={[styles.labelStyles, { width: 55 }]}>Email</Text>
          <TextInput
            placeholder="Example@gmail.com"
            style={styles.inputStyles}
          />
          <AntDesign
            name="checkcircleo"
            size={24}
            color={colors.green}
            style={styles.icon}
          />
        </View>

        <Contact />
      </View>
      <BoldRowSeperator />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    marginTop: 20,
    borderWidth: 0.8,
    height: 60,
    padding: 12,
    borderRadius: 8,
    borderColor: colors.lightGray,
  },
  labelStyles: {
    backgroundColor: "white",
    marginTop: -23,
    // borderWidth: 1,
    width: 60,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: colors.darkGray,
    justifyContent: "center",
  },
  inputStyles: {
    paddingLeft: 5,
    height: "100%",
  },
  headerText: {
    color: colors.darkGray,
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 16,
  },
});
