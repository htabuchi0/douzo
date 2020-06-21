import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

// import Button from "../../components/Button";
import Colors from "../../constants/colors";
import RestaurantCard from "../../components/RestaurantCard";

import { YELP_API_KEY, YELP_CLIENT_ID } from "react-native-dotenv";

const YELP_SEARCH_PATH = "https://api.yelp.com/v3/businesses/search";

const RestaurantSuggestionScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [businesses, setBusinesses] = useState(new Map());
  const [business, setBusiness] = useState(new Object());

  const { latitude, longitude, radius, stars } = props.route.params;
  console.log("restaurant suggestion screen");

  // const fetchBusiness = async () => {
  //   setLoading(true);
  //   axios
  //     .get(YELP_SEARCH_PATH, {
  //       headers: { Authorization: `Bearer ${YELP_API_KEY}` },
  //       params: {
  //         latitude: latitude,
  //         longitude: longitude,
  //         // radius: parseInt(radius),
  //       },
  //     })
  //     .then((response) => {
  //       // better for loop ES6
  //       let map = new Map();
  //       response.data.businesses.forEach((business) =>
  //         map.set(business.id, business)
  //       );
  //       setBusinesses(map);
  //     })
  //     .then(pickRandomBusiness)
  //     .catch((error) => console.log(error));
  // };

  const pickRandomBusiness = () => {
    let temp = businesses.get(
      Array.from(businesses.keys())[Math.floor(Math.random() * businesses.size)]
    );
    console.log("temp", temp);
    setBusiness(temp);
    console.log("after setting, business: ", business);
  };

  // useEffect(() => {
  //   fetchBusiness();
  // }, []);

  useEffect(() => {
    axios
      .get(YELP_SEARCH_PATH, {
        headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      })
      .then((response) => {
        let map = new Map();
        response.data.businesses.forEach((business) =>
          map.set(business.id, business)
        );
        console.log(map);
        setBusinesses(map);
        console.log("\nbusinesses: \n", businesses);
      })
      .then(pickRandomBusiness)
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [businesses, business]);

  // const pressTryAgainHandler = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>How about this?</Text>
      <RestaurantCard business={business} loading={isLoading}></RestaurantCard>
      <View style={styles.tryButton}>
        <Button title="try again" onPress={pickRandomBusiness} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: Colors.fontColor,
    fontWeight: "bold",
    marginVertical: 5,
  },
  tryButton: {
    marginVertical: hp(2),
  },
});

export default RestaurantSuggestionScreen;
