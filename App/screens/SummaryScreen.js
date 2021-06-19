import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BoldRowSeperator, ThinRowSeperator } from "../components/Seperators";
import { ContactDetailsComponent } from "../components/SummaryScreenComponents/ContactDetailsComponent";
import PaymentMethod from "../components/SummaryScreenComponents/PaymentMethod";
import { YourTripComponent } from "../components/SummaryScreenComponents/YourTripComponent";
import colors from "../constants/colors";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Contact } from "../components/SummaryScreenComponents/Contact";
import { ConventionContex } from "../config/ConventionContex";
import { TripInfo } from "../components/ReturnComponents/ReturnDetailComponent";
export default () => {
  const { mobileNoStates, cardSelect, cashSelect, price, rSelectCurCondition } =
    useContext(ConventionContex);
  let fNameRef = useRef(null);
  let lnameRef = useRef(null);
  let emailRef = useRef(null);

  let scrollRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [isValidFName, setIsValidFName] = useState(false);
  const [isValidLName, setIsValidLName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  let fNameBC = isValidFName ? "red" : colors.lightGray;
  let emailBC = isValidEmail ? "red" : colors.lightGray;
  let lNameBC = isValidLName ? "red" : colors.lightGray;

  let fNameColor = isValidFName ? "red" : colors.darkGray;
  let lNameColor = isValidLName ? "red" : colors.darkGray;
  let emailColor = isValidEmail ? "red" : colors.darkGray;

  const setInputToValue = (text, id) => {
    if (id === "fName") {
      setFirstName(text);
      if (text.length > 0) {
        setIsValidFName(false);
      }
    }
    if (id === "lName") {
      setLastName(text);
      if (text.length > 0) {
        setIsValidLName(false);
      }
    }
    if (id === "email") {
      setEmail(text);
      if (text.length > 0) {
        setIsValidEmail(false);
      }
    }
  };

  const handleClick = number => {
    scrollRef.current.scrollTo({
      y: 100 * number,
      animated: true,
    });
  };

  const validInputs = () => {
    if (firstName === "" && lastName === "" && email === "") {
      handleClick(5);
      setIsValidEmail(true);
      setIsValidFName(true);
      setIsValidLName(true);
      return false;
    } else if (firstName === "" && lastName === "") {
      handleClick(2);
      setIsValidFName(true);
      setIsValidLName(true);
      return false;
    } else if (firstName === "" && email === "") {
      handleClick(2);
      setIsValidFName(true);
      setIsValidEmail(true);
      return false;
    } else if (lastName === "" && email === "") {
      handleClick(6);
      setIsValidLName(true);
      setIsValidEmail(true);
      return false;
    } else if (firstName === "") {
      fNameRef.current?.focus();
      handleClick(2);
      setIsValidFName(true);
      return false;
    } else if (lastName === "") {
      lnameRef.current?.focus();
      handleClick(4);

      setIsValidLName(true);
      return false;
    } else if (email === "") {
      emailRef.current?.focus();
      handleClick(6);
      setIsValidEmail(true);
      return false;
    } else if (validateEmail()) {
      setIsValidEmail(false);
    } else {
      emailRef.current?.focus();
      handleClick(10);
      setIsValidEmail(true);
      return false;
    }
  };

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  };

  const checkAllValid = () => {
    if (
      validInputs() !== false &&
      mobileNoStates === false &&
      (cashSelect === true || cardSelect === true)
    ) {
      alert("Booking Confirmed");
      return true;
    } else {
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef}>
        {/*  */}
        {rSelectCurCondition ? (
          <View style={{ height: 550, marginTop: 5 }}>
            <Text style={[styles.headerText, { marginTop: 15 }]}>
              Your Trip
            </Text>
            <TripInfo />
          </View>
        ) : (
          <View>
            <Text style={styles.headerText}>Your Trip</Text>
            <ThinRowSeperator />
            <YourTripComponent />
          </View>
        )}

        <BoldRowSeperator />
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.headerText}>Contact Details</Text>
          <ThinRowSeperator />
          <View style={{ padding: 20 }}>
            <View style={[styles.containerStyles, { borderColor: fNameBC }]}>
              <Text style={[styles.labelStyles, { color: fNameColor }]}>
                Name
              </Text>
              <TextInput
                ref={fNameRef}
                value={firstName}
                placeholder="Jhon"
                style={styles.inputStyles}
                onChangeText={text => setInputToValue(text, "fName")}
                returnKeyType="next"
                onSubmitEditing={() => lnameRef.current?.focus()}
                onFocus={() => handleClick(6)}
              />
              {isValidFName ? (
                <MaterialIcons
                  name="error-outline"
                  size={24}
                  color="red"
                  style={styles.icon}
                />
              ) : (
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color={colors.green}
                  style={styles.icon}
                />
              )}
            </View>
            <View
              style={[
                styles.containerStyles,
                { marginTop: 35, borderColor: lNameBC },
              ]}
            >
              <Text
                style={[styles.labelStyles, { width: 90, color: lNameColor }]}
              >
                Last Name
              </Text>
              <TextInput
                ref={lnameRef}
                placeholder="De silva"
                style={styles.inputStyles}
                value={lastName}
                onChangeText={text => setInputToValue(text, "lName")}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                onFocus={() => handleClick(6)}
              />
              {isValidLName ? (
                <MaterialIcons
                  name="error-outline"
                  size={24}
                  color="red"
                  style={styles.icon}
                />
              ) : (
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color={colors.green}
                  style={styles.icon}
                />
              )}
            </View>

            <View
              style={[
                styles.containerStyles,
                { marginTop: 35, borderColor: emailBC },
              ]}
            >
              <Text
                style={[styles.labelStyles, { width: 55, color: emailColor }]}
              >
                Email
              </Text>
              <TextInput
                ref={emailRef}
                placeholder="Example@gmail.com"
                style={styles.inputStyles}
                value={email}
                onChangeText={text => setInputToValue(text, "email")}
                keyboardType="email-address"
                onFocus={() => handleClick(6)}
              />
              {isValidEmail ? (
                <MaterialIcons
                  name="error-outline"
                  size={24}
                  color="red"
                  style={styles.icon}
                />
              ) : (
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color={colors.green}
                  style={styles.icon}
                />
              )}
            </View>

            <Contact />
          </View>
          <BoldRowSeperator />
        </View>
        <PaymentMethod />
      </ScrollView>

      {/* -------------------------footer----------------------------------------------------------------------- */}
      <View style={styles.footer}>
        <View>
          <Text
            style={{ fontWeight: "bold", color: colors.darkGray, fontSize: 18 }}
          >
            LKR {price}
          </Text>
          <Text style={{ color: colors.lightGray }}>Total Price</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (checkAllValid() === false) {
              if (validInputs() === false) {
              } else {
                if (mobileNoStates === true) {
                  alert("Please verify your phone number");
                } else if (cardSelect === false || cashSelect === false) {
                  alert("Please select your payment method");
                }
              }
            }
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Continue</Text>
        </TouchableOpacity>
      </View>
      {/* -------------------------footer----------------------------------------------------------------------- */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  footer: {
    width: "100%",
    height: 60,
    backgroundColor: "#F1F3F6",
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  btn: {
    borderRadius: 10,
    width: 100,
    height: "80%",
    backgroundColor: colors.green,
    justifyContent: "center",
  },
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
