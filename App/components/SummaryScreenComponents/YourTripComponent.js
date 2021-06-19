import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
} from "react-native";

import { Feather, Fontisto, FontAwesome } from "@expo/vector-icons";
import { ThinRowSeperator } from "../Seperators";
import colors from "../../constants/colors";
import { ConventionContex } from "../../config/ConventionContex";
import format from "date-fns/format";

export const YourTripComponent = () => {
  const {
    aboutTime,
    dropOffLocation,
    pickUpLocation,
    curDate,
    selectCurTime,
    carName,
    durationTime,
    dateSelectValue,
  } = useContext(ConventionContex);
  const [timeVal, setTimeVal] = useState();
  const [dropOffTime, setDropOffTime] = useState();
  const [dropOffDate, setDropOffDate] = useState();
  useEffect(() => {
    if (selectCurTime === undefined) {
      const dateObj = new Date();
      const HOUR_2_VALUE = dateObj.setHours(dateObj.getHours() + 2);
      const MINUTE_2_VALUE = dateObj.getMinutes();
      const CHECK_AM_PM = format(dateObj, "a");

      setTimeVal(
        format(dateObj, "hh") + ":" + format(dateObj, "mm") + " " + CHECK_AM_PM
      );

      let timeDrop = new Date(dateSelectValue);
      if (format(timeDrop, "a") === "AM") {
        timeDrop.setHours(parseInt(format(dateObj, "hh")));
        timeDrop.setMinutes(
          parseInt(format(dateObj, "mm")) + parseInt(durationTime)
        );
        setDropOffTime(format(timeDrop, "hh:mm a"));
        setDropOffDate(format(timeDrop, "EEE dd MMM"));
      } else {
        timeDrop.setHours(parseInt(format(dateObj, "hh")) + 12);
        timeDrop.setMinutes(
          parseInt(format(dateObj, "mm")) + parseInt(durationTime)
        );
        setDropOffTime(format(timeDrop, "hh:mm a"));
        setDropOffDate(format(timeDrop, "EEE dd MMM"));
      }
    } else {
      let brokeValue = selectCurTime.split(":");
      let borkeValue2 = selectCurTime.split(" ");
      let borkeValue3 = brokeValue[1].split(" ");

      setTimeVal(brokeValue[0] + ":" + borkeValue3[0] + " " + borkeValue2[1]);
      let timeDrop = new Date(dateSelectValue);
      if (format(timeDrop, "a") === "PM") {
        if (borkeValue2[1] === "AM") {
          if (parseInt(brokeValue[0]) === 12) {
            timeDrop.setHours(parseInt(brokeValue[0]) - 12);
          } else {
            timeDrop.setHours(parseInt(brokeValue[0]));
          }
          timeDrop.setMinutes(
            parseInt(borkeValue3[0]) + parseInt(durationTime)
          );
          setDropOffTime(format(timeDrop, "hh:mm a"));
          setDropOffDate(format(timeDrop, "EEE dd MMM"));
        } else {
          if (parseInt(brokeValue[0]) === 12) {
            timeDrop.setHours(parseInt(brokeValue[0]));
          } else {
            timeDrop.setHours(parseInt(brokeValue[0]) + 12);
          }
          timeDrop.setMinutes(
            parseInt(borkeValue3[0]) + parseInt(durationTime)
          );
          setDropOffTime(format(timeDrop, "hh:mm a"));
          setDropOffDate(format(timeDrop, "EEE dd MMM"));
        }
      } else {
        if (borkeValue2[1] === "PM") {
          if (parseInt(brokeValue[0]) === 12) {
            timeDrop.setHours(parseInt(brokeValue[0]) + 12 - 12);
          } else {
            timeDrop.setHours(parseInt(brokeValue[0]) + 12);
          }

          timeDrop.setMinutes(
            parseInt(borkeValue3[0]) + parseInt(durationTime)
          );
          setDropOffTime(format(timeDrop, "hh:mm a"));
          setDropOffDate(format(timeDrop, "EEE dd MMM"));
        } else {
          if (parseInt(brokeValue[0]) === 12) {
            timeDrop.setHours(parseInt(brokeValue[0]) - 12);
          } else {
            timeDrop.setHours(parseInt(brokeValue[0]));
          }
          timeDrop.setMinutes(
            parseInt(borkeValue3[0]) + parseInt(durationTime)
          );
          setDropOffTime(format(timeDrop, "hh:mm a"));
          setDropOffDate(format(timeDrop, "EEE dd MMM"));
        }
      }
    }
  }, []);
  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.green} />
      <View style={{ padding: 20 }}>
        {/* start location details */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="circle" size={15} color={colors.darkGray} />
          <Text style={{ color: colors.darkGray, marginLeft: 30 }}>
            {curDate} - {timeVal}
          </Text>
        </View>
        <View style={styles.lineContext}>
          <Text style={styles.boldText}>{pickUpLocation}</Text>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 25,
              marginLeft: 40,
              color: colors.darkGray,
            }}
          >
            About {aboutTime}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Feather name="circle" size={15} color={colors.darkGray} />
          <Text style={{ color: colors.darkGray, marginLeft: 30 }}>
            {dropOffDate} - {dropOffTime}
          </Text>
        </View>
        <View style={[styles.lineContext, { borderLeftWidth: 0 }]}>
          <Text style={styles.boldText}>{dropOffLocation}</Text>
        </View>
        {/* end location details */}

        {/* start taxi details */}
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}
        >
          <Fontisto name="taxi" size={25} color={colors.darkGray} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // borderWidth: 1,
              width: "88%",
              marginLeft: 12,
              alignItems: "center",
            }}
          >
            <Text style={[styles.boldText, { marginLeft: 5 }]}>
              Your Taxi :
            </Text>
            <Text
              style={[
                styles.boldText,
                {
                  backgroundColor: colors.yellow,
                  padding: 7,
                  paddingLeft: 30,
                  paddingRight: 30,
                },
              ]}
            >
              {carName}
            </Text>
          </View>
        </View>
        <Text style={{ color: colors.darkGray, marginLeft: 55, marginTop: 20 }}>
          Up to 3 passengers / Up to 3 peace of hold luggage
        </Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <FontAwesome name="id-card" size={30} color={colors.darkGray} />
          <Text style={[styles.boldText, { marginLeft: 18 }]}>
            Taxi provided by Niyanthra Tours
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    padding: 10,
    color: colors.darkGray,
    fontWeight: "bold",
    fontSize: 20,
  },
  lineContext: {
    borderLeftWidth: 2,
    borderColor: colors.lightGray,
    marginLeft: 7,
    marginTop: 10,
  },
  boldText: {
    marginLeft: 40,
    fontSize: 15,
    color: colors.darkGray,
    fontWeight: "bold",
  },
});
