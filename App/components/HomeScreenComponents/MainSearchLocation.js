import React, { useContext, useRef, useEffect, useState } from "react";
// import { Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
  StatusBar,
  Text,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";

import colors from "../../constants/colors";
import { AntDesign, Entypo, Octicons, Feather } from "@expo/vector-icons";
import { ConventionContex } from "../../config/ConventionContex";
import { PickUpLocation } from "./PickUpLocation";
import { da } from "date-fns/locale";

export const MainSearchLocation = ({ navigation, route = {} }) => {
  const {
    setDropOffLocation,
    setDropDownLt,
    setDropDownLg,
    pickUpLt,
    setStates,
    setPickUpLocation,
    setPickUpLt,
    setPickUpLg,
    dropDownLg,
    dropOffLocation,
    pickUpLocation,
    pickUpStates,
  } = useContext(ConventionContex);

  const destination = useRef(null);
  const pickUp = useRef(null);
  const [pickUpValue, setPickUpValue] = useState("");
  const [pickUpValueIsEmpty, setPickUpValueIsEmpty] = useState();

  const [destinationValue, setDestinationValue] = useState("");
  const [destinationValueIsEmty, setDestinationValueIsEmpty] = useState();

  const bgClose = pickUpValueIsEmpty ? colors.mediumGray : "white";
  const dDgClose = destinationValueIsEmty ? colors.mediumGray : "white";
  const [val, setVal] = useState(false);
  useEffect(() => {
    if (pickUpStates === true) {
      pickUp.current?.focus();
      setPickUpValueIsEmpty(false);

      if (pickUp.current?.isFocused()) {
        setVal(true);
      }
    } else {
      destination.current?.focus();
      setDestinationValueIsEmpty(false);
    }
    if (pickUpLocation === "Enter pick-up Location") {
      setPickUpValue("");
      setPickUpValueIsEmpty(false);
    } else {
      setPickUpValue(pickUpLocation);
    }

    if (dropOffLocation === "Enter Destination") {
      setDestinationValue("");
      setDestinationValueIsEmpty(false);
    } else {
      setDestinationValue(dropOffLocation);
    }
  }, []);

  const checkPickUp = text => {
    if (text.length > 0) {
      setPickUpValueIsEmpty(true);
    } else {
      setPickUpValueIsEmpty(false);
    }
  };

  const checkDestination = text => {
    if (text.length > 0) {
      setDestinationValueIsEmpty(true);
    } else {
      setDestinationValueIsEmpty(false);
    }
  };
  const clearText = () => {
    setPickUpValue("");
    setPickUpValueIsEmpty(false);
  };

  const clearTextDestination = () => {
    setDestinationValue("");
    setDestinationValueIsEmpty(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 7,
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.green} />
      <View
        style={{
          height: 25,
          width: "93%",
          borderColor: colors.green,
          borderLeftWidth: 1,
          position: "absolute",
          top: 58,
          left: 24,
          zIndex: 10,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.green,
            height: 5,
            // borderBottomWidth: 10,
            width: "92%",
            marginLeft: 31,
            // marginTop:11
          }}
        ></View>
      </View>
      <GooglePlacesAutocomplete
        ref={pickUp}
        placeholder="Enter pick-up Location"
        minLength={1} // minimum length of text to search
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        // enablePoweredByContainer={false}
        renderDescription={row => row.description} // custom description render
        renderRow={row => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={{ fontWeight: "bold", paddingLeft: 15 }}>
              {row.description}
            </Text>
          </View>
        )}
        onPress={(data, details = null) => {
          if (dropDownLg !== 0) {
            setStates(true);
          }

          setPickUpLocation(data.description);
          setPickUpValue(data.description);
          setPickUpLt(details.geometry.location.lat);
          setPickUpLg(details.geometry.location.lng);
          destination.current.focus();
          if (dropOffLocation !== "Enter Destination") {
            navigation.pop();
          }
        }}
        textInputProps={{
          value: pickUpValue,
          onChangeText: text => {
            setPickUpValue(text), checkPickUp(text);
          },
          onFocus: () => {
            setDestinationValueIsEmpty(false);
            if (
              PickUpLocation !== "Enter pick-up Location" &&
              pickUpValue.length !== 0
            ) {
              setPickUpValueIsEmpty(true);
            }
          },
          // autoFocus: true,
          selectTextOnFocus: val,
          // clearTextOnFocus: true,
        }}
        renderHeaderComponent={() => (
          <Text style={styles.suggestions}>Suggestions</Text>
        )}
        renderLeftButton={() => (
          <Feather
            name="circle"
            size={14}
            color={colors.green}
            style={{ marginRight: 14, marginTop: 16 }}
          />
        )}
        renderRightButton={() => (
          <TouchableOpacity onPress={() => clearText()}>
            <AntDesign
              name="closecircleo"
              size={15}
              color={bgClose}
              style={{ marginRight: 14, marginTop: 13 }}
            />
          </TouchableOpacity>
        )}
        getDefaultValue={() => {
          return ""; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          // key: 'AIzaSyBGgQbM1aiXjCib1UjcCFCrdArMn9y2hdU',//mykey
          // key: 'AIzaSyCUQoLbBsZz1WWOIQKro8Kx8rzZuZyRPyo',//google sample key
          key: "AIzaSyBpbh2v6y2ko2ncF9v8dddBfxkxXvAwosg",
          language: "en", // language of the results
          components: "country:lk",
          // types: '(cities)' //that work get only city
        }}
        styles={{
          description: {
            fontWeight: "bold",
            zIndex: 5,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
          textInput: {
            // borderWidth: 1,
            // borderRadius: 8,
            // paddingLeft: 30,
          },
          textInputContainer: {
            height: 120,
            paddingLeft: 10,
            backgroundColor: colors.white,
            paddingVertical: 12,
            paddingRight: 10,
            // borderRadius: 15,
            borderWidth: 1,
            borderColor: colors.green,
          },
          poweredContainer: {
            justifyContent: "center",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#c8c7cc",
            borderTopWidth: 0.5,
          },
          powered: {
            tintColor: colors.green,
          },
          separator: {
            height: 0.8,
            backgroundColor: "#c8c7cc",
          },
        }}
        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",

          // types: 'airport'
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3",
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200}
      />

      <GooglePlacesAutocomplete
        ref={destination}
        placeholder="Enter Destination"
        minLength={1} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        // enablePoweredByContainer={false}
        renderDescription={row => row.description} // custom description render
        renderRow={(row, details) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={{ fontWeight: "bold", paddingLeft: 15 }}>
              {row.description}
            </Text>
          </View>
        )}
        onPress={(data, details = null) => {
          if (pickUpLt !== 0) {
            setStates(true);
          }
          setDropOffLocation(data.description);
          setDropDownLt(details.geometry.location.lat);
          setDropDownLg(details.geometry.location.lng);
          setDestinationValue(data.description);
          if (pickUpLocation !== "Enter pick-up Location") {
            navigation.pop();
          }
        }}
        textInputProps={{
          value: destinationValue,
          onChangeText: text => {
            setDestinationValue(text), checkDestination(text);
          },
          onFocus: () => {
            setPickUpValueIsEmpty(false);
            if (
              dropOffLocation !== "Enter Destination" &&
              destinationValue.length !== 0
            ) {
              setDestinationValueIsEmpty(true);
            }
          },
          // clearTextOnFocus: true,
        }}
        renderHeaderComponent={() => (
          <Text style={styles.suggestions}>Suggestions</Text>
        )}
        renderLeftButton={() => (
          <Feather
            name="circle"
            size={14}
            color={colors.green}
            style={{ marginRight: 14, marginTop: 13 }}
          />
        )}
        renderRightButton={() => (
          <TouchableOpacity onPress={() => clearTextDestination()}>
            <AntDesign
              name="closecircleo"
              size={15}
              color={dDgClose}
              style={{ marginRight: 14, marginTop: 13 }}
            />
          </TouchableOpacity>
        )}
        getDefaultValue={() => {
          return ""; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          // key: 'AIzaSyBGgQbM1aiXjCib1UjcCFCrdArMn9y2hdU',//mykey
          // key: 'AIzaSyCUQoLbBsZz1WWOIQKro8Kx8rzZuZyRPyo',//google sample key
          key: "AIzaSyBpbh2v6y2ko2ncF9v8dddBfxkxXvAwosg",
          language: "en", // language of the results
          components: "country:lk",
          // types: '(cities)' //that work get only city
        }}
        styles={{
          description: {
            fontWeight: "bold",
            zIndex: 5,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
          textInput: {
            // borderWidth: 1,
            borderRadius: 8,
            // paddingLeft: 30,
          },
          textInputContainer: {
            // borderWidth: 1,
            height: 57,
            paddingLeft: 18,
            // backgroundColor: colors.green,

            paddingRight: 4,
          },
          poweredContainer: {
            justifyContent: "center",
            alignItems: "center",
            borderBottomRightRadius: 5,
            borderBottomLeftRadius: 5,
            borderColor: "#c8c7cc",
            borderTopWidth: 0.5,
          },
          powered: {
            tintColor: colors.green,
          },
          separator: {
            height: 0.8,
            backgroundColor: "#c8c7cc",
          },
          container: {
            position: "absolute",
            width: "100%",
            top: 74,
          },
        }}
        //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",

          // types: 'airport'
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3",
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    left: 10,
    top: 25,
  },
  suggestions: {
    color: colors.mediumGray,
    padding: 10,
    fontSize: 12,
  },
});
