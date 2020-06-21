import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Stars from "react-native-stars";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../../constants/colors";
import Button from "../../components/Button";

const RestaurantFormScreen = (props) => {
  const [stars, setStars] = useState(4);
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [radius, setRadius] = useState(10);

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrMessage("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const { latitude, longitude } = location.coords;
    getGeocodeAsync({ latitude, longitude });
    setLocation({ latitude, longitude });
  };

  const getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location);
    setGeocode(geocode);
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  const pressStartHandler = () => {
    if (0 < radius && radius <= 25) {
      props.navigation.navigate("Restaurant Suggestion", {
        radius: radius,
        stars: stars,
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } else {
      Alert.alert("Invalid Radius", "choose radius between 1 to 25", [
        { text: "Okay!", style: "cancel" },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <View style={styles.screen}>
        <View style={styles.distance}>
          <TextInput
            value={radius}
            onChangeText={(value) => setRadius(value)}
            style={styles.distanceInput}
            placeholder="1 - 25"
            fontSize={33}
            keyboardType="number-pad"
            maxLength={2}
          ></TextInput>
          <Text style={styles.text}> miles from</Text>
        </View>
        <View style={styles.choices}>
          <Button style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              current location (
              {geocode
                ? `${geocode[0].city}, ${geocode[0].isoCountryCode}`
                : "Loading..."}
              )
            </Text>
          </Button>
          <Button style={styles.buttonContainer}>
            <Text style={styles.buttonText}>choose from map</Text>
          </Button>
        </View>
        <Text style={styles.text}>with</Text>
        <View style={styles.starContainer}>
          <Stars
            default={4}
            update={(val) => {
              setStars(val);
            }}
            spacing={8}
            starSize={40}
            count={5}
          ></Stars>
        </View>
        <Button style={styles.startButton} onPress={pressStartHandler}>
          <Text style={styles.startText}>START</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    // marginHorizontal: wp,
    marginVertical: hp(10),
    alignItems: "center",
  },
  distance: {
    flexDirection: "row",
  },
  text: {
    fontSize: 40,
    color: Colors.fontColor,
    fontWeight: "bold",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.fontColor,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
    width: 200,
    height: 50,
  },
  choices: {
    marginVertical: 10,
  },
  starContainer: {
    marginTop: 15,
    // alignItems: "center",
  },
  startButton: {
    marginTop: 60,
    alignItems: "center",
    width: 250,
    height: 55,
  },
  startText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.fontColor,
  },
  distanceInput: {
    width: 80,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.fontColor,
    backgroundColor: "transparent",
  },
});

export default RestaurantFormScreen;
