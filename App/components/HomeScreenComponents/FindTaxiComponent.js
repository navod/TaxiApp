import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import colors from "../../constants/colors";
import {
  Feather,
  Fontisto,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { ConventionContex } from "../../config/ConventionContex";
import { PickUpDateComponent } from "./PickUpDateComponent";
import { format } from "date-fns";

import { ReturnDateComponent } from "../ReturnComponents/ReturnDateComponent";

export const FindTaxiComponent = ({ navigate }) => {
  let returnComponent = useRef(null);
  const {
    pickUpLocation,
    dropOffLocation,
    setPickUpLocation,
    setDropOffLocation,
    curDate,
    date,
    selectCurCondtion,
    selectCurTime,
    setTimeStamp,
    setPickStates,
    setDateSelectValue,
    rSelectCurCondition,
    rSelectCurTime,
    rCurDate,
    setRCurDate,
    plusDate,
    rSetDateSelectValue,
    setRPlusDate,
    setRSelectCurCondition,
    setRCalenSelDate,
    calendarSelectDate,
  } = useContext(ConventionContex);

  const switchLocation = () => {
    setPickUpLocation(dropOffLocation);
    setDropOffLocation(pickUpLocation);
  };

  useEffect(() => {
    const dateObj = new Date();
    const HOUR_2_VALUE = dateObj.setHours(dateObj.getHours() + 2);
    const MINUTE_2_VALUE = dateObj.getMinutes();
    const CHECK_AM_PM = format(dateObj, "a");
    console.log(curDate, "Ff");
    setTimeStamp(format(dateObj, "T"));
    let time1 =
      format(dateObj, "hh") + ":" + format(dateObj, "mm") + " " + CHECK_AM_PM;
    setTimeValue(time1);
    setDateSelectValue(dateObj);

    console.log(date, "date");
  }, []);

  const [isDisable, setIsDisable] = useState(false);
  const [timeValue, setTimeValue] = useState();

  const alertMessage = () => {
    Alert.alert(
      "No locations entered",
      "Please add your pick-up location and destination to find a taxi.",
      [{ text: "OK" }]
    );
  };

  const returnCloseEvent = () => {
    if (calendarSelectDate === undefined) {
      setRCurDate(format(new Date(), "EEE dd MMM"));
      setRCalenSelDate(new Date(), "yyyy-MM-dd");
      setRSelectCurCondition(false);
    } else {
      setRCurDate(format(new Date(calendarSelectDate), "EEE dd MMM"));
      setRCalenSelDate(calendarSelectDate);
      setRSelectCurCondition(false);
    }
  };

  return (
    <View
      style={{
        marginTop: 40,
        backgroundColor: "white",
        height: 400,
        marginBottom: 60,
      }}
    >
      <View
        style={{ borderWidth: 1, width: "100%", borderColor: colors.darkGray }}
      ></View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Find a taxi for your trip</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.subContainer}>
          <View style={styles.address}>
            <View style={{ width: "88%" }}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  setPickStates(true);
                  navigate.push("MainSearchLocation");
                }}
              >
                <Feather name="circle" size={12} color={colors.green} />
                <Text
                  style={{
                    color: colors.mediumGray,
                    marginLeft: 20,
                  }}
                  numberOfLines={1}
                >
                  {pickUpLocation}
                </Text>
              </TouchableOpacity>

              <View style={styles.rulerContainer}>
                <View style={styles.ruler}></View>
              </View>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  setPickStates(false);
                  navigate.push("MainSearchLocation");
                }}
              >
                <Feather name="circle" size={12} color={colors.green} />
                <Text
                  style={{
                    color: colors.mediumGray,
                    marginLeft: 20,
                  }}
                  numberOfLines={1}
                >
                  {dropOffLocation}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (
                  pickUpLocation !== "Enter pick-up Location" &&
                  dropOffLocation !== "Enter Destination"
                ) {
                  switchLocation();
                } else {
                  setIsDisable(true);
                }
              }}
              disabled={isDisable}
            >
              <MaterialCommunityIcons
                name="compare-vertical"
                size={30}
                color={colors.green}
                style={{ marginLeft: 13 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.dateSelectBtn}
            onPress={() => Standard.open()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 10,
                }}
              >
                {rSelectCurCondition ? (
                  <AntDesign name="arrowright" size={24} color="white" />
                ) : (
                  <Fontisto name="date" size={24} color={"white"} />
                )}

                {selectCurCondtion ? (
                  <Text
                    style={{ fontSize: 16, color: "white", marginLeft: 10 }}
                  >
                    {curDate}, {selectCurTime}
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, color: "white", marginLeft: 10 }}
                  >
                    {curDate}, {timeValue}
                  </Text>
                )}
              </View>
              <View style={{ marginRight: 5 }}>
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={20}
                  color={"white"}
                  style={{ marginTop: 5 }}
                />
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color={"white"}
                  style={{ marginTop: -5 }}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dateSelectBtn,
              {
                backgroundColor: colors.lightGray,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              },
            ]}
            onPress={() => returnComponent.current.open()}
          >
            {rSelectCurCondition ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color={colors.darkGray}
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={{ marginLeft: 10, color: colors.darkGray }}>
                    {rCurDate}, {rSelectCurTime}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => returnCloseEvent()}>
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color={colors.darkGray}
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Entypo
                  name="plus"
                  size={24}
                  color={colors.green}
                  style={{ marginLeft: 10 }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: colors.darkGray,
                    fontSize: 16,
                  }}
                >
                  Need a return
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              if (
                pickUpLocation !== "Enter pick-up Location" &&
                dropOffLocation !== "Enter Destination"
              ) {
                navigate.push("ViewTaxiScreen");
              } else {
                alertMessage();
              }

              // navigate.push("ViewTaxiScreen");
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              Search Taxi
            </Text>
            <Fontisto name="taxi" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ref area */}
      <RBSheet
        ref={ref => {
          Standard = ref;
        }}
        height={465}
      >
        <PickUpDateComponent />
      </RBSheet>

      <RBSheet ref={returnComponent} height={465}>
        <ReturnDateComponent
          onClose={() => {
            returnComponent.current.close();
          }}
        />
      </RBSheet>

      {/* ref area */}
    </View>
  );
};
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.darkGray,
    marginTop: -15,
    backgroundColor: "white",
    width: "65%",
    textAlign: "center",
  },
  subContainer: {
    height: 340,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 15,
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  address: {
    borderWidth: 1,
    borderColor: colors.green,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ruler: {
    borderWidth: 2,
    width: "88%",
    marginLeft: 27,

    borderColor: colors.green,
  },
  rulerContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    borderLeftWidth: 1,
    marginLeft: 5,
    borderColor: colors.green,
  },
  dateSelectBtn: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: colors.green,
    elevation: 4,
    width: "100%",
    height: 50,
    marginTop: 10,
    justifyContent: "center",
  },
  searchButton: {
    width: "100%",
    height: 65,
    marginTop: 10,
    flexDirection: "row",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: colors.green,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
