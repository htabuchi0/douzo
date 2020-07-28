import React, {
  useState,
  useEffect
} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import Stars from "react-native-stars";
import Emoji from "react-native-emoji";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../../constants/colors";
import Button from "../../components/Button";
import MultiChoice from "../../components/MultiChoice";

const RestaurantFormScreen = (props) => {
  const [stars, setStars] = useState(4);
  const [dollars, setDollars] = useState(4);
  const [location, setLocation] = useState(null);
  const [geocode, setGeocode] = useState(null);
  const [errMessage, setErrMessage] = useState("");
  const [radius, setRadius] = useState(10);
  const [categories, setCategories] = useState({});


  const dollarImage = require("../../assets/dollar.png");

  const categoryItems = {
    "japanese": "Japanese", 
    "chinese":"Chinese",
    "thai": "Thai",
    "tradamerican": "Traditional American",
    "mexican": "Mexican", 
    "italian": "Italian", 
    "vietnamese": "Vietnamese", 
    "breakfast_brunch": "Breakfast & Branch", 
    "desserts": "Desserts",
    "coffee": "Coffee",
}

  const getLocationAsync = async () => {
    let {
      status
    } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrMessage("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const {
      latitude,
      longitude
    } = location.coords;
    getGeocodeAsync({
      latitude,
      longitude
    });
    setLocation({
      latitude,
      longitude
    });
  };

  const getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location);
    setGeocode(geocode);
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    console.log("categories: ", categories);
  }, [categories])

  const pressStartHandler = () => {
    if (0 < radius && radius <= 25) {
      props.navigation.navigate("Restaurant Suggestion", {
        radius: radius,
        stars: stars,
        latitude: location.latitude,
        longitude: location.longitude,
        categories: categories,
      });
    } else {
      Alert.alert("Invalid Radius", "choose radius between 1 to 25", [{
        text: "Okay!",
        style: "cancel"
      }, ]);
    }
  };

  return ( 
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      <View style={styles.background} >
      <View style={styles.screen} > 
        <View style={{flexDirection: "row", marginVertical: hp(5), alignSelf: "center"}} >
          <Text style={styles.text}> I am feeling... </Text> 
          <Emoji name="thought_balloon" style={styles.emoji}/> 
        </View> 
        <View style={styles.starContainer}>
          <Emoji name="stew" style={styles.emoji}/> 
          <Text style={styles.text} >: </Text> 
          <MultiChoice items={categoryItems}
          setSelectedItems={setCategories}/> 
        </View> 
        <View style={styles.starContainer}>
          <Emoji name="female-judge" style={styles.emoji}/> 
          <Text style={styles.text} >: </Text> 
          <Stars default={4}
                  update={(val) => {setStars(val);}}
                  spacing={4}
                  starSize={40}
                  count={5} >
          </Stars> 
        </View > 
        <View style={styles.starContainer} >
          <Emoji name="moneybag" style={styles.emoji}/>
          <Text style={styles.text} >: </Text> 
          <Stars default={2} update={(val) => {setDollars(val)}} spacing={4} starSize={40} count={4}/>
        </View >
        <Button style={styles.startButton} onPress={pressStartHandler} >
          <Text style={styles.startText}>START</Text> 
        </Button > 
        <View style={styles.annotation}>
          <Text>*Based on your current location </Text> 
          {geocode ? (<Text>({geocode[0].city}, {geocode[0].isoCountryCode})</Text>) : (<><ActivityIndicator size="small"/><Text> locating your location...</Text></>)} 
        </View> 
      </View > 
    </View> 
  </TouchableWithoutFeedback>
);};

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#FFFF",
    width: wp(100),
    height: hp(100),
  },
  screen: {
    marginVertical: hp(3),
    // alignItems: "center",
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
  location: {
    fontSize: 20,
    color: Colors.fontColor,
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
    marginTop: hp(2),
    marginLeft: wp(15),
    flexDirection: "row",
  },
  startButton: {
    marginTop: 60,
    alignItems: "center",
    width: 250,
    height: 55,
    alignSelf: "center",
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
  annotation: {
    flexDirection: "row",
    marginTop: hp(2),
    alignSelf: "center",
  },
  emoji: {
    fontSize: 40,
  }
});

export default RestaurantFormScreen;


/* <View style={styles.distance}>
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
                </View> */
              // } {
                /* <View style={styles.choices}>
                          <Button style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>
                              current location (
                              {geocode
                                ? `${geocode[0].city}, ${geocode[0].isoCountryCode}`
                                : "Loading..."}
                              )
                            </Text>
                          </Button> */
              // } {
                /* <Button style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>choose from map</Text>
                          </Button> */
              // }
        
              // {
              //   /* </View> */
              // } {
              //   /* <Text style={styles.text}>current location</Text> */
              // }
        
              // {
              //   /* <Text style={styles.text}>with</Text> */
              // }