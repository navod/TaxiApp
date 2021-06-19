import React, { createContext, useState, useEffect } from "react";
import { format } from "date-fns";

export const ConventionContex = createContext();

export const ConventionContexProvider = ({ children }) => {
  const [text, setText] = useState("Hello taxi");
  const [pickUpLocation, setPickUpLocation] = useState(
    "Enter pick-up Location"
  );
  const [dropOffLocation, setDropOffLocation] = useState("Enter Destination");

  const [pickUpLt, setPickUpLt] = useState(0);
  const [pickUpLg, setPickUpLg] = useState(0);
  const [dropDownLt, setDropDownLt] = useState(0);
  const [dropDownLg, setDropDownLg] = useState(0);
  const [states, setStates] = useState(false);
  const [curDate, setCurDate] = useState();
  const [plusDate, setPlusDate] = useState();
  const [aboutTime, setAboutTime] = useState();
  const [calendarSelectDate, setCalendarSelectDate] = useState();
  const [curTime, setCurTime] = useState();
  const [chcekTime, setCheckTime] = useState(false);
  const [date, setDate] = useState();
  const [selectCurTime, setSelectCurTime] = useState();
  const [selectCurCondtion, setSelectCurCondition] = useState(false);
  const [timeStamp, setTimeStamp] = useState(format(new Date(), "T"));
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [cashSelect, setSelectCash] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [carName, setCarName] = useState("");
  const [pickUpStates, setPickStates] = useState(false);
  const [mobileNoStates, setMobileNoStates] = useState(true);
  const [price, setPrice] = useState();
  const [dateSelectValue, setDateSelectValue] = useState();
  const [durationTime, setDurationTime] = useState();

  // using return dates
  const [rCalendarSelectDate, setRCalenSelDate] = useState();
  const [rDate, setRDate] = useState();
  const [rPlusDate, setRPlusDate] = useState();

  const [rCurDate, setRCurDate] = useState();
  const [rCheckTime, setRCheckTime] = useState();
  const [rSelectCurCondition, setRSelectCurCondition] = useState(false);
  const [rSelectCurTime, setRSelectCurTime] = useState();
  const [rDateSelectValue, rSetDateSelectValue] = useState();

  // using return dates
  useEffect(() => {
    const dateObj = new Date();
    const HOUR_2_VALUE = dateObj.setHours(dateObj.getHours() + 2);
    const MINUTE_2_VALUE = dateObj.getMinutes();
    const CHECK_AM_PM = format(dateObj, "a");
    const time = format(new Date(), "hh");
    const timeCondtion = format(new Date(), "a");

    setCalendarSelectDate(format(dateObj, "yyyy-MM-dd"));
    setTimeStamp(format(dateObj, "T"));
    setPlusDate(dateObj);
    setCurDate(format(dateObj, "EEE dd MMM"));

    const dateObj2 = new Date();
    dateObj2.setHours(dateObj2.getHours() + 4);
    setRCalenSelDate(format(dateObj2, "yyyy-MM-dd"));
    setRPlusDate(dateObj2);
    setRCurDate(format(dateObj2, "EEE dd MMM"));
    // setCurTime(format(dateObj,"hh")+ format(dateObj,"mm")+ format(dateObj,"a"))
  }, []);

  const contextValue = {
    text,
    pickUpLocation,
    dropOffLocation,
    pickUpLt,
    pickUpLg,
    dropDownLt,
    dropDownLg,
    states,
    curDate,
    plusDate,
    aboutTime,
    calendarSelectDate,
    curTime,
    chcekTime,
    date,
    selectCurTime,
    selectCurCondtion,
    timeStamp,
    creditCardNumber,
    cashSelect,
    cardSelect,
    pickUpStates,
    carName,
    mobileNoStates,
    price,
    dateSelectValue,
    durationTime,
    // starting return values
    rCalendarSelectDate,
    rDate,
    rPlusDate,
    rCurDate,
    rCheckTime,
    rSelectCurCondition,
    rSelectCurTime,
    rDateSelectValue,
    setRCalenSelDate,
    setRDate,
    setRPlusDate,
    setRCurDate,
    setRCheckTime,
    setRSelectCurCondition,
    setRSelectCurTime,
    rSetDateSelectValue,
    // End return values
    setDurationTime,
    setDateSelectValue,
    setPrice,
    setMobileNoStates,
    setCarName,
    setPickStates,
    setCardSelect,
    setSelectCash,
    setCreditCardNumber,
    setTimeStamp,
    setSelectCurCondition,
    setSelectCurTime,
    setDate,
    setCheckTime,
    setCurTime,
    setCalendarSelectDate,
    setAboutTime,
    setPlusDate,
    setCurDate,
    setStates,
    setPickUpLt,
    setPickUpLg,
    setDropDownLt,
    setDropDownLg,
    setPickUpLocation,
    setDropOffLocation,
    setText,
  };
  return (
    <ConventionContex.Provider value={contextValue}>
      {children}
    </ConventionContex.Provider>
  );
};
