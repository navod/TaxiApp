import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { ConventionContex } from "../config/ConventionContex";
import colors from "../constants/colors";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
// https://dlpng.com/search?q=car+png
export default ({ navigation }) => {
  // const { text } = useContext(ConventionContex);
  // console.log(text);

  const { setPrice } = useContext(ConventionContex);

  const [car1States, setCar1States] = useState(false);
  const [car2States, setCar2States] = useState(false);
  const { carName, setCarName } = useContext(ConventionContex);

  let bw1 = car1States ? 2 : 0;
  let bw2 = car2States ? 2 : 0;

  useEffect(() => {
    if (carName !== "") {
      if (carName === "People carrier") {
        setCar2States(true);
        setCar1States(false);
      } else if (carName === "Standard") {
        setCar1States(true);
        setCar2States(false);
      }
    }
  }, []);
  const alertMessage = () =>
    Alert.alert(
      "No taxi selected",
      "Please add a taxi to confirm your booking.",
      [{ text: "OK" }]
    );
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.green} />
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={[styles.carContainer, { borderWidth: bw1 }]}
          onPress={() => {
            setCarName("Standard");
            setCar1States(true);
            setCar2States(false);
            setPrice("9500");
          }}
        >
          <View>
            <Image
              source={require("../assets/images/icons/car.png")}
              style={{ width: 60, height: 60 }}
            />
          </View>
          <View>
            <Text style={styles.headerText}>Standard</Text>
            <Text style={styles.headerText}>LKR 9500</Text>
          </View>
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 0.5,
              borderRadius: 1,
              width: "15%",
              borderColor: colors.darkGray,
            }}
          ></View>
          <View style={styles.tag}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="user" size={15} color={colors.darkGray} />
              <Text style={{ marginLeft: 5, color: colors.darkGray }}>
                Up to 3
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="bag-personal"
                size={15}
                color={colors.darkGray}
              />
              <Text style={{ marginLeft: 5, color: colors.darkGray }}>
                3 bags
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* second card container */}
        <TouchableOpacity
          style={[styles.carContainer, { borderWidth: bw2 }]}
          onPress={() => {
            setCarName("People carrier");
            setCar2States(true);
            setCar1States(false);
            setPrice("11500");
          }}
        >
          <View>
            <Image
              source={require("../assets/images/icons/car.png")}
              style={{ width: 60, height: 60 }}
            />
          </View>
          <View>
            <Text style={styles.headerText}>People carrier</Text>
            <Text style={styles.headerText}>LKR 11500</Text>
          </View>
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 0.5,
              borderRadius: 1,
              width: "15%",
              borderColor: colors.darkGray,
            }}
          ></View>
          <View style={styles.tag}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="user" size={15} color={colors.darkGray} />
              <Text style={{ marginLeft: 5, color: colors.darkGray }}>
                Up to 3
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="bag-personal"
                size={15}
                color={colors.darkGray}
              />
              <Text style={{ marginLeft: 5, color: colors.darkGray }}>
                3 bags
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* second card container */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (car1States !== false || car2States !== false) {
              navigation.push("SummaryScreen");
            } else {
              alertMessage();
            }
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            Book {carName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.green,

    justifyContent: "center",
    borderRadius: 8,
  },
  btnContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    borderTopWidth: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    paddingVertical: 10,
    borderColor: colors.lightGray,
  },
  carContainer: {
    width: "100%",
    height: 100,
    borderWidth: 2,
    borderColor: colors.green,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 15,
    padding: 10,
    justifyContent: "space-between",
  },
  headerText: {
    color: colors.darkGray,
    fontWeight: "bold",
    fontSize: 15,
  },
  tag: {
    backgroundColor: colors.lightGray,

    height: "85%",
    borderRadius: 15,
    padding: 10,
  },
});
