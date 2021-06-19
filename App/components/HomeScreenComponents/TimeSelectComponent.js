import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { ConventionContex } from "../../config/ConventionContex";
import colors from "../../constants/colors";
import { format, getHours, parse } from "date-fns";
import { Wheel } from "teaset";


export default TimeSelect = () => {
  const {
    setCheckTime,
    setSelectCurTime,
    selectCurTime,
  } = useContext(ConventionContex);

  const [timeZoneValue, setTimeZoneValue] = useState();

  const [extraHValue, setExtraHValue] = useState();
  const [extraMValue, setExtraMValue] = useState();

  const dateObj = new Date();
  const HOUR_2_VALUE = dateObj.setHours(dateObj.getHours() + 2);
  const MINUTE_2_VALUE = dateObj.getMinutes();
  const CHECK_AM_PM = format(dateObj, "a");

  useEffect(() => {
    setSelectCurTime(
      format(HOUR_2_VALUE, "hh") +
        ":" +
        format(dateObj, "mm") +
        " " +
        CHECK_AM_PM
    );

    if (selectCurTime === undefined) {
      setExtraMValue(format(dateObj, "mm"));
      setExtraHValue(format(HOUR_2_VALUE, "hh"));
    } else {
      let brokeValue = selectCurTime.split(":");
      let borkeValue2 = selectCurTime.split(" ");

      setExtraHValue(String(brokeValue[0]));
      setExtraMValue(String(brokeValue[1]));
      setTimeZoneValue(borkeValue2[1]);
    }

    CHECK_AM_PM === "PM" ? setTimeZoneValue(1) : setTimeZoneValue(0);

    console.log(selectCurTime);
  }, []);

  const setAnotherTimeData = date => {
    let getTime = date;
    let brokeTime = getTime.split(":");

    setExtraHValue(brokeTime[0]);
    setExtraMValue(brokeTime[1]);
    console.log(brokeTime[2]);
    if (brokeTime[2] === "PM") {
      setTimeZoneValue(1);
      // setCheckZoneValue("PM");
    } else {
      setTimeZoneValue(0);
      // setCheckZoneValue("AM");
    }
  };

  const checkCorrectHour = text => {
    console.log(selectCurTime);
    if (text.length !== 0) {
      if (parseInt(text) > 12) {
        setExtraHValue(format(HOUR_2_VALUE, "hh"));
      }
      if (CHECK_AM_PM === "PM") {
        let checkHour = new Date(dateObj);
        checkHour.setMinutes(extraMValue);

        if (parseInt(text) < 12) {
          checkHour.setHours(parseInt(text) + 12);
        } else if (parseInt(text) === 12) {
          checkHour.setHours(text);
        }

        console.log(checkHour.toTimeString());
        console.log(dateObj.toTimeString());

        if (checkHour.getTime() >= dateObj.getTime()) {
          setCheckTime(false);
          // return false;
        } else {
          setCheckTime(true);
          // return true;
        }
      } else {
        let checkHour = new Date(dateObj);
        checkHour.setHours(text);
        checkHour.setMinutes(extraMValue);

        if (dateObj.getHours() === 0 && parseInt(text) === 12) {
          if (checkHour.getMinutes() < dateObj.getMinutes()) {
            setTimeZoneValue(1);
          }
        } else if (checkHour.getTime() >= dateObj.getTime()) {
          setCheckTime(false);
        } else {
          setCheckTime(true);
        }
      }
    } else {
      setCheckTime(false);
    }
  };

  const checkCorrectMin = text => {
    if (text.length !== 0) {
      if (parseInt(text) > 59) {
        setExtraMValue(String(MINUTE_2_VALUE));
      }
      if (CHECK_AM_PM === "PM") {
        let checkHour = new Date();
        checkHour.setMinutes(text);
        if (parseInt(extraHValue) < 12) {
          checkHour.setHours(parseInt(extraHValue) + 12);
        } else if (parseInt(extraHValue) === 12) {
          checkHour.setHours(extraHValue);
        }

        if (checkHour.getTime() >= dateObj.getTime()) {
          setCheckTime(false);
        } else {
          setCheckTime(true);
        }
      } else {
        let checkHour = new Date(dateObj);
        checkHour.setMinutes(text);
        checkHour.setHours(extraHValue);

        if (dateObj.getHours() === 0 && parseInt(text) === 12) {
          if (checkHour.getMinutes() < dateObj.getMinutes()) {
            setTimeZoneValue(1);
          }
        } else if (checkHour.getTime() >= dateObj.getTime()) {
          setCheckTime(false);
        } else {
          setCheckTime(true);
        }
      }
    } else {
      setCheckTime(false);
    }
  };

  const setWheelValue = index => {
    let ampm = index === 1 ? "PM" : "AM";

    if (CHECK_AM_PM === "PM") {
      setTimeZoneValue(0);
      setTimeZoneValue(1);
      setSelectCurTime(extraHValue + ":" + extraMValue + " " + ampm);
    } else {
      let checkHour = new Date();
      checkHour.setHours(extraHValue);
      checkHour.setMinutes(extraMValue);
      setSelectCurTime(extraHValue + ":" + extraMValue + " " + ampm);
      if (dateObj.getHours() === 0) {
        if (checkHour.getHours() === 12) {
          if (checkHour.getMinutes() < dateObj.getMinutes()) {
            setTimeZoneValue(0);
            setTimeZoneValue(1);
            setSelectCurTime(extraHValue + ":" + extraMValue + " " + ampm);
          }
        }
      } else if (checkHour.getTime() <= dateObj.getTime()) {
        if (checkHour.getTime() === dateObj.getTime()) {
          if (checkHour.getMinutes() < dateObj.getMinutes()) {
            setTimeZoneValue(0);
            setTimeZoneValue(1);
            setSelectCurTime(extraHValue + ":" + extraMValue + " " + ampm);
          }
        }
      }
    }
  };
  return (
    <View
      style={{
        width: "100%",
        height: 120,
        borderWidth: 0.2,
        marginTop: 30,
        padding: 20,
        borderRadius: 8,
        borderColor: colors.mediumGray,
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
        <View style={styles.timeView}>
          <TextInput
            placeholder="HH"
            value={extraHValue}
            style={styles.timeValue}
            onChangeText={text => {
              setExtraHValue(text);
              checkCorrectHour(parseInt(text));
              setSelectCurTime(text + ":" + extraMValue + " " + CHECK_AM_PM);
            }}
            keyboardType="numeric"
            maxLength={2}
            selectTextOnFocus
          />
        </View>
        <Text
          style={{ color: colors.darkGray, fontWeight: "bold", fontSize: 25 }}
        >
          :
        </Text>
        <View style={styles.timeView}>
          <TextInput
            placeholder="MM"
            value={extraMValue}
            style={styles.timeValue}
            onChangeText={text => {
              setExtraMValue(text);
              checkCorrectMin(text);
              setSelectCurTime(extraHValue + ":" + text + " " + CHECK_AM_PM);
            }}
            keyboardType="numeric"
            maxLength={2}
            selectTextOnFocus
          />
        </View>
        {/* <Text
          style={{
            marginRight: 5,
            fontWeight: "bold",
            color: colors.darkGray,
            fontSize: 18,
          }}
        >
          {timeZoneValue}
        </Text> */}
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
          onChange={index => setWheelValue(index)}
          holeStyle={{ height: 40 }}
          // defaultIndex={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeValue: {
    fontWeight: "bold",
    color: colors.darkGray,
    fontSize: 30,
    textAlign: "center",
  },
  timeView: {
    width: 100,
    height: "100%",
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
