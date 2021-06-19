import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import CountryPicker, {
  Flag,
  FlagType,
  getAllCountries,
  getCallingCode,
} from "react-native-country-picker-modal";
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";

// countrypicker.js
export const CountrySelector = () => {
  const [visible, setVisible] = useState();
  const [image, setImage] = useState("LK");
  const [x, setX] = useState({});
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const getCountryDetails = country => {
    const { flag, callingCode, cca2 } = country;
    // setImage(flag);
    console.log(callingCode[0]);
    setImage(cca2);
  };
  const phoneInput = useRef(PhoneInput);
  return (
    <View style={styles.container}>
      {/* <Image source={image} style={{ width: 100, height: 50 }} /> */}
      <TouchableOpacity
        style={{ backgroundColor: "blue" }}
        onPress={() => setVisible(true)}
      >
        <Text>Select</Text>
      </TouchableOpacity>
      {showMessage && (
        <View style={styles.message}>
          <Text>Value : {value}</Text>
          <Text>Formatted Value : {formattedValue}</Text>
          <Text>Valid : {valid ? "true" : "false"}</Text>
        </View>
      )}
      <CountryPicker
        withEmoji
        withFlag
        withFilter
        withCallingCode
        withAlphaFilter
        onSelect={country => {
          getCountryDetails(country);
          setX(country);
        }}
        visible={visible}
        onClose={() => setVisible(false)}
        // withModal={false}
      />
      {x !== "null" && (
        <View>
          <Text style={styles.data}>{JSON.stringify(x, null, 2)}</Text>
          <Flag countryCode={image} flagSize={20} />
        </View>
      )}

      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="DM"
        layout="first"
        onChangeText={text => {
          setValue(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        containerStyle={{
          borderWidth: 1,
          backgroundColor: "red",
          borderRadius: 10,
          width: 50,
        }}
        // withDarkTheme
        // withShadow
        autoFocus
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(value);
          setShowMessage(true);
          setValid(checkValid ? checkValid : false);
        }}
      >
        <Text>Check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
