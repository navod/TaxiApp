import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import colors from "../../constants/colors";
import { ConventionContex } from "../../config/ConventionContex";
import RBSheet from "react-native-raw-bottom-sheet";

export const ReturnCalendar = ({ onClose }) => {
  const [disableDate, setDisableDate] = useState();
  const [arrowEnabled, setArrowEnabled] = useState(true);

  const [localDate, setLocalDate] = useState();

  useEffect(() => {
    const tomorrow = new Date(rCalendarSelectDate);
    setDisableDate(tomorrow.setDate(tomorrow.getDate() - 1));

    setLocalDate(rCalendarSelectDate);
  }, []);

  const setDayPress = date => {
    setLocalDate(date.dateString);
  };

  const { rCalendarSelectDate, setRDate, setRPlusDate, setRCalenSelDate } =
    useContext(ConventionContex);

  return (
    <View>
      <View>
        <Calendar
          style={{ height: 400 }}
          // Collection of dates that have to be colored in a special way. Default = {}
          markedDates={{
            [localDate]: {
              selected: true,
              selectedColor: colors.green,
              customStyles: {
                container: {
                  elevation: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  marginTop: -4,
                },
                text: {
                  marginTop: 8,
                },
              },
            },
          }}
          // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
          markingType={"custom"}
          pastScrollRange={0}
          futureScrollRange={12}
          minDate={[disableDate]}
          theme={{
            textDayHeaderFontWeight: "bold",
            arrowColor: colors.green,
            disabledArrowColor: "white",
            textMonthFontSize: 18,
            textMonthFontWeight: "bold",
            "stylesheet.calendar.header": {
              week: {
                marginTop: 20,
                marginHorizontal: 12,
                flexDirection: "row",
                justifyContent: "space-between",
              },
              dayHeader: {
                marginTop: 2,
                marginBottom: 7,
                width: 32,
                textAlign: "center",

                color: colors.mediumGray,
              },
            },
            arrowStyle: {
              marginTop: 10,
            },
          }}
          onPressArrowRight={addMonth => {
            addMonth();
            setArrowEnabled(false);
          }}
          disableArrowLeft={arrowEnabled}
          onDayPress={day => setDayPress(day)}
          onMonthChange={month => {
            const x = format(new Date(), "M");
            if (x >= month.month) {
              setArrowEnabled(true);
            } else {
              setArrowEnabled(false);
            }
          }}
        />
      </View>
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 20,
          height: 65,
          width: screen.width,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: colors.green,
          }}
          onPress={() => {
            // console.log(date);
            setRDate(format(new Date(localDate), "EEE dd MMM"));
            setRPlusDate(new Date(localDate));
            setRCalenSelDate(format(new Date(localDate), "yyyy-MM-dd"));
            onClose();
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Select date
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screen = Dimensions.get("screen");
