import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import {} from "react-native-gesture-handler";
import colors from "../../constants/colors";
import { ThinRowSeperator } from "../Seperators";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ConventionContex } from "../../config/ConventionContex";
import { useNavigation } from "@react-navigation/core";

export default PaymentMethod = () => {
  const navigation = useNavigation();
  const {
    creditCardNumber,
    cashSelect,
    cardSelect,
    setSelectCash,
    setCardSelect,
  } = useContext(ConventionContex);

  // const [cashSelect, setSelectCash] = useState(false);
  // const [cardSelect, setCardSelect] = useState(false);

  // const checkCardValidate = cardSelect ? true : false;
  // const checkCashValidate = cashSelect ? true : false;

  return (
    <View style={styles.continer}>
      <Text style={styles.headerText}>Payment Methods</Text>
      <ThinRowSeperator />
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          // borderWidth: 1,
          paddingRight: 20,
          paddingVertical: 10,
        }}
        onPress={() => {
          setCardSelect(false);
          setSelectCash(true);
        }}
      >
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/icons/money.png")}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
          <Text
            style={{ color: colors.darkGray, fontSize: 16, marginLeft: 20 }}
          >
            Cash
          </Text>
        </View>
        {cashSelect ? (
          <Ionicons name="checkmark-circle" size={30} color={colors.green} />
        ) : (
          <FontAwesome name="circle" size={20} color={colors.lightGray} />
        )}
        {/* */}
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 15, width: "100%" }}>
        <View
          style={{
            borderWidth: 0.3,
            borderRadius: 100,
            borderColor: colors.lightGray,
            width: "100%",
          }}
        ></View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          // borderWidth: 1,
          paddingRight: 20,
          paddingVertical: 10,
        }}
        onPress={() => {
          if (creditCardNumber === "") {
            navigation.push("App");
          } else {
            setSelectCash(false);
            setCardSelect(true);
          }
        }}
      >
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/icons/card.png")}
            style={{ width: 40, height: 40, marginLeft: 10 }}
          />
          <View>
            {creditCardNumber === "" ? (
              <Text
                style={{ color: colors.darkGray, fontSize: 16, marginLeft: 20 }}
              >
                Add new card
              </Text>
            ) : (
              <Text
                style={{ color: colors.darkGray, fontSize: 16, marginLeft: 20 }}
              >
                {creditCardNumber}
              </Text>
            )}
          </View>
        </View>
        {cardSelect ? (
          <Ionicons name="checkmark-circle" size={30} color={colors.green} />
        ) : (
          <FontAwesome name="circle" size={20} color={colors.lightGray} />
        )}
        {/* <Ionicons name="checkmark-circle" size={30} color={colors.green} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    flex: 1,
    paddingBottom: 100,
  },
  headerText: {
    padding: 10,
    color: colors.darkGray,
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    color: colors.darkGray,
  },
});
