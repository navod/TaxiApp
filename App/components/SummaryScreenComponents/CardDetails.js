// used npms => for the card crud operations - https://www.npmjs.com/package/creditcardutils
//              to generate stripe card token - https://medium.com/@chukwudiezichi/generating-stripe-tokens-on-a-pure-expo-project-90d3aa96e94c
import React, { useState, useRef, useContext } from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ConventionContex } from "../../config/ConventionContex";
import colors from "../../constants/colors";

var stripe = require("stripe-client")(
  "sk_test_51IaaWXGRc0AJDnWGpsqmDcLJHfedWdogiY5h7qpwUUQNI1X2cO1ffUR8ogCpp4sPRBRCINQp80grBPRl6OMbsTdv00F3b9v8Hr"
);
var creditcardutils = require("creditcardutils");

export default function App({ navigation }) {
  const { setCreditCardNumber, setSelectCash, setCardSelect } =
    useContext(ConventionContex);

  const inputMonth = useRef(null);
  const inputCVV = useRef(null);
  const inputCardHolder = useRef(null);
  const inputYear = useRef(null);

  const [cardNumber, setCardNumber] = useState();
  const [expMonth, setExpMonth] = useState();
  const [cvv, setCVV] = useState();
  const [year, setYear] = useState();

  const [cardType, setCardType] = useState();
  const [stripeMonth, setStripeMonth] = useState();
  const [stripeDate, setStripeDate] = useState();

  const [index, setIndex] = useState(0);

  const [isCardNumber, setISCardNumber] = useState(true);
  const [isMonthValid, setIsMonthValid] = useState(true);
  const [isCVVValid, setIsCVVValid] = useState(true);

  let cardNumberBC = isCardNumber ? "white" : "red";
  let cardNumberBW = isCardNumber ? 0 : 1;
  let cardNumberFC = isCardNumber ? "black" : "red";

  let monthBC = isMonthValid ? "white" : "red";
  let monthBW = isMonthValid ? 0 : 1;
  let monthFC = isMonthValid ? "black" : "red";

  let cvvBC = isCVVValid ? "white" : "red";
  let cvvBW = isCVVValid ? 0 : 1;
  let cvvFC = isCVVValid ? "black" : "red";

  let expMonthBC = expMonth > 12 ? "red" : "white";
  let expMonthFC = expMonth > 12 ? "red" : "black";

  const images = [
    require("../../assets/images/icons/creditcards/cardwatemark.png"),
    require("../../assets/images/icons/creditcards/visa.png"),
    require("../../assets/images/icons/creditcards/mastercard.png"),
    require("../../assets/images/icons/creditcards/americanexpress.png"),
    require("../../assets/images/icons/creditcards/discover.png"),
    require("../../assets/images/icons/creditcards/discoverclub.png"),
    require("../../assets/images/icons/creditcards/jcb.png"),
    require("../../assets/images/icons/creditcards/unionpay.png"),
  ];
  const _handleCardNumber = cNO => {
    setCardNumber(
      cNO
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    );
  };

  const _checkCardLength = cn => {
    if (cn.length === 19) {
      inputMonth.current.focus();
      const states = creditcardutils.validateCardNumber(cn);
      setISCardNumber(states);
    }

    if (cn.length === 4) {
      const cT = creditcardutils.parseCardType(cn);
      console.log(cT);
      if (cT == "visa") {
        setIndex(1);
        setCardType("visa");
      }
      if (cT == "mastercard") {
        setIndex(2);
        setCardType("mastercard");
      }
      if (cT == "amex") {
        setIndex(3);
        setCardType("amex");
      }

      if (cT == "discover") {
        setIndex(4);
        setCardType("discover");
      }

      if (cT == "dinersclub") {
        setIndex(5);
        setCardType("dinersclub");
      }

      if (cT == "jcb") {
        setIndex(6);
        setCardType("jcb");
      }

      if (cT == "unionpay") {
        setIndex(7);
        setCardType("unionpay");
      }
    }
    if (cn.length === 0) {
      setIndex(0);
    }
  };

  const _handlingCardExpiryMoth = text => {
    setExpMonth(text);
    if (text <= 12) {
      if (text.length === 2) {
        inputYear.current.focus();
      }
    }
    if (year !== null) {
      const condition = creditcardutils.validateCardExpiry(text, year);
      setIsMonthValid(condition);
    }
  };

  const _checkCardDateExp = (y, m) => {
    // console.log(y);
    // console.log(m);
    // const d1 = dt.split("/");
    const condition = creditcardutils.validateCardExpiry(m, y);
    // console.log("date", condition);
    setIsMonthValid(condition);
    if (y.length === 2) {
      if (condition === true) {
        setStripeDate(m);
        setStripeMonth(y);
        inputCVV.current.focus();
      }
    }
  };

  const _handleCVVEXpiry = valCVV => {
    if (valCVV.length === 3) {
      const condition = creditcardutils.validateCardCVC(valCVV);
      setIsCVVValid(condition);
      inputCardHolder.current.focus();
    }
  };

  const btnPress = () => {
    if (
      isCardNumber === true &&
      isMonthValid === true &&
      isMonthValid === true
    ) {
      onProcessPayment();
    } else {
      alert("Invalid card details");
    }
  };

  async function onProcessPayment() {
    let information = {
      card: {
        number: cardNumber,
        exp_month: stripeDate,
        exp_year: stripeMonth,
        cvc: cvv,
        name: cardType,
      },
    };

    var card = await stripe.createToken(information);
    // console.log(card);
    if (!card.error) {
      var token = card.id;
      console.log("token", token);
      alert(`Token: ${token}`);
      let hideCard = cardHide(cardNumber);
      setCreditCardNumber(hideCard);
      setCardSelect(true);
      setSelectCash(false);
      navigation.pop();
    } else {
      alert(`Error: ${card.error.code}`);
    }
  }

  const cardHide = card => {
    let hideNum = [];
    for (let i = 0; i < card.length; i++) {
      if (i < card.length - 4) {
        hideNum.push("*");
      } else {
        hideNum.push(card[i]);
      }
    }
    return hideNum.join("");
  };
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.headerText}>Add new card</Text>
          <TouchableOpacity>
            {/* <Ionicons name="close" size={40} color={colors.darkGray} /> */}
          </TouchableOpacity>
        </View>
        {/* <RowSeperator /> */}
        <View>
          <TextInput
            placeholder="Card Number"
            style={[
              styles.textInput,
              {
                borderWidth: cardNumberBW,
                borderColor: cardNumberBC,
                color: cardNumberFC,
              },
            ]}
            keyboardType="numeric"
            onChangeText={cardNumber => {
              _handleCardNumber(cardNumber);
              _checkCardLength(cardNumber);
            }}
            value={cardNumber}
            maxLength={19}
            autoFocus={true}
          />
          <View style={{ elevation: 8 }}>
            <Image style={styles.cardImg} source={images[index]} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            // width: Dimensions.get("screen").width / 2 - 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={[
              styles.textInput,
              {
                width: "45%",
                borderColor: monthBC,
                borderWidth: monthBW,
                padding: 0,
                flexDirection: "row",
                paddingLeft: 0,
              },
            ]}
          >
            <TextInput
              style={[
                // styles.textInput,
                {
                  width: "32%",
                  borderWidth: 1,
                  marginTop: 0,
                  borderRadius: 15,
                  padding: 10,
                  borderColor: expMonthBC,
                  color: expMonthFC,
                },
              ]}
              placeholder="MM"
              ref={inputMonth}
              maxLength={2}
              keyboardType={"numeric"}
              onChangeText={expMonth => {
                _handlingCardExpiryMoth(expMonth);
              }}
              value={expMonth}
            />
            <Text
              style={[
                // styles.textInput,
                {
                  width: "20%",
                  // borderWidth: 1,
                  // marginTop: 0,
                  // textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 25,
                  paddingLeft: 10,
                  paddingTop: 5,
                  color: "gray",
                },
              ]}
            >
              /
            </Text>
            <TextInput
              style={[
                {
                  width: "50%",
                  color: monthFC,
                  marginTop: 0,
                  borderRadius: 15,
                  paddingLeft: 10,
                },
              ]}
              placeholder="YY"
              ref={inputYear}
              onChangeText={year => {
                setYear(year);
                _checkCardDateExp(year, expMonth);
              }}
              keyboardType="numeric"
              maxLength={2}
              value={year}
            />
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                width: "45%",
                borderColor: cvvBC,
                borderWidth: cvvBW,
                color: cvvFC,
              },
            ]}
            onChangeText={cvv => {
              setCVV(cvv);
              _handleCVVEXpiry(cvv);
            }}
            maxLength={3}
            value={cvv}
            placeholder="CVV"
            keyboardType="numeric"
            ref={inputCVV}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Card Holder Name"
          ref={inputCardHolder}
        />
        <TouchableOpacity style={styles.btn} onPress={() => btnPress()}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: screen.height,
    width: screen.width,
  },
  textInput: {
    width: "100%",
    height: 50,

    borderRadius: 15,
    paddingLeft: 10,
    padding: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: colors.green,
    width: "100%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  cardImg: {
    position: "absolute",
    right: 5,
    width: 50,
    height: 50,
    bottom: 0.4,
  },
});
