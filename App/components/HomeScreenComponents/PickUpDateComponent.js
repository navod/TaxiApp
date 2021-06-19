import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityBase,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { ConventionContex } from "../../config/ConventionContex";
import colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { ThinRowSeperator } from "../Seperators";
import { format, parse } from "date-fns";
import RBSheet from "react-native-raw-bottom-sheet";
import { Wheel } from "teaset";
import { CalendarComponent } from "./Calendar";
import moment from "moment";

export const PickUpDateComponent = () => {
  const {
    curDate,
    plusDate,
    setCurDate,
    setPlusDate,
    setCalendarSelectDate,
    chcekTime,
    setDate,
    date,
    setSelectCurCondition,
    selectCurTime,
    setSelectCurTime,
    timeStamp,
    setTimeStamp,
    calendarSelectDate,
    curTime,
    setCheckTime,
    dateSelectValue,
    setDateSelectValue,
    setRSelectCurCondition,
    setRCurDate,
    setRCalenSelDate,
    rSetDateSelectValue,
    setRPlusDate,
    setRSelectCurTime,
  } = useContext(ConventionContex);

  const refRBSheet = useRef();

  useEffect(() => {
    setDate(curDate);
    setCheckTime(false);
    if (selectCurTime === undefined) {
      setExtraMValue(format(dateObj, "mm"));
      setExtraHValue(format(HOUR_2_VALUE, "hh"));
      CHECK_AM_PM === "PM" ? setTimeZoneValue(1) : setTimeZoneValue(0);
    } else {
      let brokeValue = selectCurTime.split(":");
      let borkeValue2 = selectCurTime.split(" ");
      let borkeValue3 = brokeValue[1].split(" ");

      setExtraHValue(String(brokeValue[0]));
      setExtraMValue(String(borkeValue3[0]));
      setTimeZoneValue(borkeValue2[1] === "PM" ? 1 : 0);

      setPlusDate(dateSelectValue);
      setCalendarSelectDate(format(dateSelectValue, "yyyy-MM-dd"));
    }
  }, []);

  const [timeZoneValue, setTimeZoneValue] = useState();

  const [extraHValue, setExtraHValue] = useState();
  const [extraMValue, setExtraMValue] = useState();
  const dateObj = new Date();
  const HOUR_2_VALUE = dateObj.setHours(dateObj.getHours() + 2);
  const MINUTE_2_VALUE = dateObj.getMinutes();
  const CHECK_AM_PM = format(dateObj, "a");

  const zone = timeZoneValue === 1 ? "PM" : "AM";

  const incrementDate = () => {
    const today = plusDate;
    const tomorrow = new Date(today);
    const incementDate = tomorrow.setDate(tomorrow.getDate() + 1);
    setPlusDate(incementDate);
    setCalendarSelectDate(format(incementDate, "yyyy-MM-dd"));
    setDate(format(incementDate, "EEE dd MMM"));
    setCheckTime(false);
  };

  const decrementDate = () => {
    if (
      dateObj31.toLocaleDateString() < new Date(plusDate).toLocaleDateString()
    ) {
      const today = plusDate;
      const yesterday = new Date(today);
      const decrementDate = yesterday.setDate(yesterday.getDate() - 1);
      if (
        new Date(decrementDate).toLocaleDateString() ===
        dateObj31.toLocaleDateString()
      ) {
        checkCorrectTime();
      }
      setPlusDate(decrementDate);
      // setTimeStamp(decrementDate);
      setCalendarSelectDate(format(decrementDate, "yyyy-MM-dd"));
      setDate(format(decrementDate, "EEE dd MMM"));
    }
  };
  const checkCorrectTime = () => {
    let hour = extraHValue;
    let minute = extraMValue;
    let ampm = timeZoneValue === 1 ? "pm" : "am";

    let stTime =
      format(dateObj31, "hh") +
      ":" +
      format(dateObj31, "mm") +
      " " +
      format(dateObj31, "a");

    let edTime = hour + ":" + minute + " " + ampm;

    var startTime = moment(stTime, "HH:mm a");
    var endTime = moment(edTime, "HH:mm a");

    if (endTime.isBefore(startTime)) {
      setCheckTime(true);
    } else {
      setCheckTime(false);
    }
  };

  let dateObj31 = new Date();
  dateObj31.setHours(dateObj31.getHours() + 2);

  const checkCorrectHour = text => {
    if (text.length !== 0) {
      if (
        dateObj31.toLocaleDateString() >=
        new Date(plusDate).toLocaleDateString()
      ) {
        let hour = text;
        let minute = extraMValue;
        let ampm = timeZoneValue === 1 ? "pm" : "am";

        let stTime =
          format(dateObj31, "hh") +
          ":" +
          format(dateObj31, "mm") +
          " " +
          format(dateObj31, "a");

        let edTime = hour + ":" + minute + " " + ampm;

        var startTime = moment(stTime, "HH:mm a");
        var endTime = moment(edTime, "HH:mm a");

        if (endTime.isBefore(startTime)) {
          setCheckTime(true);
        } else {
          setCheckTime(false);
        }
      }
    }
  };

  const checkCorrectMin = text => {
    if (text.length !== 0) {
      if (
        dateObj31.toLocaleDateString() >=
        new Date(plusDate).toLocaleDateString()
      ) {
        let hour = extraHValue;
        let minute = text;
        let ampm = timeZoneValue === 1 ? "pm" : "am";

        let stTime =
          format(dateObj31, "hh") +
          ":" +
          format(dateObj31, "mm") +
          " " +
          format(dateObj31, "a");

        let edTime = hour + ":" + minute + " " + ampm;

        var startTime = moment(stTime, "HH:mm a");
        var endTime = moment(edTime, "HH:mm a");

        if (endTime.isBefore(startTime)) {
          setCheckTime(true);
        } else {
          setCheckTime(false);
        }
      }
    }
  };

  const setWheelValue = index => {
    if (
      dateObj31.toLocaleDateString() >= new Date(plusDate).toLocaleDateString()
    ) {
      let hour = extraHValue;
      let minute = extraMValue;
      let ampm = index === 1 ? "pm" : "am";

      let stTime =
        format(dateObj31, "hh") +
        ":" +
        format(dateObj31, "mm") +
        " " +
        format(dateObj31, "a");

      let edTime = hour + ":" + minute + " " + ampm;

      var startTime = moment(stTime, "HH:mm a");
      var endTime = moment(edTime, "HH:mm a");

      if (endTime.isBefore(startTime)) {
        setCheckTime(true);
        setTimeZoneValue(index);
      } else {
        setCheckTime(false);
        setTimeZoneValue(index);
      }
    }
    setTimeZoneValue(index);
  };
  const alertMessage = () => {
    Alert.alert("Invalid entered", "Please add your pick up time correctly.", [
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
              setSelectCurCondition(false);
              Standard.close();
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

      {chcekTime ? (
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
          <Text style={{ fontSize: 16, color: colors.darkGray }}>{date}</Text>
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
              chcekTime === true ||
              extraHValue === "" ||
              extraMValue === ""
            ) {
              alertMessage();
            } else {
              let d = new Date();
              d.setHours(extraHValue);
              d.setMinutes(extraMValue);
              setSelectCurTime(
                format(d, "hh") + ":" + format(d, "mm") + " " + zone
              );
              setCurDate(date);
              setCalendarSelectDate(format(new Date(plusDate), "yyyy-MM-dd"));
              setDateSelectValue(plusDate);
              setSelectCurCondition(true);
              setRSelectCurCondition(false);

              // ---------------------return set daata----------------------

              let d1 = new Date();

              if (format(d1, "a") === "PM") {
                if (zone === "AM") {
                  let d2 = new Date(calendarSelectDate);
                  if (parseInt(extraHValue) === 12) {
                    d2.setHours(parseInt(extraHValue) + 2 - 12);
                  } else {
                    d2.setHours(parseInt(extraHValue) + 2 - 12 + 12);
                  }
                  d2.setMinutes(extraMValue);
                  setRSelectCurTime(
                    format(d2, "hh") +
                      ":" +
                      format(d2, "mm") +
                      " " +
                      format(d2, "a")
                  );
                  console.log(format(d2, "a"), "SS");
                  setRCurDate(format(d2, "EEE dd MMM"));
                  setRCalenSelDate(format(d2, "yyyy-mm-dd"));
                  rSetDateSelectValue(d2);

                  setRPlusDate(d2);
                  Standard.close();
                } else {
                  let d2 = new Date(calendarSelectDate);
                  if (parseInt(extraHValue) === 12) {
                    d2.setHours(parseInt(extraHValue) + 2 - 12 + 12);
                  } else {
                    d2.setHours(parseInt(extraHValue) + 2 + 12);
                  }
                  d2.setMinutes(extraMValue);
                  setRSelectCurTime(
                    format(d2, "hh") +
                      ":" +
                      format(d2, "mm") +
                      " " +
                      format(d2, "a")
                  );
                  setRCurDate(format(d2, "EEE dd MMM"));
                  setRCalenSelDate(format(d2, "yyyy-mm-dd"));
                  rSetDateSelectValue(d2);
                  setRPlusDate(plusDate);
                  Standard.close();
                }
              } else {
                let d1 = new Date(calendarSelectDate);
                if (parseInt(extraHValue) === 12) {
                  d1.setHours(parseInt(extraHValue) + 2 - 12 + 12);
                } else {
                  d1.setHours(parseInt(extraHValue) + 2 + 12);
                }
                d1.setMinutes(extraMValue);
                setRSelectCurTime(
                  format(d1, "hh") +
                    ":" +
                    format(d1, "mm") +
                    " " +
                    format(d1, "a")
                );
                d1.setMinutes(extraMValue);
                setRCurDate(format(d1, "EEE dd MMM"));
                setRCalenSelDate(format(d1, "yyyy-mm-dd"));
                rSetDateSelectValue(plusDate);
                setRPlusDate(plusDate);
                Standard.close();
              }
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
        <CalendarComponent
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
