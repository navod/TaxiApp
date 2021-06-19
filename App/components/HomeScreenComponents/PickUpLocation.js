import React, { useContext } from "react";
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
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ConventionContex } from "../../config/ConventionContex";

export const PickUpLocation = ({ navigation, route = {} }) => {
  const params = route.params || {};
  // const [place,setPlace] = useState();
  const {
    setPickUpLocation,
    setPickUpLt,
    setPickUpLg,
    setStates,
    pickUpLt,
    dropDownLg,
    pickUpLocation,
    
  } = useContext(ConventionContex);

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search Your PickUp Location"
        minLength={1} // minimum length of text to search
        autoFocus={false}
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
          // console.log("data", data);
          // console.log("xxx", details.geometry.location.lat);
          // setMapLatitude(details.geometry.location.lat);
          // setMapLongitude(details.geometry.location.lng);
          if (dropDownLg !== 0) {
            setStates(true);
          }
          setPickUpLocation(data.description);
          setPickUpLt(details.geometry.location.lat);
          setPickUpLg(details.geometry.location.lng);
          //

          navigation.pop();
          navigation.push("DropOffLocation");
          // console.log('hello', data.description);//get select palace
          // navigation.pop();
        }}
        renderHeaderComponent={() => (
          <Text style={styles.suggestions}>Suggestions</Text>
        )}
        renderLeftButton={() => (
          <TouchableOpacity style={styles.btn}>
            <AntDesign name="arrowleft" size={30} color="white" />
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
            borderRadius: 45,
            paddingLeft: 30,
          },
          textInputContainer: {
            // borderWidth: 1,
            height: 80,
            paddingLeft: 50,
            backgroundColor: colors.green,
            paddingVertical: 17,
            paddingRight: 10,
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
