// MapViewDirections Error: Error on GMAPS route request: This API project is not authorized to use this API.

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import colors from "../constants/colors";
import MapView, { Marker } from "react-native-maps";
import { FindTaxiComponent } from "../components/HomeScreenComponents/FindTaxiComponent";
import MapViewDirections from "react-native-maps-directions";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Octicons } from "@expo/vector-icons";
import { ConventionContex } from "../config/ConventionContex";

const GOOGLE_MAPS_APIEKY = "AIzaSyBpbh2v6y2ko2ncF9v8dddBfxkxXvAwosg";
const { height, width } = Dimensions.get("screen");

export default ({ navigation }) => {
  const {
    pickUpLt,
    pickUpLg,
    dropDownLt,
    dropDownLg,
    states,
    setAboutTime,
    setDurationTime,
  } = useContext(ConventionContex);

  const coordinates = [
    {
      latitude: pickUpLt,
      longitude: pickUpLg,
    },
    {
      latitude: dropDownLt,
      longitude: dropDownLg,
    },
  ];

  useEffect(() => {
    if (screen.height <= 650) {
      setScreenHeight(screen.height / 4);
    } else if (screen.height >= 650 && screen.height < 900) {
      setScreenHeight(screen.height / 2.8);
    } else if (screen.height >= 900) {
      setScreenHeight(screen.height / 2.5);
    }
  }, []);

  const ASPECT_RATIO = width / height;
  const LATITUDE = pickUpLt;
  const LONGITUDE = pickUpLg;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [screenHeight, setScreenHeight] = useState(0.5);

  const timeConvert = n => {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);

    if (rhours === 0) {
      setAboutTime(rminutes + " minutes");
    } else {
      setAboutTime(rhours + " hours " + rminutes + " minutes");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.green} />

      {states ? (
        <MapView
          ref={c => (mapView = c)}
          style={{ height: screenHeight }}
          scrollEnabled={true}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          loadingEnabled={true}
        >
          <Marker
            coordinate={coordinates[0]}
            // image={require("../assets/images/icons/ping.png")}
          />
          <Marker coordinate={coordinates[1]} />

          {/* map direction eg : https://snack.expo.io/@awce/react-native-maps-directions
            enabled apis : locations api,places api, geocoording, geoLoaction
            use npm : [
              mapView : https://docs.expo.io/versions/latest/sdk/map-view/
              MapViewDirections : https://www.npmjs.com/package/react-native-maps-directions
            ]
          
        */}
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={GOOGLE_MAPS_APIEKY}
            strokeWidth={4}
            strokeColor={"#21C392"}
            onReady={result => {
              try {
                mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });

                // console.log(`Distance: ${result.distance} km`);
                timeConvert(result.duration);
                setDurationTime(result.duration);
              } catch (error) {
                console.log(error);
              }
            }}
            onError={errorMessage => {
              console.log(errorMessage);
            }}
          />
        </MapView>
      ) : (
        <Image
          style={[styles.image, { height: screenHeight }]}
          source={require("../assets/images/background.jpg")}
        />
      )}

      {/* 
slidingUpPane : [
  https://octopitus.github.io/rn-sliding-up-panel/
https://github.com/octopitus/rn-sliding-up-panel/blob/master/demo/BottomSheet.js
https://www.youtube.com/watch?v=c-w1ZKzVc0s&t=303s
]
e.g video : 
*/}
      {/* <View style={styles.panelHeader}>
              <Text style={{ color: "#FFF" }}>Bottom Sheet Peek</Text>
            </View> */}
      <View>
        <FindTaxiComponent navigate={navigation} />
      </View>
    </View>
  );
};
const screen = Dimensions.get("screen");
console.log(screen.height);
const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,
    // padding: 20,
    height: screen.height,
    backgroundColor: "white",
  },
  btn: {
    width: "100%",
    height: 55,
    backgroundColor: "blue",
  },

  image: {
    resizeMode: "repeat",
  },
});
