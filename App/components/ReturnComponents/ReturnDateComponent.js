import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { ConventionContex } from "../../config/ConventionContex";
import colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { ThinRowSeperator } from "../Seperators";
import { format, parse, setDate } from "date-fns";
import RBSheet from "react-native-raw-bottom-sheet";
import { Wheel } from "teaset";
import { ReturnCalendar } from "../ReturnComponents/ReturnCalendar";
import moment from "moment";
export const ReturnDateComponent = ({ onClose }) => {
  const {
    rCurDate,
    rPlusDate,
    setRCurDate,
    setRPlusDate,
    setRCalenSelDate,
    rCheckTime,
    setRDate,
    rDate,
    setRSelectCurCondition,
    rSelectCurTime,
    setRSelectCurTime,
    setRCheckTime,
    rDateSelectValue,
    rSetDateSelectValue,
    calendarSelectDate,
  } = useContext(ConventionContex);

  const refRBSheet = useRef();

  useEffect(() => {
    setRDate(rCurDate);
    setRCheckTime(false);
    if (rSelectCurTime === undefined) {
      setExtraMValue(format(dateObj, "mm"));
      setExtraHValue(format(HOUR_2_VALUE, "hh"));
      setObjDateState(dateObj);
      CHECK_AM_PM === "PM" ? setTimeZoneValue(1) : setTimeZoneValue(0);
    } else {
      let brokeValue = rSelectCurTime.split(":");
      let borkeValue2 = rSelectCurTime.split(" ");
      let borkeValue3 = brokeValue[1].split(" ");

      setExtraMValue(borkeValue3[0]);
      setExtraHValue(brokeValue[0]);
      setTimeZoneValue(borkeValue2[1] === "PM" ? 1 : 0);

      // setNewHourValue(borkeValue3[0]);
      // setNewMinuteValue(brokeValue[0]);
      // setNewZoneValue(borkeValue2[1] === "PM" ? 1 : 0);
      console.log(brokeValue[0], "hour");
      let d1 = new Date(rDateSelectValue);
      if (borkeValue2[1] === "PM") {
        d1.setHours(parseInt(brokeValue[0]) + 12);
      } else {
        d1.setHours(brokeValue[0]);
      }

      d1.setMinutes(borkeValue3[0]);
      setObjDateState(d1);
      setRPlusDate(rDateSelectValue);
      setRCalenSelDate(format(rDateSelectValue, "yyyy-MM-dd"));
    }
  }, []);

  const [timeZoneValue, setTimeZoneValue] = useState();
  const [extraHValue, setExtraHValue] = useState();
  const [extraMValue, setExtraMValue] = useState();
  const [newHourValue, setNewHourValue] = useState();
  const [newMinuteValue, setNewMinuteValue] = useState();
  const [newZoneValue, setNewZoneValue] = useState();

  const [objDateState, setObjDateState] = useState();
  const dateObj = new Date();
  const HOUR_2_VALUE = dateObj.setHours(dateObj.getHours() + 4);

  const MINUTE_2_VALUE = dateObj.getMinutes();
  const CHECK_AM_PM = format(dateObj, "a");
  const sendTimeValue = new Date();

  const zone = timeZoneValue === 1 ? "PM" : "AM";

  const incrementDate = () => {
    const today = rPlusDate;
    const tomorrow = new Date(today);
    const incementDate = tomorrow.setDate(tomorrow.getDate() + 1);
    setRPlusDate(incementDate);
    setRCalenSelDate(format(incementDate, "yyyy-MM-dd"));
    setRDate(format(incementDate, "EEE dd MMM"));
    setRCheckTime(false);
  };

  const decrementDate = () => {
    const d2 = new Date(calendarSelectDate);
    d2.setHours(d2.getHours() + 4);

    let d1 = new Date(rPlusDate);
    if (new Date(rPlusDate).getDate() - 1 >= objDateState.getDate()) {
      const today = rPlusDate;
      const yesterday = new Date(today);
      const decrementDate = yesterday.setDate(yesterday.getDate() - 1);
      setRPlusDate(decrementDate);
      // setTimeStamp(decrementDate);
      setRCalenSelDate(format(decrementDate, "yyyy-MM-dd"));
      setRDate(format(decrementDate, "EEE dd MMM"));

      const check = new Date();
      if (CHECK_AM_PM === "PM") {
        check.setHours(parseInt(extraHValue) + 12);
        check.setMinutes(extraMValue);
      }
      if (new Date(rPlusDate).getDate() - 1 === objDateState.getDate()) {
        if (check.getHours() < dateObj.getHours()) {
          setRCheckTime(true);
        } else if (check.getHours() === objDateState.getHours()) {
          if (check.getMinutes() < objDateState.getMinutes()) {
            setTimeZoneValue(1);
            setRCheckTime(true);
          }
        }
      }
    }
  };

  const checkCorrectHour = text => {
    if (text.length !== 0) {
      // setTimeZoneValue(format(objDateState, "a") === "AM" ? 0 : 1);
      let d1 = new Date(rPlusDate);
      if (objDateState.getDate() >= d1.getDate()) {
        let hour = text;
        let minute = extraMValue;
        let ampm = timeZoneValue === 1 ? "pm" : "am";
        console.log(format(objDateState, "hh:mm a"));
        let stTime =
          format(objDateState, "hh") +
          ":" +
          format(objDateState, "mm") +
          " " +
          format(objDateState, "a");

        let edTime = hour + ":" + minute + " " + ampm;
        console.log(stTime, "startTime");
        console.log(edTime, "endTime");
        var startTime = moment(stTime, "HH:mm a");
        var endTime = moment(edTime, "HH:mm a");
        if (endTime.isBefore(startTime)) {
          setRCheckTime(true);
        } else {
          setRCheckTime(false);
        }
      }
    }
  };

  const checkCorrectMin = text => {
    if (text.length !== 0) {
      setTimeZoneValue(format(objDateState, "a") === "AM" ? 0 : 1);
      let d1 = new Date(rPlusDate);
      if (objDateState.getDate() >= d1.getDate()) {
        let hour = extraHValue;
        let minute = text;
        let ampm = timeZoneValue === 1 ? "pm" : "am";
        let stTime =
          format(objDateState, "hh") +
          ":" +
          format(objDateState, "mm") +
          " " +
          format(objDateState, "a");
        let edTime = hour + ":" + minute + " " + ampm;
        var startTime = moment(stTime, "HH:mm a");
        var endTime = moment(edTime, "HH:mm a");
        if (endTime.isBefore(startTime)) {
          setRCheckTime(true);
        } else {
          setRCheckTime(false);
        }
      }
    }
  };

  const setWheelValue = index => {
    let d1 = new Date(rPlusDate);
    if (objDateState.getDate() >= d1.getDate()) {
      let hour = extraHValue;
      let minute = extraMValue;
      let ampm = index === 1 ? "pm" : "am";

      let stTime =
        format(objDateState, "hh") +
        ":" +
        format(objDateState, "mm") +
        " " +
        format(objDateState, "a");

      let edTime = hour + ":" + minute + " " + ampm;

      var startTime = moment(stTime, "HH:mm a");
      var endTime = moment(edTime, "HH:mm a");

      if (endTime.isBefore(startTime)) {
        setRCheckTime(true);
        setTimeZoneValue(index);
      } else {
        setRCheckTime(false);
        setTimeZoneValue(index);
      }
    }
  };
  const alertMessage = () => {
    Alert.alert("Invalid entered", "Please add your return time correctly.", [
      { text: "OK" },
    ]);
  };

  const incrementTime = () => {
    let d1 = new Date();
    d1.setHours(parseInt(extraHValue) + 1);
    let checkValue = format(d1, "hh");
    setExtraHValue(String(checkValue));
    checkCorrectHour(checkValue);
  };
  const decrementTime = () => {
    let d1 = new Date();
    d1.setHours(parseInt(extraHValue) - 1);
    let checkValue = format(d1, "hh");
    setExtraHValue(String(checkValue));
    checkCorrectHour(checkValue);
  };

  const incrementMin = () => {
    let d1 = new Date();
    d1.setMinutes(parseInt(extraMValue) + 1);
    let checkValue = format(d1, "mm");
    setExtraMValue(String(checkValue));
    checkCorrectMin(checkValue);
  };

  const decrementMin = () => {
    let d1 = new Date();
    d1.setMinutes(parseInt(extraMValue) - 1);
    let checkValue = format(d1, "mm");
    setExtraMValue(String(checkValue));
    checkCorrectMin(checkValue);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <View>
          <Text style={styles.headerText}>Schedule ride</Text>
          <Text style={styles.subText}>
            When would you like to be picked up?
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              onClose();
            }}
          >
            <AntDesign name="close" size={24} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
      </View>
      <ThinRowSeperator />

      <View
        style={{
          width: "100%",
          height: 130,
          borderWidth: 0.2,
          marginTop: 30,
          padding: 20,
          borderRadius: 8,
          borderColor: colors.mediumGray,
          paddingBottom: 25,
          paddingTop: 25,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            // borderWidth: 1,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => incrementTime()}
              style={{ alignItems: "center", paddingBottom: 2 }}
            >
              <AntDesign name="caretup" size={24} color={colors.mediumGray} />
            </TouchableOpacity>
            <View style={styles.timeView}>
              <TextInput
                placeholder="HH"
                value={extraHValue}
                style={styles.timeValue}
                onChangeText={text => {
                  setExtraHValue(text.replace(/[^0-9]/g, ""));
                  checkCorrectHour(parseInt(text));
                }}
                keyboardType="numeric"
                maxLength={2}
                selectTextOnFocus
              />
            </View>
            <TouchableOpacity
              style={{ alignItems: "center", paddingTop: 2 }}
              onPress={() => decrementTime()}
            >
              <AntDesign name="caretdown" size={24} color={colors.mediumGray} />
            </TouchableOpacity>
          </View>
          <Text
            style={{ color: colors.darkGray, fontWeight: "bold", fontSize: 25 }}
          >
            :
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => incrementMin()}
              style={{ alignItems: "center", paddingBottom: 2 }}
            >
              <AntDesign name="caretup" size={24} color={colors.mediumGray} />
            </TouchableOpacity>
            <View style={styles.timeView}>
              <TextInput
                placeholder="MM"
                value={extraMValue}
                style={styles.timeValue}
                onChangeText={text => {
                  setExtraMValue(text.replace(/[^0-9]/g, ""));
                  checkCorrectMin(text);
                }}
                keyboardType="numeric"
                maxLength={2}
                selectTextOnFocus
              />
            </View>
            <TouchableOpacity
              style={{ alignItems: "center", paddingTop: 2 }}
              onPress={() => decrementMin()}
            >
              <AntDesign name="caretdown" size={24} color={colors.mediumGray} />
            </TouchableOpacity>
          </View>
          <Wheel
            style={{ height: "100%", width: 80 }}
            itemStyle={{
              textAlign: "center",
              fontWeight: "bold",
              color: colors.darkGray,
              fontSize: 18,
            }}
            items={["AM", "PM"]}
            index={timeZoneValue}
            onChange={index => {
              setWheelValue(index);
            }}
            holeStyle={{ height: 40 }}
            // defaultIndex={0}
          />
        </View>
      </View>

      {rCheckTime ? (
        <Text style={{ color: "red", marginTop: 20 }}>
          * Your pickup time should be 2 hours after the current time.
        </Text>
      ) : (
        <Text style={{ height: 60 }}></Text>
      )}

      <View
        style={{
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            decrementDate();
          }}
        >
          <AntDesign name="left" size={18} color={colors.darkGray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Text style={{ fontSize: 16, color: colors.darkGray }}>{rDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => incrementDate()}>
          <AntDesign name="right" size={18} color={colors.darkGray} />
        </TouchableOpacity>
      </View>
      <ThinRowSeperator />
      <View
        style={{
          height: 80,
          width: "100%",
          paddingVertical: 15,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: "100%",
            justifyContent: "center",
            backgroundColor: colors.green,
          }}
          onPress={() => {
            if (
              rCheckTime === true ||
              extraHValue === "" ||
              extraMValue === ""
            ) {
              alertMessage();
            } else {
              let d = new Date();
              d.setHours(extraHValue);
              d.setMinutes(extraMValue);
              setRSelectCurTime(
                format(d, "hh") + ":" + format(d, "mm") + " " + zone
              );
              setRCurDate(rDate);
              setRCalenSelDate(format(new Date(rPlusDate), "yyyy-MM-dd"));
              rSetDateSelectValue(rPlusDate);
              setRSelectCurCondition(true);
              onClose();
            }
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
      {/* ref area */}
      <RBSheet ref={refRBSheet} height={465}>
        <ReturnCalendar
          onClose={() => {
            refRBSheet.current.close();
          }}
        />
      </RBSheet>
      {/* ref area */}
    </View>
  );
};
const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  subText: {
    fontSize: 14,
    color: colors.mediumGray,
  },

  timeValue: {
    fontWeight: "bold",
    color: colors.darkGray,
    fontSize: 30,
    textAlign: "center",
  },
  timeView: {
    width: 90,
    height: "80%",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 15,
  },
});
